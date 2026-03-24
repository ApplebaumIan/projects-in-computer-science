import React, {useEffect, useMemo, useState} from 'react';

function toSafeHref(path) {
  return encodeURI(path);
}

export default function SlidesCatalog() {
  const [slides, setSlides] = useState([]);
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
          setSlides(Array.isArray(data) ? data : []);
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

    if (!slides.length) {
      return <p>No slides found. Run the keynote export to generate them.</p>;
    }

    return slides.map((slide) => {
      const htmlHref = toSafeHref(slide.html);
      const pdfHref = toSafeHref(slide.pdf);
      const key = `${slide.pdf}-${slide.html}`;

      return (
        <section key={key} style={{marginBottom: '2rem'}}>
          <h2>{slide.title}</h2>
          <p>
            <a className="button button--secondary button--sm margin-right--sm" href={htmlHref} target="_blank" rel="noopener noreferrer">
              Open HTML
            </a>
            <a className="button button--primary button--sm" href={pdfHref} target="_blank" rel="noopener noreferrer" download>
              Download PDF
            </a>
          </p>
          <iframe
            style={{width: '100%', height: '560px', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}
            src={htmlHref}
            title={slide.title}
            loading="lazy"
          />
        </section>
      );
    });
  }, [error, isLoading, slides]);

  return <div>{content}</div>;
}

