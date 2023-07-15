import React from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  labelKey: string;
  variant: string; // primary, secondary
  reverse?: boolean; // color scheme reverse
  testId?: string;
  labelValue?: number;
  disabled?: boolean;
};
const Button: React.FC<Props> = ({
  onClick,
  labelKey,
  testId,
  variant,
  reverse,
  labelValue,
  disabled,
}) => {
  return (
    <button
      data-testid={testId || labelKey}
      onClick={onClick}
      className={`
      relative py-2 px-4 rounded-lg border-2 group block md:inline w-full md:w-auto md:inline-block
      ${
        variant === 'primary' &&
        !disabled &&
        'border-gray-800 hover:scale-100 md:hover:scale-110 transition-all text-gray-100 bg-gradient-to-b from-yellow-500 to-red-900 ring-0 ring-gray-100 hover:ring-2'
      }
      ${
        variant === 'secondary' &&
        `${
          reverse ? 'border-gray-200 text-gray-200' : 'border-gray-800 text-gray-800'
        } ring-0 bg-transparent transition-colors hover:text-gray-100`
      }
      ${disabled ? 'pointer-events-none bg-gray-400' : ''}
      `}
    >
      {variant === 'secondary' && (
        <div
          aria-hidden="true"
          className="absolute transition-all opacity-0 duration-150 h-full top-0 bg-orange-700 rounded-none left-[50%] w-0 group-hover:left-0 group-hover:w-full group-hover:rounded-md group-hover:opacity-75 group-active:opacity-100"
        />
      )}
      <span
        data-testid="btn-label"
        className="text-[1rem] uppercase font-bold drop-shadow-[0px_1px_1px_rgba(255,255,255,0.6)] whitespace-nowrap"
      >
        {!!labelValue ? (
          <FormattedMessage id={labelKey} values={{ labelValue }} />
        ) : (
          <FormattedMessage id={labelKey} />
        )}
      </span>
    </button>
  );
};

export default Button;
