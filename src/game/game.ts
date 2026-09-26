import { coinSprite, groundTiles, mushroomSprite, playerSprites, questionSprite, starSprite, type Frame } from './sprites';

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
const JUMP_V = -5.9;
const JUMP_CUT = -2;
const STAR_SPEED = 3.4;
const STAR_TIME = 600;
const LIVES = 3;

const INK = '#1f1d1a';
const CREAM = '#f6f1e4';
const STORAGE_KEY = 'jorge.dev:game';

type Rect = { x: number; y: number; w: number; h: number };
type Block = Rect & { kind: 'brick' | 'question' | 'stone'; used: boolean; bump: number; item: Item['kind'] | 'coin'; wall?: boolean };
type Item = Rect & { kind: 'mushroom' | 'star'; vx: number; vy: number; rise: number };
type Debris = { x: number; y: number; vx: number; vy: number; t: number; color: string };
type Fireball = Rect & { vx: number; t: number };
type Coin = { x: number; y: number; taken: boolean };
type Pop = { x: number; y: number; vy: number; t: number };
type House = { x: number; door: number; color: string; shade: string; href: string; sign: HTMLAnchorElement; room: HTMLDialogElement };
type State = 'play' | 'enter' | 'room' | 'exit' | 'dead';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const overlap = (a: Rect, b: Rect) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

type Saved = { x?: number };

/** La casa de la que se vuelve, una sola vez: después se borra y la siguiente partida empieza de cero. */
function takeStorage(): Saved {
  try {
    const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
    sessionStorage.removeItem(STORAGE_KEY);
    return value;
  } catch {
    return {};
  }
}

