import React, { useState } from 'react';
import { Factory } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#202124] via-[#075B2A] to-[#138A36] text-white p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Factory className="w-10 h-10 text-[#78C850] mb-3 opacity-90" />
        <span className="font-display text-sm font-semibold tracking-tight text-[#DFF3E4]">
          {fallbackLabel || alt}
        </span>
        <span className="text-xs text-[#DFF3E4]/70 mt-1">
          Green Rubber · Transformación Industrial
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
