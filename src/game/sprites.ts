// Sprites pixel-art como en PixelIcon: cada carácter es un píxel ('.' = transparente).
const palette: Record<string, string> = {
  k: '#1f1d1a',
  h: '#8b5a2b',
  f: '#f7d3ae',
  r: '#b5553f',
  b: '#2f3b7e',
  m: '#e8574c',
  y: '#f7d046',
  Y: '#c9a227',
  w: '#ffffff',
};

const head = [
  '...kkkkk....',
  '..khhhhhkk..',
  '.khhhhhhhhk.',
  '.khhhhhhhhk.',
  '.khhffffffk.',
  '.khfffkffkfk',
  '.kffffffffk.',
  '..kffffffk..',
  '...kkkkkk...',
];

const body = [
  '..krrrrrrk..',
  '.krrrrrrrrk.',
  '.kfkrrrrkfk.',
  '.kkkbbbbkkk.',
];

const legs = {
  stand: [
    '...kbbbbk...',
    '...kbkkbk...',
    '..kkk..kkk..',
  ],
  walkA: [
    '..kbbkkbbk..',
    '.kbbk..kbbk.',
    '.kkk....kkk.',
  ],
  walkB: [
    '...kbbbbk...',
    '....kbbk....',
    '...kkkkk....',
  ],
  jump: [
    '..kbbbbbbk..',
    '.kbbk..kkk..',
    '.kkk........',
  ],
};

export type Frame = keyof typeof legs;

const coin = [
  '..kkkk..',
  '.kyyyyk.',
  'kyywyyYk',
  'kyywyyYk',
  'kyywyyYk',
  'kyyyyyYk',
  '.kYYYYk.',
  '..kkkk..',
];

const mushroom = [
  '....kkkk....',
  '..kkmmwwkk..',
  '.kmmmmwwwmk.',
  '.kwwmmmmmmk.',
  'kwwwmmmmwwwk',
  'kmmmmmmmwwwk',
  'kmmmmmmmmmmk',
  '.kkkkkkkkkk.',
  '..kffffffk..',
  '..kfkffkfk..',
  '..kffffffk..',
  '...kkkkkk...',
];

const star = [
  '.....kk.....',
  '....kyyk....',
  '....kyyk....',
  'kkkkyyyykkkk',
  'kyyyykykyyyk',
  '.kyyyyyyyyk.',
  '..kyyyyyyk..',
  '..kyyyyyyk..',
  '.kyyykkyyyk.',
  '.kyyk..kyyk.',
  'kyyk....kyyk',
  'kkk......kkk',
];

const question = [
  '.kkkk.',
  'kk..kk',
  '....kk',
  '...kk.',
  '..kk..',
  '..kk..',
  '......',
  '..kk..',
];

function paint(rows: string[], colors = palette): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = rows[0].length;
  canvas.height = rows.length;
  const ctx = canvas.getContext('2d')!;
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '.') continue;
      ctx.fillStyle = colors[row[x]];
      ctx.fillRect(x, y, 1, 1);
    }
  });
  return canvas;
}

function mirror(src: HTMLCanvasElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = src.width;
  canvas.height = src.height;
  const ctx = canvas.getContext('2d')!;
  ctx.translate(src.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(src, 0, 0);
  return canvas;
}

export type PlayerSprites = Record<Frame, { right: HTMLCanvasElement; left: HTMLCanvasElement }>;

/** El personaje con camiseta y pantalón cambiados; sin argumentos, los colores normales. */
export function playerSprites(shirt = palette.r, pants = palette.b): PlayerSprites {
  const colors = { ...palette, r: shirt, b: pants };
  const frames = {} as PlayerSprites;
  for (const frame of Object.keys(legs) as Frame[]) {
    const right = paint([...head, ...body, ...legs[frame]], colors);
    frames[frame] = { right, left: mirror(right) };
  }
  return frames;
}

export const mushroomSprite = () => paint(mushroom);
export const starSprite = () => paint(star);

export const coinSprite = () => paint(coin);
export const questionSprite = () => paint(question);

/** Tile de 16×16 de césped sobre tierra, y el de tierra sola para debajo. */
export function groundTiles() {
  const make = (grass: boolean) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 16;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#c98f5a';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#a8743f';
    for (const [x, y] of [[2, 7], [9, 4], [13, 11], [5, 13], [11, 8], [1, 2]]) ctx.fillRect(x, y, 2, 1);
    if (grass) {
      ctx.fillStyle = '#8ed05f';
      ctx.fillRect(0, 0, 16, 4);
      ctx.fillStyle = '#5fa83f';
      ctx.fillRect(0, 4, 16, 1);
      ctx.fillRect(3, 5, 2, 1);
      ctx.fillRect(10, 5, 3, 1);
      ctx.fillStyle = '#b4e58a';
      ctx.fillRect(0, 0, 16, 1);
    }
    return canvas;
  };
  return { grass: make(true), dirt: make(false) };
}
