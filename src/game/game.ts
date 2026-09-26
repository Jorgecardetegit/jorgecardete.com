import { coinSprite, groundTiles, playerSprites, questionSprite, type Frame } from './sprites';

// Coordenadas del mundo en píxeles "lógicos"; el canvas se escala con image-rendering: pixelated.
const WORLD_H = 200;
const GROUND = 168;
const TILE = 16;
const HOUSE_W = 80;
const WALL_H = 56;
const ROOF_H = 30;
const FIRST_HOUSE = 200;
const SPACING = 240;
const PW = 12;
const PH = 16;

const GRAVITY = 0.28;
const MAX_FALL = 6;
const ACCEL = 0.22;
const AIR_ACCEL = 0.16;
const MAX_SPEED = 1.8;
const FRICTION = 0.78;
const JUMP_V = -5.3;
const JUMP_CUT = -2;

const INK = '#1f1d1a';
const CREAM = '#f6f1e4';
const STORAGE_KEY = 'jorge.dev:game';

type Rect = { x: number; y: number; w: number; h: number };
type Block = Rect & { kind: 'brick' | 'question' | 'stone'; used: boolean; bump: number };
type Coin = { x: number; y: number; taken: boolean };
type Pop = { x: number; y: number; vy: number; t: number };
type House = { x: number; door: number; color: string; shade: string; href: string; sign: HTMLAnchorElement };
type State = 'play' | 'enter' | 'exit';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const overlap = (a: Rect, b: Rect) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

function readStorage(): { x?: number } {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writeStorage(value: { x: number }) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Sin almacenamiento el juego sigue funcionando; solo no recuerda la casa.
  }
}

