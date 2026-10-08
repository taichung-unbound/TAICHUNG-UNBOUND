import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let selectedEra='現代｜狂城';

document.querySelectorAll('.era').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.era').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    selectedEra=btn.dataset.era;
  });
});

const landing=document.getElementById('landing');
const loginScreen=document.getElementById('loginScreen');
const loading=document.getElementById('loading');
const hud=document.getElementById('hud');

const vehicleHint=document.getElementById('vehicleHint');

function enterPrototype(){
  loginScreen.style.display='none';
  loading.style.display='flex';

  document.getElementById('currentEra').textContent=selectedEra;

  setTimeout(()=>{
    loading.style.display='none';
    hud.style.display='block';
    initGame();
  },700);
}

document.getElementById('startGame').addEventListener('click',()=>{
  landing.style.display='none';
  loginScreen.style.display='flex';
});

const gameIntroScreen=document.getElementById('gameIntroScreen');

document.getElementById('gameIntroBtn').addEventListener('click',()=>{
  landing.style.display='none';
  gameIntroScreen.style.display='block';
});

document.getElementById('backFromIntroBtn').addEventListener('click',()=>{
  gameIntroScreen.style.display='none';
  landing.style.display='flex';
});

 const introContent=document.getElementById('introContent');

document.querySelector('[data-intro-tab="eras"]').addEventListener('click',()=>{
  introContent.innerHTML=`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
      gap:16px;
    ">
      <div class="era-info-card">
        <strong>1950–60s｜CITY OF TIME｜時城</strong>
        <p>幻都的舊城風貌、老街區與早期城市生活。</p>
      </div>

      <div class="era-info-card">
        <strong>1970s｜STREET ERA｜街代</strong>
        <p>街頭文化、機車與商業逐漸活絡的城市年代。</p>
      </div>

      <div class="era-info-card">
        <strong>1980s｜NEON YEARS｜霓虹年代</strong>
        <p>娛樂產業、夜生活與霓虹招牌盛行的年代。</p>
      </div>

      <div class="era-info-card">
        <strong>1990s｜STREETLINE｜街線</strong>
        <p>商圈擴張、青春街頭文化與城市快速變化。</p>
      </div>

      <div class="era-info-card">
        <strong>2000s｜NO LIMITS｜無限界</strong>
        <p>大型商圈、網路世代與現代城市逐步成形。</p>
      </div>

      <div class="era-info-card">
        <strong>現代｜OUTLAW CITY｜狂城</strong>
        <p>具有台灣城市氛圍的虛構都會，開放世界的主舞台。</p>
      </div>

      <div class="era-info-card">
        <strong>REWIND｜倒帶</strong>
        <p>跨越不同年代的故事線，讓城市記憶彼此連結。</p>
      </div>
    </div>
  `;
});

document.querySelector('[data-intro-tab="regions"]').addEventListener('click',()=>{
  introContent.innerHTML=`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
      gap:16px;
    ">
            <div class="era-info-card">
        <strong>星河大道｜城市主軸</strong>
        <p>串聯幻都市中心、商街與住宅區的主要幹道。</p>
      </div>

      <div class="era-info-card">
        <strong>曜光區｜現代都會核心</strong>
        <p>高樓商辦、虛構百貨與現代住宅交織的繁華街區。</p>
      </div>

      <div class="era-info-card">
        <strong>幻都商街｜夜市與街頭</strong>
        <p>攤販、機車、小吃與霓虹招牌構成熱鬧的夜間生活。</p>
      </div>

      <div class="era-info-card">
        <strong>青禾街｜青春商圈</strong>
        <p>服飾、美食與街頭小店聚集的年輕生活區。</p>
      </div>

      <div class="era-info-card">
        <strong>幻都驛站｜舊城區</strong>
        <p>老建築、騎樓與新店面交錯，保留城市記憶的街區。</p>
      </div>

      <div class="era-info-card">
        <strong>霧灣區｜海岸生活</strong>
        <p>海風、沿岸街道與低矮住宅構成悠閒的海岸街區。</p>
      </div>

      <div class="era-info-card">
        <strong>嵐丘區｜山邊郊區</strong>
        <p>坡道、綠地與郊區住宅構成城市外圍的生活風貌。</p>
      </div>
    </div>
  `;
});  

