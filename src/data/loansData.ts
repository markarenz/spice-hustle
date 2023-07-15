import { LoanOfferingsData, Locations } from 'types';

const loansData: LoanOfferingsData = {
  oskah: {
    location: Locations.Oskah,
    amount: 500,
    markup: 100,
    term: 10,
    guildOnly: false,
  },
  tabbith: {
    location: Locations.Tabbith,
    amount: 1200,
    markup: 300,
    term: 300,
    guildOnly: true,
  },
  butre: {
    location: Locations.Butre,
    amount: 800,
    markup: 200,
    term: 200,
    guildOnly: false,
  },
  luci: {
    location: Locations.Luci,
    amount: 800,
    markup: 200,
    term: 200,
    guildOnly: false,
  },
  clionne: {
    location: Locations.Clionne,
    amount: 5000,
    markup: 3000,
    term: 200,
    guildOnly: true,
  },
  winnie: {
    location: Locations.Winnie,
    amount: 10000,
    markup: 800,
    term: 200,
    guildOnly: true,
  },
  tigi: {
    location: Locations.Tigi,
    amount: 12000,
    markup: 1000,
    term: 200,
    guildOnly: true,
  },
};

export default loansData;
