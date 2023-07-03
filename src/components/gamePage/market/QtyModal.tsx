import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useGameSliceSelector } from 'store/reduxHooks';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import itemsData from 'data/itemsData';
import { getMaxQty } from 'utils/utils';

type Props = {
  action: string;
  selectedItem: any;
  handleConfirm: Function;
  handleQtyClose: Function;
};
const QtyModal: React.FC<Props> = ({ action, selectedItem, handleConfirm, handleQtyClose }) => {
  const { gameState } = useGameSliceSelector((state) => state.game);
  const [qty, setQty] = useState<number>(0);
  const [maxQty, setMaxQty] = useState<number | null>(null);
  useEffect(() => {
    if (maxQty === null && !!selectedItem.id) {
      setMaxQty(
        action === 'buy' ? getMaxQty(gameState, selectedItem, itemsData) : selectedItem.qty,
      );
    }
  }, [selectedItem]);

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>, max: number) => {
    let val = parseInt(e.target.value);
    if (val < 1) {
      val = 1;
    }
    if (val > max) {
      val = max;
    }
    setQty(val);
  };
  if (maxQty === null) {
    return null;
  }
  return (
    <Modal titleKey="market__buy__qty_modal__title">
      <div className="text-gray-800">
        <div className="pb-4">
          <input
            data-testid="qty-input"
            type="number"
            value={qty}
            onChange={(e) => handleQtyChange(e, maxQty)}
            min={1}
            max={selectedItem.qty}
            className="p-4 text-xl w-full"
          />
        </div>
        <div className="text-base italic pb-4" data-testid={`explainer-${action}`}>
          {action === 'buy' ? (
            <FormattedMessage id="market__buy__qty_modal__explainer" values={{ maxQty }} />
          ) : (
            <FormattedMessage id="market__sell__qty_modal__explainer" values={{ maxQty }} />
          )}
        </div>
        <div className="text-center">
          <span className="mr-4">
            <Button variant="secondary" labelKey="cancel" onClick={handleQtyClose} />
          </span>
          {maxQty > 1 && (
            <span className="mr-4">
              <Button
                variant="primary"
                labelKey="max"
                labelValue={maxQty}
                testId="qty-btn-max"
                onClick={() => handleConfirm(maxQty)}
              />
            </span>
          )}
          {maxQty > 0 && qty > 0 && (
            <Button
              variant="primary"
              testId="qty-modal-btn-ok"
              labelKey="ok"
              onClick={() => handleConfirm(qty)}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default QtyModal;
