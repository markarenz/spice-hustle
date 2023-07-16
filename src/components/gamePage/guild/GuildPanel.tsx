import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { Slices, purchaseGuildMembership } from 'store/gameSlice';
import { Locations } from 'types';
import { FormattedMessage } from 'react-intl';
import CurrencyDisplay from 'components/common/CurrencyDisplay';
import { getGuildBenefitsByLocation } from 'utils/utils';
import guildsData from 'data/guildsData';
import IconGuild from 'components/icons/IconGuild';
import Button from 'components/common/Button';

const GuildPanel = () => {
  const { gameState } = useGameSliceSelector((state: Slices) => state.game);
  const { location, flags } = gameState;
  const dispatch = useGameSliceDispatch();
  const guildMemberships: string[] = [];
  Object.keys(Locations).forEach((guildLocation) => {
    if (flags[`guild__${guildLocation.toLowerCase()}`]) {
      guildMemberships.push(guildLocation);
    }
  });
  const isMemberOfLocalGuild = flags[`guild__${location}`];
  const benefits = getGuildBenefitsByLocation(location);
  const membershipPrice = guildsData[location].price;
  const canAfford = gameState.cash >= membershipPrice;
  const handlePurchaseMembership = () => {
    dispatch(purchaseGuildMembership(location));
  };
  return (
    <div data-testid="guild-panel">
      <div className="container mx-auto">
        <div className="p-4">
          <div className="pb-6">
            <FormattedMessage id="guild__explainer" />
          </div>

          <div className="text-center text-xl px-12 py-4 bg-gray-800 rounded-lg border-2 border-gray-500 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-3xl uppercase mb-2">
                  <FormattedMessage id="bank__loans__offer__headline" values={{ location }} />
                </h2>
                <div>
                  <div className="mb-4">
                    <span className="font-bold">
                      <FormattedMessage id="guild__local_benefits__items_title" />
                    </span>{' '}
                    {benefits.exclusiveItems.length === 0 && (
                      <span>
                        <FormattedMessage id="guild__local_benefits_none" />
                      </span>
                    )}
                    <span data-testid="guild-exclusive-items">
                      {benefits.exclusiveItems.map((id, idx) => (
                        <span key={id}>
                          {idx > 0 && <span>, </span>}
                          <FormattedMessage id={`items__${id}__title`} />
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold">
                      <FormattedMessage id="guild__local_benefits__upgrades_title" />
                    </span>{' '}
                    {benefits.exclusiveUpgrades.length === 0 && (
                      <span>
                        <FormattedMessage id="guild__local_benefits_none" />
                      </span>
                    )}
                    <span data-testid="guild-exclusive-upgrades">
                      {benefits.exclusiveUpgrades.map((id) => (
                        <span key={id}>
                          <FormattedMessage id={`upgrades__${id}__title`} />
                        </span>
                      ))}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">
                      <FormattedMessage id="guild__local_benefits__loan_title" />
                    </span>{' '}
                    <FormattedMessage id={benefits.exclusiveLoan ? 'yes' : 'no'} />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="w-[6rem] h-[6rem] mx-auto mb-4">
                    <IconGuild isActive={isMemberOfLocalGuild} />
                  </div>

                  {isMemberOfLocalGuild ? (
                    <div>
                      <h3 className="mb-4">
                        <FormattedMessage id="guild__member" />
                      </h3>
                    </div>
                  ) : (
                    <div>
                      <h3 className="mb-4">
                        <FormattedMessage id="guild__local_benefits__cta" />
                      </h3>
                      <div className="text-3xl mb-4 font-bold">
                        <CurrencyDisplay value={membershipPrice} />
                      </div>
                      <Button
                        labelKey="guild__cta__btn_purchase"
                        variant="primary"
                        onClick={handlePurchaseMembership}
                        disabled={!canAfford}
                        testId="guild-purchase-btn"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold uppercase">
              <FormattedMessage id="guild__memberships_list__title" />
            </h3>
          </div>
          {guildMemberships.length === 0 ? (
            <FormattedMessage id="guild__memberships_list__none" />
          ) : (
            <div>
              {guildMemberships.map((membershipLocation) => (
                <div key={membershipLocation}>{membershipLocation}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuildPanel;
