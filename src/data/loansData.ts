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
    markup: 200,
    term: 300,
    guildOnly: true,
  },
  butre: {
    location: Locations.Butre,
    amount: 5000,
    markup: 500,
    term: 200,
    guildOnly: false,
  },
  luci: {
    location: Locations.Luci,
    amount: 8000,
    markup: 900,
    term: 200,
    guildOnly: false,
  },
  clionne: {
    location: Locations.Clionne,
    amount: 15000,
    markup: 1000,
    term: 200,
    guildOnly: true,
  },
  winnie: {
    location: Locations.Winnie,
    amount: 25000,
    markup: 1000,
    term: 200,
    guildOnly: true,
  },
  tigi: {
    location: Locations.Tigi,
    amount: 100000,
    markup: 5000,
    term: 300,
    guildOnly: true,
  },
};

export default loansData;
