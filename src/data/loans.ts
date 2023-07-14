import { LoanOffering, LoanOfferingsData, Locations } from 'types';

const loansData: LoanOfferingsData = {
  oskah: {
    location: Locations.Oskah,
    amount: 500,
    term: 100,
    guildOnly: false,
  },
  tabbith: {
    location: Locations.Tabbith,
    amount: 1200,
    term: 300,
    guildOnly: true,
  },
  butre: {
    location: Locations.Butre,
    amount: 800,
    term: 200,
    guildOnly: false,
  },
  luci: {
    location: Locations.Luci,
    amount: 800,
    term: 200,
    guildOnly: false,
  },
  clionne: {
    location: Locations.Clionne,
    amount: 800,
    term: 200,
    guildOnly: true,
  },
  winnie: {
    location: Locations.Winnie,
    amount: 10000,
    term: 200,
    guildOnly: true,
  },
  tigi: {
    location: Locations.Tigi,
    amount: 12000,
    term: 200,
    guildOnly: true,
  },
};

export default loansData;
