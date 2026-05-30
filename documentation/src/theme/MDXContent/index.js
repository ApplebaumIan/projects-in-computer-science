import React, {useEffect, useRef} from 'react';
import MDXContent from '@theme-original/MDXContent';

export default function MDXContentWrapper(props) {
    const contentRef = useRef(null);

    useEffect(() => {
      const container = contentRef.current;

      if (!container) {
        return undefined;
      }

      function captureClipboardEvent(eventName, properties) {
        if (typeof window === 'undefined' || !window.posthog) {
          return;
        }

        window.posthog.capture(eventName, {
          page_path: window.location.pathname,
          page_title: document.title,
          ...properties,
        });
      }

      function getSelectionText() {
        const selection = window.getSelection();
        return selection ? selection.toString().trim() : '';
      }

      function getClosestHeadingText(target) {
        const heading = target.closest('section, article, div')?.querySelector('h1, h2, h3, h4, h5, h6');
        return heading?.textContent?.trim() || undefined;
      }

      function handleCopy(event) {
        const target = event.target instanceof Element ? event.target : null;

        if (!target || !container.contains(target)) {
          return;
        }

        const copiedText = getSelectionText();

        if (!copiedText) {
          return;
        }

        const pre = target.closest('pre');
        const code = target.closest('code');

        captureClipboardEvent('docs_clipboard_copy', {
          copy_method: 'native-copy',
          content_type: pre || code ? 'code' : 'text',
          heading_text: getClosestHeadingText(target),
          copied_text: copiedText.slice(0, 500),
          copied_text_length: copiedText.length,
        });
      }

      function handleClick(event) {
        const target = event.target instanceof Element ? event.target : null;
        const button = target?.closest('button');

        if (!button || !container.contains(button)) {
          return;
        }

        const buttonLabel = button.getAttribute('title') || button.getAttribute('aria-label') || '';

        if (!/copy/i.test(buttonLabel)) {
          return;
        }

        const codeBlock = button.parentElement?.querySelector('pre code') || button.parentElement?.parentElement?.querySelector('pre code');
        const copiedText = codeBlock?.textContent?.trim();

        if (!copiedText) {
          return;
        }

        const languageClass = Array.from(codeBlock.classList).find((className) => className.startsWith('language-'));

        captureClipboardEvent('docs_clipboard_copy', {
          copy_method: 'copy-button',
          content_type: 'code',
          heading_text: getClosestHeadingText(button),
          code_language: languageClass?.replace('language-', ''),
          copied_text: copiedText.slice(0, 500),
          copied_text_length: copiedText.length,
        });
      }

      container.addEventListener('copy', handleCopy);
      container.addEventListener('click', handleClick);

      return () => {
        container.removeEventListener('copy', handleCopy);
        container.removeEventListener('click', handleClick);
      };
    }, []);

    return (
    <div ref={contentRef}>
      <MDXContent {...props} />
    </div>
  );
}
