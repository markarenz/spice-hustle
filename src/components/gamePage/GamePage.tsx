import Footer from 'components/common/Footer';
import GameHeader from './GameHeader';
import GamePanelDisplay from './GamePanelDisplay';

const GamePage = () => {
  return (
    <div data-testid="game" className="bg-gray-900 text-gray-200 w-full min-h-[100vh] relative">
      <GameHeader />
      <main className="min-h-[calc(100vh_-_16rem)] lg:min-h-[calc(100vh_-_24rem)]">
        <GamePanelDisplay />
      </main>
      <Footer />
    </div>
  );
};

export default GamePage;
