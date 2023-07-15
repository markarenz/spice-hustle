import { useState } from 'react';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { Slices } from 'store/gameSlice';
import {
  setModalStatus,
  setCurrentModal,
  processBankDepositWithdrawal,
  makeLoanPayment,
} from 'store/gameSlice';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import { getLoanByLocation } from 'utils/utils';

const BankAmountModal = () => {
  const [amt, setAmt] = useState(0);
  const { currentModal, gameState } = useGameSliceSelector((state: Slices) => state.game);
  const dispatch = useGameSliceDispatch();
  const { savings, cash, location, loans } = gameState;
  const isDeposit = currentModal === 'deposit';
  let maxAmt = 0;
  const selectedLoan = getLoanByLocation(loans, location);
  switch (currentModal) {
    case 'loanpayment':
      if (selectedLoan) {
        maxAmt = Math.min(selectedLoan.principal, cash);
      }
      break;
    case 'withdrawal':
      maxAmt = savings;
      break;
    default:
    case 'deposit':
      maxAmt = cash;
      break;
  }
  const handleAmtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setAmt(Math.max(Math.min(val, maxAmt), 0));
  };

  const handleAmtClose = () => {
    dispatch(setModalStatus('closing'));
    setTimeout(() => {
      dispatch(setCurrentModal(''));
      dispatch(setModalStatus('closed'));
    }, 510);
  };
  const handleConfirmAmt = (amt: number) => {
    if (currentModal === 'loanpayment') {
      dispatch(makeLoanPayment(amt));
    } else {
      dispatch(processBankDepositWithdrawal(isDeposit ? amt : -1 * amt));
    }
    handleAmtClose();
  };

  return (
    <Modal titleKey={`bank__amount_modal__title__${currentModal}`}>
      <div className="text-gray-800" data-testid={`bank-amount-modal-${currentModal}`}>
        <div className="pb-4">
          <input
            data-testid="bank-amount-input"
            type="number"
            value={amt}
            onChange={(e) => handleAmtChange(e)}
            min={0}
            max={maxAmt}
            className="p-4 text-xl w-full"
          />
        </div>

        <div className="text-base italic pb-4" data-testid={`explainer-${currentModal}`}>
          <FormattedMessage
            id={`bank__amount_modal__explainer__${currentModal}`}
            values={{ maxAmt }}
          />
        </div>
        <div className="text-center">
          <span className="mr-4">
            <Button
              testId="bank-modal-btn-cancel"
              variant="secondary"
              labelKey="cancel"
              onClick={handleAmtClose}
            />
          </span>
          {maxAmt > 1 && (
            <span className="mr-4">
              <Button
                variant="primary"
                labelKey="max"
                labelValue={maxAmt}
                testId="bank-modal-btn-max"
                onClick={() => handleConfirmAmt(maxAmt)}
              />
            </span>
          )}
          {maxAmt > 0 && amt > 0 && (
            <Button
              variant="primary"
              testId="bank-modal-btn-ok"
              labelKey="ok"
              onClick={() => handleConfirmAmt(amt)}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BankAmountModal;
