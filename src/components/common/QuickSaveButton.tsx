import React from 'react';

type Props = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

const QuickSaveButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      title="Quick Save"
      className="block w-8 h-8 rounded-full bg-orange-900 ring-0 ring-gray-200 hover:ring-2 transition-all duration-300 group hover:bg-orange-500 transition-all duration-500"
      data-testid="bn-quick-save"
    >
      <div className="p-2">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
          <g
            fill="#fff"
            className="group-hover:fill-gray-800 transition-all"
            strokeLinecap="round"
            strokeLinejoin="round"
            paintOrder="stroke markers fill"
          >
            <path d="M10 67a3 3 0 00-3 3v10c0 6 3.443 9.826 6.658 11.434C16.874 93.04 20 93 20 93h60s3.126.041 6.342-1.566C89.557 89.826 93 86 93 80V70a3 3 0 00-3-3 3 3 0 00-3 3v10c0 4-1.557 5.174-3.342 6.066C81.874 86.96 80 87 80 87H20s-1.874-.041-3.658-.934C14.557 85.174 13 84 13 80V70a3 3 0 00-3-3z"></path>
            <path
              fillOpacity="1"
              stroke="none"
              strokeDasharray="none"
              strokeOpacity="1"
              strokeWidth="0"
              d="M50 70L25 50h15V10h20v40h15z"
            ></path>
          </g>
        </svg>
      </div>
    </button>
  );
};

export default QuickSaveButton;
