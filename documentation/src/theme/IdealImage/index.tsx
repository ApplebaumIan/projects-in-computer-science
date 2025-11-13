// filepath: documentation/src/theme/IdealImage/index.tsx
import React from 'react';

type Props = {
  img: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
};

// Very small fallback implementation of the IdealImage theme component used by the
// showcase. It simply renders a normal <img />. You can replace this with a
// more sophisticated image component later (responsive images, placeholders, etc.).
export default function IdealImage({img, alt, className, style}: Props) {
  return <img src={img} alt={alt ?? ''} className={className} style={style} />;
}

