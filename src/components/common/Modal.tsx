import { useState, useEffect } from 'react';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { FormattedMessage } from 'react-intl';
import CloseButton from 'components/common/CloseButton';
import { setModalStatus } from 'store/gameSlice';

type Props = {
  children: JSX.Element;
  titleKey: string;
};
const Modal: React.FC<Props> = ({ children, titleKey }) => {
  const [isInitted, setIsInitted] = useState(false);
  const dispatch = useGameSliceDispatch();
  const { modalStatus } = useGameSliceSelector((state) => state.game);
  const handleTriggerClose = () => {
    dispatch(setModalStatus('closing'));
    setTimeout(() => {
      dispatch(setModalStatus('closed'));
    }, 510);
  };
  const isOpening = ['opening', 'open'].includes(modalStatus) && isInitted;
  const isOpen = modalStatus === 'open';
  useEffect(() => {
    setIsInitted(true);
  }, []);
  return (
    <div
      className="fixed left-0 top-0 w-[100vw] h-[100vh] flex items-center justify-center z-10"
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
        data-testid="modal-card"
        className={`relative max-w-full md:max-w-[90vw]  xl:max-w-[70vw] mx-auto bg-gray-200 rounded-md ring-4 ring-orange-700 drop-shadow-[2px_2px_10px_rgba(0,0,0,.9)] min-w-[20rem] max-h-[calc(100vh_-_2rem)] max-w-[calc(100vw_-_2rem)] overflow-y-scroll transition-all duration-500 overflow-x-hidden ${
          isOpening ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="bg-orange-700 text-gray-200 rounded-tl-md rounded-tr-md p-4 flex justify-between items-center">
          <h2 className="mr-4 text-xl uppercase font-bold">
            <FormattedMessage id={titleKey} />
          </h2>
          {
            <div
              data-testid="modal-close"
              className={`transform-all duration-300 ${
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              } ${modalStatus}`}
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
