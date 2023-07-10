import { FormattedMessage } from 'react-intl';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import IconItem from 'components/icons/items/IconItem';
import itemsData from 'data/itemsData';

type Props = {
  itemId: string;
  closeInfoModal: React.MouseEventHandler<HTMLButtonElement>;
};
const ItemInfoModal: React.FC<Props> = ({ itemId, closeInfoModal }) => {
  return (
    <Modal titleKey={`items__${itemId}__title`}>
      <div className="text-gray-800 max-w-[100vw] md:max-w-[40vw]">
        <div className="flex gap-6 pb-4">
          <div className="w-[10rem] h-[10rem] aspect-square bg-gray-300 rounded-xl p-2">
            <IconItem type={itemId} />
          </div>
          <div>
            <div className="pb-4">
              <FormattedMessage id={`items__${itemId}__description`} />
            </div>
            <div className="italic">
              <FormattedMessage
                id="market__buy__info_modal__capacity"
                values={{ weight: itemsData[itemId].weight, volume: itemsData[itemId].volume }}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button variant="primary" labelKey="ok" onClick={closeInfoModal} />
        </div>
      </div>
    </Modal>
  );
};

export default ItemInfoModal;
