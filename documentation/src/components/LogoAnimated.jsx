import React, {useEffect, useRef, useState} from 'react';
import DontPanic from '../../static/img/dont-panic.svg';
import '../css/logo-animated.css';

// Lightweight wrapper that triggers a CSS "animate-in" when the
// component becomes visible. Respects prefers-reduced-motion and
// falls back gracefully when IntersectionObserver isn't available.
export default function LogoAnimated({className = '', style = {}, alt = 'Don\'t Panic logo', ...rest}){
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, don't animate — just show it.
    const mq = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    if (mq && mq.matches) {
      setVisible(true);
      return;
    }

    if (typeof window === 'undefined') {
      // SSR: do nothing (will be hydrated on client)
      return;
    }

    const el = ref.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      }, {threshold: 0.15});
      obs.observe(el);
      return () => obs.disconnect();
    }

    // Fallback: if IntersectionObserver not supported, animate after a short timeout
    const t = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={ref}
      className={"logo-animated " + (visible ? 'is-visible ' : '') + className}
      style={style}
      aria-hidden={!alt ? 'true' : 'false'}
    >
      {/* Render the imported SVG as a React component */}
      <DontPanic className="dont-panic-svg" role="img" aria-label={alt} {...rest} />
    </div>
  );
}

