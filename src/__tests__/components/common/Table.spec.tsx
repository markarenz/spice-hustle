import { IntlProvider } from 'react-intl';
import { TableFieldLabel } from 'types';
import { render, screen } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import Table from 'components/common/Table';

jest.useFakeTimers();

const savedGameFieldLabels: TableFieldLabel[] = [
  { slug: 'id', titleKey: 'title_page__saved_game_modal__table_field__dateModified' },
  { slug: 'isOwned', titleKey: 'title_page__saved_game_modal__table_field__location' },
  { slug: 'price', titleKey: 'title_page__saved_game_modal__table_field__netWealth' },
];
const mockUpgrades = [
  { id: 'capacity_1', isOwned: true, price: 10 },
  { id: 'capacity_2', isOwned: false, price: 100 },
];

const saveListTableActions = (id: string) => (
  <div>
    <button onClick={() => jest.fn()}>Test {id}</button>
  </div>
);

const mockProps = {
  data: mockUpgrades,
  fieldLabels: savedGameFieldLabels,
  actions: saveListTableActions,
};

describe('Table', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Table {...mockProps} />
      </IntlProvider>,
    );
    const element = screen.getByTestId('table');
    expect(element).toBeInTheDocument();
  });

  it('renders component with boolean field', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Table {...mockProps} />
      </IntlProvider>,
    );
    const element = screen.getByTestId('table');
    expect(element).toBeInTheDocument();
  });

  it('renders component with guild-specific data - no membership', () => {
    const fieldLabelsGuild: TableFieldLabel[] = [
      {
        slug: 'guildDependentTitle',
        titleKey: 'title_page__saved_game_modal__table_field__dateModified',
      },
      { slug: 'isOwned', titleKey: 'title_page__saved_game_modal__table_field__location' },
      {
        slug: 'discountablePrice',
        titleKey: 'title_page__saved_game_modal__table_field__netWealth',
      },
    ];
    const mockUpgradesGuild = [
      {
        id: 1,
        guildDependentTitle: 'Item 1',
        isOwned: true,
        discountablePrice: 10,
        hasGuildMembership: false,
        guildOnly: true,
        guildDiscount: 0,
      },
      {
        id: 2,
        guildDependentTitle: 'Item 2',
        isOwned: true,
        discountablePrice: 10,
        hasGuildMembership: false,
        guildOnly: true,
        guildDiscount: 1,
      },
    ];
    const mockPropsGuild = {
      data: mockUpgradesGuild,
      fieldLabels: fieldLabelsGuild,
      actions: saveListTableActions,
    };
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Table {...mockPropsGuild} />
      </IntlProvider>,
    );
    const element = screen.queryByText('(-1)');
    expect(element).not.toBeInTheDocument();
  });

  it('renders component with guild-specific data - has membership', () => {
    const fieldLabelsGuild: TableFieldLabel[] = [
      {
        slug: 'guildDependentTitle',
        titleKey: 'title_page__saved_game_modal__table_field__dateModified',
      },
      { slug: 'isOwned', titleKey: 'title_page__saved_game_modal__table_field__location' },
      {
        slug: 'discountablePrice',
        titleKey: 'title_page__saved_game_modal__table_field__netWealth',
      },
    ];
    const mockUpgradesGuild = [
      {
        id: 1,
        guildDependentTitle: 'Item 1',
        isOwned: true,
        discountablePrice: 10,
        hasGuildMembership: true,
        guildOnly: true,
        guildDiscount: 0,
      },
      {
        id: 2,
        guildDependentTitle: 'Item 2',
        isOwned: true,
        discountablePrice: 10,
        hasGuildMembership: true,
        guildOnly: true,
        guildDiscount: 1,
      },
    ];
    const mockPropsGuild = {
      data: mockUpgradesGuild,
      fieldLabels: fieldLabelsGuild,
      actions: saveListTableActions,
    };
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Table {...mockPropsGuild} />
      </IntlProvider>,
    );
    const element = screen.getByText('(-1)');
    expect(element).toBeInTheDocument();
  });
});
