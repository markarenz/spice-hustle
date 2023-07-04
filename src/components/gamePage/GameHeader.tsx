import { useState, useEffect, useCallback } from 'react';
import CloseButton from 'components/common/CloseButton';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { closeGame, setModalStatus, setCurrentModal } from 'store/gameSlice';
import { GameTabSlugs } from 'types';
import { FormattedMessage } from 'react-intl';
import TabButton from './TabButton';
import InGameDateDisplay from 'components/common/InGameDateDisplay';
import CurrencyDisplay from 'components/common/CurrencyDisplay';
import Modal from 'components/common/Modal';
import IconInfo from 'components/icons/IconInfo';
import { getBgImg } from './headerUtils';

const GameHeader = () => {
  const [bgImgs, setBgImgs] = useState<string[]>([]);
  const [isShowingBg, setIsShowingBg] = useState<boolean>(false);
  const dispatch = useGameSliceDispatch();
  const { gameState, gamePanel, modalStatus, currentModal } = useGameSliceSelector(
    (state) => state.game,
  );
  const { location } = gameState;
  const handleLocationChange = useCallback(() => {
    setIsShowingBg(false);
    setTimeout(() => {
      setBgImgs(getBgImg(location));
      setIsShowingBg(true);
    }, 500);
  }, [location]);
  useEffect(() => {
    handleLocationChange();
  }, [handleLocationChange]);
  const isModalOpen = modalStatus !== 'closed';
  const openModal = () => {
    dispatch(setCurrentModal('location'));
    dispatch(setModalStatus('opening'));
    setTimeout(() => {
      dispatch(setModalStatus('open'));
    }, 510);
  };
  const handleCloseGame = () => {
    dispatch(closeGame());
  };

  const isThisModalOpen = isModalOpen && currentModal === 'location';
  return (
    <header className="w-full" data-testid="game-header">
      <div className="bg-gray-800 background-repeat-none relative bg-cover bg-center bg-repeat-none">
        <img
          src={bgImgs[1]}
          aria-hidden="true"
          alt="city-bg"
          className="absolute top-0 lef-0 h-full w-full"
        />
        <img
          src={bgImgs[0]}
          aria-hidden="true"
          alt="city"
          className="absolute top-0 right-0 h-full"
        />
        <div className="container mx-auto pr-4 pt-[3rem] lg:pt-[6rem] pb-2">
          <h1 className="block leading-none text-[6rem] md:text-[8rem] lg:text-[10rem] text-gray-200 drop-shadow-txtlinrev">
            <FormattedMessage id={`location__${location}__title`} />
            <sup>
              <button
                data-testid="location-info-btn"
                className="bg-orange-500 rounded-full w-8 h-8 transition-transform duration-150 hover:scale-125 border-2 border-gray-800"
                onClick={() => openModal()}
              >
                <IconInfo />
              </button>
            </sup>
          </h1>
        </div>
        <div
          aria-hidden="true"
          className={`absolute top-0 left-0 h-full w-full bg-gray-800 transition-opacity duration-300 ${
            isShowingBg ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <div className="absolute right-[1rem] top-[1rem]" data-testid="close-game">
          <CloseButton handleClose={() => handleCloseGame()} />
        </div>
        <div className="absolute right-[1rem] bottom-[1rem] text-right hidden md:block">
          <div className="text-gray-200 text-base lg:text-[1.5rem] font-bold leading-none pb-2 drop-shadow-txtlinrev">
            <InGameDateDisplay numTurns={gameState?.numTurns} />
          </div>
          <div className="text-gray-200 font-bold text-[2rem] leading-none drop-shadow-txtlinrev">
            <CurrencyDisplay value={gameState?.cash} />
          </div>
        </div>
      </div>
      <div className="w-full p-2 block md:hidden bg-orange-800">
        <div className="container mx-auto flex justify-around">
          <div className="font-bold">
            <CurrencyDisplay value={gameState?.cash} />
          </div>
          <div className="font-bold">
            <InGameDateDisplay numTurns={gameState?.numTurns} />
          </div>
        </div>
      </div>
      <nav className="bg-gradient-to-b from-gray-500 to-gray-900 border-b-orange-500 border-b-4 border-t-4 border-t-gray-700">
        <div className="container mx-auto flex justify-between">
          {Object.keys(GameTabSlugs).map((slug) => (
            <TabButton key={slug} slug={slug} isActive={gamePanel === slug.toLowerCase()} />
          ))}
        </div>
      </nav>
      {isThisModalOpen && (
        <Modal titleKey={`location__${location}__title`}>
          <div className="text-gray-800">
            <FormattedMessage id={`location__${location}__description`} />
          </div>
        </Modal>
      )}
    </header>
  );
};

export default GameHeader;
