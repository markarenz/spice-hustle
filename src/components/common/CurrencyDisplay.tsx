import { FormattedNumber } from 'react-intl';

type Props = {
  value: number;
};
const CurrencyDisplay: React.FC<Props> = ({ value }) => {
  const dispValue = value < 0 ? -1 * value : value;
  return (
    <span className="whitespace-nowrap" data-testid="currency-display">
      {value < 0 && <span>-</span>}
      <sup className="inline-block relative right-[0.25rem]">&#9022;</sup>
      <FormattedNumber value={dispValue} />
    </span>
  );
};

export default CurrencyDisplay;