document.getElementById('guestLoginBtn').addEventListener('click',()=>{
  enterPrototype();
});

document.getElementById('backToLandingBtn').addEventListener('click',()=>{
  loginScreen.style.display='none';
  landing.style.display='flex';
});

document.getElementById('emailLoginBtn').addEventListener('click',()=>{
  alert('Email 登入功能將於正式帳號系統串接後開放。');
});

let started=false;

function initGame(){
  if(started)return;
  started=true;

  const scene=new THREE.Scene();

  // 傍晚藍調：保留近處清晰度，遠景逐漸融入暮色。
  const duskColor=0x303b59;
  scene.background=new THREE.Color(duskColor);
  scene.fog=new THREE.Fog(duskColor,65,170);

  const camera=new THREE.PerspectiveCamera(
    60,
    innerWidth/innerHeight,
    .1,
    300
  );

  camera.position.set(4,3.2,10);

  const renderer=new THREE.WebGLRenderer({
    antialias:true
  });

  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.15;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;

  document.getElementById('game').appendChild(renderer.domElement);

  const controls=new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true;
  controls.enablePan=false;
  controls.minDistance=5;
  controls.maxDistance=12;
  controls.maxPolarAngle=Math.PI/2.15;

  // 冷色天空與柔和地面反光，讓陰影裡仍看得到細節。
  const hemi=new THREE.HemisphereLight(
    0xb0c4ee,
    0x65515b,
    1.15
  );
  scene.add(hemi);

  // 低角度的暖色夕照。
  const sun=new THREE.DirectionalLight(
    0xffc294,
    1.35
  );

  sun.position.set(-24,16,-32);
  sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);

  Object.assign(sun.shadow.camera,{
    left:-35,
    right:35,
    top:35,
    bottom:-35,
    near:.5,
    far:120
  });

  sun.shadow.normalBias=.04;
  sun.shadow.bias=-.0001;
  scene.add(sun);

  const ground=new THREE.Mesh(
    new THREE.PlaneGeometry(180,180),
    new THREE.MeshStandardMaterial({
      color:0x8a8880,
      roughness:1
    })
  );

  ground.rotation.x=-Math.PI/2;
  ground.receiveShadow=true;
  scene.add(ground);

  createRoad(scene);
  createCity(scene);

  const player=createPlayer(scene);
  player.position.set(0,0,4);
  
  const pet=createMaineCoonPlaceholder(scene);
  pet.position.set(-1.6,0,5.2);

  const scooter=createScooterPlaceholder(scene);
  scooter.position.set(3,0,1.5);

  let isRiding=false;
  let canRide=false;

  controls.target.copy(player.position).add(new THREE.Vector3(0,1.2,0));

  const keys={};

  addEventListener('keydown',e=>{
  const key=e.key.toLowerCase();
  keys[key]=true;

  if(key==='e' && canRide){
  isRiding=!isRiding;

  if(isRiding){
    player.position.copy(scooter.position);
    player.position.y=.9;
    player.rotation.y=scooter.rotation.y;
    setPlayerAnimation(player,'Idle');
  }else{
    player.position.copy(scooter.position);
    player.position.x+=1.3;
    player.position.y=0;
  }
}
});

  addEventListener('keyup',e=>{
    keys[e.key.toLowerCase()]=false;
  });

  const clock=new THREE.Clock();

  function animate(){
    requestAnimationFrame(animate);

    const delta=Math.min(clock.getDelta(),.033);

    const scooterDistance=player.position.distanceTo(scooter.position);
    canRide=scooterDistance<2.2 || isRiding;

    if(isRiding){
  vehicleHint.style.display='block';
  vehicleHint.textContent='按 E 下車';
}else if(scooterDistance<2.2){
  vehicleHint.style.display='block';
  vehicleHint.textContent='按 E 上車';
}else{
  vehicleHint.style.display='none';
}
    
  const direction=new THREE.Vector3();

  if(isRiding){

  const rideSpeed=keys.shift?12:7;
  const turnSpeed=2.2;

  if(keys.a){
    scooter.rotation.y+=turnSpeed*delta;
  }

  if(keys.d){
    scooter.rotation.y-=turnSpeed*delta;
  }

  let scooterMove=0;

  if(keys.w)scooterMove=1;
  if(keys.s)scooterMove=-.65;

  if(scooterMove!==0){
    const scooterForward=new THREE.Vector3(
      -Math.sin(scooter.rotation.y),
      0,
      -Math.cos(scooter.rotation.y)
    );

    scooter.position.addScaledVector(
      scooterForward,
      rideSpeed*scooterMove*delta
    );
  }

  player.position.copy(scooter.position);
  player.position.y=.9;
  player.rotation.y=scooter.rotation.y;

  setPlayerAnimation(player,'Idle');

}else{

  if(keys.w)direction.z-=1;
  if(keys.s)direction.z+=1;
  if(keys.a)direction.x-=1;
  if(keys.d)direction.x+=1;

  if(direction.lengthSq()>0){
    direction.normalize();

    const speed=keys.shift?8:4.3;

    const forward=new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y=0;
    forward.normalize();

    const right=new THREE.Vector3()
      .crossVectors(forward,new THREE.Vector3(0,1,0))
      .normalize();

    const move=new THREE.Vector3();

    move.addScaledVector(forward,-direction.z);
    move.addScaledVector(right,direction.x);
    move.normalize();

    player.position.addScaledVector(move,speed*delta);

    player.rotation.y=Math.atan2(move.x,move.z);

    setPlayerAnimation(
      player,
      keys.shift ? 'Run' : 'Walk'
    );

  }else{
    setPlayerAnimation(player,'Idle');
  }
}

const petTarget=player.position.clone();

const behind=new THREE.Vector3(
  Math.sin(player.rotation.y),
  0,
  Math.cos(player.rotation.y)
);

petTarget.addScaledVector(behind,-1.8);
petTarget.x-=.8;

const petDistance=pet.position.distanceTo(petTarget);

if(petDistance>1.1){
  pet.position.lerp(petTarget,.035);

  const lookTarget=player.position.clone();
  lookTarget.y=pet.position.y;

  pet.lookAt(lookTarget);
}
    
    const desiredTarget=player.position.clone();
    desiredTarget.y+=1.2;

const cameraShift=desiredTarget.clone().sub(controls.target).multiplyScalar(.12);
camera.position.add(cameraShift);
controls.target.add(cameraShift);

if(player.userData.mixer){
  player.userData.mixer.update(delta);
}

controls.update();
renderer.render(scene,camera);
  }

  animate();

  addEventListener('resize',()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
  });
}

