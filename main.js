import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

/** ========= RAW TELEMETRY (yours) ========= */
const TELEMETRY = [
  {"a":-31.4,"h":"5.0","s":98.0,"t":"2025-08-15T20:18:43.600","ac":2.8,"ar":14.5},
  {"a":-28.5,"h":"1.7","s":100.0,"t":"2025-08-15T20:18:43.800","ac":4.2,"ar":19.5},
  {"a":-23.6,"h":"356.8","s":104.0,"t":"2025-08-15T20:18:44","ac":4.9,"ar":14.7},
  {"a":-24.6,"h":"353.8","s":107.0,"t":"2025-08-15T20:18:44.200","ac":4.2,"ar":9.5},
  {"a":-27.4,"h":"350.0","s":110.0,"t":"2025-08-15T20:18:44.400","ac":2.1,"ar":10.5},
  {"a":-28.8,"h":"346.6","s":110.0,"t":"2025-08-15T20:18:44.600","ac":-3.5,"ar":17.0},
  {"a":-34.2,"h":"345.6","s":105.0,"t":"2025-08-15T20:18:44.800","ac":-7.6,"ar":29.5},
  {"a":-40.6,"h":"345.2","s":99.0,"t":"2025-08-15T20:18:45","ac":-8.3,"ar":22.7},
  {"a":-43.3,"h":"344.3","s":93.0,"t":"2025-08-15T20:18:45.200","ac":-6.9,"ar":7.7},
  {"a":-42.9,"h":"342.3","s":89.0,"t":"2025-08-15T20:18:45.400","ac":-6.2,"ar":7.8},
  {"a":-45.6,"h":"340.8","s":84.0,"t":"2025-08-15T20:18:45.600","ac":-6.9,"ar":19.5},
  {"a":-50.7,"h":"338.8","s":79.0,"t":"2025-08-15T20:18:45.800","ac":-6.9,"ar":25.7},
  {"a":-55.9,"h":"337.3","s":74.0,"t":"2025-08-15T20:18:46","ac":-6.2,"ar":16.7},
  {"a":-54.4,"h":"333.3","s":70.0,"t":"2025-08-15T20:18:46.200","ac":-5.6,"ar":5.5},
  {"a":-53.7,"h":"331.1","s":66.0,"t":"2025-08-15T20:18:46.400","ac":-5.6,"ar":3.0},
  {"a":-54.2,"h":"328.6","s":62.0,"t":"2025-08-15T20:18:46.600","ac":-5.6,"ar":6.7},
  {"a":-56.4,"h":"324.6","s":58.0,"t":"2025-08-15T20:18:46.800","ac":-5.6,"ar":13.8},
  {"a":-59.7,"h":"321.1","s":54.0,"t":"2025-08-15T20:18:47","ac":-5.6,"ar":9.7},
  {"a":-60.3,"h":"316.3","s":50.0,"t":"2025-08-15T20:18:47.200","ac":-2.1,"ar":15.0},
  {"a":-54.9,"h":"306.9","s":51.0,"t":"2025-08-15T20:18:47.400","ac":1.4,"ar":22.5},
  {"a":-51.3,"h":"298.9","s":52.0,"t":"2025-08-15T20:18:47.600","ac":2.1,"ar":9.8},
  {"a":-51.6,"h":"290.8","s":54.0,"t":"2025-08-15T20:18:47.800","ac":4.2,"ar":3.8},
  {"a":-50.4,"h":"281.3","s":58.0,"t":"2025-08-15T20:18:48","ac":4.9,"ar":5.5},
  {"a":-51.4,"h":"274.2","s":61.0,"t":"2025-08-15T20:18:48.200","ac":3.5,"ar":3.5},
  {"a":-51.0,"h":"267.1","s":63.0,"t":"2025-08-15T20:18:48.400","ac":1.4,"ar":6.0},
  {"a":-53.0,"h":"261.4","s":63.0,"t":"2025-08-15T20:18:48.600","ac":-2.8,"ar":18.8},
  {"a":-58.5,"h":"256.9","s":59.0,"t":"2025-08-15T20:18:48.800","ac":-5.6,"ar":25.5},
  {"a":-63.2,"h":"250.8","s":55.0,"t":"2025-08-15T20:18:49","ac":-4.9,"ar":14.3},
  {"a":-64.2,"h":"243.2","s":52.0,"t":"2025-08-15T20:18:49.200","ac":-2.1,"ar":6.5},
  {"a":-65.8,"h":"233.3","s":52.0,"t":"2025-08-15T20:18:49.400","ac":-1.4,"ar":10.5},
  {"a":-68.4,"h":"225.1","s":50.0,"t":"2025-08-15T20:18:49.600","ac":-1.4,"ar":6.5},
  {"a":-68.4,"h":"216.1","s":50.0,"t":"2025-08-15T20:18:49.800","ac":-0.7,"ar":9.0},
  {"a":-64.8,"h":"207.4","s":49.0,"t":"2025-08-15T20:18:50","ac":-0.7,"ar":23.0},
  {"a":-59.2,"h":"198.7","s":49.0,"t":"2025-08-15T20:18:50.200","ac":1.4,"ar":23.8},
  {"a":-55.3,"h":"190.0","s":51.0,"t":"2025-08-15T20:18:50.400","ac":0.7,"ar":10.5},
  {"a":-55.0,"h":"184.7","s":50.0,"t":"2025-08-15T20:18:50.600","ac":-1.4,"ar":6.0},
  {"a":-52.9,"h":"178.2","s":49.0,"t":"2025-08-15T20:18:50.800","ac":-0.7,"ar":8.8},
  {"a":-51.5,"h":"172.5","s":49.0,"t":"2025-08-15T20:18:51","ac":-0.7,"ar":4.0},
  {"a":-51.3,"h":"167.8","s":48.0,"t":"2025-08-15T20:18:51.200","ac":0.0,"ar":2.5},
  {"a":-52.1,"h":"161.5","s":49.0,"t":"2025-08-15T20:18:51.400","ac":0.7,"ar":9.5},
  {"a":-55.1,"h":"155.3","s":49.0,"t":"2025-08-15T20:18:51.600","ac":0.7,"ar":17.2},
  {"a":-59.0,"h":"148.7","s":50.0,"t":"2025-08-15T20:18:51.800","ac":1.4,"ar":18.2},
  {"a":-62.4,"h":"142.3","s":51.0,"t":"2025-08-15T20:18:52","ac":1.4,"ar":19.0},
  {"a":-58.2,"h":"134.6","s":52.0,"t":"2025-08-15T20:18:52.200","ac":0.7,"ar":35.2},
  {"a":-48.3,"h":"128.6","s":52.0,"t":"2025-08-15T20:18:52.400","ac":1.4,"ar":178.0},
  {"a":13.0,"h":"124.3","s":54.0,"t":"2025-08-15T20:18:52.600","ac":4.2,"ar":244.5},
  {"a":49.5,"h":"121.1","s":58.0,"t":"2025-08-15T20:18:52.800","ac":6.2,"ar":98.5},
  {"a":52.4,"h":"119.2","s":63.0,"t":"2025-08-15T20:18:53","ac":6.9,"ar":37.5},
  {"a":40.3,"h":"119.2","s":68.0,"t":"2025-08-15T20:18:53.200","ac":6.9,"ar":51.8},
  {"a":31.7,"h":"121.7","s":73.0,"t":"2025-08-15T20:18:53.400","ac":2.8,"ar":38.2},
  {"a":38.4,"h":"125.6","s":72.0,"t":"2025-08-15T20:18:53.600","ac":-2.8,"ar":38.8},
  {"a":47.2,"h":"126.9","s":69.0,"t":"2025-08-15T20:18:53.800","ac":-4.9,"ar":34.8},
  {"a":52.3,"h":"130.1","s":65.0,"t":"2025-08-15T20:18:54","ac":-4.9,"ar":18.5},
  {"a":54.6,"h":"134.3","s":62.0,"t":"2025-08-15T20:18:54.200","ac":-4.9,"ar":12.3},
  {"a":57.2,"h":"140.5","s":58.0,"t":"2025-08-15T20:18:54.400","ac":-5.6,"ar":14.2},
  {"a":60.3,"h":"145.2","s":54.0,"t":"2025-08-15T20:18:54.600","ac":-3.5,"ar":9.5},
  {"a":61.0,"h":"154.0","s":53.0,"t":"2025-08-15T20:18:54.800","ac":-0.7,"ar":2.3},
  {"a":61.2,"h":"163.7","s":53.0,"t":"2025-08-15T20:18:55","ac":-0.7,"ar":4.0},
  {"a":59.8,"h":"171.8","s":52.0,"t":"2025-08-15T20:18:55.200","ac":-1.4,"ar":11.2},
  {"a":56.7,"h":"178.5","s":51.0,"t":"2025-08-15T20:18:55.400","ac":-2.1,"ar":19.5},
  {"a":52.0,"h":"183.9","s":49.0,"t":"2025-08-15T20:18:55.600","ac":-2.1,"ar":26.8},
  {"a":46.0,"h":"189.9","s":48.0,"t":"2025-08-15T20:18:55.800","ac":-0.7,"ar":20.0},
  {"a":44.0,"h":"195.6","s":48.0,"t":"2025-08-15T20:18:56","ac":2.1,"ar":8.2},
  {"a":42.7,"h":"202.3","s":51.0,"t":"2025-08-15T20:18:56.200","ac":2.1,"ar":7.0},
  {"a":41.2,"h":"208.3","s":51.0,"t":"2025-08-15T20:18:56.400","ac":0.0,"ar":8.0},
  {"a":42.9,"h":"212.6","s":51.0,"t":"2025-08-15T20:18:56.600","ac":0.7,"ar":11.7},
  {"a":45.9,"h":"218.4","s":52.0,"t":"2025-08-15T20:18:56.800","ac":2.1,"ar":20.8},
  {"a":51.2,"h":"225.3","s":54.0,"t":"2025-08-15T20:18:57","ac":1.4,"ar":22.0},
  {"a":54.7,"h":"231.0","s":54.0,"t":"2025-08-15T20:18:57.200","ac":0.0,"ar":16.0},
  {"a":57.6,"h":"236.6","s":54.0,"t":"2025-08-15T20:18:57.400","ac":-0.7,"ar":9.2},
  {"a":58.4,"h":"242.6","s":53.0,"t":"2025-08-15T20:18:57.600","ac":-1.4,"ar":3.2},
  {"a":57.9,"h":"249.1","s":52.0,"t":"2025-08-15T20:18:57.800","ac":-0.7,"ar":2.0},
  {"a":57.6,"h":"256.0","s":52.0,"t":"2025-08-15T20:18:58","ac":0.0,"ar":3.5},
  {"a":58.7,"h":"263.2","s":52.0,"t":"2025-08-15T20:18:58.200","ac":0.7,"ar":9.0},
  {"a":61.2,"h":"270.5","s":53.0,"t":"2025-08-15T20:18:58.400","ac":0.7,"ar":10.2},
  {"a":62.8,"h":"277.9","s":53.0,"t":"2025-08-15T20:18:58.600","ac":-0.7,"ar":8.2},
  {"a":64.5,"h":"284.1","s":52.0,"t":"2025-08-15T20:18:58.800","ac":0.0,"ar":13.0},
  {"a":61.0,"h":"292.2","s":53.0,"t":"2025-08-15T20:18:59","ac":0.7,"ar":22.5},
  {"a":55.5,"h":"299.6","s":53.0,"t":"2025-08-15T20:18:59.200","ac":0.7,"ar":35.0},
  {"a":47.0,"h":"307.3","s":54.0,"t":"2025-08-15T20:18:59.400","ac":2.1,"ar":52.0},
  {"a":34.7,"h":"313.3","s":56.0,"t":"2025-08-15T20:18:59.600","ac":3.5,"ar":74.8},
  {"a":17.1,"h":"317.4","s":59.0,"t":"2025-08-15T20:18:59.800","ac":4.2,"ar":99.2},
  {"a":-5.0,"h":"319.2","s":62.0,"t":"2025-08-15T20:19:00","ac":5.6,"ar":96.8},
  {"a":-21.6,"h":"319.3","s":67.0,"t":"2025-08-15T20:19:00.200","ac":7.6,"ar":75.7},
  {"a":-35.3,"h":"316.8","s":73.0,"t":"2025-08-15T20:19:00.400","ac":3.5,"ar":56.0},
  {"a":-44.0,"h":"312.9","s":72.0,"t":"2025-08-15T20:19:00.600","ac":-2.8,"ar":49.0},
  {"a":-54.9,"h":"310.9","s":69.0,"t":"2025-08-15T20:19:00.800","ac":-4.9,"ar":52.7},
  {"a":-65.1,"h":"306.9","s":65.0,"t":"2025-08-15T20:19:01","ac":-5.6,"ar":37.5},
  {"a":-69.9,"h":"303.9","s":61.0,"t":"2025-08-15T20:19:01.200","ac":-5.6,"ar":16.0},
  {"a":-71.5,"h":"299.0","s":57.0,"t":"2025-08-15T20:19:01.400","ac":-3.5,"ar":9.0},
  {"a":-69.5,"h":"290.4","s":56.0,"t":"2025-08-15T20:19:01.600","ac":-1.4,"ar":13.5},
  {"a":-66.1,"h":"281.2","s":55.0,"t":"2025-08-15T20:19:01.800","ac":-0.7,"ar":10.0},
  {"a":-65.5,"h":"273.5","s":55.0,"t":"2025-08-15T20:19:02","ac":-0.7,"ar":1.7},
  {"a":-65.6,"h":"266.0","s":54.0,"t":"2025-08-15T20:19:02.200","ac":-2.1,"ar":4.5},
  {"a":-67.3,"h":"258.9","s":52.0,"t":"2025-08-15T20:19:02.400","ac":-0.7,"ar":5.0},
  {"a":-67.6,"h":"251.0","s":53.0,"t":"2025-08-15T20:19:02.600","ac":0.0,"ar":5.0},
  {"a":-69.3,"h":"244.8","s":52.0,"t":"2025-08-15T20:19:02.800","ac":-0.7,"ar":8.0},
  {"a":-67.8,"h":"237.4","s":52.0,"t":"2025-08-15T20:19:03","ac":-0.7,"ar":6.8},
  {"a":-66.6,"h":"230.5","s":51.0,"t":"2025-08-15T20:19:03.200","ac":-1.4,"ar":3.8},
  {"a":-66.9,"h":"223.8","s":50.0,"t":"2025-08-15T20:19:03.400","ac":-0.7,"ar":5.8},
  {"a":-64.9,"h":"216.1","s":50.0,"t":"2025-08-15T20:19:03.600","ac":0.0,"ar":12.3},
  {"a":-62.0,"h":"208.4","s":50.0,"t":"2025-08-15T20:19:03.800","ac":0.0,"ar":8.0},
  {"a":-61.7,"h":"202.1","s":50.0,"t":"2025-08-15T20:19:04","ac":-0.7,"ar":4.3},
  {"a":-60.3,"h":"196.2","s":49.0,"t":"2025-08-15T20:19:04.200","ac":0.0,"ar":8.8},
  {"a":-58.2,"h":"190.1","s":50.0,"t":"2025-08-15T20:19:04.400","ac":0.0,"ar":8.2},
  {"a":-57.0,"h":"184.7","s":49.0,"t":"2025-08-15T20:19:04.600","ac":-1.4,"ar":3.5},
  {"a":-57.2,"h":"179.7","s":48.0,"t":"2025-08-15T20:19:04.800","ac":0.0,"ar":3.8},
  {"a":-58.5,"h":"172.5","s":49.0,"t":"2025-08-15T20:19:05","ac":1.4,"ar":5.5},
  {"a":-59.4,"h":"164.9","s":50.0,"t":"2025-08-15T20:19:05.200","ac":0.7,"ar":12.8},
  {"a":-63.6,"h":"158.6","s":50.0,"t":"2025-08-15T20:19:05.400","ac":0.0,"ar":14.0},
  {"a":-65.0,"h":"151.5","s":50.0,"t":"2025-08-15T20:19:05.600","ac":0.7,"ar":4.0},
  {"a":-64.8,"h":"144.0","s":51.0,"t":"2025-08-15T20:19:05.800","ac":0.7,"ar":2.8},
  {"a":-63.9,"h":"136.3","s":51.0,"t":"2025-08-15T20:19:06","ac":0.7,"ar":5.0},
  {"a":-62.8,"h":"127.9","s":52.0,"t":"2025-08-15T20:19:06.200","ac":0.0,"ar":5.3},
  {"a":-63.8,"h":"121.3","s":51.0,"t":"2025-08-15T20:19:06.400","ac":0.0,"ar":6.2},
  {"a":-62.3,"h":"113.2","s":52.0,"t":"2025-08-15T20:19:06.600","ac":0.7,"ar":7.2},
  {"a":-60.9,"h":"106.4","s":52.0,"t":"2025-08-15T20:19:06.800","ac":-0.7,"ar":5.2},
  {"a":-60.2,"h":"100.9","s":51.0,"t":"2025-08-15T20:19:07","ac":0.0,"ar":5.0},
  {"a":-58.9,"h":"95.3","s":52.0,"t":"2025-08-15T20:19:07.200","ac":1.4,"ar":6.5}
];

