import { useState, useEffect } from 'react';
type Props = {
  value: number;
  idx: number;
};
const DieOneDSix: React.FC<Props> = ({ value, idx }) => {
  const [animStatus, setAnimStatus] = useState('');
  useEffect(() => {
    setAnimStatus('opening');
    setTimeout(() => {
      setAnimStatus('open');
    }, 500);
  }, []);
  return (
    <div
      className={`w-16 h-16 transition-all duration-500 ${
        animStatus === 'open' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
      } ${idx > 0 ? 'delay-200' : 'delay-0'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="linearGradient23232">
            <stop offset="0.686" stopColor="#d9d9d9" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#ccc" stopOpacity="1"></stop>
          </linearGradient>
          <clipPath id="clipPath21094" clipPathUnits="userSpaceOnUse">
            <rect
              width="97.5"
              height="97.5"
              x="1.25"
              y="1.25"
              fill="#6a6a6a"
              stroke="none"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              rx="12.557"
            ></rect>
          </clipPath>
          <radialGradient
            id="radialGradient23236"
            cx="50"
            cy="50"
            r="48.75"
            fx="50"
            fy="50"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#linearGradient23232"
          ></radialGradient>
        </defs>
        <g>
          <g
            fill="#ccc"
            stroke="none"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
            clipPath="url(#clipPath21094)"
          >
            <rect
              width="97.5"
              height="97.5"
              x="1.25"
              y="1.25"
              fill="url(#radialGradient23236)"
              fillOpacity="1"
              rx="12.557"
            ></rect>
            <path
              fill="#b3b3b3"
              d="M92 3.944s.5 72.196 0 78.187c-.44 5.284-1.888 9.573-9.002 9.869-7.114.296-81 0-81 0L4 96l-4 4h100V1.058L96 4z"
            ></path>
            <path
              fill="#f6f6f6"
              fillOpacity="1"
              d="M8 92s-.5-68.14 0-74.131C8.44 12.585 9.888 8.296 17.002 8 24.116 7.704 92 8 92 8l4-4 4-4H0v98.942L4 96z"
            ></path>
          </g>
          {[1, 3, 5].includes(value) && (
            <g transform="translate(3 3)" data-testid="dot-cc">
              <circle
                cx="47"
                cy="47"
                r="8"
                fill="#f2f2f2"
                fillOpacity="1"
                fillRule="evenodd"
                strokeWidth="0.265"
              ></circle>
              <circle
                cx="47"
                cy="47"
                r="7"
                fill="#4d4d4d"
                fillRule="evenodd"
                strokeWidth="0.265"
                display="inline"
              ></circle>
              <path
                fill="none"
                fillOpacity="1"
                stroke="#686868"
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="1"
                strokeWidth="1.5"
                d="M42.567 47.405c.302-2.854 1.4-5.014 5-5"
                paintOrder="stroke fill markers"
              ></path>
            </g>
          )}
          {[2, 4, 5, 6].includes(value) && (
            <g transform="translate(30 30)" data-testid="dot-rb">
              <circle
                cx="47"
                cy="47"
                r="8"
                fill="#f2f2f2"
                fillOpacity="1"
                fillRule="evenodd"
                strokeWidth="0.265"
              ></circle>
              <circle
                cx="47"
                cy="47"
                r="7"
                fill="#4d4d4d"
                fillRule="evenodd"
                strokeWidth="0.265"
                display="inline"
              ></circle>
              <path
                fill="none"
                fillOpacity="1"
                stroke="#686868"
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="1"
                strokeWidth="1.5"
                d="M42.567 47.405c.302-2.854 1.4-5.014 5-5"
                paintOrder="stroke fill markers"
              ></path>
            </g>
          )}

          {[6].includes(value) && (
            <g transform="translate(30 3)" data-testid="dot-rc">
              <circle
                cx="47"
                cy="47"
                r="8"
                fill="#f2f2f2"
                fillOpacity="1"
                fillRule="evenodd"
                strokeWidth="0.265"
              ></circle>
              <circle
                cx="47"
                cy="47"
                r="7"
                fill="#4d4d4d"
                fillRule="evenodd"
                strokeWidth="0.265"
                display="inline"
              ></circle>
              <path
                fill="none"
                fillOpacity="1"
                stroke="#686868"
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="1"
                strokeWidth="1.5"
                d="M42.567 47.405c.302-2.854 1.4-5.014 5-5"
                paintOrder="stroke fill markers"
              ></path>
            </g>
          )}
          {[3, 4, 5, 6].includes(value) && (
            <g transform="translate(30 -24)" data-testid="dot-rt">
              <circle
                cx="47"
                cy="47"
                r="8"
                fill="#f2f2f2"
                fillOpacity="1"
                fillRule="evenodd"
                strokeWidth="0.265"
              ></circle>
              <circle
                cx="47"
                cy="47"
                r="7"
                fill="#4d4d4d"
                fillRule="evenodd"
                strokeWidth="0.265"
                display="inline"
              ></circle>
              <path
                fill="none"
                fillOpacity="1"
                stroke="#686868"
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="1"
                strokeWidth="1.5"
                d="M42.567 47.405c.302-2.854 1.4-5.014 5-5"
                paintOrder="stroke fill markers"
              ></path>
            </g>
          )}

          {[3, 4, 5, 6].includes(value) && (
            <g transform="translate(-24 30)" data-testid="dot-lb">
              <circle
                cx="47"
                cy="47"
                r="8"
                fill="#f2f2f2"
                fillOpacity="1"
                fillRule="evenodd"
                strokeWidth="0.265"
              ></circle>
              <circle
                cx="47"
                cy="47"
                r="7"
                fill="#4d4d4d"
                fillRule="evenodd"
                strokeWidth="0.265"
                display="inline"
              ></circle>
              <path
                fill="none"
                fillOpacity="1"
                stroke="#686868"
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="1"
                strokeWidth="1.5"
                d="M42.567 47.405c.302-2.854 1.4-5.014 5-5"
                paintOrder="stroke fill markers"
              ></path>
            </g>
          )}

          {[6].includes(value) && (
            <g transform="translate(-24 3)" data-testid="dot-lc">
              <circle
                cx="47"
                cy="47"
                r="8"
                fill="#f2f2f2"
                fillOpacity="1"
                fillRule="evenodd"
                strokeWidth="0.265"
              ></circle>
              <circle
                cx="47"
                cy="47"
                r="7"
                fill="#4d4d4d"
                fillRule="evenodd"
                strokeWidth="0.265"
                display="inline"
              ></circle>
              <path
                fill="none"
                fillOpacity="1"
                stroke="#686868"
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="1"
                strokeWidth="1.5"
                d="M42.567 47.405c.302-2.854 1.4-5.014 5-5"
                paintOrder="stroke fill markers"
              ></path>
            </g>
          )}

          {[2, 4, 5, 6].includes(value) && (
            <g transform="translate(-24 -24)" data-testid="dot-lt">
              <circle
                cx="47"
                cy="47"
                r="8"
                fill="#f2f2f2"
                fillOpacity="1"
                fillRule="evenodd"
                strokeWidth="0.265"
              ></circle>
              <circle
                cx="47"
                cy="47"
                r="7"
                fill="#4d4d4d"
                fillRule="evenodd"
                strokeWidth="0.265"
                display="inline"
              ></circle>
              <path
                fill="none"
                fillOpacity="1"
                stroke="#686868"
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="1"
                strokeWidth="1.5"
                d="M42.567 47.405c.302-2.854 1.4-5.014 5-5"
                paintOrder="stroke fill markers"
              ></path>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default DieOneDSix;
