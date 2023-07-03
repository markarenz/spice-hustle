import { FormattedMessage } from 'react-intl';
import Modal from 'components/common/Modal';
import itemsData from 'data/itemsData';

type Props = {
  itemId: string;
};
const ItemInfoModal: React.FC<Props> = ({ itemId }) => {
  return (
    <Modal titleKey={`items__${itemId}__title`}>
      <div className="text-gray-800">
        <div className="pb-4">
          <div className="pb-4">
            <FormattedMessage id={`items__${itemId}__description`} />
          </div>
          <div>
            <FormattedMessage
              id="market__buy__info_modal__capacity"
              values={{ weight: itemsData[itemId].weight, volume: itemsData[itemId].volume }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ItemInfoModal;