/* ========== UI refs (declare ONCE) ========== */
const app   = document.getElementById('app');
const tEl   = document.getElementById('t');
const vEl   = document.getElementById('v');
const aEl   = document.getElementById('a');
const xEl   = document.getElementById('x');
const btn   = document.getElementById('playPause');
const scrub = document.getElementById('scrub');
const rateSel = document.getElementById('rate');
const viewToggle = document.getElementById('viewToggle');

/* ========== Three.js setup ========== */
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f14);

const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 5000);
camera.position.set(20, 25, 20);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = true;
controls.minDistance = 2;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI * 0.499;

scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 1));
const sun = new THREE.DirectionalLight(0xffffff, 0.9);
sun.position.set(30, 60, 30);
scene.add(sun);

/* ========== Build map path from telemetry (dead-reckon) ========== */
const kphToMps = k => k * (1000/3600);

// normalize & zero time
const rows = TELEMETRY.map(r => ({
  t: new Date(r.t).getTime() / 1000,
  speed_kph: Number(r.s),
  accel_ms2: Number(r.ac),
  angle_deg: Number(r.a),
  angle_rate_dps: Number(r.ar),
  heading_deg: Number(r.h)
}));
const t0 = rows[0].t;
rows.forEach(r => r.t -= t0);

// integrate XY
const pts = [];
let x = 0, z = 0;
let lastT = rows[0].t;
pts.push(new THREE.Vector3(x, 0, z));

