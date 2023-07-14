import { Slices } from 'store/gameSlice';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';

const LoansPanel = () => {
  const { gameState } = useGameSliceSelector((state: Slices) => state.game);
  // const { savings, netWealth } = gameState;
  const dispatch = useGameSliceDispatch();
  return (
    <div data-testid="loans-panel">
      <div className="pb-6">
        List current loans
        <div>Location, Loan Principal Due in X days</div>
      </div>
      <div className="p-6 bg-gray-800 rounded-lg pb-6">
        <h2>CTA for local loan (Location)</h2>
      </div>
    </div>
  );
};

export default LoansPanel;
