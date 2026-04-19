const navButtons = [...document.querySelectorAll('.nav-btn')];
const screens = [...document.querySelectorAll('.screen')];
const toast = document.getElementById('toast');
const fpsValue = document.getElementById('fpsValue');
const coordsValue = document.getElementById('coordsValue');
const cameraValue = document.getElementById('cameraValue');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let debugMode = 1;
let cameraIndex = 0;
const cameraModes = ['First Person', 'Third Back', 'Third Front'];

const state = {
  keys: new Set(),
  player: { x: 440, y: 230, size: 18, speed: 170 },
  world: { width: 880, height: 420 },
  fps: 0,
  lastTs: 0,
  accFrames: 0,
  accTime: 0,
};

function showScreen(id) {
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.screen === id));
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
}

function hint(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(hint.timer);
  hint.timer = setTimeout(() => toast.classList.remove('show'), 1400);
}

navButtons.forEach(btn => btn.addEventListener('click', () => showScreen(btn.dataset.screen)));

document.addEventListener('keydown', (e) => {
  const tag = (document.activeElement?.tagName || '').toLowerCase();
  if (!['input', 'textarea', 'select'].includes(tag)) {
    if (e.key === 'F7') {
      e.preventDefault();
      showScreen('mods');
      hint('Opened Mod Hub (F7)');
      return;
    }
    if (e.key === 'F3') {
      e.preventDefault();
      debugMode = (debugMode + 1) % 3;
      const labels = ['Hidden', 'Standard', 'Advanced'];
      hint(`F3 mode: ${labels[debugMode]}`);
      return;
    }
    if (e.key === 'F5') {
      e.preventDefault();
      cameraIndex = (cameraIndex + 1) % cameraModes.length;
      cameraValue.textContent = cameraModes[cameraIndex];
      hint(`Camera: ${cameraModes[cameraIndex]}`);
      return;
    }
  }
  if (['w', 'a', 's', 'd', 'W', 'A', 'S', 'D', 'Shift'].includes(e.key)) {
    state.keys.add(e.key.toLowerCase());
  }
});

document.addEventListener('keyup', (e) => state.keys.delete(e.key.toLowerCase()));

canvas.addEventListener('click', () => canvas.focus());
canvas.tabIndex = 0;

function update(dt) {
  const speed = state.player.speed * (state.keys.has('shift') ? 1.7 : 1);
  let vx = 0;
  let vy = 0;
  if (state.keys.has('w')) vy -= 1;
  if (state.keys.has('s')) vy += 1;
  if (state.keys.has('a')) vx -= 1;
  if (state.keys.has('d')) vx += 1;

  const mag = Math.hypot(vx, vy) || 1;
  state.player.x += (vx / mag) * speed * dt;
  state.player.y += (vy / mag) * speed * dt;

  const p = state.player;
  p.x = Math.max(p.size, Math.min(state.world.width - p.size, p.x));
  p.y = Math.max(p.size, Math.min(state.world.height - p.size, p.y));

  coordsValue.textContent = `${Math.round(p.x)}, ${Math.round(p.y)}`;
}

function drawGrid() {
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = '#2a4d36';
  for (let x = 0; x <= state.world.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, state.world.height * 0.6);
    ctx.lineTo(x, state.world.height);
    ctx.stroke();
  }
  for (let y = state.world.height * 0.6; y <= state.world.height; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(state.world.width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlayer() {
  const { x, y, size } = state.player;
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(x - size, y - size, size * 2, size * 2);
  ctx.fillStyle = '#2a2d42';
  ctx.fillRect(x - 6, y - 4, 4, 4);
  ctx.fillRect(x + 2, y - 4, 4, 4);
}

function drawDebug() {
  if (debugMode === 0) return;
  ctx.save();
  ctx.fillStyle = 'rgba(8, 13, 30, 0.78)';
  ctx.fillRect(8, 8, debugMode === 1 ? 190 : 310, debugMode === 1 ? 56 : 92);
  ctx.fillStyle = '#e8edff';
  ctx.font = '12px monospace';
  ctx.fillText(`FPS: ${state.fps}`, 16, 28);
  ctx.fillText(`Player: ${Math.round(state.player.x)}, ${Math.round(state.player.y)}`, 16, 44);
  if (debugMode === 2) {
    ctx.fillText(`Camera: ${cameraModes[cameraIndex]}`, 16, 60);
    ctx.fillText(`Keys: ${[...state.keys].join(', ') || 'none'}`, 16, 76);
  }
  ctx.restore();
}

function render() {
  ctx.clearRect(0, 0, state.world.width, state.world.height);

  ctx.fillStyle = '#7fb3ff';
  ctx.fillRect(0, 0, state.world.width, state.world.height * 0.6);
  ctx.fillStyle = '#5f9d4c';
  ctx.fillRect(0, state.world.height * 0.6, state.world.width, state.world.height * 0.4);

  drawGrid();
  drawPlayer();
  drawDebug();
}

function frame(ts) {
  if (!state.lastTs) state.lastTs = ts;
  const dt = Math.min((ts - state.lastTs) / 1000, 0.05);
  state.lastTs = ts;

  update(dt);
  render();

  state.accFrames += 1;
  state.accTime += dt;
  if (state.accTime >= 0.3) {
    state.fps = Math.round(state.accFrames / state.accTime);
    fpsValue.textContent = state.fps;
    state.accFrames = 0;
    state.accTime = 0;
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
