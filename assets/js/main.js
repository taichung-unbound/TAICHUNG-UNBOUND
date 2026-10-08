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
  scene.background=new THREE.Color(0x99b5cf);
  scene.fog=new THREE.Fog(0x99b5cf,38,120);

  const camera=new THREE.PerspectiveCamera(
    60,
    innerWidth/innerHeight,
    .1,
    300
  );

  camera.position.set(7,6,10);

  const renderer=new THREE.WebGLRenderer({
    antialias:true
  });

  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;

  document.getElementById('game').appendChild(renderer.domElement);

  const controls=new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true;
  controls.enablePan=false;
  controls.minDistance=5;
  controls.maxDistance=12;
  controls.maxPolarAngle=Math.PI/2.15;

  const hemi=new THREE.HemisphereLight(0xddeeff,0x293629,2.3);
  scene.add(hemi);

  const sun=new THREE.DirectionalLight(0xffdfb7,4);
  sun.position.set(-18,28,14);
  sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  scene.add(sun);

  const ground=new THREE.Mesh(
    new THREE.PlaneGeometry(180,180),
    new THREE.MeshStandardMaterial({
      color:0x425848,
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

controls.target.lerp(desiredTarget,.12);

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

  pet.scale.set(1.1,1.1,1.1);

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

function createRoad(scene){
  const roadMaterial=new THREE.MeshStandardMaterial({
    color:0x25292e,
    roughness:.88
  });

  const road=new THREE.Mesh(
    new THREE.PlaneGeometry(16,180),
    roadMaterial
  );

  road.rotation.x=-Math.PI/2;
  road.position.y=.012;
  road.receiveShadow=true;

  scene.add(road);

  for(let z=-80;z<80;z+=7){
    const line=new THREE.Mesh(
      new THREE.PlaneGeometry(.16,3),
      new THREE.MeshBasicMaterial({color:0xe8dfbe})
    );

    line.rotation.x=-Math.PI/2;
    line.position.set(0,.025,z);

    scene.add(line);
  }

  const sidewalkMaterial=new THREE.MeshStandardMaterial({
    color:0x8b8b84,
    roughness:.95
  });

  [-9,9].forEach(x=>{
    const sidewalk=new THREE.Mesh(
      new THREE.BoxGeometry(2,0.22,180),
      sidewalkMaterial
    );

    sidewalk.position.set(x,.1,0);
    sidewalk.receiveShadow=true;

    scene.add(sidewalk);
  });
}

function createCity(scene){
  const buildingColors=[
    0xbda987,
    0x937d69,
    0xb4b6b2,
    0x7d858b,
    0xc3a57c,
    0x6f7678
  ];

  for(let side of [-1,1]){
    for(let z=-75;z<=75;z+=11){
      const w=THREE.MathUtils.randFloat(6,9);
      const h=THREE.MathUtils.randFloat(6,20);
      const d=THREE.MathUtils.randFloat(6,9);

      const building=new THREE.Mesh(
        new THREE.BoxGeometry(w,h,d),
        new THREE.MeshStandardMaterial({
          color:buildingColors[
            Math.floor(Math.random()*buildingColors.length)
          ],
          roughness:.85
        })
      );

      building.position.set(
        side*THREE.MathUtils.randFloat(15,20),
        h/2,
        z+THREE.MathUtils.randFloat(-2,2)
      );

      building.castShadow=true;
      building.receiveShadow=true;

      scene.add(building);

      createWindows(scene,building,w,h,d,side);
    }
  }

  createTaichungSign(scene,-12,3,-3,'幻都商街');
  createTaichungSign(scene,13,3,-30,'星河大道');

  for(let z=-65;z<65;z+=18){
    addTree(scene,-11.3,z);
    addTree(scene,11.3,z+7);
  }
}

function createWindows(scene,building,w,h,d,side){
  const rows=Math.max(2,Math.floor(h/2.4));

  for(let y=1.5;y<h-1;y+=2.2){
    const win=new THREE.Mesh(
      new THREE.PlaneGeometry(Math.min(w*.55,3.2),.75),
      new THREE.MeshBasicMaterial({
        color:Math.random()>.45?0xffd08a:0x657784
      })
    );

    win.position.set(
      building.position.x-side*(w/2+.01),
      y,
      building.position.z
    );

    win.rotation.y=side>0?-Math.PI/2:Math.PI/2;

    scene.add(win);
  }
}

function createTaichungSign(scene,x,y,z,text){
  const canvas=document.createElement('canvas');
  canvas.width=512;
  canvas.height=160;

  const ctx=canvas.getContext('2d');

  ctx.fillStyle='#11131a';
  ctx.fillRect(0,0,512,160);

  ctx.fillStyle='#ffffff';
  ctx.font='700 62px Microsoft JhengHei, sans-serif';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.fillText(text,256,80);

  const texture=new THREE.CanvasTexture(canvas);

  const sign=new THREE.Mesh(
    new THREE.PlaneGeometry(5.8,1.8),
    new THREE.MeshBasicMaterial({
      map:texture
    })
  );

  sign.position.set(x,y,z);

  if(x<0){
    sign.rotation.y=Math.PI/2;
  }else{
    sign.rotation.y=-Math.PI/2;
  }

  scene.add(sign);
}

function addTree(scene,x,z){
  const trunk=new THREE.Mesh(
    new THREE.CylinderGeometry(.18,.25,2.2,8),
    new THREE.MeshStandardMaterial({color:0x5a3e27})
  );

  trunk.position.set(x,1.1,z);
  trunk.castShadow=true;

  scene.add(trunk);

  const crown=new THREE.Mesh(
    new THREE.SphereGeometry(1.25,10,10),
    new THREE.MeshStandardMaterial({color:0x355f37})
  );

  crown.position.set(x,2.9,z);
  crown.scale.y=1.15;
  crown.castShadow=true;

  scene.add(crown);
}
