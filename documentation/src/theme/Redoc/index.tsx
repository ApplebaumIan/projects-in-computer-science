import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

type RedocProps = Record<string, unknown>;

function RedocFallback() {
  return (
    <div className="redocusaurus">
      <p>API reference loads in the browser.</p>
    </div>
  );
}

export default function Redoc(props: RedocProps): JSX.Element {
  return (
    <BrowserOnly fallback={<RedocFallback />}>
      {() => {
        // Redocusaurus pulls Prism-powered modules that are not SSR-safe here.
        const RedocClient = require('@theme-original/Redoc').default;
        return <RedocClient {...props} />;
      }}
    </BrowserOnly>
  );
}
