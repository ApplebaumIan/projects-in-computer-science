import React, {useEffect, useMemo, useRef, useState} from 'react';
import MDXContent from '@theme-original/MDXContent';
import styles from './styles.module.css';

const SCROLL_MILESTONES = [25, 50, 75, 100];
const SESSION_STORAGE_PREFIX = 'docs-analytics:visits:';
const FEEDBACK_DISMISSED_PREFIX = 'docs-analytics:feedback:dismissed:';
const FEEDBACK_SHOWN_PREFIX = 'docs-analytics:feedback:shown:';
const FEEDBACK_DEBUG_PARAM = 'debug-feedback';

function getPostHog() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.posthog || null;
}

function getPageCategory(pathname) {
  if (pathname.startsWith('/docs')) {
    return 'documentation';
  }

  if (pathname.startsWith('/syllabus')) {
    return 'syllabus';
  }

  if (pathname.startsWith('/showcase')) {
    return 'showcase';
  }

  return 'page';
}

function shouldTrackPath(pathname) {
  return !pathname.startsWith('/showcase');
}

function getHeadingContext(target, container) {
  const heading = target.closest('h1, h2, h3, h4, h5, h6');

  if (heading) {
    return heading.textContent?.trim() || undefined;
  }

  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const targetTop = target.getBoundingClientRect().top + window.scrollY + 8;
  let activeHeading;

  headings.forEach((candidate) => {
    if (candidate.getBoundingClientRect().top + window.scrollY <= targetTop) {
      activeHeading = candidate;
    }
  });

  return activeHeading?.textContent?.trim() || undefined;
}

function getScrollDepthPercent() {
  const scrollTop = window.scrollY || window.pageYOffset || 0;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const fullHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    viewportHeight,
  );

  if (fullHeight <= viewportHeight) {
    return 100;
  }

  return Math.min(100, Math.round(((scrollTop + viewportHeight) / fullHeight) * 100));
}

function getCopyContext(target) {
  const pre = target.closest('pre');
  const code = target.closest('code');
  const selection = window.getSelection()?.toString().trim() || '';

  if (pre || code) {
    const codeNode = pre?.querySelector('code') || code;
    const languageClass = codeNode
      ? Array.from(codeNode.classList).find((className) => className.startsWith('language-'))
      : undefined;

    return {
      content_type: 'code',
      code_language: languageClass?.replace('language-', ''),
      code_char_count: codeNode?.textContent?.trim().length || 0,
      copied_text: selection.slice(0, 500),
      copied_text_length: selection.length,
    };
  }

  return {
    content_type: 'text',
    selected_char_count: selection.length,
    copied_text: selection.slice(0, 500),
    copied_text_length: selection.length,
  };
}

