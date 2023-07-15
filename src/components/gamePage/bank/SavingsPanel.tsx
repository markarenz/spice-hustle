import { FormattedMessage } from 'react-intl';
import { Slices } from 'store/gameSlice';
import { Loan } from 'types';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { setModalStatus, setCurrentModal } from 'store/gameSlice';
import CurrencyDisplay from 'components/common/CurrencyDisplay';
import Button from 'components/common/Button';
import BankAmountModal from './BankAmountModal';

const SavingsPanel = () => {
  const { gameState, modalStatus, currentModal } = useGameSliceSelector(
    (state: Slices) => state.game,
  );
  const { cash, loans, savings, netWealth } = gameState;
  const loansTotal = loans.reduce((acc: number, val: Loan) => acc + val.principal, 0);
  const dispatch = useGameSliceDispatch();
  const isModalOpen = ['deposit', 'withdrawal'].includes(currentModal) && modalStatus !== 'closed';
  const handleOpenModal = (modalSlug: string) => {
    dispatch(setCurrentModal(modalSlug));
    dispatch(setModalStatus('opening'));
    setTimeout(() => {
      dispatch(setModalStatus('open'));
    }, 510);
  };

  return (
    <div data-testid="savings-panel">
      <div className="mb-6">
        <FormattedMessage id="bank__savings__explainer" />
      </div>
      <div className="flex gap-6 justify-around pb-6">
        <Button
          variant="primary"
          labelKey="bank__savings__deposit_btn"
          testId="bank-btn-deposit"
          onClick={() => handleOpenModal('deposit')}
        />
        <Button
          variant="primary"
          labelKey="bank__savings__withdrawal_btn"
          testId="bank-btn-withdraw"
          onClick={() => handleOpenModal('withdrawal')}
        />
      </div>
      <div className="pb-12">
        <div className="px-12 py-6 bg-gray-800 rounded-lg border-2 border-gray-500 mb-6">
          <div className="text-center text-xl uppercase pb-2">
            <FormattedMessage id="bank__savings__current_savings" />
          </div>
          <div className="text-center text-5xl">
            <CurrencyDisplay value={savings} />
          </div>
        </div>

        <div className="flex gap-6 justify-around items-center">
          <div className="text-center">
            <div className="text-lg uppercase">
              <FormattedMessage id="bank__savings__calc__cash" />
            </div>
            <div className="text-2xl">
              <CurrencyDisplay value={cash} />
            </div>
          </div>
          <div className="text-center text-2xl">+</div>
          <div className="text-center">
            <div>
              <div className="text-lg uppercase">
                <FormattedMessage id="bank__savings__calc__savings" />
              </div>
              <div className="text-2xl">
                <CurrencyDisplay value={savings} />
              </div>
            </div>
          </div>
          <div className="text-center text-2xl">-</div>
          <div className="text-center">
            <div className="text-lg uppercase">
              <FormattedMessage id="bank__savings__calc__loans" />
            </div>
            <div className="text-2xl">
              <CurrencyDisplay value={loansTotal} />
            </div>
          </div>
          <div className="text-center text-2xl">=</div>
          <div className="text-center">
            <div className="text-lg uppercase">
              <FormattedMessage id="bank__savings__calc__net_wealth" />
            </div>
            <div className="text-2xl font-bold">
              <CurrencyDisplay value={netWealth} />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <BankAmountModal />}
    </div>
  );
};

export default SavingsPanel;
