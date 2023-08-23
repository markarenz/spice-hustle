import IconItemApple from './IconItemApple';
import IconItemBrochure from './IconItemBrochure';
import IconItemCinnamon from './IconItemCinnamon';
import IconItemCinnamonRoll from './IconItemCinnamonRoll';
import IconItemCozyTea from './IconItemCozyTea';
import IconItemFish from './IconItemFish';
import IconItemGinger from './IconItemGinger';
import IconItemGlass from './IconItemGlass';
import IconItemHotSauce from './IconItemHotSauce';
import IconItemJolt from './IconItemJolt';
import IconItemLamp from './IconItemLamp';
import IconItemMelange from './IconItemMelange';
import IconItemNutmeg from './IconItemNutmeg';
import IconItemOskahTea from './IconItemOskahTea';
import IconItemPaperLantern from './IconItemPaperLantern';
import IconItemPotat from './IconItemPotat';
import IconItemProcessedWool from './IconItemSilverSpoon';
import IconItemRings from './IconItemRings';
import IconItemRug from './IconItemRug';
import IconItemSaltLick from './IconItemSaltLick';
import IconItemSecretSpice from './IconItemSecretSpice';
import IconItemSilkKimono from './IconItemSilkKimono';
import IconItemSilverSpoon from './IconItemProcessedWool';
import IconItemSporty from './IconItemSporty';
import IconItemStatuette from './IconItemStatuette';
import IconItemTunic from './IconItemTunic';
import IconItemVase from './IconItemVase';
import IconDummy from 'components/icons/IconDummy';
import IconItemPepper from './IconItemPepper';
import IconItemWool from './IconItemWool';

type Props = {
  type: string;
};
const IconItem: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'apple':
      return <IconItemApple />;
    case 'brochure':
      return <IconItemBrochure />;
    case 'cinnamon':
      return <IconItemCinnamon />;
    case 'cinnamonroll':
      return <IconItemCinnamonRoll />;
    case 'cozytea':
      return <IconItemCozyTea />;
    case 'fish':
      return <IconItemFish />;
    case 'ginger':
      return <IconItemGinger />;
    case 'glass':
      return <IconItemGlass />;
    case 'hotsauce':
      return <IconItemHotSauce />;
    case 'jolt':
      return <IconItemJolt />;
    case 'lamp':
      return <IconItemLamp />;
    case 'melange':
      return <IconItemMelange />;
    case 'nutmeg':
      return <IconItemNutmeg />;
    case 'oskahtea':
      return <IconItemOskahTea />;
    case 'paperlantern':
      return <IconItemPaperLantern />;
    case 'pepper':
      return <IconItemPepper />;
    case 'potat':
      return <IconItemPotat />;
    case 'processedwool':
      return <IconItemProcessedWool />;
    case 'rings':
      return <IconItemRings />;
    case 'rug':
      return <IconItemRug />;
    case 'saltlick':
      return <IconItemSaltLick />;
    case 'secretspice':
      return <IconItemSecretSpice />;
    case 'silkkimono':
      return <IconItemSilkKimono />;
    case 'silverspoon':
      return <IconItemSilverSpoon />;
    case 'sporty':
      return <IconItemSporty />;
    case 'statuette':
      return <IconItemStatuette />;
    case 'tunic':
      return <IconItemTunic />;
    case 'vase':
      return <IconItemVase />;
    case 'wool':
      return <IconItemWool />;
    default:
      return <IconDummy />;
  }
};

export default IconItem;
