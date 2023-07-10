import { useEffect } from 'react';
import CloseButton from 'components/common/CloseButton';
import Footer from 'components/common/Footer';
import { AppStatuses } from 'types';
import { setAppStatus } from 'store/gameSlice';
import { FormattedMessage } from 'react-intl';
import { useGameSliceDispatch } from 'store/reduxHooks';

type ContentItem = {
  id: number;
  slug: string;
  numParagraphs: number;
};
const AboutPage = () => {
  const dispatch = useGameSliceDispatch();
  const handleReturnToMain = () => {
    dispatch(setAppStatus(AppStatuses.StartPage));
  };
  const content: ContentItem[] = [
    { id: 1, slug: 'play', numParagraphs: 3 },
    { id: 2, slug: 'buy_sell', numParagraphs: 3 },
    { id: 3, slug: 'travel', numParagraphs: 2 },
    { id: 4, slug: 'banking', numParagraphs: 2 },
    { id: 5, slug: 'guilds', numParagraphs: 2 },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative w-full min-h-[100vh] bg-gray-900" data-testid="about-page">
      <div className="absolute w-full h-full left-0 top-0" aria-hidden="true">
        <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="a"
              patternUnits="userSpaceOnUse"
              width="50"
              height="50"
              patternTransform="scale(3) rotate(0)"
            >
              <path
                d="M33.361 42.708H28.31l-3.281-3.125-3.29 3.125h-5.043V47.5L14.063 50h21.902l-2.604-2.48zm-4.166 3.125h-2.441l-1.726-1.726-1.726 1.726h-2.44v2.441L19.134 50H30.92l-1.725-1.726zM33.36 7.292H28.31l-3.281 3.125-3.29-3.125h-5.043V2.5L14.063 0h21.902l-2.604 2.48zm-4.166-3.125h-2.441l-1.726 1.726-1.726-1.726h-2.44V1.726L19.134 0H30.92l-1.725 1.726zm-21.903 12.5v5.052L10.417 25l-3.125 3.29v5.043H2.5L0 35.965V14.062l2.48 2.605zm-3.125 4.166v2.441L5.893 25l-1.726 1.726v2.44H1.726L0 30.894V19.107l1.726 1.726zm38.541-4.166v5.052L39.583 25l3.125 3.29v5.043H47.5l2.5 2.632V14.062l-2.48 2.605zm3.125 4.166v2.441L44.107 25l1.726 1.726v2.44h2.441L50 30.894V19.107l-1.726 1.726zM9.375 9.375h5.208v5.208H9.375zm0 26.042h5.208v5.208H9.375zM.521 11.979l2.604-2.604h4.167v5.208H3.125zm22.917 0l-2.605-2.604h-4.166v5.208h4.166zM11.979.521l2.604 2.604v4.167H9.375V3.125zm0 22.916l2.604-2.604v-4.166H9.375v4.166zM.521 38.021l2.604-2.604h4.167v5.208H3.125zm22.917 0l-2.605-2.604h-4.166v5.208h4.166zM11.979 26.562l2.604 2.605v4.166H9.375v-4.166zm0 22.917l2.604-2.604v-4.167H9.375v4.167zM35.417 9.375h5.208v5.208h-5.208zm-8.854 2.604l2.604-2.604h4.166v5.208h-4.166zm22.916 0l-2.604-2.604h-4.167v5.208h4.167zM38.021.521l2.604 2.604v4.167h-5.208V3.125zm0 22.916l2.604-2.604v-4.166h-5.208v4.166zm-2.604 11.98h5.208v5.208h-5.208zm-8.854 2.604l2.604-2.604h4.166v5.208h-4.166zm22.916 0l-2.604-2.604h-4.167v5.208h4.167zM38.021 26.562l2.604 2.605v4.166h-5.208v-4.166zm0 22.917l2.604-2.604v-4.167h-5.208v4.167zM50 0h-3.854l.729.73v2.395h2.396L50 3.75zM3.854 0l-.729.73v2.395H.729L0 3.855V0zm0 50l-.729-.73v-2.395H.729L0 46.145V50zm42.292 0l.729-.73v-2.395h2.396l.729-.73V50zm-16.98-29.167h-2.44L25 19.107l-1.726 1.726h-2.44v2.441L19.106 25l1.726 1.726v2.44h2.441L25 30.894l1.726-1.726h2.44v-2.441L30.894 25l-1.726-1.726z"
                strokeWidth="1"
                stroke="none"
                fill="#16213c"
              />
            </pattern>
          </defs>
          <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
        </svg>
      </div>
      <div
        className="fixed w-full h-full top-0 left-0 bg-gradient-to-b from-gray-900/90 from-10% via-gray-900/10 via-50% to-gray-900/90 to-90%"
        aria-hidden="true"
      />
      <div className="relative">
        <header className="container mx-auto py-6 px-4 text-center text-gray-200">
          <h1 className="text-[4rem] text-center text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-red-600 drop-shadow-3xl">
            How to Play Spice Hustle
          </h1>
          <div className="absolute right-[1rem] top-[1rem]" data-testid="close-game">
            <CloseButton handleClose={() => handleReturnToMain()} />
          </div>
        </header>

        <main className="max-w-4xl mx-auto min-h-90vh px-4 pb-12 text-gray-200">
          {content.map((section) => (
            <section className="pb-4" key={section.id}>
              <h2 className="text-2xl font-bold pb-4">
                <FormattedMessage id={`how_to__${section.slug}__title`} />
              </h2>

              {Array(section.numParagraphs)
                .fill(0)
                .map((_val, idx) => (
                  <p key={`${section.slug}-${idx}`} className="pb-4">
                    <FormattedMessage id={`how_to__${section.slug}__content_${idx + 1}`} />
                  </p>
                ))}
            </section>
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
