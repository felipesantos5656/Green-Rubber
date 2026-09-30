import React from 'react';

interface GreenRubberLogoProps {
  variant?: 'light' | 'dark';
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const GreenRubberLogo: React.FC<GreenRubberLogoProps> = ({
  variant = 'dark',
  showSlogan = false,
  size = 'md',
}) => {
  const iconDimensions =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';
  const titleSize =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl';

  return (
    <div className="inline-flex items-center gap-3.5 select-none">
      {/* Emblem SVG combining industrial tire tread & circular eco leaf */}
      <div
        className={`${iconDimensions} relative flex items-center justify-center rounded-xl bg-[#075B2A] border border-[#2E9F45]/40 shadow-sm shrink-0`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5"
        >
          {/* Outer tire tread ring arc (charcoal/silver-white contrast) */}
          <path
            d="M32 8C18.745 8 8 18.745 8 32C8 41.66 13.71 49.985 21.95 53.79"
            stroke="#DFF3E4"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
          {/* Continuous circular economy arrow arc in bright eco green */}
          <path
            d="M32 8C45.255 8 56 18.745 56 32C56 45.255 45.255 56 32 56C28.2 56 24.6 55.12 21.4 53.55"
            stroke="#78C850"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Arrowhead at top of circular loop */}
          <path
            d="M27 4L33.5 8L27.5 12.5"
            stroke="#78C850"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner ecological leaf / rubber granule core */}
          <path
            d="M22 39C22 27.5 31.5 21 42 21C42 31.5 35.5 41 24 41C22.895 41 22 40.105 22 39Z"
            fill="#2E9F45"
            stroke="#78C850"
            strokeWidth="2"
          />
          <path
            d="M23 40L34 29"
            stroke="#DFF3E4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Granule dots representing milled rubber */}
          <circle cx="22" cy="24" r="2.2" fill="#DFF3E4" />
          <circle cx="17.5" cy="30.5" r="2.2" fill="#78C850" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-display font-extrabold tracking-tight ${titleSize} ${
              variant === 'light' ? 'text-white' : 'text-[#075B2A]'
            }`}
          >
            GREEN
          </span>
          <span
            className={`font-display font-extrabold tracking-tight ${titleSize} ${
              variant === 'light' ? 'text-[#78C850]' : 'text-[#202124]'
            }`}
          >
            RUBBER
          </span>
        </div>
        {showSlogan && (
          <span
            className={`text-xs mt-1 font-medium tracking-normal ${
              variant === 'light' ? 'text-[#DFF3E4]/85' : 'text-[#5F6368]'
            }`}
          >
            De residuo a recurso, de Colombia al mundo
          </span>
        )}
      </div>
    </div>
  );
};