for (let i=1; i<rows.length; i++){
  const r = rows[i];
  const dt = Math.max(0, r.t - lastT);
  lastT = r.t;

  const v = kphToMps(r.speed_kph || 0);
  const dist = v * dt;

  // Heading: 0° = +Z (north), clockwise
  const headRad = THREE.MathUtils.degToRad(r.heading_deg || 0);
  const dx = Math.sin(headRad) * dist;
  const dz = Math.cos(headRad) * dist;

  x += dx; z += dz;
  pts.push(new THREE.Vector3(x, 0, z));
}

// center/scale
let minX=Infinity, maxX=-Infinity, minZ=Infinity, maxZ=-Infinity;
for (const p of pts){ minX=Math.min(minX,p.x); maxX=Math.max(maxX,p.x); minZ=Math.min(minZ,p.z); maxZ=Math.max(maxZ,p.z); }
const cx = (minX + maxX)/2, cz = (minZ + maxZ)/2;
const size = Math.max(maxX-minX, maxZ-minZ) || 1;
const scale = 1/ (size / 40);

const scaledPts = pts.map(p => new THREE.Vector3( (p.x - cx)*scale, 0, (p.z - cz)*scale ));

// path line
{
  const g = new THREE.BufferGeometry().setFromPoints(scaledPts.map(p => new THREE.Vector3(p.x, 0.02, p.z)));
  const m = new THREE.LineBasicMaterial({ color: 0x5a86ff });
  scene.add(new THREE.Line(g, m));
}