export default function MDXContentWrapper(props) {
  const contentRef = useRef(null);
  const analyticsRef = useRef(null);
  const promptTimeoutRef = useRef(null);
  const dismissTimeoutRef = useRef(null);
  const pathname = typeof window === 'undefined' ? '' : window.location.pathname;
  const pageCategory = useMemo(() => getPageCategory(pathname), [pathname]);
  const [feedbackPrompt, setFeedbackPrompt] = useState({
    visible: false,
    submitted: false,
    triggerType: null,
    expanded: false,
    pendingFeedbackValue: null,
    feedbackText: '',
  });

  useEffect(() => {
    return () => {
      window.clearTimeout(promptTimeoutRef.current);
      window.clearTimeout(dismissTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setFeedbackPrompt({
      visible: false,
      submitted: false,
      triggerType: null,
      expanded: false,
      pendingFeedbackValue: null,
      feedbackText: '',
    });
  }, [pathname]);

  useEffect(() => {
    const container = contentRef.current;
    const posthog = getPostHog();

    if (!container || typeof window === 'undefined') {
      return undefined;
    }

    if (!shouldTrackPath(window.location.pathname)) {
      return undefined;
    }

    const startedAt = Date.now();
    const milestonesSent = new Set();
    const visitStorageKey = `${SESSION_STORAGE_PREFIX}${window.location.pathname}`;
    const feedbackDismissedKey = `${FEEDBACK_DISMISSED_PREFIX}${window.location.pathname}`;
    const feedbackShownKey = `${FEEDBACK_SHOWN_PREFIX}${window.location.pathname}`;
    const previousVisits = Number.parseInt(sessionStorage.getItem(visitStorageKey) || '0', 10) || 0;
    const visitCount = previousVisits + 1;
    const pageWordCount = container.textContent?.trim().split(/\s+/).filter(Boolean).length || 0;
    const codeBlockCount = container.querySelectorAll('pre code').length;
    const headingCount = container.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
    const session = {
      maxScrollDepth: getScrollDepthPercent(),
      copyCount: 0,
      codeCopyCount: 0,
      headingJumpCount: 0,
      outboundClickCount: 0,
      internalNavCount: 0,
      engagementEventSent: false,
      summarySent: false,
      feedbackPromptShown: sessionStorage.getItem(feedbackShownKey) === '1',
      feedbackPromptSubmitted: false,
    };

    sessionStorage.setItem(visitStorageKey, String(visitCount));

    function getMetrics() {
      return {
        time_on_page_ms: Date.now() - startedAt,
        max_scroll_depth_percent: session.maxScrollDepth,
        copy_count: session.copyCount,
        code_copy_count: session.codeCopyCount,
        heading_jump_count: session.headingJumpCount,
        outbound_click_count: session.outboundClickCount,
        internal_nav_count: session.internalNavCount,
        page_word_count: pageWordCount,
        code_block_count: codeBlockCount,
        heading_count: headingCount,
      };
    }

    function capture(eventName, properties = {}) {
      if (!posthog) {
        return;
      }

      posthog.capture(eventName, {
        page_path: window.location.pathname,
        page_title: document.title,
        page_category: pageCategory,
        visit_count_in_session: visitCount,
        ...properties,
      });
    }

    function isLikelyStruggle(timeOnPageMs = Date.now() - startedAt) {
      return (
        session.copyCount >= 3 ||
        session.headingJumpCount >= 3 ||
        session.outboundClickCount >= 2 ||
        (timeOnPageMs >= 90000 && session.maxScrollDepth < 60)
      );
    }

    function isPromptEligible() {
      return pageWordCount >= 150 || codeBlockCount > 0;
    }

    function showFeedbackPrompt(triggerType, force = false) {
      if (
        !force &&
        (
          session.feedbackPromptShown ||
          session.feedbackPromptSubmitted ||
          sessionStorage.getItem(feedbackDismissedKey) === '1' ||
          !isPromptEligible()
        )
      ) {
        return;
      }

      session.feedbackPromptShown = true;
      sessionStorage.setItem(feedbackShownKey, '1');
      setFeedbackPrompt({
        visible: true,
        submitted: false,
        triggerType,
        expanded: false,
        pendingFeedbackValue: null,
        feedbackText: '',
      });

      capture('docs_feedback_prompt_shown', {
        trigger_type: triggerType,
        ...getMetrics(),
      });
    }

    function scheduleFeedbackPrompt(triggerType, force = false) {
      window.clearTimeout(promptTimeoutRef.current);
      promptTimeoutRef.current = window.setTimeout(() => {
        showFeedbackPrompt(triggerType, force);
      }, force ? 0 : 1800);
    }

    function maybePromptForFeedback(triggerType) {
      if (isLikelyStruggle()) {
        scheduleFeedbackPrompt(triggerType, false);
      }
    }

    function sendEngagementEvent(trigger) {
      if (session.engagementEventSent) {
        return;
      }

      const elapsedMs = Date.now() - startedAt;

      if (elapsedMs < 30000 && session.maxScrollDepth < 50 && session.copyCount === 0) {
        return;
      }

      session.engagementEventSent = true;
      capture('docs_page_engaged', {
        trigger,
        ...getMetrics(),
      });
    }

    function sendSummary(reason) {
      if (session.summarySent) {
        return;
      }

      session.summarySent = true;
      capture('docs_page_summary', {
        reason,
        likely_struggle: isLikelyStruggle(),
        ...getMetrics(),
      });
    }

    function handleScroll() {
      session.maxScrollDepth = Math.max(session.maxScrollDepth, getScrollDepthPercent());

      SCROLL_MILESTONES.forEach((milestone) => {
        if (session.maxScrollDepth >= milestone && !milestonesSent.has(milestone)) {
          milestonesSent.add(milestone);
          capture('docs_scroll_depth_reached', {
            scroll_depth_percent: milestone,
          });
        }
      });

      sendEngagementEvent('scroll');
      maybePromptForFeedback('scroll');
    }

    function handleCopy(event) {
      const target = event.target instanceof Element ? event.target : null;

      if (!target || !container.contains(target)) {
        return;
      }

      const copyContext = getCopyContext(target);

      if (copyContext.content_type === 'text' && copyContext.selected_char_count === 0) {
        return;
      }

      session.copyCount += 1;
      if (copyContext.content_type === 'code') {
        session.codeCopyCount += 1;
      }

      capture('docs_copy', {
        copy_method: 'native-copy',
        heading_text: getHeadingContext(target, container),
        ...copyContext,
      });

      sendEngagementEvent('copy');
      maybePromptForFeedback('copy');
    }

    function handleClick(event) {
      const target = event.target instanceof Element ? event.target : null;

      if (!target || !container.contains(target)) {
        return;
      }

      const button = target.closest('button');
      const link = target.closest('a[href]');

      if (button) {
        const buttonLabel = button.getAttribute('title') || button.getAttribute('aria-label') || '';

        if (/copy/i.test(buttonLabel)) {
          const codeBlock = button.parentElement?.querySelector('pre code') ||
            button.parentElement?.parentElement?.querySelector('pre code');
          const copiedCode = codeBlock?.textContent?.trim() || '';
          const languageClass = codeBlock
            ? Array.from(codeBlock.classList).find((className) => className.startsWith('language-'))
            : undefined;

          session.copyCount += 1;
          session.codeCopyCount += 1;

          capture('docs_copy', {
            copy_method: 'copy-button',
            heading_text: getHeadingContext(button, container),
            content_type: 'code',
            code_language: languageClass?.replace('language-', ''),
            code_char_count: copiedCode.length,
            copied_text: copiedCode.slice(0, 500),
            copied_text_length: copiedCode.length,
          });

          sendEngagementEvent('copy-button');
          maybePromptForFeedback('copy');
        }
      }

      if (!link) {
        return;
      }

      const rawHref = link.getAttribute('href');

      if (!rawHref) {
        return;
      }

      if (rawHref.startsWith('#')) {
        session.headingJumpCount += 1;
        capture('docs_heading_jump', {
          target_id: rawHref.slice(1),
          link_text: link.textContent?.trim().slice(0, 120) || undefined,
        });
        maybePromptForFeedback('heading-jump');
        return;
      }

      let destinationUrl;

      try {
        destinationUrl = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (destinationUrl.origin !== window.location.origin) {
        session.outboundClickCount += 1;
        capture('docs_outbound_click', {
          destination_host: destinationUrl.host,
          destination_path: destinationUrl.pathname,
          link_text: link.textContent?.trim().slice(0, 120) || undefined,
          heading_text: getHeadingContext(link, container),
        });
        sendEngagementEvent('outbound-click');
        maybePromptForFeedback('outbound-click');
        return;
      }

      if (destinationUrl.pathname !== window.location.pathname) {
        session.internalNavCount += 1;
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        sendSummary('hidden');
      }
    }

    function handlePageHide() {
      sendSummary('pagehide');
    }

    analyticsRef.current = {
      capture,
      getMetrics,
      feedbackDismissedKey,
      showFeedbackPrompt,
    };

    capture('docs_page_view', {
      page_word_count: pageWordCount,
      code_block_count: codeBlockCount,
      heading_count: headingCount,
    });

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get(FEEDBACK_DEBUG_PARAM) === '1') {
      scheduleFeedbackPrompt('manual-debug', true);
    }

    window.__showDocsFeedbackPrompt = () => showFeedbackPrompt('manual-debug', true);

    window.addEventListener('scroll', handleScroll, {passive: true});
    container.addEventListener('copy', handleCopy);
    container.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    handleScroll();

    return () => {
      sendSummary('unmount');
      window.clearTimeout(promptTimeoutRef.current);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('copy', handleCopy);
      container.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);

      if (window.__showDocsFeedbackPrompt === showFeedbackPrompt) {
        delete window.__showDocsFeedbackPrompt;
      } else {
        delete window.__showDocsFeedbackPrompt;
      }
    };
  }, [pageCategory, pathname]);

  function handleFeedbackDismiss(reason) {
    const analytics = analyticsRef.current;

    if (!analytics || !feedbackPrompt.visible) {
      setFeedbackPrompt((current) => ({...current, visible: false}));
      return;
    }

    if (reason !== 'submitted') {
      sessionStorage.setItem(analytics.feedbackDismissedKey, '1');
      analytics.capture('docs_feedback_prompt_dismissed', {
        trigger_type: feedbackPrompt.triggerType,
        dismiss_reason: reason,
        ...analytics.getMetrics(),
      });
    }

    window.clearTimeout(dismissTimeoutRef.current);
    setFeedbackPrompt({
      visible: false,
      submitted: false,
      triggerType: null,
      expanded: false,
      pendingFeedbackValue: null,
      feedbackText: '',
    });
  }

  function handleFeedbackSubmit(feedbackValue, feedbackText = '') {
    const analytics = analyticsRef.current;

    if (!analytics) {
      return;
    }

    sessionStorage.setItem(analytics.feedbackDismissedKey, '1');
    analytics.capture('docs_feedback_submitted', {
      trigger_type: feedbackPrompt.triggerType,
      feedback_value: feedbackValue,
      feedback_text: feedbackText.trim() || undefined,
      ...analytics.getMetrics(),
    });

    setFeedbackPrompt({
      visible: true,
      submitted: true,
      triggerType: feedbackPrompt.triggerType,
      expanded: false,
      pendingFeedbackValue: null,
      feedbackText: '',
    });

    window.clearTimeout(dismissTimeoutRef.current);
    dismissTimeoutRef.current = window.setTimeout(() => {
      setFeedbackPrompt({
        visible: false,
        submitted: false,
        triggerType: null,
        expanded: false,
        pendingFeedbackValue: null,
        feedbackText: '',
      });
    }, 2200);
  }

  return (
    <>
      <div ref={contentRef}>
        <MDXContent {...props} />
      </div>
      {feedbackPrompt.visible ? (
        <aside className={styles.feedbackPrompt} aria-live="polite" aria-label="Page feedback prompt">
          {!feedbackPrompt.submitted ? (
            <button
              className={`button button--secondary button--sm ${styles.feedbackDismissCorner}`}
              type="button"
              onClick={() => handleFeedbackDismiss('dismissed')}
              aria-label="Dismiss feedback prompt"
              title="Dismiss"
            >
              ×
            </button>
          ) : null}
          {feedbackPrompt.submitted ? (
            <p className={styles.feedbackMessage}>Thanks. Your feedback helps improve these instructions.</p>
          ) : (
            <>
              <p className={styles.feedbackMessage}>
                {feedbackPrompt.expanded
                  ? feedbackPrompt.pendingFeedbackValue === 'mixed'
                    ? 'Anything we could improve?'
                    : 'What was unclear?'
                  : 'Having trouble with this page?'}
              </p>
              {feedbackPrompt.expanded ? (
                <div className={styles.feedbackForm}>
                  <textarea
                    className={`textarea ${styles.feedbackTextarea}`}
                    value={feedbackPrompt.feedbackText}
                    onChange={(event) => {
                      const value = event.currentTarget.value;
                      setFeedbackPrompt((current) => ({
                        ...current,
                        feedbackText: value,
                      }));
                    }}
                    placeholder={
                      feedbackPrompt.pendingFeedbackValue === 'mixed'
                        ? 'Optional feedback'
                        : 'Optional feedback'
                    }
                    rows={3}
                  />
                  <div className={styles.feedbackActions}>
                    <button
                      className={`button button--primary button--sm ${styles.feedbackButton}`}
                      type="button"
                      onClick={() => handleFeedbackSubmit(
                        feedbackPrompt.pendingFeedbackValue || 'confusing',
                        feedbackPrompt.feedbackText,
                      )}
                    >
                      Send
                    </button>
                    <button
                      className={`button button--secondary button--sm ${styles.feedbackButton}`}
                      type="button"
                      onClick={() => {
                        setFeedbackPrompt((current) => ({
                          ...current,
                          expanded: false,
                          pendingFeedbackValue: null,
                          feedbackText: '',
                        }));
                      }}
                    >
                      Back
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.feedbackActions}>
                  <button
                    className={`button button--secondary button--sm ${styles.feedbackEmojiButton} ${styles.feedbackEmojiPositive}`}
                    type="button"
                    onClick={() => handleFeedbackSubmit('helpful')}
                    aria-label="This page was helpful"
                    title="Helpful"
                  >
                    <span className={styles.feedbackEmojiSymbol} aria-hidden="true">😄</span>
                    <span className={styles.feedbackEmojiLabel}>Helpful</span>
                  </button>
                  <button
                    className={`button button--secondary button--sm ${styles.feedbackEmojiButton} ${styles.feedbackEmojiNeutral}`}
                    type="button"
                    onClick={() => {
                      setFeedbackPrompt((current) => ({
                        ...current,
                        expanded: true,
                        pendingFeedbackValue: 'mixed',
                      }));
                    }}
                    aria-label="This page was okay"
                    title="Okay"
                  >
                    <span className={styles.feedbackEmojiSymbol} aria-hidden="true">🫤</span>
                    <span className={styles.feedbackEmojiLabel}>Okay</span>
                  </button>
                  <button
                    className={`button button--secondary button--sm ${styles.feedbackEmojiButton} ${styles.feedbackEmojiNegative}`}
                    type="button"
                    onClick={() => {
                      setFeedbackPrompt((current) => ({
                        ...current,
                        expanded: true,
                        pendingFeedbackValue: 'confusing',
                      }));
                    }}
                    aria-label="This page was confusing"
                    title="Confusing"
                  >
                    <span className={styles.feedbackEmojiSymbol} aria-hidden="true">😣</span>
                    <span className={styles.feedbackEmojiLabel}>Confusing</span>
                  </button>
                </div>
              )}
            </>
          )}
        </aside>
      ) : null}
    </>
  );
}
