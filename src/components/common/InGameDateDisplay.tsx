import { getInGameDate } from 'utils/utils';
import { FormattedMessage } from 'react-intl';
import { InGameDate } from 'types';

type Props = {
  numTurns: number;
};
const InGameDateDisplay: React.FC<Props> = ({ numTurns }) => {
  const date: InGameDate = getInGameDate(numTurns);
  const nth = date.day % 10;
  let ordinal = 'th';
  if (nth === 1) {
    ordinal = 'st';
  }
  if (nth === 2) {
    ordinal = 'nd';
  }
  return (
    <span>
      {date.day || 1}
      <FormattedMessage id={`game_date_display__ordinal__${ordinal}`} />{' '}
      <FormattedMessage id="game_date_display__of" />{' '}
      <FormattedMessage id={`game_date_display__season__${date.season}`} />,{' '}
      <FormattedMessage id="game_date_display__year" /> {date?.years + 1 || 1}
    </span>
  );
};
export default InGameDateDisplay;
