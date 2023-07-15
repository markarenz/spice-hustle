import { Slices } from 'store/gameSlice';
import { useGameSliceSelector } from 'store/reduxHooks';
import PanelActionTabButton from 'components/common/PanelActionTabButton';
import SavingsPanel from './SavingsPanel';
import LoansPanel from './LoansPanel';

const BankPanel = () => {
  const { subPanelStatus } = useGameSliceSelector((state: Slices) => state.game);

  return (
    <div data-testid="bank-panel">
      <div className="bg-orange-500">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {['savings', 'loans'].map((slug) => (
              <PanelActionTabButton slug={slug} key={slug} />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="p-4">
          {subPanelStatus === 'savings' && <SavingsPanel />}
          {subPanelStatus === 'loans' && <LoansPanel />}
        </div>
      </div>
    </div>
  );
};

export default BankPanel;
