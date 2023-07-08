import { AppStatuses } from './types';
import { IntlProvider } from 'react-intl';
import TitlePage from 'components/titlePage/TitlePage';
import GamePage from 'components/gamePage/GamePage';
import AboutPage from 'aboutPage/AboutPage';
import msg from 'locales/en-US/copy.json'; // Only en-US support for now
import { useGameSliceSelector } from 'store/reduxHooks';

const App = () => {
  const { appStatus, modalStatus } = useGameSliceSelector((state) => state.game);
  const isModalOpen = modalStatus !== 'closed';
  return (
    <IntlProvider messages={msg} locale="en-US" defaultLocale="en-US">
      <div id="app" data-testid="app" className={isModalOpen ? 'modalOpen' : ''}>
        {appStatus === AppStatuses.StartPage && <TitlePage />}
        {appStatus === AppStatuses.Game && <GamePage />}
        {appStatus === AppStatuses.AboutPage && <AboutPage />}
      </div>
    </IntlProvider>
  );
};

export default App;
