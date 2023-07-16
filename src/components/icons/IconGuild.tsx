type Props = {
  isActive: boolean;
};
const IconGuild: React.FC<Props> = ({ isActive }) => {
  const colors = {
    bg: isActive ? '#fa7316' : '#888',
    fg: isActive ? '#eee' : '#ddd',
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      data-testid="icon-guild"
    >
      <g>
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="#1a1a1a"
          fillRule="evenodd"
          strokeWidth="0.265"
          display="inline"
        ></circle>
        <circle
          cx="50"
          cy="50"
          r="45"
          data-testid="icon-guild-bg"
          fill={colors.bg}
          fillOpacity="1"
          fillRule="evenodd"
          strokeWidth="0.265"
          display="inline"
        ></circle>
        <path
          fill={colors.fg}
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0"
          d="M50 23.6L43.4 17H30.2v6.6h6.6l6.6 6.6v6.6H30.2v-6.6h-6.6L17 36.8V50h6.6l6.6-6.6h13.2v13.2h-6.6V50h-6.6l-6.6 6.6v13.2h6.6l6.6-6.6h6.6v13.2H30V83h20m0-59.4l6.6-6.6h13.2v6.6h-6.6l-6.6 6.6v6.6h13.2v-6.6h6.6l6.6 6.6V50h-6.6l-6.6-6.6H56.6v13.2h6.6V50h6.6l6.6 6.6v13.2h-6.6l-6.6-6.6h-6.6v13.2H70V83H50"
        ></path>
      </g>
    </svg>
  );
};

export default IconGuild;
