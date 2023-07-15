import { FormattedMessage } from 'react-intl';

type Props = {
  location: string;
};
const LoanExpirationWarning: React.FC<Props> = ({ location }) => {
  return (
    <div
      className="text-gray-200 text-xl px-4 py-6 border-t-2 border-orange-500 bg-gradient-to-b from-red-800 to-[#350707]"
      data-testid="loan-expiration-warning-message"
    >
      <div className="container mx-auto">
        <h2 className="text-2xl uppercase font-bold">
          <FormattedMessage id="loans__loan_expired_warning_title" />
        </h2>
        <div>
          <FormattedMessage
            id="loans__loan_expired_warning_description"
            values={{ location: location.toUpperCase() }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanExpirationWarning;