export function startGame(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('.game-canvas')!;
  const ctx = canvas.getContext('2d')!;
  const board = root.querySelector<HTMLElement>('.game-board')!;
  const prompt = root.querySelector<HTMLElement>('.game-prompt')!;
  const coinsLabel = root.querySelector<HTMLElement>('.game-coins-count')!;
  const iris = root.querySelector<HTMLElement>('.game-iris')!;

  const sprites = playerSprites();
  const coinImg = coinSprite();
  const questionImg = questionSprite();
  const tiles = groundTiles();

  const houses: House[] = [...root.querySelectorAll<HTMLAnchorElement>('.game-sign')].map((sign, i) => {
    const x = FIRST_HOUSE + i * SPACING;
    return { x, door: x + HOUSE_W / 2, color: sign.dataset.color!, shade: sign.dataset.shade!, href: sign.href, sign };
  });
  const worldW = FIRST_HOUSE + (houses.length - 1) * SPACING + HOUSE_W + 160;

  // Entre cada par de casas, una formación distinta de bloques y monedas.
  const blocks: Block[] = [];
  const coins: Coin[] = [];
  const block = (x: number, y: number, kind: Block['kind'] = 'brick') =>
    blocks.push({ x, y, w: TILE, h: TILE, kind, used: false, bump: 0 });
  const coin = (x: number, y: number) => coins.push({ x, y, taken: false });

  houses.slice(0, -1).forEach((house, i) => {
    const mid = house.x + HOUSE_W + (SPACING - HOUSE_W) / 2;
    switch (i % 4) {
      case 0:
        block(mid - 24, GROUND - 44);
        block(mid - 8, GROUND - 44, 'question');
        block(mid + 8, GROUND - 44);
        coin(mid - 20, GROUND - 68);
        coin(mid + 12, GROUND - 68);
        break;
      case 1:
        block(mid - 24, GROUND - 16, 'stone');
        block(mid - 8, GROUND - 16, 'stone');
        block(mid - 8, GROUND - 32, 'stone');
        block(mid + 8, GROUND - 16, 'stone');
        block(mid + 8, GROUND - 32, 'stone');
        block(mid + 8, GROUND - 48, 'stone');
        block(mid + 8, GROUND - 104, 'question');
        coin(mid - 20, GROUND - 40);
        coin(mid - 4, GROUND - 56);
        break;
      case 2:
        block(mid - 8, GROUND - 60, 'question');
        coin(mid - 36, GROUND - 28);
        coin(mid - 24, GROUND - 40);
        coin(mid + 16, GROUND - 40);
        coin(mid + 28, GROUND - 28);
        break;
      case 3:
        block(mid - 40, GROUND - 40);
        block(mid - 24, GROUND - 40);
        block(mid + 8, GROUND - 80);
        block(mid + 24, GROUND - 80, 'question');
        coin(mid + 12, GROUND - 100);
        break;
    }
  });

  const clouds = Array.from({ length: 9 }, (_, i) => ({ x: i * 150 + ((i * 53) % 70), y: 18 + ((i * 37) % 50), big: i % 3 === 0 }));
  const trees = [140, worldW - 110];
  const bushes = houses.flatMap((h) => [h.x - 26, h.x + HOUSE_W + 6]);
  const flag = worldW - 50;
  const BOARD_X = 84;

  // Estado.
  const saved = readStorage().x;
  const player = { x: typeof saved === 'number' ? clamp(saved - PW / 2, 0, worldW - PW) : 36, y: GROUND - PH, vx: 0, vy: 0, facing: 1, alpha: 1 };
  let onGround = true;
  let coyote = 0;
  let jumpBuffer = 0;
  let walkTime = 0;
  let state: State = typeof saved === 'number' ? 'exit' : 'play';
  if (state === 'exit') player.alpha = 0;
  let target: House | null = null;
  let nearHouse: House | null = null;
  let focusHouse: House | null = null;
  let collected = 0;
  let camX = clamp(player.x - 120, 0, worldW);
  let tick = 0;
  const pops: Pop[] = [];

  const keys = { left: false, right: false, jump: false };

  // Tamaño lógico del canvas: 200 px de alto como mínimo y al menos 200 de ancho.
  // En táctil se reserva sitio abajo para que los botones queden sobre la tierra, no sobre el personaje.
  const pad = root.querySelector<HTMLElement>('.game-pad')!;
  let W = 0;
  let H = 0;
  let offsetY = 0;
  let reserve = 0;
  let scale = 1;
  function resize() {
    const rect = root.getBoundingClientRect();
    const aspect = rect.width / Math.max(rect.height, 1);
    H = WORLD_H;
    W = Math.round(H * aspect);
    if (W < 200) {
      W = 200;
      H = Math.round(W / aspect);
    }
    const padH = getComputedStyle(pad).display === 'none' ? 0 : pad.getBoundingClientRect().height;
    reserve = Math.max(0, Math.ceil(padH / (rect.width / W)) - 24);
    if (H < WORLD_H + reserve) {
      H = WORLD_H + reserve;
      W = Math.round(H * aspect);
    }
    canvas.width = W;
    canvas.height = H;
    offsetY = H - WORLD_H - reserve;
    scale = rect.width / W;
    ctx.imageSmoothingEnabled = false;
  }
  resize();
  window.addEventListener('resize', resize);

  // Entrada.
  const enter = () => {
    if (state !== 'play' || !nearHouse) return;
    state = 'enter';
    target = nearHouse;
    player.vx = 0;
    writeStorage({ x: target.door });
  };
  const pressJump = () => {
    if (state === 'play') jumpBuffer = 6;
  };

  const LEFT = ['ArrowLeft', 'KeyA'];
  const RIGHT = ['ArrowRight', 'KeyD'];
  const JUMP = ['Space', 'ArrowUp', 'KeyW'];
  const ENTER = ['ArrowUp', 'KeyW', 'ArrowDown', 'KeyS', 'KeyE', 'Enter'];

  window.addEventListener('keydown', (e) => {
    // Enter sobre un cartel enfocado sigue el enlace de forma nativa.
    if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const code = e.code;
    if (![...LEFT, ...RIGHT, ...JUMP, ...ENTER].includes(code)) return;
    e.preventDefault();
    if (LEFT.includes(code)) keys.left = true;
    if (RIGHT.includes(code)) keys.right = true;
    if (e.repeat) return;
    if (ENTER.includes(code) && nearHouse) return enter();
    if (JUMP.includes(code)) {
      keys.jump = true;
      pressJump();
    }
  });
  window.addEventListener('keyup', (e) => {
    if (LEFT.includes(e.code)) keys.left = false;
    if (RIGHT.includes(e.code)) keys.right = false;
    if (JUMP.includes(e.code)) keys.jump = false;
  });
  window.addEventListener('blur', () => {
    keys.left = keys.right = keys.jump = false;
  });

  root.querySelectorAll<HTMLButtonElement>('.game-pad button').forEach((button) => {
    const action = button.dataset.action as 'left' | 'right' | 'jump' | 'enter';
    const release = () => {
      if (action !== 'enter') keys[action] = false;
    };
    button.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      button.setPointerCapture(e.pointerId);
      if (action === 'enter') return enter();
      keys[action] = true;
      if (action === 'jump') pressJump();
    });
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
  });

  // Tabular por los carteles lleva la cámara a cada casa.
  houses.forEach((house) => {
    house.sign.addEventListener('focus', () => (focusHouse = house));
    house.sign.addEventListener('blur', () => (focusHouse = null));
  });

  // Al volver con el botón atrás la página puede venir de la bfcache: sal de la casa otra vez.
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    root.classList.remove('is-leaving');
    state = 'exit';
    target = null;
    player.alpha = 0;
    keys.left = keys.right = keys.jump = false;
  });

  // Física.
  function moveX() {
    player.x = clamp(player.x + player.vx, 0, worldW - PW);
    for (const b of blocks) {
      if (!overlap(player, b)) continue;
      player.x = player.vx > 0 ? b.x - PW : b.x + b.w;
      player.vx = 0;
    }
  }

  function moveY() {
    player.vy = Math.min(player.vy + GRAVITY, MAX_FALL);
    player.y += player.vy;
    onGround = false;
    if (player.y + PH >= GROUND) {
      player.y = GROUND - PH;
      player.vy = 0;
      onGround = true;
    }
    for (const b of blocks) {
      if (!overlap(player, b)) continue;
      if (player.vy > 0) {
        player.y = b.y - PH;
        player.vy = 0;
        onGround = true;
      } else if (player.vy < 0) {
        player.y = b.y + b.h;
        player.vy = 0;
        hit(b);
      }
    }
  }

  function hit(b: Block) {
    b.bump = 8;
    if (b.kind !== 'question' || b.used) return;
    b.used = true;
    pops.push({ x: b.x + 4, y: b.y - 8, vy: -3.2, t: 0 });
    collected++;
  }

  function step() {
    tick++;
    if (state === 'play') {
      const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      if (dir) {
        player.vx = clamp(player.vx + dir * (onGround ? ACCEL : AIR_ACCEL), -MAX_SPEED, MAX_SPEED);
        player.facing = dir;
      } else if (onGround) {
        player.vx *= FRICTION;
        if (Math.abs(player.vx) < 0.05) player.vx = 0;
      }
      coyote = onGround ? 6 : Math.max(0, coyote - 1);
      if (jumpBuffer > 0 && coyote > 0) {
        player.vy = JUMP_V;
        coyote = jumpBuffer = 0;
      }
      jumpBuffer = Math.max(0, jumpBuffer - 1);
      if (!keys.jump && player.vy < JUMP_CUT) player.vy = JUMP_CUT;
      moveX();
      moveY();
    } else if (state === 'enter' && target) {
      const goal = target.door - PW / 2;
      if (Math.abs(player.x - goal) > 1) {
        player.x += Math.sign(goal - player.x);
      } else if (player.alpha > 0) {
        player.x = goal;
        player.alpha = Math.max(0, player.alpha - 0.06);
        if (player.alpha === 0) {
          const href = target.href;
          root.style.setProperty('--iris-x', `${(player.x + PW / 2 - camX) * scale}px`);
          root.style.setProperty('--iris-y', `${(player.y + PH / 2 + offsetY) * scale}px`);
          root.classList.add('is-leaving');
          setTimeout(() => location.assign(href), 480);
        }
      }
    } else if (state === 'exit') {
      player.alpha = Math.min(1, player.alpha + 0.05);
      if (player.alpha === 1) state = 'play';
    }

    walkTime = onGround && Math.abs(player.vx) > 0.2 ? walkTime + Math.abs(player.vx) : 0;

    for (const b of blocks) b.bump = Math.max(0, b.bump - 1);
    for (const c of coins) {
      if (!c.taken && overlap(player, { x: c.x, y: c.y, w: 8, h: 8 })) {
        c.taken = true;
        collected++;
      }
    }
    for (const p of pops) {
      p.t++;
      p.y += p.vy;
      p.vy += 0.2;
    }
    while (pops.length && pops[0].t > 26) pops.shift();

    const center = player.x + PW / 2;
    nearHouse =
      state === 'play' && onGround ? houses.find((h) => Math.abs(center - h.door) < 10) ?? null : null;

    const focus = focusHouse ? focusHouse.door : center + player.facing * 24;
    const goal = worldW <= W ? (worldW - W) / 2 : clamp(focus - W / 2, 0, worldW - W);
    camX += (goal - camX) * 0.12;
  }

  // Dibujo.
  const rect = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };

  function drawSky() {
    const bands = ['#7fc9ec', '#8dd0ee', '#9cd7f0', '#acdef2', '#bde5f4', '#cdecf6'];
    const band = Math.ceil((GROUND + offsetY) / bands.length);
    bands.forEach((color, i) => rect(0, i * band, W, band, color));
  }

  function drawCloud(x: number, y: number, big: boolean) {
    const s = big ? 1.4 : 1;
    const r = (dx: number, dy: number, w: number, h: number, c: string) =>
      rect(Math.round(x + dx * s), Math.round(y + dy * s), Math.round(w * s), Math.round(h * s), c);
    r(0, 6, 34, 8, '#ffffff');
    r(6, 2, 14, 6, '#ffffff');
    r(16, 0, 12, 8, '#ffffff');
    r(2, 13, 30, 2, '#dff1fa');
  }

  function drawHills(factor: number, base: number, amp: number, color: string, edge: string) {
    const ground = GROUND + offsetY;
    for (let x = 0; x < W; x++) {
      const wx = x + camX * factor;
      const h = Math.round(base + amp * Math.sin(wx / 47) + amp * 0.6 * Math.sin(wx / 19 + 1.3));
      rect(x, ground - h, 1, h, color);
      rect(x, ground - h, 1, 1, edge);
    }
  }

  function drawTree(x: number) {
    rect(x + 8, GROUND - 22, 6, 22, INK);
    rect(x + 9, GROUND - 22, 4, 22, '#7b5434');
    rect(x, GROUND - 46, 22, 26, INK);
    rect(x - 3, GROUND - 40, 28, 14, INK);
    rect(x + 1, GROUND - 45, 20, 24, '#2b9476');
    rect(x - 2, GROUND - 39, 26, 12, '#2b9476');
    rect(x + 3, GROUND - 43, 6, 4, '#4fb892');
    rect(x, GROUND - 37, 4, 3, '#4fb892');
  }

  function drawBush(x: number) {
    rect(x, GROUND - 8, 20, 8, '#4f9f3f');
    rect(x + 3, GROUND - 12, 14, 5, '#4f9f3f');
    rect(x + 1, GROUND - 7, 18, 6, '#6fbf5a');
    rect(x + 4, GROUND - 11, 12, 4, '#6fbf5a');
    rect(x + 6, GROUND - 10, 3, 2, '#9adb7a');
  }

  function drawHouse(h: House) {
    const x = h.x;
    const top = GROUND - WALL_H;
    const cx = x + HOUSE_W / 2;
    const open = target === h || (state === 'exit' && Math.abs(player.x + PW / 2 - h.door) < 2);

    // Chimenea (el tejado la tapa por abajo).
    rect(x + 56, top - 30, 12, 24, INK);
    rect(x + 57, top - 29, 10, 22, '#a4a4b0');
    rect(x + 55, top - 33, 14, 4, INK);

    // Paredes con tablones.
    rect(x, top, HOUSE_W, WALL_H, INK);
    rect(x + 1, top + 1, HOUSE_W - 2, WALL_H - 2, CREAM);
    for (let y = top + 9; y < GROUND - 4; y += 8) rect(x + 1, y, HOUSE_W - 2, 1, '#e5dcbd');
    rect(x, GROUND - 4, HOUSE_W, 4, INK);
    rect(x + 1, GROUND - 3, HOUSE_W - 2, 3, '#8a8a96');

    // Tejado escalonado con el color de la sección.
    const half = HOUSE_W / 2 + 6;
    for (let i = 0; i <= ROOF_H; i++) {
      const y = top - ROOF_H + i;
      const w = Math.round(2 + (half - 2) * (i / ROOF_H));
      rect(cx - w, y, w * 2, 1, INK);
      if (i > 0 && i < ROOF_H - 1) rect(cx - w + 2, y, w * 2 - 4, 1, Math.floor(i / 3) % 2 ? h.shade : h.color);
    }

    // Ventanas con jardinera.
    for (const wx of [x + 8, x + HOUSE_W - 22]) {
      rect(wx, top + 12, 14, 14, INK);
      rect(wx + 1, top + 13, 12, 12, '#b7d3ff');
      rect(wx + 6, top + 13, 2, 12, INK);
      rect(wx + 1, top + 18, 12, 2, INK);
      rect(wx + 2, top + 14, 2, 2, '#ffffff');
      rect(wx - 1, top + 26, 16, 4, INK);
      rect(wx, top + 27, 14, 2, h.color);
    }

    // Puerta.
    const dx = cx - 9;
    const dy = GROUND - 30;
    rect(dx - 3, GROUND - 2, 24, 2, '#a4a4b0');
    rect(dx, dy, 18, 28, INK);
    if (open) {
      rect(dx + 1, dy + 1, 16, 27, '#3a3128');
    } else {
      rect(dx + 1, dy + 1, 16, 27, '#7b5434');
      rect(dx + 3, dy + 4, 5, 8, '#63432a');
      rect(dx + 10, dy + 4, 5, 8, '#63432a');
      rect(dx + 3, dy + 15, 5, 9, '#63432a');
      rect(dx + 10, dy + 15, 5, 9, '#63432a');
      rect(dx + 13, dy + 14, 2, 2, '#f7d046');
    }
  }

  function drawBlock(b: Block) {
    const y = b.y - Math.round(Math.sin((b.bump / 8) * Math.PI) * 4);
    rect(b.x, y, TILE, TILE, INK);
    if (b.kind === 'question' && !b.used) {
      rect(b.x + 1, y + 1, 14, 14, '#e8b92c');
      rect(b.x + 1, y + 1, 14, 1, '#f7d046');
      rect(b.x + 1, y + 14, 14, 1, '#b08a1c');
      ctx.drawImage(questionImg, b.x + 5, y + 4);
      for (const [px, py] of [[2, 2], [12, 2], [2, 12], [12, 12]]) rect(b.x + px, y + py, 2, 2, INK);
    } else if (b.kind === 'question' || b.kind === 'stone') {
      const [fill, light] = b.kind === 'stone' ? ['#a4a4b0', '#d4d4dc'] : ['#9c6b44', '#b8875c'];
      rect(b.x + 1, y + 1, 14, 14, fill);
      rect(b.x + 1, y + 1, 14, 1, light);
      rect(b.x + 1, y + 1, 1, 14, light);
    } else {
      rect(b.x + 1, y + 1, 14, 14, '#b5623c');
      rect(b.x + 1, y + 5, 14, 1, INK);
      rect(b.x + 1, y + 10, 14, 1, INK);
      rect(b.x + 7, y + 1, 1, 4, INK);
      rect(b.x + 4, y + 6, 1, 4, INK);
      rect(b.x + 11, y + 6, 1, 4, INK);
      rect(b.x + 7, y + 11, 1, 4, INK);
      rect(b.x + 1, y + 1, 6, 1, '#d98a5f');
    }
  }

  function drawCoin(x: number, y: number) {
    const w = Math.max(2, Math.round(Math.abs(Math.cos(tick / 12 + x)) * 8));
    ctx.drawImage(coinImg, Math.round(x + (8 - w) / 2), Math.round(y), w, 8);
  }

  function drawFlag() {
    rect(flag, GROUND - 100, 2, 100, '#8a8a96');
    rect(flag - 2, GROUND - 106, 6, 6, INK);
    rect(flag - 1, GROUND - 105, 4, 4, '#f7d046');
    const wave = Math.round(Math.sin(tick / 10) * 1.5);
    for (let i = 0; i < 14; i++) rect(flag + 2, GROUND - 98 + i, 22 - Math.abs(i - 7) * 3 + (i % 2) * wave, 1, '#2b9476');
    rect(flag - 6, GROUND - 6, 14, 6, INK);
    rect(flag - 5, GROUND - 5, 12, 5, '#a4a4b0');
  }

  function drawPlayer() {
    let frame: Frame = 'stand';
    if (!onGround && state === 'play') frame = 'jump';
    else if (walkTime > 0) frame = Math.floor(walkTime / 6) % 2 ? 'walkA' : 'walkB';
    else if (state === 'enter') frame = Math.floor(tick / 6) % 2 ? 'walkA' : 'walkB';
    const img = player.facing > 0 ? sprites[frame].right : sprites[frame].left;
    ctx.globalAlpha = player.alpha;
    ctx.drawImage(img, Math.round(player.x), Math.round(player.y));
    ctx.globalAlpha = 1;
  }

  function render() {
    drawSky();
    for (const c of clouds) {
      const span = worldW * 0.3 + W + 80;
      const x = ((((c.x - camX * 0.2 + tick * 0.06) % span) + span) % span) - 60;
      drawCloud(x, c.y + offsetY * 0.5, c.big);
    }
    drawHills(0.25, 44, 10, '#a9dca0', '#c6ebbd');
    drawHills(0.5, 22, 7, '#7cc766', '#9adb7a');

    ctx.save();
    ctx.translate(-Math.round(camX), offsetY);
    const from = Math.floor(camX / TILE) * TILE;
    for (let x = from; x < camX + W + TILE; x += TILE) {
      ctx.drawImage(tiles.grass, x, GROUND);
      for (let y = GROUND + TILE; y < WORLD_H + reserve; y += TILE) ctx.drawImage(tiles.dirt, x, y);
    }

    // Poste del cartel de bienvenida.
    rect(BOARD_X - 3, GROUND - 34, 6, 34, INK);
    rect(BOARD_X - 2, GROUND - 34, 4, 34, '#7b5434');

    trees.forEach(drawTree);
    bushes.forEach(drawBush);
    houses.forEach(drawHouse);
    drawFlag();
    blocks.forEach(drawBlock);
    for (const c of coins) if (!c.taken) drawCoin(c.x, c.y + Math.round(Math.sin(tick / 15 + c.x) * 1.5));
    for (const p of pops) drawCoin(p.x, p.y);
    drawPlayer();
    ctx.restore();

    // Capa HTML (carteles y aviso) alineada con el mundo.
    const place = (el: HTMLElement, wx: number, wy: number, minX = -Infinity) => {
      const x = Math.max((wx - camX) * scale, minX);
      el.style.transform = `translate(${x}px, ${(wy + offsetY) * scale}px) translate(-50%, -100%)`;
    };
    // El cartel de bienvenida no se sale por la izquierda aunque sea más ancho que su poste.
    place(board, BOARD_X, GROUND - 30, board.offsetWidth / 2 + 12);
    for (const h of houses) {
      place(h.sign, h.door, GROUND - WALL_H - ROOF_H - 10);
      h.sign.classList.toggle('is-near', h === nearHouse);
    }
    prompt.hidden = !nearHouse;
    root.classList.toggle('can-enter', !!nearHouse);
    if (nearHouse) place(prompt, player.x + PW / 2, player.y - 6);
    coinsLabel.textContent = String(collected).padStart(2, '0');
  }

  // Bucle a paso fijo de 60 Hz, independiente de la tasa de refresco.
  let last = performance.now();
  let acc = 0;
  function frame(now: number) {
    acc = Math.min(acc + (now - last) / 1000, 0.25);
    last = now;
    while (acc >= 1 / 60) {
      step();
      acc -= 1 / 60;
    }
    render();
    requestAnimationFrame(frame);
  }
  camX = worldW <= W ? (worldW - W) / 2 : clamp(player.x + PW / 2 - W / 2, 0, worldW - W);
  root.classList.add('is-ready');
  requestAnimationFrame(frame);
}
