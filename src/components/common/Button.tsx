import React from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  onClick: Function;
  labelKey: string;
  variant: string; // primary, secondary
  testId?: string;
};
const Button: React.FC<Props> = ({ onClick, labelKey, testId, variant }) => {
  return (
    <button
      data-testid={testId || labelKey}
      onClick={() => onClick()}
      className={`
      relative py-2 px-4 rounded-lg border-2 group block lg:inline w-full lg:w-auto
      ${
        variant === 'primary' &&
        'border-gray-800 hover:scale-110 transition-all bg-gradient-to-b from-yellow-500 to-red-900 ring-0 ring-gray-100 hover:ring-2'
      }
      ${variant === 'secondary' && 'border-gray-800 ring-0 bg-transparent hover:text-gray-100'}
      `}
    >
      {variant === 'secondary' && (
        <div
          aria-hidden="true"
          className="absolute transition-all opacity-0 duration-150 h-full top-0 bg-orange-700 rounded-none left-[50%] w-0 group-hover:left-0 group-hover:w-full group-hover:rounded-md group-hover:opacity-75 group-active:opacity-100"
        />
      )}
      <span className="text-[1rem] uppercase font-bold drop-shadow-[0px_1px_1px_rgba(255,255,255,0.6)]">
        <FormattedMessage id={labelKey} />
      </span>
    </button>
  );
};

export default Button;
