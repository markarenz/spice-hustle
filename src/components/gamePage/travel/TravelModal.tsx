import { useEffect, useState } from 'react';
import DieOneDSix from './DieOneDSix';
import Button from 'components/common/Button';
import { FormattedMessage } from 'react-intl';
import IconDanger from 'components/icons/dangers/IconDanger';
import IconUpgrade from 'components/icons/upgrades/IconUgrade';
import { TravelState } from 'types';

type Props = {
  travelState: TravelState;
  travelModalStatus: string;
  travelTransitionStatus: string;
  handleTravelContinue: React.MouseEventHandler<HTMLButtonElement>;
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  titleKey: string;
};
const TravelModal: React.FC<Props> = ({
  travelState,
  travelModalStatus,
  handleTravelContinue,
  closeModal,
  titleKey,
  travelTransitionStatus,
}) => {
  const [isInitted, setIsInitted] = useState(false);
  const isOpening = ['opening', 'open'].includes(travelModalStatus) && isInitted;
  const showCard = travelTransitionStatus !== 'off';
  useEffect(() => {
    setIsInitted(true);
  }, []);
  return (
    <div
      className="fixed left-0 top-0 w-[100vw] h-[100vh] flex items-center justify-center z-10"
      data-testid="travel-modal"
    >
      <button
        className={`fixed left-0 top-0 w-[100vw] h-[100vh] cursor-default bg-gray-700 transition-opacity duration-300 ${
          isOpening ? 'opacity-75' : 'opacity-0'
        }`}
        aria-hidden="true"
        data-testid="travel-modal-bg-btn"
        onClick={closeModal}
      />
      <div
        data-testid="travel-modal-card-wrap"
        className={`transition-opacity duration-300 ${
          travelTransitionStatus !== 'closing' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {showCard && (
          <div
            data-testid="travel-modal-card"
            className={`relative max-w-[95vw] lg:max-w-[70vw] mx-auto bg-gray-200 rounded-md ring-4 ring-orange-700 drop-shadow-[2px_2px_10px_rgba(0,0,0,.9)] min-w-[20rem] max-h-[calc(100vh_-_2rem)] max-w-[calc(100vw_-_2rem)] overflow-y-scroll transition-all duration-500 overflow-x-hidden ${
              isOpening ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <div className="bg-orange-700 text-gray-200 rounded-tl-md rounded-tr-md p-4 flex justify-between items-center">
              <h2 className="mr-4 text-xl uppercase font-bold">
                <FormattedMessage id={titleKey} />
              </h2>
            </div>
            <div className="p-6 shadow-[inset_0_0_15px_5px_rgba(0,0,0,0.3)]">
              <div>
                <div className="text-gray-800">
                  <div>
                    <h3 className="font-bold uppercase text-center mb-4">
                      <FormattedMessage
                        id="travel__modal__day_num"
                        values={{ dayNum: travelState.progress, maxDays: travelState.routeDays }}
                      />
                    </h3>
                  </div>

                  <div>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 mr-4">
                        <DieOneDSix value={travelState.dice.encounterCheck1} idx={0} />
                      </div>
                      <div className="w-16 h-16">
                        <DieOneDSix value={travelState.dice.encounterCheck2} idx={1} />
                      </div>
                    </div>
                    <div
                      className={`pb-4 delay-500 transition-opacity duration-300 ${
                        travelTransitionStatus === '' ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="flex gap-6">
                        {travelState.danger && (
                          <div className="w-[6rem] h-[6rem] aspect-square bg-gray-300 rounded-xl p-2">
                            <IconDanger type={travelState.danger.type} />
                          </div>
                        )}
                        {travelState.danger && travelState.upgradeUsed && (
                          <div className="w-[6rem] h-[6rem] aspect-square bg-gray-300 rounded-xl p-2">
                            <IconUpgrade type={`counterDanger__${travelState.danger.type}`} />
                          </div>
                        )}

                        <div>
                          {!travelState.danger ? (
                            <FormattedMessage id="travel__modal__danger__none" />
                          ) : (
                            <div>
                              <FormattedMessage
                                id={`travel__modal__danger__${travelState.danger.type}${
                                  travelState.upgradeUsed ? '_avoided' : ''
                                }`}
                              />{' '}
                              {!travelState.upgradeUsed &&
                                travelState.danger.effects.map((dangerEffect) => (
                                  <span key={dangerEffect.type}>
                                    <FormattedMessage
                                      id={`travel__modal__danger__effect__${dangerEffect.type}__${dangerEffect.severity}`}
                                    />{' '}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      {travelState.progress < travelState.routeDays && (
                        <span className="mr-4">
                          <Button
                            testId="travel-btn-cancel"
                            variant="secondary"
                            labelKey="travel__modal__btn_cancel"
                            onClick={closeModal}
                          />
                        </span>
                      )}
                      <Button
                        testId="travel-btn-ok"
                        variant="primary"
                        labelKey="travel__modal__btn_ok"
                        onClick={handleTravelContinue}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelModal;