// ground plane
{
  const planeW = 1.3 * (maxX-minX)*scale + 10;
  const planeH = 1.3 * (maxZ-minZ)*scale + 10;
  const geo = new THREE.PlaneGeometry(planeW, planeH);
  const mat = new THREE.MeshStandardMaterial({ color: 0x151b22, roughness: 1, metalness: 0 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI/2;
  scene.add(mesh);
}

// car
const car = new THREE.Mesh(
  new THREE.BoxGeometry(0.9, 0.4, 2.0),
  new THREE.MeshStandardMaterial({ color: 0xffc14e, metalness:0.1, roughness:0.6 })
);
car.position.copy(scaledPts[0]).setY(0.2);
scene.add(car);

// states for playback
const states = rows.map((r, i) => {
  const pos = scaledPts[i];
  const yaw = THREE.MathUtils.degToRad((r.heading_deg || 0) + (r.angle_deg || 0));
  return {
    t: r.t,
    pos,
    yaw,
    speed_mps: kphToMps(r.speed_kph || 0),
    accel: r.accel_ms2 ?? 0,
    angle: r.angle_deg ?? 0
  };
});
const DURATION = states.at(-1).t;

function sampleAt(tSec){
  if (tSec <= 0) return states[0];
  if (tSec >= DURATION) return states.at(-1);
  let lo = 0, hi = states.length-1;
  while (lo < hi){
    const mid = (lo+hi) >> 1;
    if (states[mid].t < tSec) lo = mid+1; else hi = mid;
  }
  const a = states[lo-1] ?? states[0];
  const b = states[lo];
  return ( (tSec - a.t) < (b.t - tSec) ? a : b );
}

/* ========== Controls / UI ========== */
let playing = false, rate = 1.0, time = 0;
btn.onclick = () => { playing = !playing; btn.textContent = playing ? '⏸ Pause' : '▶ Play'; };
rateSel.onchange = e => rate = parseFloat(e.target.value);
scrub.oninput = e => {
  const u = parseFloat(e.target.value);
  time = u * DURATION;
  playing = false; btn.textContent = '▶ Play';
  setFromTime(time);
};

// view toggle
let topView = true;
function setTopView(on){
  topView = on;
  const bb = new THREE.Box3().setFromPoints(scaledPts);
  const center = bb.getCenter(new THREE.Vector3());
  if (on){
    camera.position.set(center.x, 60, center.z + 0.001);
    camera.lookAt(center);
    controls.target.copy(center);
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI/2;
  } else {
    camera.position.set(center.x + 25, 20, center.z + 25);
    camera.lookAt(center);
    controls.target.copy(center);
    controls.maxPolarAngle = Math.PI * 0.499;
  }
  controls.update();
}
viewToggle.onclick = () => { setTopView(!topView); viewToggle.textContent = topView ? 'Free view' : 'Top view'; };
addEventListener('keydown', (e)=>{ if (e.key.toLowerCase()==='v') viewToggle.click(); });

// initial frame
setTopView(topView);

/* ========== Playback loop ========== */
function setFromTime(tSec){
  const s = sampleAt(tSec);

  car.position.copy(s.pos).setY(0.2);
  car.rotation.set(0, s.yaw, 0);

  tEl.textContent = s.t.toFixed(2)+' s';
  vEl.textContent = s.speed_mps.toFixed(1)+' m/s';
  aEl.textContent = s.angle.toFixed(1)+'°';
  xEl.textContent = s.accel.toFixed(1)+' m/s²';

  scrub.value = (tSec / DURATION).toFixed(3);
}

let last = performance.now();
function tick(now){
  const dt = (now - last)/1000; last = now;
  if (playing) {
    time += dt * rate;
    if (time > DURATION) { time = DURATION; playing = false; btn.textContent = '▶ Play'; }
  }
  setFromTime(time);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

/* ========== Resize ========== */
addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
