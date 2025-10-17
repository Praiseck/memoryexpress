export interface FrameData {
  source: any;
  level: number;
  rarity: 'común' | 'raro' | 'épico';
  price: number;
  animated?: boolean;
}

export const frameRegistry: Record<string, FrameData> = {
  'free.png': {
    source: require('../assets/images/frames/free.png'),
    level: 0,
    rarity: 'común',
    price: 0,
  },
  'cuadrodorado.png': {
    source: require('../assets/images/frames/cuadrodorado.png'),
    level: 1,
    rarity: 'raro',
    price: 0,
  },
  'lvl2': {
    source: require('../assets/images/frames/lvl2.png'),
    level: 2,
    rarity: 'raro',
    price: 250,
  },
  'lvl3': {
    source: require('../assets/images/frames/lvl3.png'),
    level: 3,
    rarity: 'raro',
    price: 300,
  },
  'lvl5': {
    source: require('../assets/images/frames/lvl5.png'),
    level: 5,
    rarity: 'raro',
    price: 300,
  },
  'lvl7': {
    source: require('../assets/images/frames/lvl7.png'),
    level: 7,
    rarity: 'épico',
    price: 350,
  },
  'lvl10': {
    source: require('../assets/images/frames/lvl10.png'),
    level: 10,
    rarity: 'épico',
    price: 400,
  },
  'lvl20': {
    source: require('../assets/images/frames/lvl20.png'),
    level: 20,
    rarity: 'épico',
    price: 500,
  },

};