import { FormattedNumber } from 'react-intl';

type Props = {
  value: number;
};
const CurrencyDisplay: React.FC<Props> = ({ value }) => {
  return (
    <span>
      <sup className="inline-block relative right-[0.25rem]">&#9022;</sup>
      <FormattedNumber value={value} />
    </span>
  );
};

export default CurrencyDisplay;
