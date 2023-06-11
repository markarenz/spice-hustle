import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import CloseButton from 'components/common/CloseButton';

type Props = {
  children: JSX.Element;
  titleKey: string;
  handleClose: Function;
};
const Modal: React.FC<Props> = ({ children, titleKey, handleClose }) => {
  const [modalStatus, setModalStatus] = useState<string>('');

  useEffect(() => {
    setModalStatus('opening');
    const timer = setTimeout(() => {
      setModalStatus('open');
    }, 510);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const handleTriggerClose = () => {
    setModalStatus('closing');
    setTimeout(() => {
      setModalStatus('');
      handleClose();
    }, 510);
  };
  const isOpening = ['opening', 'open'].includes(modalStatus);
  const isOpen = modalStatus === 'open';
  return (
    <div
      className="fixed left-0 top-0 w-[100vw] h-[100vh] flex items-center justify-center"
      data-testid="modal"
    >
      <button
        className={`fixed left-0 top-0 w-[100vw] h-[100vh] cursor-default bg-gray-700 transition-opacity duration-300 ${
          isOpening ? 'opacity-75' : 'opacity-0'
        }`}
        aria-hidden="true"
        data-testid="modal-bg-btn"
        onClick={() => handleTriggerClose()}
      />
      <div
        className={`relative max-w-3xl mx-auto bg-gray-200 rounded-md ring-4 ring-orange-700 drop-shadow-[2px_2px_10px_rgba(0,0,0,.9)] min-w-[20rem] max-h-[calc(100vh_-_2rem)] max-w-[calc(100vw_-_2rem)] overflow-y-scroll transition-all duration-500 overflow-x-hidden ${
          isOpening ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="bg-orange-700 text-gray-200 rounded-tl-md rounded-tr-md p-4 flex justify-between items-center">
          <h2 className="mr-4 text-xl uppercase font-bold">
            <FormattedMessage id={titleKey} />
          </h2>
          {
            <div
              className={`transform-all duration-300 ${
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              <CloseButton handleClose={handleTriggerClose} />
            </div>
          }
        </div>
        <div className="p-6 shadow-[inset_0_0_15px_5px_rgba(0,0,0,0.3)]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
