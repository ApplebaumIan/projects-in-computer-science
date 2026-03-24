import React, {useEffect, useMemo, useState} from 'react';

function toSafeHref(pathValue) {
  return encodeURI(pathValue);
}

function normalizeManifest(rawData) {
  if (rawData && Array.isArray(rawData.groups)) {
    return rawData.groups.map((group) => ({
      groupId: group.groupId,
      groupLabel: group.groupLabel,
      items: Array.isArray(group.items) ? group.items : [],
    }));
  }

  if (rawData && Array.isArray(rawData.weeks)) {
    return rawData.weeks.map((week) => ({
      groupId: week.weekId,
      groupLabel: week.weekLabel,
      items: Array.isArray(week.slides) ? week.slides : [],
    }));
  }

  if (Array.isArray(rawData)) {
    return [
      {
        groupId: 'all-slides',
        groupLabel: 'All Slides',
        items: rawData,
      },
    ];
  }

  return [];
}

function ActionButtons({html, pdf}) {
  const htmlHref = toSafeHref(html);
  const pdfHref = toSafeHref(pdf);

  return (
    <p>
      <a className="button button--secondary button--sm margin-right--sm" href={htmlHref} target="_blank" rel="noopener noreferrer">
        Open HTML
      </a>
      <a className="button button--primary button--sm" href={pdfHref} target="_blank" rel="noopener noreferrer" download>
        Download PDF
      </a>
    </p>
  );
}

export function SlideEmbed({title, html, pdf}) {
  const htmlHref = toSafeHref(html);

  return (
    <section style={{marginBottom: '2rem'}}>
      <ActionButtons html={html} pdf={pdf} />
      <iframe
        style={{width: '100%', height: '560px', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}
        src={htmlHref}
        title={title}
        loading="lazy"
      />
    </section>
  );
}

export default function SlidesCatalog({groupId, weekId}) {
  const [weeks, setWeeks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadSlides() {
      try {
        const response = await fetch('/slides/manifest.json');
        if (!response.ok) {
          throw new Error(`Failed to load slides manifest (${response.status})`);
        }

        const data = await response.json();
        if (isMounted) {
          setWeeks(normalizeManifest(data));
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load slides.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSlides();
    return () => {
      isMounted = false;
    };
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return <p>Loading slides...</p>;
    }

    if (error) {
      return <p>Could not load slides: {error}</p>;
    }

    if (!weeks.length) {
      return <p>No slides found. Run the keynote export to generate them.</p>;
    }

    const targetGroupId = groupId || weekId;
    const visibleWeeks = targetGroupId ? weeks.filter((week) => week.groupId === targetGroupId) : weeks;

    if (!visibleWeeks.length) {
      return <p>No slides found for this week.</p>;
    }

    return visibleWeeks.map((week) => (
      <section key={week.groupId} style={{marginBottom: '2.5rem'}}>
        {!targetGroupId ? <h2>{week.groupLabel}</h2> : null}
        {Array.isArray(week.items) && week.items.length ? (
          week.items.map((slide) => {
            const key = `${slide.pdf}-${slide.html}`;
            const docHref = slide.docPath ? toSafeHref(slide.docPath) : '';

            return (
              <article key={key} style={{marginBottom: '1.5rem'}}>
                <h3>{slide.title}</h3>
                <ActionButtons html={slide.html} pdf={slide.pdf} />
                {docHref ? (
                  <p>
                    <a href={docHref}>Open dedicated slide page</a>
                  </p>
                ) : null}
              </article>
            );
          })
        ) : (
          <p>No slides in this week.</p>
        )}
      </section>
    ));
  }, [error, groupId, isLoading, weekId, weeks]);

  return <div>{content}</div>;
}



