const IconClose = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>close</title>
      <g>
        <path
          fill="#fff"
          d="M6.699 13.77H-6.7v50.242H-56.94V77.41h50.242v50.242H6.7V77.41H56.94V64.012H6.699z"
          transform="rotate(-45)"
        />
      </g>
    </svg>
  );
};

IconClose.defaultProps = {
  titleKey: 'icon_close',
};

export default IconClose;