function writeStorage(value: Saved) {
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

  // Con la estrella la ropa va cambiando de color, como en Mario.
  const looks = [
    playerSprites(),
    playerSprites('#f7d046', '#2b9476'),
    playerSprites('#6b5ea8', '#e8574c'),
    playerSprites('#2b9476', '#f7d046'),
  ];
  const mushroomImg = mushroomSprite();
  const starImg = starSprite();
  const coinImg = coinSprite();
  const questionImg = questionSprite();
  const tiles = groundTiles();

  const houses: House[] = [...root.querySelectorAll<HTMLAnchorElement>('.game-sign')].map((sign, i) => {
    const x = FIRST_HOUSE + i * SPACING;
    const room = root.querySelector<HTMLDialogElement>(`dialog[data-room="${sign.dataset.room}"]`)!;
    return { x, door: x + HOUSE_W / 2, color: sign.dataset.color!, shade: sign.dataset.shade!, href: sign.href, sign, room };
  });
  // Tras la última casa, la arena del jefe; al final, el muro y la bandera.
  const ARENA_L = FIRST_HOUSE + (houses.length - 1) * SPACING + HOUSE_W + 70;
  const ARENA_R = ARENA_L + 320;
  const worldW = ARENA_R + 150;

  // Entre cada par de casas, una formación distinta de bloques y monedas.
  const blocks: Block[] = [];
  const coins: Coin[] = [];
  const block = (x: number, y: number, kind: Block['kind'] = 'brick', item: Block['item'] = 'coin') =>
    blocks.push({ x, y, w: TILE, h: TILE, kind, used: false, bump: 0, item });
  const coin = (x: number, y: number) => coins.push({ x, y, taken: false });

  // Muro de piedra de 5 bloques (más alto que el salto): se derrumba al vencer al jefe.
  for (let k = 1; k <= 5; k++) blocks.push({ x: ARENA_R, y: GROUND - TILE * k, w: TILE, h: TILE, kind: 'stone', used: false, bump: 0, item: 'coin', wall: true });

  houses.slice(0, -1).forEach((house, i) => {
    const mid = house.x + HOUSE_W + (SPACING - HOUSE_W) / 2;
    switch (i % 4) {
      // Las plataformas bajas dejan 36 px por debajo: cabe el personaje grande (32).
      case 0:
        block(mid - 24, GROUND - 52);
        block(mid - 8, GROUND - 52, 'question', 'mushroom');
        block(mid + 8, GROUND - 52);
        coin(mid - 20, GROUND - 80);
        coin(mid + 12, GROUND - 80);
        break;
      case 1:
        block(mid - 24, GROUND - 16, 'stone');
        block(mid - 8, GROUND - 16, 'stone');
        block(mid - 8, GROUND - 32, 'stone');
        block(mid + 8, GROUND - 16, 'stone');
        block(mid + 8, GROUND - 32, 'stone');
        block(mid + 8, GROUND - 48, 'stone');
        block(mid + 8, GROUND - 104, 'question', 'star');
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
        block(mid - 40, GROUND - 52);
        block(mid - 24, GROUND - 52);
        block(mid + 8, GROUND - 96);
        block(mid + 24, GROUND - 96, 'question');
        coin(mid + 12, GROUND - 116);
        break;
    }
  });

  const clouds = Array.from({ length: 9 }, (_, i) => ({ x: i * 150 + ((i * 53) % 70), y: 18 + ((i * 37) % 50), big: i % 3 === 0 }));
  const trees = [140, worldW - 40];
  const bushes = houses.flatMap((h) => [h.x - 26, h.x + HOUSE_W + 6]);
  const flag = ARENA_R + 70;
  const BOARD_LEFT = 12;

  // Estado.
  const saved = takeStorage().x;
  const player = { w: PW, h: PH, x: typeof saved === 'number' ? clamp(saved - PW / 2, 0, worldW - PW) : 36, y: GROUND - PH, vx: 0, vy: 0, facing: 1, alpha: 1 };
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
  const items: Item[] = [];
  const debris: Debris[] = [];
  const trail: { x: number; y: number; img: HTMLCanvasElement }[] = [];
  let big = false;
  let growTime = 0;
  let starTime = 0;
  let invuln = 0;
  let lives = LIVES;
  let deadTime = 0;
  const hearts = [...root.querySelectorAll<HTMLElement>('.game-heart')];
  let flagDrop = 0;
  let won = false;
  const fireballs: Fireball[] = [];

  // El jefe: pasea por la arena, salta y escupe fuego. Tres pisotones en la cabeza y cae.
  const boss = {
    x: ARENA_L + 220, y: GROUND - 32, w: 32, h: 32, vx: 0, vy: 0,
    hp: 3, hurt: 0, timer: 0, facing: -1, pace: -1, mouth: 0, dead: false, active: false,
  };

  const keys = { left: false, right: false, jump: false };

  // Con el champiñón mide el doble: 24×32 en vez de 12×16, con los pies en el mismo sitio.
  function shrink() {
    big = false;
    player.x += PW / 2;
    player.y += PH;
    player.w = PW;
    player.h = PH;
  }

  const toast = root.querySelector<HTMLElement>('.game-toast')!;
  let toastTimer = 0;
  function say(text: string) {
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => (toast.hidden = true), 2600);
  }

  // Un golpe quita un corazón: grande vuelve a pequeño; pequeño sale despedido hacia atrás.
  // Sin corazones, el personaje muere y la partida empieza de cero.
  function hurtPlayer(fromX: number) {
    if (invuln > 0 || starTime > 0 || state !== 'play') return;
    lives--;
    if (lives <= 0) return die();
    invuln = 100;
    if (big) return shrink();
    player.vx = player.x + player.w / 2 < fromX ? -3 : 3;
    player.vy = -3.5;
  }

  function die() {
    state = 'dead';
    deadTime = 0;
    player.vx = 0;
    player.vy = -6;
    keys.left = keys.right = keys.jump = false;
    say(root.dataset.gameOver!);
  }

  function hitBoss() {
    if (boss.hurt > 0 || boss.dead) return;
    boss.hp--;
    boss.hurt = 45;
    if (boss.hp > 0) return;
    boss.dead = true;
    boss.vy = -4;
    fireballs.length = 0;
    // El muro se viene abajo y deja paso a la bandera.
    for (const b of blocks.filter((b) => b.wall)) {
      blocks.splice(blocks.indexOf(b), 1);
      debris.push({ x: b.x, y: b.y, vx: -1 + Math.random() * 2, vy: -3 - Math.random() * 2, t: 0, color: '#a4a4b0' });
      debris.push({ x: b.x + 8, y: b.y + 8, vx: -1 + Math.random() * 2, vy: -2 - Math.random() * 2, t: 0, color: '#a4a4b0' });
    }
    say(root.dataset.bossDown!);
  }

  function updateBoss(prevBottom: number) {
    if (boss.dead) {
      boss.vy += GRAVITY;
      boss.y += boss.vy;
      return;
    }
    if (!boss.active) {
      if (player.x > ARENA_L - 40) {
        boss.active = true;
        say(root.dataset.bossHint!);
      }
      return;
    }
    boss.timer++;
    boss.hurt = Math.max(0, boss.hurt - 1);
    boss.mouth = Math.max(0, boss.mouth - 1);
    const grounded = boss.y + boss.h >= GROUND;
    if (grounded) boss.facing = player.x + player.w / 2 < boss.x + boss.w / 2 ? -1 : 1;
    if (boss.timer % 90 === 0) boss.pace = -boss.pace;
    boss.x = clamp(boss.x + boss.pace * 0.45, ARENA_L, ARENA_R - boss.w);
    if (boss.x === ARENA_L || boss.x === ARENA_R - boss.w) boss.pace = -boss.pace;
    if (grounded && boss.timer % 150 === 75) boss.vy = -5;
    boss.vy = Math.min(boss.vy + GRAVITY, MAX_FALL);
    boss.y = Math.min(boss.y + boss.vy, GROUND - boss.h);
    if (boss.y + boss.h >= GROUND) boss.vy = 0;
    if (boss.timer % 110 === 0 && boss.hurt === 0) {
      boss.mouth = 20;
      fireballs.push({ x: boss.facing < 0 ? boss.x - 8 : boss.x + boss.w, y: boss.y + 9, w: 10, h: 6, vx: boss.facing * 1.7, t: 0 });
    }

    if (state !== 'play' || !overlap(player, boss)) return;
    // Pisotón: venía cayendo y en el frame anterior sus pies estaban por encima de la cabeza.
    if (player.vy > 0 && prevBottom <= boss.y + 6) {
      hitBoss();
      player.vy = -5;
    } else if (starTime > 0) {
      hitBoss();
    } else {
      hurtPlayer(boss.x + boss.w / 2);
    }
  }

  function grow() {
    if (big) return;
    big = true;
    growTime = 40;
    player.x = clamp(player.x - PW / 2, 0, worldW - PW * 2);
    player.y -= PH;
    player.w = PW * 2;
    player.h = PH * 2;
  }

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
  };

  // Dentro de la casa: el modal con el adelanto de la sección. Al cerrarlo sales por la puerta.
  function openRoom(house: House) {
    state = 'room';
    target = house;
    player.alpha = 0;
    player.x = house.door - player.w / 2;
    player.vx = player.vy = 0;
    keys.left = keys.right = keys.jump = false;
    house.room.showModal();
  }
  function leaveRoom() {
    if (state !== 'room') return;
    state = 'exit';
    target = null;
  }
  const winDialog = root.querySelector<HTMLDialogElement>('dialog[data-room="win"]')!;
  winDialog.addEventListener('close', () => {
    if (state === 'room') state = 'play';
  });
  winDialog.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el === winDialog || el.closest('[data-close]')) winDialog.close();
  });

  // Ir a la página: la misma transición de iris que antes, recordando la casa para volver.
  function visit(house: House) {
    writeStorage({ x: house.door });
    house.room.close();
    state = 'enter';
    root.style.setProperty('--iris-x', `${(house.door - camX) * scale}px`);
    root.style.setProperty('--iris-y', `${(GROUND - 15 + offsetY) * scale}px`);
    root.classList.add('is-leaving');
    setTimeout(() => location.assign(house.href), 480);
  }
  houses.forEach((house) => {
    house.room.addEventListener('close', leaveRoom);
    house.room.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      // Clic fuera de la tarjeta (en el fondo) o en «Seguir jugando» / ✕.
      if (el === house.room || el.closest('[data-close]')) house.room.close();
    });
    house.room.querySelector<HTMLAnchorElement>('.room-go')!.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      visit(house);
    });
    // Los carteles abren la casa directamente; sin JS siguen siendo enlaces normales.
    house.sign.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      if (state === 'play' || state === 'exit') openRoom(house);
    });
  });
  const pressJump = () => {
    if (state === 'play') jumpBuffer = 6;
  };

  const LEFT = ['ArrowLeft', 'KeyA'];
  const RIGHT = ['ArrowRight', 'KeyD'];
  const JUMP = ['Space', 'ArrowUp', 'KeyW'];
  const ENTER = ['ArrowUp', 'KeyW', 'ArrowDown', 'KeyS', 'KeyE', 'Enter'];

  window.addEventListener('keydown', (e) => {
    // Con una casa abierta el teclado es del modal; Enter sobre un cartel lo abre de forma nativa.
    if (state === 'room' || e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) return;
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
    houses.forEach((h) => h.room.open && h.room.close());
    state = 'exit';
    target = null;
    player.alpha = 0;
    keys.left = keys.right = keys.jump = false;
  });

  // Física.
  function moveX() {
    player.x = clamp(player.x + player.vx, 0, worldW - player.w);
    for (const b of blocks) {
      if (!overlap(player, b)) continue;
      player.x = player.vx > 0 ? b.x - player.w : b.x + b.w;
      player.vx = 0;
    }
  }

  function moveY() {
    player.vy = Math.min(player.vy + GRAVITY, MAX_FALL);
    player.y += player.vy;
    onGround = false;
    if (player.y + player.h >= GROUND) {
      player.y = GROUND - player.h;
      player.vy = 0;
      onGround = true;
    }
    for (const b of blocks) {
      if (!overlap(player, b)) continue;
      if (player.vy > 0) {
        player.y = b.y - player.h;
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
    if (b.kind === 'brick' && big) return smash(b);
    if (b.kind !== 'question' || b.used) return;
    b.used = true;
    if (b.item === 'coin') {
      pops.push({ x: b.x + 4, y: b.y - 8, vy: -3.2, t: 0 });
      collected++;
    } else {
      items.push({ kind: b.item, x: b.x + 2, y: b.y, w: 12, h: 12, vx: 0, vy: 0, rise: 12 });
    }
  }

  // Grande, un cabezazo rompe el ladrillo en cuatro trozos.
  function smash(b: Block) {
    blocks.splice(blocks.indexOf(b), 1);
    for (const [dx, dy, vx] of [[0, 0, -1], [8, 0, 1], [0, 8, -0.7], [8, 8, 0.7]]) {
      debris.push({ x: b.x + dx, y: b.y + dy, vx, vy: dy ? -3 : -4.5, t: 0, color: '#b5623c' });
    }
  }

  function moveItem(it: Item) {
    if (it.rise > 0) {
      it.y -= 1;
      if (--it.rise === 0) it.vx = it.kind === 'star' ? 1 : 0.6;
      return;
    }
    it.x += it.vx;
    if (it.x < 0 || it.x + it.w > worldW || blocks.some((b) => overlap(it, b))) {
      it.x -= it.vx;
      it.vx = -it.vx;
    }
    it.vy = Math.min(it.vy + GRAVITY * 0.8, MAX_FALL);
    it.y += it.vy;
    let landed = it.y + it.h >= GROUND;
    if (landed) it.y = GROUND - it.h;
    for (const b of blocks) {
      if (!overlap(it, b)) continue;
      if (it.vy > 0) {
        it.y = b.y - it.h;
        landed = true;
      } else {
        it.y = b.y + b.h;
        it.vy = 0;
      }
    }
    // La estrella va botando; el champiñón camina.
    if (landed) it.vy = it.kind === 'star' ? -4 : 0;
  }

  function step() {
    tick++;
    const prevBottom = player.y + player.h;
    if (state === 'play') {
      const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      const boost = starTime > 0 ? 1.6 : 1;
      const top = starTime > 0 ? STAR_SPEED : MAX_SPEED;
      if (dir) {
        player.vx = clamp(player.vx + dir * (onGround ? ACCEL : AIR_ACCEL) * boost, -top, top);
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
      const goal = target.door - player.w / 2;
      if (Math.abs(player.x - goal) > 1) {
        player.x += Math.sign(goal - player.x);
      } else if (player.alpha > 0) {
        player.x = goal;
        player.alpha = Math.max(0, player.alpha - 0.06);
        if (player.alpha === 0) openRoom(target);
      }
    } else if (state === 'exit') {
      player.alpha = Math.min(1, player.alpha + 0.05);
      if (player.alpha === 1) state = 'play';
    } else if (state === 'dead') {
      // Como en Mario: se queda quieto un instante, salta y cae fuera de la pantalla.
      deadTime++;
      if (deadTime > 24) {
        player.vy = Math.min(player.vy + GRAVITY, MAX_FALL);
        player.y += player.vy;
      }
      if (deadTime === 120) {
        root.style.setProperty('--iris-x', `${(player.x + player.w / 2 - camX) * scale}px`);
        root.style.setProperty('--iris-y', `${(GROUND - 20 + offsetY) * scale}px`);
        root.classList.add('is-leaving');
        // Empezar de cero es literalmente eso: recargar el pueblo.
        setTimeout(() => location.reload(), 520);
      }
    }

    walkTime = onGround && Math.abs(player.vx) > 0.2 ? walkTime + Math.abs(player.vx) : 0;

    invuln = Math.max(0, invuln - 1);
    updateBoss(prevBottom);
    for (const f of [...fireballs]) {
      f.t++;
      f.x += f.vx;
      f.y += (GROUND - 14 - f.y) * 0.04; // baja hasta la altura del personaje: hay que saltarla
      if (f.t > 260 || f.x < ARENA_L - 60 || f.x > ARENA_R) fireballs.splice(fireballs.indexOf(f), 1);
      else if (state === 'play' && overlap(player, f)) {
        fireballs.splice(fireballs.indexOf(f), 1);
        hurtPlayer(f.x);
      }
    }

    // La bandera: solo se llega con el muro caído.
    if (boss.dead && !won && state === 'play' && player.x + player.w >= flag - 2) {
      won = true;
      state = 'room';
      player.vx = 0;
      keys.left = keys.right = keys.jump = false;
      root.querySelector<HTMLElement>('.win-coins')!.textContent = String(collected);
      setTimeout(() => winDialog.showModal(), 700);
    }
    if (won) flagDrop = Math.min(80, flagDrop + 1.2);

    for (const b of blocks) b.bump = Math.max(0, b.bump - 1);
    for (const it of [...items]) {
      moveItem(it);
      if (it.rise > 0 || !overlap(player, it) || state !== 'play') continue;
      items.splice(items.indexOf(it), 1);
      if (it.kind === 'mushroom') grow();
      else starTime = STAR_TIME;
    }
    for (const d of debris) {
      d.t++;
      d.x += d.vx;
      d.y += d.vy;
      d.vy += GRAVITY;
    }
    while (debris.length && debris[0].t > 60) debris.shift();
    growTime = Math.max(0, growTime - 1);
    starTime = Math.max(0, starTime - 1);
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

    const center = player.x + player.w / 2;
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
    const open = target === h || (state === 'exit' && Math.abs(player.x + player.w / 2 - h.door) < 2);

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
    const top = GROUND - 98 + Math.round(flagDrop);
    for (let i = 0; i < 14; i++) rect(flag + 2, top + i, 22 - Math.abs(i - 7) * 3 + (i % 2) * wave, 1, '#2b9476');
    rect(flag - 6, GROUND - 6, 14, 6, INK);
    rect(flag - 5, GROUND - 5, 12, 5, '#a4a4b0');
  }

  // Rey dragón pixel-art, dibujado mirando a la izquierda; se voltea para mirar a la derecha.
  function drawBoss() {
    if (boss.hurt > 0 && Math.floor(boss.hurt / 4) % 2) return;
    ctx.save();
    ctx.translate(Math.round(boss.x + boss.w / 2), Math.round(boss.y + boss.h / 2));
    ctx.scale(boss.facing > 0 ? -1 : 1, boss.dead ? -1 : 1);
    ctx.translate(-16, -16);
    const step = boss.active && !boss.dead && Math.floor(boss.timer / 10) % 2 ? 1 : 0;
    const shell = '#2b9476';
    const skin = '#e8b92c';
    // Pies
    rect(5 - step, 27, 9, 5, INK); rect(6 - step, 28, 7, 3, skin); rect(5 - step, 30, 2, 2, CREAM);
    rect(19 + step, 27, 9, 5, INK); rect(20 + step, 28, 7, 3, skin); rect(19 + step, 30, 2, 2, CREAM);
    // Caparazón con pinchos
    rect(13, 8, 19, 21, INK);
    rect(14, 9, 17, 19, shell);
    rect(15, 10, 6, 3, '#4fb892');
    rect(14, 25, 17, 3, CREAM);
    for (const sx of [15, 21, 27]) {
      rect(sx, 5, 4, 5, INK);
      rect(sx + 1, 5, 2, 4, CREAM);
      rect(sx + 1, 3, 2, 2, INK);
    }
    // Barriga y brazo
    rect(7, 12, 12, 16, INK);
    rect(8, 13, 10, 14, '#f7d046');
    for (let y = 16; y < 27; y += 3) rect(8, y, 10, 1, '#c9a227');
    rect(4, 16, 7, 5, INK); rect(5, 17, 5, 3, skin); rect(3, 17, 2, 2, CREAM);
    // Cabeza, hocico, cuernos y cresta
    rect(3, 0, 15, 14, INK);
    rect(4, 1, 13, 12, skin);
    rect(0, 6, 7, 8, INK);
    rect(1, 7, 6, 6, skin);
    rect(1, 7, 2, 1, INK);
    rect(5, -3, 3, 4, INK); rect(6, -3, 1, 3, CREAM);
    rect(12, -3, 3, 4, INK); rect(13, -3, 1, 3, CREAM);
    rect(15, 1, 5, 9, '#e8574c'); rect(15, 1, 5, 1, INK); rect(19, 1, 1, 9, INK);
    // Ojo con ceja enfadada
    rect(6, 3, 5, 5, INK); rect(7, 4, 3, 3, '#ffffff'); rect(7, 5, 2, 2, INK);
    rect(5, 2, 4, 1, INK);
    // Boca: abierta al escupir fuego
    if (boss.mouth > 0) {
      rect(0, 10, 8, 4, INK); rect(1, 11, 6, 2, '#e8574c'); rect(2, 10, 1, 1, CREAM); rect(5, 10, 1, 1, CREAM);
    } else {
      rect(1, 11, 7, 1, INK); rect(2, 12, 1, 1, CREAM); rect(5, 12, 1, 1, CREAM);
    }
    ctx.restore();

    // Vidas encima de la cabeza.
    if (boss.active && !boss.dead) {
      for (let i = 0; i < 3; i++) {
        const hx = Math.round(boss.x + boss.w / 2 - 13 + i * 9);
        const hy = Math.round(boss.y - 12);
        rect(hx, hy, 7, 7, INK);
        rect(hx + 1, hy + 1, 5, 5, i < boss.hp ? '#e8574c' : '#5c5c68');
      }
    }
  }

  function drawFireball(f: Fireball) {
    const x = Math.round(f.x);
    const y = Math.round(f.y);
    const flick = Math.floor(tick / 4) % 2;
    rect(x, y, 10, 6, INK);
    rect(x + 1, y + 1, 8, 4, flick ? '#e8574c' : '#f79a3a');
    rect(x + (f.vx < 0 ? 1 : 5), y + 2, 4, 2, '#f7d046');
  }

  function drawItem(it: Item) {
    ctx.drawImage(it.kind === 'star' ? starImg : mushroomImg, Math.round(it.x), Math.round(it.y));
  }

  function drawPlayer() {
    let frame: Frame = 'stand';
    if ((!onGround && state === 'play') || state === 'dead') frame = 'jump';
    else if (walkTime > 0) frame = Math.floor(walkTime / 6) % 2 ? 'walkA' : 'walkB';
    else if (state === 'enter') frame = Math.floor(tick / 6) % 2 ? 'walkA' : 'walkB';
    // Con la estrella cambia de ropa cada pocos frames y deja estela.
    const look = starTime > 0 ? looks[1 + (Math.floor(tick / 4) % 3)] : looks[0];
    const img = player.facing > 0 ? look[frame].right : look[frame].left;
    // Al crecer parpadea entre los dos tamaños, como en Mario.
    const drawBig = big && !(growTime > 0 && Math.floor(growTime / 5) % 2);
    const w = drawBig ? PW * 2 : PW;
    const h = drawBig ? PH * 2 : PH;
    const x = Math.round(player.x + (player.w - w) / 2);
    const y = Math.round(player.y + player.h - h);
    if (starTime > 0 && tick % 3 === 0) {
      trail.push({ x, y, img });
      if (trail.length > 4) trail.shift();
    } else if (starTime === 0) {
      trail.length = 0;
    }
    trail.forEach((t, i) => {
      ctx.globalAlpha = 0.12 * (i + 1) * player.alpha;
      ctx.drawImage(t.img, t.x, t.y, w, h);
    });
    // Tras un golpe parpadea mientras es invulnerable.
    ctx.globalAlpha = invuln > 0 && Math.floor(invuln / 4) % 2 ? 0.25 : player.alpha;
    ctx.drawImage(img, x, y, w, h);
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

    // Poste del cartel de bienvenida, centrado bajo el cartel sea cual sea su ancho.
    const boardX = Math.round(BOARD_LEFT + board.offsetWidth / scale / 2);
    rect(boardX - 3, GROUND - 34, 6, 34, INK);
    rect(boardX - 2, GROUND - 34, 4, 34, '#7b5434');

    trees.forEach(drawTree);
    bushes.forEach(drawBush);
    houses.forEach(drawHouse);
    drawFlag();
    blocks.forEach(drawBlock);
    for (const c of coins) if (!c.taken) drawCoin(c.x, c.y + Math.round(Math.sin(tick / 15 + c.x) * 1.5));
    for (const p of pops) drawCoin(p.x, p.y);
    items.forEach(drawItem);
    for (const d of debris) {
      rect(Math.round(d.x), Math.round(d.y), 6, 6, INK);
      rect(Math.round(d.x) + 1, Math.round(d.y) + 1, 4, 4, d.color);
    }
    if (boss.y < WORLD_H + 40) drawBoss();
    fireballs.forEach(drawFireball);
    drawPlayer();
    ctx.restore();

    // Capa HTML (carteles y aviso) alineada con el mundo.
    const place = (el: HTMLElement, wx: number, wy: number) => {
      el.style.transform = `translate(${(wx - camX) * scale}px, ${(wy + offsetY) * scale}px) translate(-50%, -100%)`;
    };
    place(board, boardX, GROUND - 30);
    for (const h of houses) {
      place(h.sign, h.door, GROUND - WALL_H - ROOF_H - 10);
      h.sign.classList.toggle('is-near', h === nearHouse);
    }
    prompt.hidden = !nearHouse;
    root.classList.toggle('can-enter', !!nearHouse);
    if (nearHouse) place(prompt, player.x + player.w / 2, player.y - 6);
    coinsLabel.textContent = String(collected).padStart(2, '0');
    hearts.forEach((heart, i) => heart.classList.toggle('is-lost', i >= lives));
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
  camX = worldW <= W ? (worldW - W) / 2 : clamp(player.x + player.w / 2 - W / 2, 0, worldW - W);
  // Solo en desarrollo: estado a mano para depurar desde la consola o los tests.
  if (import.meta.env.DEV) Object.assign(window, { __game: { player, boss, blocks, get state() { return state; } } });
  root.classList.add('is-ready');
  requestAnimationFrame(frame);
}