function createMaineCoonPlaceholder(scene){
  const pet=new THREE.Group();

  const fur=new THREE.MeshStandardMaterial({
    color:0x54463d,
    roughness:.95
  });

  const darkFur=new THREE.MeshStandardMaterial({
    color:0x2b2522,
    roughness:.95
  });

  const chestFur=new THREE.MeshStandardMaterial({
    color:0xb8aa98,
    roughness:1
  });

  const body=new THREE.Mesh(
    new THREE.SphereGeometry(.48,20,20),
    fur
  );

  body.scale.set(1.35,.85,.8);
  body.position.y=.58;
  body.castShadow=true;
  pet.add(body);

  const chest=new THREE.Mesh(
    new THREE.SphereGeometry(.32,16,16),
    chestFur
  );

  chest.scale.set(.75,1.15,.55);
  chest.position.set(0,.62,.38);
  chest.castShadow=true;
  pet.add(chest);

  const head=new THREE.Mesh(
    new THREE.SphereGeometry(.32,20,20),
    fur
  );

  head.position.set(0,.98,.36);
  head.castShadow=true;
  pet.add(head);

  const earGeometry=new THREE.ConeGeometry(.13,.35,4);

  const leftEar=new THREE.Mesh(earGeometry,darkFur);
  leftEar.position.set(-.18,1.27,.35);
  leftEar.rotation.z=.12;
  leftEar.castShadow=true;
  pet.add(leftEar);

  const rightEar=new THREE.Mesh(earGeometry,darkFur);
  rightEar.position.set(.18,1.27,.35);
  rightEar.rotation.z=-.12;
  rightEar.castShadow=true;
  pet.add(rightEar);

  const tail=new THREE.Mesh(
    new THREE.CylinderGeometry(.11,.18,1.35,10),
    fur
  );

  tail.position.set(0,.68,-.72);
  tail.rotation.x=Math.PI/2.5;
  tail.castShadow=true;
  pet.add(tail);

  const legGeometry=new THREE.CapsuleGeometry(.09,.32,4,8);

  [
    [-.25,.25,.27],
    [.25,.25,.27],
    [-.25,.25,-.27],
    [.25,.25,-.27]
  ].forEach(([x,y,z])=>{
    const leg=new THREE.Mesh(legGeometry,darkFur);
    leg.position.set(x,y,z);
    leg.castShadow=true;
    pet.add(leg);
  });

  pet.scale.set(.58,.58,.58);

  scene.add(pet);

  return pet;
}

 function createScooterPlaceholder(scene){
  const scooter=new THREE.Group();

  const bodyMaterial=new THREE.MeshStandardMaterial({
    color:0x2b2f38,
    metalness:.45,
    roughness:.45
  });

  const accentMaterial=new THREE.MeshStandardMaterial({
    color:0x8b5cf6,
    metalness:.35,
    roughness:.4
  });

  const wheelMaterial=new THREE.MeshStandardMaterial({
    color:0x111111,
    roughness:.9
  });

  const body=new THREE.Mesh(
    new THREE.BoxGeometry(.7,.75,1.7),
    bodyMaterial
  );

  body.position.set(0,.75,0);
  body.rotation.x=-.08;
  body.castShadow=true;
  scooter.add(body);

  const front=new THREE.Mesh(
    new THREE.BoxGeometry(.52,.95,.55),
    accentMaterial
  );

  front.position.set(0,1.05,-.85);
  front.rotation.x=.18;
  front.castShadow=true;
  scooter.add(front);

  const seat=new THREE.Mesh(
    new THREE.BoxGeometry(.55,.18,.8),
    new THREE.MeshStandardMaterial({
      color:0x171717,
      roughness:.8
    })
  );

  seat.position.set(0,1.12,.18);
  seat.castShadow=true;
  scooter.add(seat);

  const wheelGeometry=new THREE.TorusGeometry(.28,.09,10,20);

  const frontWheel=new THREE.Mesh(wheelGeometry,wheelMaterial);
  frontWheel.rotation.y=Math.PI/2;
  frontWheel.position.set(0,.35,-1);
  frontWheel.castShadow=true;
  scooter.add(frontWheel);

  const backWheel=new THREE.Mesh(wheelGeometry,wheelMaterial);
  backWheel.rotation.y=Math.PI/2;
  backWheel.position.set(0,.35,.78);
  backWheel.castShadow=true;
  scooter.add(backWheel);

  const handlebar=new THREE.Mesh(
    new THREE.BoxGeometry(.95,.08,.08),
    bodyMaterial
  );

  handlebar.position.set(0,1.55,-.82);
  handlebar.castShadow=true;
  scooter.add(handlebar);

  scooter.scale.set(1.15,1.15,1.15);

  scene.add(scooter);

  return scooter;
}
  
