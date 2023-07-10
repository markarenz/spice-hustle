import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import { FormattedMessage } from 'react-intl';
import IconUpgrade from 'components/icons/upgrades/IconUgrade';

type Props = {
  selectedItemId: string;
  closeInfoModal: React.MouseEventHandler<HTMLButtonElement>;
};

const ToolInfoModal: React.FC<Props> = ({ selectedItemId, closeInfoModal }) => {
  return (
    <Modal titleKey={`upgrades__${selectedItemId}__title`}>
      <div className="text-gray-800 max-w-[100vw] md:max-w-[40vw]">
        <div className="flex gap-6 pb-6">
          <div className="w-[10rem] h-[10rem] aspect-square bg-gray-300 rounded-xl p-2">
            <IconUpgrade type={selectedItemId} />
          </div>
          <div>
            <div className="pb-4">
              <FormattedMessage id={`upgrades__${selectedItemId}__description`} />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            variant="primary"
            labelKey="ok"
            onClick={closeInfoModal}
            testId="btn-tools-info-close"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ToolInfoModal;
