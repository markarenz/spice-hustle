import { IntlProvider } from 'react-intl';
import { TableFieldLabel } from 'types';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import mockGameSavesList from '__tests__/__fixtures__/mockGameSavesList';
import Table from 'components/common/Table';

jest.useFakeTimers();

const savedGameFieldLabels: TableFieldLabel[] = [
  { slug: 'modifiedAt', titleKey: 'title_page__saved_game_modal__table_field__dateModified' },
  { slug: 'location', titleKey: 'title_page__saved_game_modal__table_field__location' },
  { slug: 'netWealth', titleKey: 'title_page__saved_game_modal__table_field__netWealth' },
];

const saveListTableActions = (id: string) => (
  <div>
    <button onClick={() => jest.fn()}>Test {id}</button>
  </div>
);

const mockProps = {
  data: mockGameSavesList,
  fieldLabels: savedGameFieldLabels,
  actions: saveListTableActions,
};

describe('Table', () => {
  it('renders component', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Table {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = screen.getByTestId('table');
    expect(element).toBeInTheDocument();
  });
});