function createPlayer(scene){
  const player=new THREE.Group();

  player.userData={
    mixer:null,
    actions:{},
    currentAction:null
  };

  scene.add(player);

  const loader=new GLTFLoader();

  loader.load(
    'https://threejs.org/examples/models/gltf/Soldier.glb',

    gltf=>{
      const model=gltf.scene;

      model.scale.set(1.25,1.25,1.25);
      model.rotation.y=Math.PI;

      model.traverse(obj=>{
        if(obj.isMesh){
          obj.castShadow=true;
          obj.receiveShadow=true;
        }
      });

      player.add(model);

      const mixer=new THREE.AnimationMixer(model);
      player.userData.mixer=mixer;

      gltf.animations.forEach(clip=>{
        player.userData.actions[clip.name]=mixer.clipAction(clip);
      });

      setPlayerAnimation(player,'Idle');
    },

    undefined,

    error=>{
      console.error('Character load error:',error);
    }
  );

  return player;
}

function setPlayerAnimation(player,name){
  const action=player.userData.actions?.[name];

  if(!action)return;
  if(player.userData.currentAction===action)return;

  player.userData.currentAction?.fadeOut(.18);

  action
    .reset()
    .fadeIn(.18)
    .play();

  player.userData.currentAction=action;
}

// 幻都商街：所有店名與街區名稱均為虛構。
function streetMaterial(color, extra={}) {
  return new THREE.MeshStandardMaterial({color, roughness:.82, ...extra});
}
function streetBox(parent,w,h,d,x,y,z,material) {
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
  mesh.position.set(x,y,z);
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  parent.add(mesh);
  return mesh;
}
function streetTexture(kind) {
  const canvas=document.createElement('canvas');
  canvas.width=canvas.height=512;
  const c=canvas.getContext('2d');
  let seed=728;
  const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  c.fillStyle=kind==='asphalt'?'#363a40':'#b3aaa0';
  c.fillRect(0,0,512,512);
  for(let i=0;i<26000;i++) {
    const value=kind==='asphalt'?35+random()*45:125+random()*65;
    c.fillStyle=`rgba(${value},${value},${value},.35)`;
    c.fillRect(random()*512,random()*512,1+random()*2,1+random()*2);
  }
  if(kind==='tile') {
    c.strokeStyle='#857e76';c.lineWidth=2;
    for(let i=0;i<=512;i+=64) {
      c.beginPath();c.moveTo(i,0);c.lineTo(i,512);c.stroke();
      c.beginPath();c.moveTo(0,i);c.lineTo(512,i);c.stroke();
    }
  }
  const texture=new THREE.CanvasTexture(canvas);
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
  texture.repeat.set(kind==='asphalt'?4:2,kind==='asphalt'?24:32);
  return texture;
}
function createRoad(scene) {
  const road=new THREE.Mesh(new THREE.PlaneGeometry(16,180),streetMaterial(0xffffff,{map:streetTexture('asphalt')}));
  road.rotation.x=-Math.PI/2;road.position.y=.014;road.receiveShadow=true;scene.add(road);
  const white=streetMaterial(0xe7e2cf), yellow=streetMaterial(0xd8b96d);
  for(let z=-86;z<86;z+=7) streetBox(scene,.12,.015,3,0,.03,z,yellow);
  for(const side of [-1,1]) {
    streetBox(scene,.1,.015,180,side*7.65,.031,0,white);
    const paving=streetMaterial(0xffffff,{map:streetTexture('tile')});
    streetBox(scene,4,.18,180,side*10,.09,0,paving);
    streetBox(scene,.18,.24,180,side*8.1,.12,0,streetMaterial(0xa29e96));
    for(let z=-80;z<85;z+=8) {
      const drain=streetBox(scene,.38,.02,.9,side*7.8,.038,z,streetMaterial(0x20252b));
      for(let k=0;k<6;k++) streetBox(scene,.32,.023,.025,drain.position.x,.052,z-.35+k*.14,streetMaterial(0x666a6b));
    }
    // 機車停車格
    for(let z=-19;z<20;z+=2.1) {
      streetBox(scene,1.8,.012,.055,side*6.6,.038,z,white);
      streetBox(scene,.055,.012,2.1,side*5.7,.038,z+1.05,white);
    }
  }
  // 出生街區遠端斑馬線
  for(let x=-6.5;x<=6.5;x+=1.15) streetBox(scene,.65,.015,3.8,x,.04,-24,white);
}
function createShopSign(parent,text,y,z,color,width=7.4) {
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;
  const c=canvas.getContext('2d');c.fillStyle=color;c.fillRect(0,0,1024,256);
  c.strokeStyle='#e9d2aa';c.lineWidth=5;c.strokeRect(18,18,988,220);
  c.fillStyle='#fff1db';c.textAlign='center';c.textBaseline='middle';
  c.font='bold 100px "Microsoft JhengHei",sans-serif';c.fillText(text,512,106,930);
  c.font='24px sans-serif';c.fillText('PHANTOM METROPOLIS · EST. 1986',512,205);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,1.55),new THREE.MeshStandardMaterial({map,emissive:0xffffff,emissiveMap:map,emissiveIntensity:.22,roughness:.65}));
  mesh.position.set(-.61,y,z);mesh.rotation.y=-Math.PI/2;parent.add(mesh);
}
function createCity(scene) {
  const names=['暮光茶所','星禾食堂','幻都生活','青禾書屋','流光車行','雲巷咖啡','拾光花店','星河小館'];
  const signColors=['#284b45','#754039','#304258','#5b4c39'];
  const wallColors=[0xbeb5a4,0x969d9a,0xc3afa0,0xaaa798];
  const concrete=streetMaterial(0xc1b8a8),frame=streetMaterial(0x484d4d,{metalness:.35});
  const glass=streetMaterial(0x344650,{metalness:.35,roughness:.28});
  const warm=streetMaterial(0xe7c595,{emissive:0xffcb82,emissiveIntensity:.45});
  for(const side of [-1,1]) {
    for(let i=0;i<16;i++) {
      const group=new THREE.Group();group.position.set(side*12.8,0,-78+i*10.2);
      group.rotation.y=side===1?0:Math.PI;scene.add(group);
      // 局部座標：店面朝向 -X，兩側均朝向道路
      const floors=3+i%3,h=3.7+floors*2.75;
      const wall=streetMaterial(wallColors[i%4]);
      streetBox(group,6,h-3.4,9.95,2.4,(h+3.4)/2,0,wall);
      streetBox(group,4.8,3.4,9.8,3,1.7,0,wall);
      streetBox(group,3.4,.26,10,-1.6,3.4,0,concrete);
      streetBox(group,3.4,.12,10,-1.6,.23,0,concrete);
      for(const z of [-4.6,0,4.6]) streetBox(group,.32,3.15,.32,-3,1.8,z,concrete);
      // 店面玻璃與門框
      for(const z of [-3.25,-1.1,1.1,3.25]) {
        streetBox(group,.06,2.35,1.9,.54,1.55,z,glass);
        streetBox(group,.12,2.5,.07,.48,1.55,z-.95,frame);
        streetBox(group,.12,.08,1.95,.48,2.78,z,frame);
        streetBox(group,.12,.08,1.95,.48,.35,z,frame);
        streetBox(group,.04,.1,1.5,.49,1.1,z,concrete);
      }
      createShopSign(group,names[(i+(side===1?2:0))%names.length],3.95,0,signColors[i%4]);
      // 斜式遮雨棚
      const awning=streetBox(group,1.65,.12,8.5,-.4,2.95,0,streetMaterial(i%2?0x355e57:0x795647));
      awning.rotation.z=.12;
      for(let floor=0;floor<floors;floor++) {
        const y=5.35+floor*2.75;
        for(const z of [-3.05,0,3.05]) {
          streetBox(group,.12,1.6,2.1,-.63,y,z,frame);
          streetBox(group,.14,1.4,1.91,-.71,y,z,(floor+i)%4===0?warm:glass);
          streetBox(group,.16,1.45,.055,-.8,y,z,frame);
          streetBox(group,.16,.06,2,-.8,y,z,frame);
          // 陽台平台與金屬欄杆
          streetBox(group,.9,.13,2.4,-1.05,y-.88,z,concrete);
          streetBox(group,.07,.06,2.4,-1.48,y-.2,z,frame);
          for(let k=0;k<6;k++) streetBox(group,.05,.65,.05,-1.48,y-.5,z-1.1+k*.44,frame);
        }
        streetBox(group,.5,.6,.8,-.9,y+1,3.9,streetMaterial(0xc4c4bc));
        for(let k=0;k<4;k++) streetBox(group,.015,.025,.6,-1.16,y+.8+k*.12,3.9,frame);
      }
      streetBox(group,6.2,.25,10.05,2.4,h+.1,0,concrete);
      streetBox(group,.2,.75,10, -.6,h+.45,0,wall);
      // 屋頂水塔
      if(i%3===0) {
        const tank=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,1.4,16),streetMaterial(0x9ba4a8,{metalness:.65,roughness:.35}));
        tank.position.set(2,h+.95,2);tank.castShadow=true;group.add(tank);
      }
      // 店門外花盆與座椅
      streetBox(group,.7,.6,.7,-1.1,.55,3.7,streetMaterial(0x6f5143));
      for(let k=0;k<3;k++) {
        const leaf=new THREE.Mesh(new THREE.SphereGeometry(.32,8,6),streetMaterial(0x476b4f));
        leaf.scale.set(.7,1.8,.8);leaf.position.set(-1.1+(k-1)*.14,1,3.7);group.add(leaf);
      }
      if(i%3===1) {
        streetBox(group,.6,.1,1.6,-1.8,.7,-3.4,streetMaterial(0x77583f));
        for(const z of [-4,-2.8]) streetBox(group,.12,.5,.12,-1.8,.4,z,frame);
      }
    }
  }
  for(let z=-72;z<78;z+=15) {
    for(const side of [-1,1]) {
      const x=side*8.9;
      streetBox(scene,.11,5.2,.11,x,2.75,z,frame);
      streetBox(scene,1.5,.1,.1,x-side*.7,5.3,z,frame);
      streetBox(scene,.65,.1,.28,x-side*1.35,5.22,z,warm);
      if(Math.abs(z)<35) {
        const lamp=new THREE.PointLight(0xffd49d,8,8,2);lamp.position.set(x-side*1.35,4.95,z);scene.add(lamp);
      }
      addTree(scene,side*10,z+7);
    }
  }
}
function addTree(scene,x,z) {
  const bark=streetMaterial(0x655145);
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.12,.22,2.8,9),bark);
  trunk.position.set(x,1.65,z);trunk.castShadow=true;scene.add(trunk);
  for(let i=0;i<8;i++) {
    const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(.8,1),streetMaterial(i%2?0x4e6c4b:0x3b5942));
    const a=i*2.4;crown.position.set(x+Math.cos(a)*.58,3.1+(i%3)*.34,z+Math.sin(a)*.58);
    crown.scale.set(1,.8,1);crown.castShadow=true;scene.add(crown);
  }
  streetBox(scene,1.8,.23,1.8,x,.23,z,streetMaterial(0x7d7d70));
}
