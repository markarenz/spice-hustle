import { Slices } from 'store/gameSlice';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { FormattedMessage, useIntl } from 'react-intl';
import CurrencyDisplay from 'components/common/CurrencyDisplay';
import { TableFieldLabel } from 'types';
import { acceptLoanOffer, setCurrentModal, setModalStatus } from 'store/gameSlice';
import loansData from 'data/loansData';
import Table from 'components/common/Table';
import { getHasLocalLoan, getHasOverdueLoanForLocation } from 'utils/utils';
import Button from 'components/common/Button';
import IconWarning from 'components/icons/IconWarning';
import BankAmountModal from './BankAmountModal';

const LoansPanel = () => {
  const { gameState, currentModal, modalStatus } = useGameSliceSelector(
    (state: Slices) => state.game,
  );
  const { loans, location, numTurns } = gameState;
  const { formatMessage } = useIntl();
  const dispatch = useGameSliceDispatch();
  const hasLocalLoan = getHasLocalLoan(loans, location);
  const currentLoans = loans.map((loan) => ({
    id: formatMessage({ id: `location__${loan.location}__title` }),
    principal: loan.principal,
    due: Math.max(loan.dueDate - numTurns, 0),
  }));
  const shouldShowLoansList = currentLoans.length > 0;
  const fieldLabels: TableFieldLabel[] = [
    { slug: 'id', titleKey: 'bank__loans__loans_list__table__location' },
    { slug: 'principal', titleKey: 'bank__loans__loans_list__table__principal' },
    { slug: 'due', titleKey: 'bank__loans__loans_list__table__due' },
  ];
  const handleAcceptLoanOfferClick = () => {
    dispatch(acceptLoanOffer(location));
  };

  const handlePayLoanModalOpen = () => {
    dispatch(setCurrentModal('loanpayment'));
    dispatch(setModalStatus('opening'));
    setTimeout(() => {
      dispatch(setModalStatus('open'));
    }, 510);
  };

  const loansTableActions = (id: string) => (
    <div className="flex items-center">
      {id.toLowerCase() === location && (
        <span className="mr-4">
          <Button
            onClick={handlePayLoanModalOpen}
            labelKey="bank__loans__loans_list__btn_pay"
            variant="secondary"
            testId={`btn-pay-loan`}
          />
        </span>
      )}
      {getHasOverdueLoanForLocation(gameState, id.toLowerCase()) && (
        <span className="w-11 h-11 inline-block" aria-label="This loan has expired">
          <IconWarning />
        </span>
      )}
    </div>
  );
  const isModalOpen = currentModal === 'loanpayment' && modalStatus !== 'closed';
  const localLoan = loansData[location];
  return (
    <div data-testid="loans-panel">
      <div className="mb-6">
        <FormattedMessage id="bank__loans__explainer" />
      </div>

      <div className="pb-6">
        {!hasLocalLoan && (
          <div className="text-center text-xl px-12 py-4 bg-gray-800 rounded-lg border-2 border-gray-500 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-3xl uppercase mb-2">
                  <FormattedMessage id="bank__loans__offer__headline" values={{ location }} />
                </h2>
                {!localLoan.guildOnly && (
                  <h3 className="italic text-lg">
                    (
                    <FormattedMessage id="bank__loans__offer__guild_only" />)
                  </h3>
                )}
                <div>
                  <FormattedMessage id="bank__loans__offer__text1" />
                  <span className="mx-2 font-bold">
                    <CurrencyDisplay value={localLoan.amount} />
                  </span>
                  <FormattedMessage id="bank__loans__offer__text2" />
                  <span className="mx-2 font-bold">
                    <CurrencyDisplay value={localLoan.markup} />.
                  </span>
                  <span>
                    <FormattedMessage id="bank__loans__offer__text3" />{' '}
                    <span className="font-bold">
                      <FormattedMessage
                        id="bank__loans__offer__text4"
                        values={{ term: localLoan.term }}
                      />
                    </span>{' '}
                    <FormattedMessage id="bank__loans__offer__text5" />
                  </span>
                </div>
              </div>
              <div>
                <div className="flex gap-6 mb-6 items-end">
                  <div>
                    <div className="uppercase">Loan Amount</div>
                    <span className="mx-2 font-bold text-3xl">
                      <CurrencyDisplay value={localLoan.amount} />
                    </span>
                  </div>
                  <div>
                    <div className="uppercase">Markup</div>
                    <span className="mx-2 font-bold text-3xl">
                      <CurrencyDisplay value={localLoan.markup} />
                    </span>
                  </div>
                  <div>
                    <div className="uppercase">Loan Term (Days)</div>
                    <span className="mx-2 font-bold text-3xl">{localLoan.term}</span>
                  </div>
                </div>
                <div>
                  <Button
                    labelKey="bank__loans__offer__btn_ok"
                    variant="primary"
                    onClick={handleAcceptLoanOfferClick}
                    testId="accept-loan-btn"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            <FormattedMessage id="bank__loans__loans_list__title" />
          </h2>
          {shouldShowLoansList ? (
            <div className="text-gray-800 bg-gray-100 mb-12">
              <Table
                data={currentLoans}
                fieldLabels={fieldLabels}
                actions={loansTableActions}
                sortField="id"
                sortDir="asc"
              />
            </div>
          ) : (
            <div>
              <FormattedMessage id="bank__loans__loans_list__no_loans" />
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <BankAmountModal />}
    </div>
  );
};

export default LoansPanel;
