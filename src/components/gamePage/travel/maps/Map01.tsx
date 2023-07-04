import React from 'react';

type Props = {
  location: string;
  availableLocations: string[];
  handleLocationSelect: Function;
};

const Map01: React.FC<Props> = ({ location, availableLocations, handleLocationSelect }) => {
  const getDotProps = (dotLocation: string) => {
    const props: any = {};
    if (availableLocations.includes(dotLocation)) {
      props.className = 'fill-green-500 hover:fill-gray-200 transition-all duration-150';
      props.role = 'button';
      props.onClick = () => {
        handleLocationSelect(dotLocation);
      };
    } else if (location === dotLocation) {
      props.className = 'fill-gray-300';
    } else {
      props.className = 'fill-orange-800';
    }
    return props;
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient id="linearGradient6774">
          <stop offset="0" stopColor="#4ac9fd" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#4a90fd" stopOpacity="1"></stop>
        </linearGradient>
        <linearGradient id="linearGradient4242">
          <stop offset="0.555" stopColor="#fca" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#e9ab86" stopOpacity="1"></stop>
        </linearGradient>
        <clipPath id="clipPath4124" clipPathUnits="userSpaceOnUse">
          <path
            fill="#ffe6d5"
            strokeWidth="0"
            d="M1.482 6.159L4.987 1S9.13 5.514 24.108 3.902C39.087 2.29 56.615-.29 63.307 3.579c6.692 3.87 26.77-2.257 26.77-2.257s.637 3.225 4.143 3.547c3.505.323 4.143 5.804 4.143 5.804s-4.462 42.239-2.869 45.14c1.594 2.903-2.23 19.024-.637 22.894C96.45 82.576 99 91.927 99 91.927s-3.506 2.256-4.78 4.191c-1.275 1.935-10.198 2.58-10.198 2.58s-58.001-3.87-62.463-1.29c-4.462 2.58-10.835 1.612-13.385 0-2.55-1.612-6.692-6.449-6.692-6.449s.637-23.215 2.23-26.117c1.594-2.902 1.275-23.86-.318-25.15C1.8 38.402-.112 15.51 1.8 12.608c1.912-2.902-.318-6.45-.318-6.45z"
            paintOrder="stroke fill markers"
          ></path>
        </clipPath>
        <radialGradient
          id="radialGradient4244"
          cx="50"
          cy="50"
          r="49.5"
          fx="50"
          fy="50"
          gradientTransform="matrix(.88967 -.00724 .00775 .9517 5.129 2.777)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#linearGradient4242"
        ></radialGradient>
        <linearGradient
          id="linearGradient6776"
          x1="75.556"
          x2="77.61"
          y1="77.781"
          y2="101.503"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#linearGradient6774"
        ></linearGradient>
      </defs>
      <g>
        <g
          fillOpacity="1"
          strokeOpacity="1"
          clipPath="url(#clipPath4124)"
          transform="translate(.692 .476)"
        >
          <path
            fill="url(#radialGradient4244)"
            stroke="none"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeWidth="0"
            d="M0.5 0.5H99.5V99.5H0.5z"
            paintOrder="stroke fill markers"
          ></path>
          <g strokeDashoffset="0" strokeLinejoin="round" paintOrder="normal">
            <path
              fill="#0d630d"
              stroke="none"
              strokeDasharray="none"
              strokeLinecap="square"
              strokeWidth="0"
              d="M.464 40.117s3.798 1.486 5.78-.33c1.981-1.817 4.128-6.276 5.614-6.276 1.486 0 3.798-1.156 5.45-4.293 1.65-3.138 1.486-5.945 3.302-5.945 1.817 0 2.973 2.477 5.615-.495 1.32-1.487 4.21-3.468 6.15-5.223.971-.877 1.704-1.698 1.884-2.371.181-.673.078-2.561.078-2.561s-13.397-.249-11.25-2.726c2.147-2.477 8.295-4.606 7.999-6.165l-.057-.647-36.51-6.068-.99 44.916z"
            ></path>
            <path
              fill="green"
              stroke="#0c550a"
              strokeDasharray="none"
              strokeLinecap="square"
              strokeWidth="0.3"
              d="M.464 38s3.798 1.486 5.78-.33c1.981-1.817 4.128-6.275 5.614-6.275 1.486 0 3.798-1.156 5.45-4.294 1.65-3.137 1.486-5.945 3.302-5.945 1.817 0 2.973 2.477 5.615-.495 2.642-2.973 11.56-7.927 6.605-9.083-4.954-1.155-11.89-1.32-9.743-3.798 2.147-2.477 9.413-3.963 7.596-5.614C28.867.515-5.48-5.1-5.48-5.1l-.99 44.916z"
            ></path>
            <path
              fill="none"
              stroke="#20a120"
              strokeDasharray="0.5, 4"
              strokeLinecap="round"
              strokeWidth="0.5"
              d="M-.187 1.711S10.245 5.245 14.116 7.77c3.87 2.524 11.61 2.02 11.442 5.553-.168 3.533-2.356 4.88-4.712 4.88-2.355 0-6.394.168-7.908 4.375-1.515 4.206-7.404 11.442-10.601 11.442-3.197 0-8.919-2.692-8.919-2.692"
            ></path>
            <path
              fill="none"
              stroke="#20a120"
              strokeDasharray="0.499999, 4"
              strokeLinecap="round"
              strokeWidth="0.5"
              d="M-.02 7.937s5.722 2.356 8.751 2.524c3.029.169 13.462 1.01 10.264 3.366-3.197 2.355-10.096 4.375-10.264 7.067C8.563 23.586-1.365 30.99-1.365 30.99l-5.048-3.702"
            ></path>
            <path
              fill="none"
              stroke="#20a120"
              strokeDasharray="0.499999, 4"
              strokeLinecap="round"
              strokeWidth="0.5"
              d="M-3.384 12.817s11.105-1.01 10.432 2.02C6.375 17.864 2 23.586-1.029 25.268c-3.029 1.683-6.73-1.178-6.73-1.178"
            ></path>
          </g>
          <g strokeDashoffset="0" strokeLinejoin="round" paintOrder="normal">
            <path
              fill="#0d630d"
              stroke="none"
              strokeDasharray="none"
              strokeLinecap="square"
              strokeWidth="0"
              d="M13.97 80.442c3.59 2.378 7.144-2.006 10.152-2.883 3.008-.877 6.141-4.136 10.151-3.008 4.01 1.128 7.52 1.504 7.645-.25.126-1.755 1.379-1.755 3.384-2.13 2.005-.377.376-2.382 5.013-3.51 2.318-.564 6.808-.884 6.808-.884s.543 1.843-.021 2.909c-1.128 2.13.482 8.377-4.28 9.004-4.763.626-7.144 2.757-8.773 6.266-1.63 3.509-5.89 2.757-8.397 3.133-2.507.376-1.253 1.253-3.258 3.384-2.006 2.13-1.504.501-.752 2.506s1.629 6.642 1.629 6.642l-37.598.878.376-21.305s2.006-2.758 5.139-1.755c3.133 1.003 8.593-1.775 12.783 1.003z"
            ></path>
            <path
              fill="green"
              stroke="#0c550a"
              strokeDasharray="none"
              strokeLinecap="square"
              strokeWidth="0.3"
              d="M13.97 78.854c3.59 2.379 7.144-2.005 10.152-2.882 3.008-.878 6.141-4.136 10.151-3.008 4.01 1.128 7.52 1.504 7.645-.25.126-1.755 1.379-1.755 3.384-2.131 2.005-.376.376-2.381 5.013-3.51 4.637-1.127 7.77-.25 6.642 1.88-1.128 2.131.627 8.523-4.136 9.15-4.762.626-7.143 2.756-8.772 6.265-1.63 3.51-5.89 2.758-8.397 3.134-2.507.375-1.253 1.253-3.258 3.383-2.006 2.13-1.504.502-.752 2.507s1.629 6.642 1.629 6.642l-37.598.877.376-21.305s2.006-2.757 5.139-1.754c3.133 1.002 8.593-1.775 12.783 1.002z"
              display="inline"
            ></path>
            <path
              fill="none"
              stroke="#20a120"
              strokeDasharray="0.499999, 4"
              strokeLinecap="round"
              strokeWidth="0.5"
              d="M-5.909 85.51s11.275-6.058 15.313-5.217c4.039.841 6.058 4.375 9.591 2.524 3.534-1.85 10.938-8.918 15.313-7.404 4.375 1.515 11.779-.336 14.471-2.355 2.692-2.02 7.404-.169 3.029 2.355s-12.284 4.375-12.452 7.068c-.168 2.692-4.88 3.197-6.899 4.206-2.02 1.01-4.543 4.207-4.543 6.226 0 2.02 2.019 8.75 2.019 8.75"
            ></path>
            <path
              fill="none"
              stroke="#20a120"
              strokeDasharray="0.499999, 4"
              strokeLinecap="round"
              strokeWidth="0.5"
              d="M-2.88 89.716s6.058-5.216 9.928-5.048c3.87.168 4.217 4.499 13.125.673 4.72-2.027 16.659-7.404 11.443-1.682-5.217 5.72-4.88 5.048-6.9 8.918-2.019 3.87-10.6 9.255-10.6 9.255"
            ></path>
            <path
              fill="none"
              stroke="#20a120"
              strokeDasharray="0.499999, 4"
              strokeLinecap="round"
              strokeWidth="0.5"
              d="M-6.582 97.457s7.573-6.395 13.125-6.395c5.553 0 12.452-3.533 11.275 1.01-1.178 4.543-4.375 9.423-8.077 9.591-3.702.169-9.76-1.01-9.76-1.01"
            ></path>
          </g>
          <g
            stroke="none"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
            paintOrder="normal"
          >
            <path
              fill="#6a6a6a"
              d="M54.69.874l1.684 3.784 4.774 1.905 3.08 3.506 1.763.882 2.573 4.78 3.1 1.572 2.71 5.492 6.202.647 3.251-2.05 3.502 2.263 4.082-.339 4.758 3.026 4.274-.211-.777-27.2z"
              transform="translate(-.692 -.476)"
            ></path>
            <path
              fill="gray"
              d="M54.69.874l2.331 3.692 5.051 1.165 2.526 3.692 2.04-.875 3.497 7.092h2.914l2.526 6.508H81.5l2.235-2.234 3.594 2.817 6.022-1.263 2.818 3.303 4.274 1.36-.777-27.2z"
              transform="translate(-.692 -.476)"
            ></path>
            <path fill="gray" d="M64.1 8.266l1.069-3.594.874 3.011z"></path>
            <path
              fill="#999"
              d="M73.037 14.386l4.08-3.788 2.234 6.897-.777-6.023 2.331.874 1.652 3.109-.486-3.4 3.4 1.845-3.983-3.594-4.662-1.165z"
            ></path>
            <path fill="#999" d="M75.466 20.7l2.04-3.788-.875-.68z"></path>
            <path
              fill="#999"
              d="M67.403 7.683l3.788-1.068-.874 6.411 1.943-6.508-2.429-3.886-4.565-.583-1.554 3.983 3.011-2.914 3.886 2.623z"
            ></path>
            <path
              fill="#999"
              d="M87.51 18.272l.875-4.663 2.429-.097 2.04 5.245-.875-5.828 4.274 3.691-3.497-5.148-.97-2.04-.584 2.623-3.885.388-.389 8.646z"
            ></path>
            <path
              fill="#999"
              d="M82.848 4.575l-2.623 3.011 4.177-.971 1.069 3.594-.097-5.245 7.382 1.748-7.09-4.177L85.86.01z"
            ></path>
          </g>
          <g
            stroke="none"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
            paintOrder="normal"
          >
            <path
              fill="#6a6a6a"
              d="M34.951 54.785l-.768 5.341 4.268.114 8.715.612 7.492-4.768 2.908-1.229 4.233-3.187 3.336-.227 1.309-7.463-3.315-7.213-6.288.726-6.894-.242-2.298 5.563-2.902 5.2-7.377 4.959.363 1.935z"
              transform="translate(-.692 -.476)"
            ></path>
            <path
              fill="gray"
              d="M34.951 54.785l-.121 4.233 3.991.483 8.345.242 9.433-6.893.967 1.451 4.233-4.112 2.782.605.846-7.74-2.298-6.289-6.288.726-6.894-.242-2.298 5.563-2.902 5.2-7.377 4.959.363 1.935z"
              transform="translate(-.692 -.476)"
            ></path>
            <path
              fill="#999"
              d="M55.907 50.56l-.726-5.443L57.6 41.61l6.289.847-5.805.483 2.54 5.2-3.266-3.023z"
            ></path>
            <path
              fill="#999"
              d="M45.99 57.453L44.9 52.01l-5.08 5.2 5.201-7.377 6.652-3.507-4.233 3.628 6.41.483-7.136.726z"
            ></path>
            <path
              fill="#999"
              d="M48.65 43.061l1.452-4.958 4.716.12 4.475.243-5.684 1.209-.847 4.958-1.21-3.507-1.45 4.233v-2.902z"
            ></path>
          </g>
          <path
            fill="none"
            stroke="#277cb3"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeWidth="0.5"
            d="M55.856 11.933s2.706 7.885 7.348 9.67c4.642 1.786 15.687 7.99 20.711 13.927 3.928 4.642 11.3 5.494 7.499 17.497-4.089 12.914.36 17.24.36 17.24"
            paintOrder="stroke fill markers"
          ></path>
          <path
            fill="none"
            stroke="#277cb3"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeWidth="0.5"
            d="M46.243-.536s9.64 9.463 10.177 14.462c.535 5-11.427 12.32-14.998 19.283-3.57 6.963 6.603 13.91-12.141 19.461C14.464 57.06 13.125 77.68 1.386 75.021"
            paintOrder="stroke fill markers"
          ></path>
          <path
            fill="url(#linearGradient6776)"
            stroke="#277cb3"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeWidth="1"
            d="M42.3 90.192c-6.75-.573-5.474 7.334-5.474 7.334L38.304 100H100V75.35s-3.335-7.785-12.025-3.566c-4.721 2.292-9.948 7.408-14.596 3.937-4.4-3.286-5.657 2.69-10.68 1.198-2.818-.837-3.394 3.074-3.995 4.74-.6 1.668-1.22 2.784-4.109 1.435-8.598-4.015-7.741 7.484-12.294 7.098z"
            paintOrder="stroke fill markers"
          ></path>
          <path
            fill="#277cb3"
            stroke="#92a3ac"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeWidth="0"
            d="M89.684 63.335c-.32.796-.833 6.268-2.37 8.257 1.813-.303 3.565-1.628 7.345-1.317-3.37-1.407-4.672-6.293-4.975-6.94z"
            paintOrder="stroke fill markers"
          ></path>
        </g>
        <g>
          <text
            xmlSpace="preserve"
            style={{
              lineHeight: '1.4',
              textAlign: 'center',
            }}
            x="30.83"
            y="71.724"
            fill="#ffe6d5"
            strokeWidth="0"
            fontFamily="Lato"
            fontSize="6.879"
            fontWeight="bold"
            paintOrder="stroke fill markers"
            textAnchor="middle"
          >
            <tspan
              style={{}}
              x="30.83"
              y="71.724"
              fill="#520"
              strokeWidth="0"
              fontFamily="Oleo Script Swash Caps"
              fontSize="6.879"
              fontStretch="normal"
              fontStyle="normal"
              fontVariant="normal"
              fontWeight="bold"
            >
              Butre
            </tspan>
          </text>
          <circle
            cx="30.745"
            cy="64.311"
            r="2"
            fillRule="evenodd"
            strokeDasharray="none"
            strokeOpacity="1"
            strokeWidth="0.3"
            stroke="#520"
            {...getDotProps('butre')}
          ></circle>
          {location === 'butre' && (
            <path
              fill="#e92828"
              fillOpacity="1"
              stroke="#520"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeOpacity="1"
              strokeWidth="0.3"
              d="M30.758 60.016c-3.171.041.076 4.296.076 4.296s3.299-4.322 0-4.296h-.076z"
              paintOrder="normal"
            ></path>
          )}
        </g>
        <g>
          <text
            xmlSpace="preserve"
            style={{
              lineHeight: '1.4',
              textAlign: 'center',
            }}
            x="77.31"
            y="47.197"
            fill="#ffe6d5"
            strokeWidth="0"
            fontFamily="Lato"
            fontSize="6.879"
            fontWeight="bold"
            paintOrder="stroke fill markers"
            textAnchor="middle"
          >
            <tspan
              style={{}}
              x="77.31"
              y="47.197"
              fill="#520"
              strokeWidth="0"
              fontFamily="Oleo Script Swash Caps"
              fontSize="6.879"
              fontStretch="normal"
              fontStyle="normal"
              fontVariant="normal"
              fontWeight="bold"
            >
              Tabbith
            </tspan>
          </text>
          <circle
            cx="80.88"
            cy="37.673"
            r="2"
            fillOpacity="1"
            fillRule="evenodd"
            strokeDasharray="none"
            strokeOpacity="1"
            strokeWidth="0.3"
            stroke="#520"
            {...getDotProps('tabbith')}
          ></circle>
          {location === 'tabbith' && (
            <path
              fill="#e92828"
              fillOpacity="1"
              stroke="#520"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="round"
              strokeOpacity="1"
              strokeWidth="0.3"
              d="M80.823 33.147c-3.171.041.076 4.296.076 4.296s3.299-4.322 0-4.296h-.076z"
              paintOrder="normal"
            ></path>
          )}
        </g>
        <g>
          <text
            xmlSpace="preserve"
            style={{
              lineHeight: '1.4',
              textAlign: 'center',
            }}
            x="23.424"
            y="45.213"
            fill="#ffe6d5"
            strokeWidth="0"
            fontFamily="Lato"
            fontSize="6.879"
            fontWeight="bold"
            paintOrder="stroke fill markers"
            textAnchor="middle"
          >
            <tspan
              style={{}}
              x="23.424"
              y="45.213"
              fill="#520"
              strokeWidth="0"
              fontFamily="Oleo Script Swash Caps"
              fontSize="6.879"
              fontStretch="normal"
              fontStyle="normal"
              fontVariant="normal"
              fontWeight="bold"
            >
              Oskah
            </tspan>
          </text>
          <circle
            cx="23.925"
            cy="35.53"
            r="2"
            fillOpacity="1"
            fillRule="evenodd"
            strokeDasharray="none"
            strokeOpacity="1"
            strokeWidth="0.3"
            stroke="#520"
            {...getDotProps('oskah')}
          ></circle>
          {location === 'oskah' && (
            <path
              fill="#e92828"
              fillOpacity="1"
              stroke="#520"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeOpacity="1"
              strokeWidth="0.3"
              d="M23.906 30.913c-3.171.041.076 4.296.076 4.296s3.299-4.322 0-4.296h-.076z"
              paintOrder="normal"
            ></path>
          )}
        </g>
        <path
          fill="none"
          stroke="#520"
          strokeDasharray="0.5, 1"
          strokeDashoffset="0"
          strokeLinecap="square"
          strokeOpacity="1"
          strokeWidth="0.5"
          d="M36.512 63.393c4.817-.34 13.747 3.673 20.354-4.642"
          paintOrder="stroke fill markers"
        ></path>
        <path
          fill="none"
          stroke="#520"
          strokeDasharray="0.5, 1"
          strokeDashoffset="0"
          strokeLinecap="square"
          strokeOpacity="1"
          strokeWidth="0.5"
          d="M61.288 56.318c4.638-4.27 19.145.214 19.681-6.494"
          paintOrder="stroke fill markers"
        ></path>
        <path
          fill="none"
          stroke="#520"
          strokeDasharray="0.5, 1"
          strokeDashoffset="0"
          strokeLinecap="square"
          strokeOpacity="1"
          strokeWidth="0.5"
          d="M28.478 59.465c-3.201-3.769-5.368-7.22-5.639-12.377"
          paintOrder="stroke fill markers"
        ></path>
        <path
          fill="none"
          stroke="#520"
          strokeDasharray="0.5, 1"
          strokeDashoffset="0"
          strokeLinecap="square"
          strokeOpacity="1"
          strokeWidth="0.5"
          d="M55.884 30.174c7.346 2.096 15.88-2.225 21.068 2.856"
          paintOrder="stroke fill markers"
        ></path>
        <path
          fill="none"
          stroke="#520"
          strokeDasharray="0.5, 1"
          strokeDashoffset="0"
          strokeLinecap="square"
          strokeOpacity="1"
          strokeWidth="0.5"
          d="M29.281 31.96c6.83-4.452 14.326-5.013 22.496-3.036"
          paintOrder="stroke fill markers"
        ></path>
      </g>
    </svg>
  );
};

export default Map01;
