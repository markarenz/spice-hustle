export type GuildItem = {
  location: string;
  price: number;
};
export type GuildItemData = { [key: string]: GuildItem };

export type LoanOffering = {
  location: string;
  amount: number;
  markup: number;
  term: number;
  guildOnly: boolean;
};
export type LoanOfferingsData = { [key: string]: LoanOffering };

export type Loan = {
  location: string;
  initialAmount: number;
  principal: number;
  dueDate: number;
};

/*
  We are using both weight and volume for inventory max calculation
  If you go to buy something when your pack or cart are full, you get a modal explaining why you cannot buy it
*/
export type PriceModel = {
  locations: string[];
  seasons: number[];
  actions: string[];
  qtyMin: number;
  qtyMax: number;
  priceMin: number;
  priceMax: number;
  guildDiscount: number;
};

export type Product = {
  itemId: string;
  volume: number; // in vols, used for inventory max calculation - example: 1v
  weight: number; // in oofs, used for inventory max calculation - example: 2o
  prices: PriceModel[];
};

export type Price = {
  id: string;
  value: number;
  qty: number;
  actions: string[];
  volume: number;
  weight: number;
  guildDiscount: number;
};

export type InventoryItem = {
  itemId: string;
  qty: number;
};

export type ItemsInfo = { [key: string]: Product }; // Generic type for flexibility

/*
  Flags are flexible booleans that can be used for detailed progress markers and gates without having to drill into separate purpose-built structures
  If a flag is null, it's considered false
  We use snake case with dunders (double underscores) to separate ideas just like we do for our lang pack keys
  This makes programmatic checks for flags easy and maintainable
  Examples: 
  - When you upgrade your cart: cart_upgrade__1: true
  - When you buy into the Clionne merchant guild: guild__clionne: true
*/
export type Flag = boolean | null | undefined;

export type Flags = { [key: string]: any }; // Generic type for flexibility

export type Inventory = { [key: string]: InventoryItem };
export type GameState = {
  id: string; // timestamp of creation date
  location: string; // ID of location
  mapVersion: number; // 0 = default, upgrades 1, 2, 3, etc
  numTurns: number; // we need a function that turns numTurns into a date for seasonality and game end checks
  cash: number;
  savings: number;
  loans: Loan[];
  netWealth: number; // cash + savings - sum(loan.principle)
  prices: { [key: string]: Price };
  inventory: Inventory;
  capacity: Capacity;
  flags: Flags;
  createdAt: string;
  modifiedAt: string;
};

export type GameSaveListItem = {
  id: string;
  location: string;
  numTurns: number;
  netWealth: number;
  modifiedAt: string;
};

export type TableFieldLabel = {
  slug: string;
  titleKey: string;
};

export enum Locations {
  Oskah = 'oskah',
  Tabbith = 'tabbith',
  Butre = 'butre',
  Luci = 'luci',
  Clionne = 'clionne',
  Winnie = 'winnie',
  Tigi = 'tigi',
}

export type location = {
  id: Locations;
  title: string;
  description: string;
};

export enum AppStatuses {
  StartPage = 'startPage',
  AboutPage = 'aboutPage',
  Game = 'game',
  GameOver = 'gameOver',
}

export type GameTab = {
  label: string;
  slug: string;
};

export enum GameTabSlugs {
  Market = 'market',
  Bank = 'bank',
  Guild = 'guild',
  Tools = 'tools',
  Travel = 'travel',
}

export type InGameDate = {
  day: number;
  season: number;
  years: number;
};

export type Transaction = {
  qty: number;
  itemId: string;
  price: number;
  action: string;
};

export type VolWeight = {
  weight: number;
  volume: number;
};

export type Capacity = {
  used: VolWeight;
  max: VolWeight;
};

export type CapacityData = { [key: string]: VolWeight };

export type GameSliceState = {
  appStatus: string;
  gamePanel: string;
  subPanelStatus: string;
  modalStatus: string;
  currentModal: string;
  gameState: GameState;
};

export type RouteDangerEffect = {
  type: string; // cash, inventory, delay
  severity: string; // minor, mid, major
};

export enum DangerTypes {
  Bandits = 'bandits',
  RockSlide = 'rockSlide',
  Flood = 'flood',
  Wolves = 'wolves',
  Tricksters = 'tricksters',
}
export type Position = {
  x: number;
  y: number;
};
export type RouteDanger = {
  type: DangerTypes;
  chance: number;
  effects: RouteDangerEffect[];
  positions: { [key: number]: Position };
};
export type TravelTurnDangerResult = {
  danger: RouteDanger | null;
  upgradeUsed: boolean;
};

export type RouteSection = {
  dangers: RouteDanger[];
};
export type Route = {
  locations: Locations[];
  sections: RouteSection[];
};
export type Map = {
  slug: string;
  locations: Locations[];
  routes: Route[];
};

export enum TravelDayState {
  idle = 'idle',
  encounterCheck = 'encounterCheck',
  encounterResults = 'encounterResults',
}
export type TravelState = {
  destination: string;
  progress: number;
  routeDays: number;
  route: Route | null;
  danger: RouteDanger | null;
  upgradeUsed: boolean;
  dice: {
    encounterCheck1: number;
    encounterCheck2: number;
  };
};

export type UpgradePrice = {
  price: number;
  locations: string[];
  guildOnly: boolean;
};

export type Upgrade = {
  slug: string; // flag derived from slug
  dependencies: string[]; // array of flag strings
  prices: UpgradePrice[];
};

export type UpgradeData = { [key: string]: Upgrade };
