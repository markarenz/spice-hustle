import { FormattedMessage } from 'react-intl';
import Button from 'components/common/Button';
import Footer from 'components/common/Footer';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { startNewGame, toggleModal } from 'store/gameSlice';
import SavedGameModal from './SavedGameModal';
import BgLayer0 from 'img/titlePage/spice-hustle-title-page-bg.svg';
import Cloud1 from 'img/titlePage/cloud-1.svg';
import Cloud2 from 'img/titlePage/cloud-2.svg';
import Cloud3 from 'img/titlePage/cloud-3.svg';
import Cloud4 from 'img/titlePage/cloud-4.svg';
import styles from 'styles/modules/titlePage.module.scss';

const TitlePage = () => {
  const { isModalOpen } = useGameSliceSelector((state) => state.game);
  const dispatch = useGameSliceDispatch();
  const handleStartNewGame = () => {
    dispatch(startNewGame());
  };
  const handleToggleModal = () => {
    dispatch(toggleModal());
  };
  return (
    <div className="w-full min-h-[100vh] relative" data-testid="title-page">
      <div
        data-testid="title-page-bg"
        className="absolute w-full min-w-[100vw] h-full min-h-[100vh] left-0 top-0 overflow-hidden pointer-events-none"
      >
        <div
          className="w-full min-w-[100vw] h-full min-h-[100vh] absolute left-0 top-0 bg-no-repeat bg-cover bg-center pointer-events-none transition-all duration-50"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${BgLayer0})`,
          }}
        />
        <img
          src={Cloud1}
          alt="cloud"
          aria-hidden="true"
          className={`${styles.cloud} ${styles.cloud1}`}
        />
        <img
          src={Cloud2}
          alt="cloud"
          aria-hidden="true"
          className={`${styles.cloud} ${styles.cloud2}`}
        />
        <img
          src={Cloud3}
          alt="cloud"
          aria-hidden="true"
          className={`${styles.cloud} ${styles.cloud3}`}
        />
      </div>
      <div className="relative min-h-[calc(100vh_-_2rem)]">
        <header className="pt-[6rem]">
          <h1 className="leading-none text-center relative">
            <span className="block text-[8rem] lg:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-red-900 drop-shadow-3xl">
              <FormattedMessage id="title_page__title" />
            </span>
          </h1>
        </header>
        <div
          data-testid="title-page-bg-2"
          className="absolute w-full min-w-[100vw] h-full min-h-[100vh] left-0 top-0 overflow-hidden pointer-events-none"
        >
          <img
            src={Cloud4}
            alt="cloud"
            aria-hidden="true"
            className={`${styles.cloud} ${styles.cloud4}`}
          />
        </div>

        <main className="container mx-auto px-4 text-center">
          <div className="max-w-3xl py-[6rem] mx-auto text-center text-xl italic text-gray-200 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.9)]">
            <FormattedMessage id="title_page__explainer" />
          </div>
          <div className="pb-[6rem] flex justify-center">
            <div className="p-2">
              <Button
                labelKey="title_page__btn_start_new"
                variant="primary"
                onClick={() => handleStartNewGame()}
                testId="btn-start-new"
              />
            </div>
            <div className="p-2">
              <Button
                labelKey="title_page__btn_load_save"
                variant="primary"
                onClick={() => handleToggleModal()}
                testId="btn-load-save"
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />
      {isModalOpen && <SavedGameModal handleToggleModal={handleToggleModal} />}
    </div>
  );
};

export default TitlePage;
