import { AppStatuses } from './types';
import { IntlProvider } from 'react-intl';
import TitlePage from 'components/titlePage/TitlePage';
import msg from 'locales/en-US/copy.json'; // Only en-US support for now
import { useGameSliceSelector } from 'store/reduxHooks';

const App = () => {
  const { appStatus, isModalOpen } = useGameSliceSelector((state) => state.game);
  return (
    <IntlProvider messages={msg} locale="en-US" defaultLocale="en-US">
      <div id="app" data-testid="app" className={isModalOpen ? 'modalOpen' : ''}>
        {appStatus === AppStatuses.StartPage && <TitlePage />}
        {appStatus === AppStatuses.Game && <div data-testid="game">GAME</div>}
        {/* <header className="bg-red-500">
          <p>
            **
            <FormattedMessage id="location__oskah__description" />
            ** Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    </IntlProvider>
  );
};

export default App;
