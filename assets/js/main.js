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

  const hemi=new THREE.HemisphereLight(
    0xb0c4ee,
    0x65515b,
    1.15
  );
  scene.add(hemi);

  const sun=new THREE.DirectionalLight(0xffffff,1.35);
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

  // 現實 3600 秒＝遊戲 24 小時。
  let gameHour=9;
  const dayLengthSeconds=3600;

  // 時段之間連續漸變，不突然切換。
  const timePalette=[
    {hour:0,  sky:0x10182c, light:0x91a9dc, sun:.05, ambient:.40},
    {hour:5,  sky:0x19243b, light:0x91a9dc, sun:.05, ambient:.40},
    {hour:6,  sky:0x777e9b, light:0xffbf99, sun:.45, ambient:.75},
    {hour:8,  sky:0xa8c6df, light:0xffe2bd, sun:1.60, ambient:1.20},
    {hour:12, sky:0xb5d4eb, light:0xfff5e5, sun:2.30, ambient:1.35},
    {hour:15, sky:0xa8c5dd, light:0xffdfb4, sun:1.90, ambient:1.20},
    {hour:17, sky:0x8c8fa9, light:0xffb889, sun:1.00, ambient:.95},
    {hour:18, sky:0x485674, light:0xffa078, sun:.25, ambient:.65},
    {hour:19, sky:0x202c49, light:0x91a9dc, sun:.05, ambient:.45},
    {hour:24, sky:0x10182c, light:0x91a9dc, sun:.05, ambient:.40}
  ];

  const skyColor=new THREE.Color();
  const lightColor=new THREE.Color();
  const nextColor=new THREE.Color();

  let cityLights=null;
  let glowingMaterials=null;

  function updateDayNight(delta){
    gameHour=(gameHour+delta*24/dayLengthSeconds)%24;

    let index=0;

    while(
      index<timePalette.length-2 &&
      gameHour>=timePalette[index+1].hour
    ){
      index++;
    }

    const from=timePalette[index];
    const to=timePalette[index+1];
    const progress=(gameHour-from.hour)/(to.hour-from.hour);
    const blend=THREE.MathUtils.smoothstep(progress,0,1);

    skyColor
      .setHex(from.sky)
      .lerp(nextColor.setHex(to.sky),blend);

    lightColor
      .setHex(from.light)
      .lerp(nextColor.setHex(to.light),blend);

    scene.background.copy(skyColor);
    scene.fog.color.copy(skyColor);

    hemi.color.copy(skyColor).lerp(
      nextColor.setHex(0xddeaff),
      .45
    );

    hemi.intensity=THREE.MathUtils.lerp(
      from.ambient,
      to.ambient,
      blend
    );

    sun.color.copy(lightColor);
    sun.intensity=THREE.MathUtils.lerp(
      from.sun,
      to.sun,
      blend
    );

    // 上午從一側升起，中午升高，下午往另一側落下。
    const solarAngle=(gameHour-6)/12*Math.PI;

    sun.position.set(
      -Math.cos(solarAngle)*40,
      Math.max(4,Math.sin(solarAngle)*45),
      -18
    );

    // 傍晚開燈，清晨逐漸關燈。
    const morning=THREE.MathUtils.smoothstep(gameHour,5.5,7.5);
    const evening=THREE.MathUtils.smoothstep(gameHour,17,19);
    const nightAmount=1-morning+evening;

    // 城市建立完成後，只收集一次燈具與發光材質。
    if(cityLights===null){
      cityLights=[];
      glowingMaterials=new Map();

      scene.traverse(object=>{
        if(object.isPointLight){
          cityLights.push({
            light:object,
            intensity:object.intensity
          });
        }

        if(!object.isMesh)return;

        const materials=Array.isArray(object.material)
          ? object.material
          : [object.material];

        materials.forEach(material=>{
          if(
            material.emissive &&
            material.emissiveIntensity>0 &&
            material.emissive.getHex()!==0
          ){
            glowingMaterials.set(
              material,
              material.emissiveIntensity
            );
          }
        });
      });
    }

    cityLights.forEach(({light,intensity})=>{
      light.intensity=intensity*nightAmount;
    });

    glowingMaterials.forEach((intensity,material)=>{
      material.emissiveIntensity=intensity*
        THREE.MathUtils.lerp(.35,2,nightAmount);
    });
  }

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

  // 小地圖：固定北方朝上，依實際場景取得道路與建築位置。
  const minimap=document.createElement('canvas');
  minimap.id='minimap';
  minimap.width=384;
  minimap.height=384;
  minimap.setAttribute('aria-label','幻都商街小地圖');

  Object.assign(minimap.style,{
    position:'fixed',
    left:'20px',
    bottom:'24px',
    width:'clamp(140px,18vw,192px)',
    height:'auto',
    aspectRatio:'1',
    borderRadius:'50%',
    border:'2px solid rgba(167,155,255,.65)',
    background:'rgba(12,17,29,.88)',
    boxShadow:'0 8px 28px rgba(0,0,0,.45)',
    pointerEvents:'none',
    zIndex:'12'
  });

  hud.appendChild(minimap);

  const mapContext=minimap.getContext('2d');
  const mapShapes=[];

  scene.updateMatrixWorld(true);

  scene.traverse(object=>{
    if(!object.isMesh)return;

    const geometry=object.geometry;
    const dimensions=geometry.parameters;

    if(!dimensions)return;

    let color=null;

    if(
      geometry.type==='PlaneGeometry' &&
      dimensions.width===16 &&
      dimensions.height===180
    ){
      color='#364253';
    }else if(geometry.type==='BoxGeometry'){
      if(dimensions.height>6 && dimensions.depth>6){
        color='#697486';
      }else if(
        dimensions.height<.3 &&
        dimensions.width>1 &&
        dimensions.depth>100
      ){
        color='#475568';
      }
    }

    if(!color)return;

    const bounds=new THREE.Box3().setFromObject(object);

    mapShapes.push({
      minX:bounds.min.x,
      maxX:bounds.max.x,
      minZ:bounds.min.z,
      maxZ:bounds.max.z,
      color
    });
  });

  // 道路先畫、建築後畫。
  mapShapes.sort((a,b)=>{
    return (a.color==='#697486')-(b.color==='#697486');
  });

  function updateMinimap(){
    const c=mapContext;
    const size=minimap.width;
    const center=size/2;
    const radius=center-8;
    const scale=4;

    const mapX=x=>center+(x-player.position.x)*scale;
    const mapY=z=>center+(z-player.position.z)*scale;

    c.clearRect(0,0,size,size);
    c.save();

    c.beginPath();
    c.arc(center,center,radius,0,Math.PI*2);
    c.clip();

    c.fillStyle='rgba(12,17,29,.92)';
    c.fillRect(0,0,size,size);

    mapShapes.forEach(shape=>{
      c.fillStyle=shape.color;

      c.fillRect(
        mapX(shape.minX),
        mapY(shape.minZ),
        (shape.maxX-shape.minX)*scale,
        (shape.maxZ-shape.minZ)*scale
      );
    });

    // 機車標記，超出附近範圍時自然裁切。
    c.fillStyle='#c69bff';
    c.beginPath();
    c.arc(
      mapX(scooter.position.x),
      mapY(scooter.position.z),
      7,
      0,
      Math.PI*2
    );
    c.fill();

    // 玩家箭頭：步行與騎乘使用各自的前進方向。
    const heading=isRiding
      ? scooter.rotation.y+Math.PI
      : player.rotation.y;

    c.save();
    c.translate(center,center);
    c.rotate(-heading);
    c.fillStyle='#ffffff';
    c.strokeStyle='#9d8cff';
    c.lineWidth=3;

    c.beginPath();
    c.moveTo(0,15);
    c.lineTo(-10,-10);
    c.lineTo(0,-5);
    c.lineTo(10,-10);
    c.closePath();
    c.fill();
    c.stroke();
    c.restore();

    c.fillStyle='#e5e8ff';
    c.font='bold 22px sans-serif';
    c.textAlign='center';
    c.textBaseline='middle';
    c.fillText('N',center,25);

    c.restore();
  }

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

    updateDayNight(delta);

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
updateMinimap();
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
  const concrete=streetMaterial(0xc1b8a8);

  const frame=streetMaterial(0x343e49,{
    metalness:.6,
    roughness:.4
  });

  const glass=streetMaterial(0x54758c,{
    metalness:.45,
    roughness:.22
  });

  const warm=streetMaterial(0xf3d5a2,{
    emissive:0xffc77a,
    emissiveIntensity:.4
  });

  const names=[
    '雲巷咖啡',
    '青禾書屋',
    '星禾食堂',
    '幻都生活'
  ];

  // 不同寬度、高度與用途的街廓。
  const blocks=[
    {side:-1,z:10,width:26,height:21,depth:18,type:'mall'},
    {side:-1,z:-21,width:22,height:35,depth:16,type:'office'},
    {side:-1,z:-48,width:22,height:15,depth:14,type:'shops'},
    {side:-1,z:-75,width:20,height:28,depth:16,type:'office'},
    {side:1,z:14,width:22,height:14,depth:14,type:'shops'},
    {side:1,z:-14,width:24,height:27,depth:16,type:'office'},
    {side:1,z:-44,width:24,height:18,depth:14,type:'shops'},
    {side:1,z:-74,width:22,height:39,depth:18,type:'office'}
  ];

  blocks.forEach((block,index)=>{
    const {side,z,width,height,depth,type}=block;

    const group=new THREE.Group();
    group.position.set(side*14,0,z);
    group.rotation.y=side===1?0:Math.PI;
    scene.add(group);

    if(type==='mall'){
      createStarRingMall(group);
      return;
    }

    const wall=streetMaterial(
      type==='mall'
        ? 0xd6c9b5
        : type==='office'
          ? 0x53636e
          : 0xb9b1a5
    );

    streetBox(
      group,depth,height,width,
      depth/2,height/2,0,wall
    );

    // 騎樓地板與上方遮蔽。
    streetBox(group,4,.18,width,-2,.24,0,concrete);
    streetBox(group,4,.28,width,-2,3.8,0,concrete);

    for(
      let localZ=-width/2+1;
      localZ<width/2;
      localZ+=4.8
    ){
      streetBox(
        group,.3,3.4,.3,
        -3.5,2,localZ,concrete
      );

      streetBox(
        group,.1,2.8,4,
        -.08,1.9,localZ+1.5,glass
      );

      streetBox(
        group,.18,.12,4,
        -.16,3.3,localZ+1.5,frame
      );

      streetBox(
        group,.18,2.8,.08,
        -.17,1.9,localZ-.45,frame
      );
    }

    const floorHeight=type==='mall'?4:3;

    for(let y=6;y<height-1;y+=floorHeight){
      for(
        let localZ=-width/2+2;
        localZ<width/2-1;
        localZ+=3.2
      ){
        streetBox(
          group,.12,2.1,2.6,
          -.08,y,localZ,frame
        );

        const litWindow=(
          Math.round(y)+index+Math.round(localZ)
        )%5===0;

        streetBox(
          group,.15,1.9,2.35,
          -.16,y,localZ,
          litWindow?warm:glass
        );

        if(type==='shops'){
          streetBox(
            group,.8,.12,2.8,
            -.5,y-1.1,localZ,concrete
          );

          streetBox(
            group,.08,.7,2.8,
            -.88,y-.7,localZ,frame
          );
        }
      }

      streetBox(
        group,.22,.14,width,
        -.22,y+1.25,0,concrete
      );
    }

    streetBox(
      group,depth+.3,.3,width+.3,
      depth/2,height+.15,0,frame
    );

    if(type==='shops'){
      for(
        let localZ=-width/2+4;
        localZ<width/2-2;
        localZ+=7
      ){
        const nameIndex=(
          index+Math.round(localZ+30)
        )%names.length;

        createShopSign(
          group,
          names[nameIndex],
          4.6,
          localZ,
          index%2?'#315950':'#674c3a',
          6
        );
      }

    }else{
      createShopSign(
        group,
        index%2?'幻都商務中心':'流光廣場',
        4.6,
        0,
        '#293f59',
        10
      );

      for(const localZ of [
        -width/2+.3,
        width/2-.3
      ]){
        streetBox(
          group,.15,height-4,.16,
          -.2,(height+4)/2,localZ,warm
        );
      }
    }
  });

  // 真正的 3D 遠景高樓。
  const skyline=[
    [-43,-64,15,53,16],
    [-62,-34,17,39,18],
    [-49,7,14,46,16],
    [43,-66,16,62,17],
    [62,-35,18,44,16],
    [48,10,14,34,14]
  ];

  skyline.forEach(([x,z,w,h,d],index)=>{
    const tower=new THREE.Group();
    tower.position.set(x,0,z);
    scene.add(tower);

    streetBox(tower,w,h,d,0,h/2,0,frame);

    const facade=streetMaterial(
      index%2?0x496b87:0x38576e,
      {metalness:.5,roughness:.25}
    );

    for(let y=3;y<h-1;y+=3){
      streetBox(
        tower,w-.6,2.5,d+.12,
        0,y,0,facade
      );

      streetBox(
        tower,w+.12,2.5,d-.6,
        0,y,0,facade
      );

      for(
        let localX=-w/2+1;
        localX<w/2;
        localX+=2.6
      ){
        if((
          Math.round(y)+Math.round(localX)+index
        )%4===0){
          streetBox(
            tower,1.3,1.8,.08,
            localX,y,-d/2-.1,warm
          );
        }
      }
    }

    streetBox(
      tower,w+.3,.18,d+.3,
      0,h+.1,0,warm
    );
  });

  // 第二排街屋：保持原本主街與星環百貨不變，補齊視線後方的連續街廓。
  // 此階段仍為程序式低多邊形原型，不代表高寫實資產完成。
  const rearWalls=[0xb4aaa0,0x9eaaa9,0xc0b19d,0x7c8b91,0xaa9f98];
  const rearFrames=streetMaterial(0x414b52,{metalness:.25,roughness:.54});
  const rearGlass=streetMaterial(0x526b77,{metalness:.22,roughness:.32});
  const rearWarm=streetMaterial(0xeac69a,{emissive:0xb27635,emissiveIntensity:.22});
  const rearRoofs=streetMaterial(0x555960);
  const rearShops=['拾光花店','霧光麵屋','暮光茶所','雲巷商行','星野雜貨','森島書房'];
  for(const side of [-1,1]) {
    // 建築位於主街第一排背後；保留街道中心與玩家出生動線。
    for(let i=0;i<9;i++) {
      const z=-92+i*23.5+(side===1?7:0);
      const width=19+(i%3)*1.7;
      const height=[14,18,23,16,27,20,14,24,17][(i+(side===1?2:0))%9];
      const depth=11+(i%3)*1.5;
      const building=new THREE.Group();
      building.position.set(side*33,0,z);
      building.rotation.y=side===1?0:Math.PI;
      scene.add(building);
      const wall=streetMaterial(rearWalls[(i+(side===1?2:0))%rearWalls.length]);
      streetBox(building,depth,height,width,depth/2,height/2,0,wall);
      // 騎樓與連續店面，朝向主街方向。
      streetBox(building,2.7,.18,width,-1.25,.2,0,concrete);
      streetBox(building,2.7,.23,width,-1.25,3.55,0,wall);
      for(let a=-width/2+1;a<width/2;a+=4.3) {
        streetBox(building,.22,3.1,.22,-2.3,1.85,a,wall);
        streetBox(building,.08,2.6,3.3,-.08,1.75,a+1.4,rearGlass);
        streetBox(building,.12,.13,3.35,-.16,3.05,a+1.4,rearFrames);
      }
      for(let y=5.5;y<height-1;y+=3.15) {
        streetBox(building,.21,.16,width,-.16,y+1.18,0,wall);
        for(let a=-width/2+1.8;a<width/2-1;a+=3.05) {
          const lit=(i+Math.round(y)+Math.round(a))%6===0;
          streetBox(building,.09,1.9,2.3,-.085,y,a,lit?rearWarm:rearGlass);
          streetBox(building,.17,2.25,.085,-.18,y,a-1.2,rearFrames);
          streetBox(building,.17,.09,2.45,-.18,y-.96,a,rearFrames);
        }
      }
      streetBox(building,depth+.35,.25,width+.4,depth/2,height+.1,0,rearRoofs);
      if(height<=20) {
        createShopSign(building,rearShops[(i+(side===1?3:0))%rearShops.length],4.25,0,
          ['#36545d','#745244','#3d514c'][i%3],Math.min(7,width-3));
      }
      // 屋頂機房：讓樓頂輪廓不再是完全平整的長方形。
      streetBox(building,3.5,1.4,4.5,depth/2,height+.85,-width*.18,rearFrames);
    }
  }

  // 路燈仍由既有日夜循環控制。
  for(let z=-72;z<78;z+=15){
    for(const side of [-1,1]){
      const x=side*8.9;

      streetBox(
        scene,.11,5.2,.11,
        x,2.75,z,frame
      );

      streetBox(
        scene,1.5,.1,.1,
        x-side*.7,5.3,z,frame
      );

      streetBox(
        scene,.65,.1,.28,
        x-side*1.35,5.22,z,warm
      );

      if(Math.abs(z)<35){
        const lamp=new THREE.PointLight(
          0xffd49d,8,8,2
        );

        lamp.position.set(
          x-side*1.35,4.95,z
        );

        scene.add(lamp);
      }

      addTree(scene,side*9.4,z+7);
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

// 星環百貨：原創可繞行建築，材質在本機產生，不依賴外部貼圖。
function createStarRingMall(parent) {
  const makeSurface=(kind)=>{
    const canvas=document.createElement('canvas');
    canvas.width=canvas.height=512;
    const ctx=canvas.getContext('2d');
    let seed=42619;
    const random=()=>{seed=seed*16807%2147483647;return seed/2147483647;};
    ctx.fillStyle=kind==='stone'?'#d1ccc1':'#a8a39a';
    ctx.fillRect(0,0,512,512);
    for(let i=0;i<18000;i++){
      const v=kind==='stone'?170+random()*60:115+random()*65;
      ctx.fillStyle=`rgba(${v},${v},${v},.22)`;
      ctx.fillRect(random()*512,random()*512,1+random()*2,1+random()*2);
    }
    ctx.strokeStyle=kind==='stone'?'#aaa79f':'#79766f';
    ctx.lineWidth=2;
    for(let y=0;y<=512;y+=128){
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(512,y);ctx.stroke();
      for(let x=(y/128%2)*128;x<=512;x+=256){
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+128);ctx.stroke();
      }
    }
    const map=new THREE.CanvasTexture(canvas);
    map.colorSpace=THREE.SRGBColorSpace;
    map.wrapS=map.wrapT=THREE.RepeatWrapping;
    map.repeat.set(2,3);
    const bump=map.clone();
    bump.colorSpace=THREE.NoColorSpace;bump.needsUpdate=true;
    return new THREE.MeshStandardMaterial({
      color:0xffffff,map,bumpMap:bump,bumpScale:.025,roughness:.78
    });
  };
  const stone=makeSurface('stone');
  const paving=makeSurface('paving');
  const metal=streetMaterial(0x505963,{metalness:.75,roughness:.28});
  const dark=streetMaterial(0x252b31,{roughness:.9});
  const glass=streetMaterial(0x658b9d,{metalness:.35,roughness:.19});
  const clear=streetMaterial(0xa5d1da,{
    transparent:true,opacity:.18,depthWrite:false,roughness:.14,metalness:.1
  });
  const wood=streetMaterial(0x765344,{roughness:.7});
  const warm=streetMaterial(0xffe1ae,{emissive:0xffcf87,emissiveIntensity:.55});
  const red=streetMaterial(0x6e253c,{roughness:.48});
  const fabric=streetMaterial(0xd5c7b5);
  const box=(w,h,d,x,y,z,mat)=>streetBox(parent,w,h,d,x,y,z,mat);

  // 後側量體與退縮的上層玻璃立面；正面不再使用整面實牆。
  box(15,21,26,10.5,10.5,0,stone);
  box(3,17,26,1.5,12.5,0,dark);
  for(const z of [-12,12]) box(3.5,21,2,1.2,10.5,z,stone);
  for(let level=0;level<4;level++){
    const y=6.2+level*3.6;
    for(let bay=0;bay<10;bay++){
      const z=-10.8+bay*2.4;
      const panel=glass.clone();
      panel.color.setHex((bay+level)%3===0?0x789ba8:0x527d91);
      box(.08,3.24,2.3,-.14,y,z,panel);
      box(.18,3.5,.07,-.24,y,z-1.17,metal);
      // 玻璃後方的遮陽簾與樓板形成深度。
      if((bay+level)%4===0) box(.06,2.2,1.7,.12,y+.2,z,fabric);
    }
    box(.42,.22,23.2,-.23,y-1.72,0,metal);
  }
  box(.28,.3,24,-.3,20,0,metal);
  box(18.4,.3,26.4,9,21.15,0,stone);
  box(.2,.65,26,-.1,21.5,0,metal);

  // 不對稱石材側翼與通風格柵。
  box(1.1,16,4.2,-.5,12.5,9.8,stone);
  for(let y=6;y<19;y+=.32) box(.08,.09,2.5,-1.08,y,9.8,metal);
  box(18,.3,26,9,4.05,0,stone);

  // 連續騎樓：鋪面、柱腳、梁與天花燈。
  box(4.2,.16,26,-2,.24,0,paving);
  box(4.5,.24,26.3,-2,3.78,0,stone);
  for(const z of [-12,-8,-4,4,8,12]){
    box(.42,3.4,.42,-3.6,1.99,z,stone);
    box(.56,.15,.56,-3.6,.39,z,metal);
    box(.5,.16,.5,-3.6,3.64,z,metal);
  }
  for(let z=-10;z<=10;z+=4){
    box(.7,.025,.7,-2.2,3.64,z,warm);
  }
  box(.08,.07,25.5,-4.2,3.64,0,warm);

  // 中央入口退縮；兩側展示櫥窗保留可見的店內陳列。
  box(.1,3.1,25,1.2,1.85,0,dark);
  for(const side of [-1,1]){
    const center=side*7.4;
    box(1,.16,7.8,.55,.43,center,wood);
    box(.08,2.9,7.8,-.13,1.95,center,clear);
    for(let z=center-3.9;z<=center+3.9+.01;z+=1.95){
      box(.14,3.05,.055,-.23,1.95,z,metal);
    }
    for(const y of [.43,3.47]) box(.14,.09,7.8,-.23,y,center,metal);
    for(let z=center-2.8;z<=center+2.8;z+=2.8){
      box(.75,.22,.85,.35,.62,z,stone);
      const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.16,.45,4,10),fabric);
      torso.position.set(.35,1.52,z);parent.add(torso);
      const head=new THREE.Mesh(new THREE.SphereGeometry(.12,12,8),fabric);
      head.position.set(.35,2,z);parent.add(head);
      for(const offset of [-.1,.1]) box(.1,.55,.1,.35,1,z+offset,fabric);
    }
    box(.25,.05,7.6,.15,3.32,center,warm);
  }
  for(const z of [-1.1,1.1]){
    box(.08,2.9,2.1,-.2,1.95,z,clear);
    box(.12,2.95,.06,-.28,1.95,z-1.04,metal);
    box(.06,.55,.05,-.35,1.8,z-.7,metal);
  }
  box(.14,.1,4.4,-.28,3.45,0,metal);
  box(1.4,.04,4.4,-.3,.34,0,dark);
  box(.05,.015,4.4,-1.02,.37,0,warm);

  // 獨立玻璃入口雨棚與金屬斜撐。
  box(4.7,.08,7,-2.15,4.25,0,clear);
  for(const z of [-3.4,0,3.4]){
    box(4.7,.09,.08,-2.15,4.22,z,metal);
    const brace=box(2.8,.08,.08,-1.45,4.65,z,metal);
    brace.rotation.z=-.28;
  }

  // 原創星環標誌與中文直式招牌，四字不沿用真實品牌圖樣。
  const signCanvas=document.createElement('canvas');
  signCanvas.width=256;signCanvas.height=1024;
  const ctx=signCanvas.getContext('2d');
  ctx.fillStyle='#702b42';ctx.fillRect(0,0,256,1024);
  ctx.strokeStyle='#ddc49c';ctx.lineWidth=4;ctx.strokeRect(10,10,236,1004);
  ctx.save();ctx.translate(128,118);ctx.rotate(-.4);
  ctx.strokeStyle='#ffe5b9';ctx.lineWidth=7;
  ctx.beginPath();ctx.ellipse(0,0,75,31,0,0,Math.PI*2);ctx.stroke();
  ctx.restore();
  ctx.fillStyle='#ffe5b9';ctx.beginPath();
  for(let i=0;i<10;i++){
    const a=-Math.PI/2+i*Math.PI/5,r=i%2?17:38;
    const x=128+Math.cos(a)*r,y=118+Math.sin(a)*r;
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  ctx.closePath();ctx.fill();
  ctx.font='bold 135px "Microsoft JhengHei",sans-serif';
  ctx.textAlign='center';ctx.textBaseline='middle';
  [...'星環百貨'].forEach((letter,i)=>ctx.fillText(letter,128,310+i*175));
  const signMap=new THREE.CanvasTexture(signCanvas);
  signMap.colorSpace=THREE.SRGBColorSpace;
  const signMat=new THREE.MeshStandardMaterial({
    map:signMap,emissiveMap:signMap,emissive:0xffffff,emissiveIntensity:.3,roughness:.5
  });
  box(.25,11,2.8,-.98,11,-9.3,red);
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(2.65,10.6),signMat);
  sign.rotation.y=-Math.PI/2;sign.position.set(-1.12,11,-9.3);parent.add(sign);
  createShopSign(parent,'星環百貨',4.9,0,'#26383f',7);

  // 花台、長椅及入口導覽牌，不增加尚未實作的店內互動。
  const soil=streetMaterial(0x332b22);
  const green=streetMaterial(0x48614b);
  for(const z of [-10.2,10.2]){
    box(.9,.65,2.1,-3,.66,z,stone);
    box(.75,.03,1.95,-3,1,z,soil);
    for(let i=0;i<7;i++){
      const leaf=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),green);
      leaf.scale.set(.8,1.5,1);leaf.position.set(-3+(i%2)*.15,1.17,z-.78+i*.26);
      leaf.castShadow=true;parent.add(leaf);
    }
  }
  box(.5,.1,2,-2.8,.85,6.7,wood);
  for(const z of [5.9,7.5])box(.4,.45,.08,-2.8,.57,z,metal);
  box(.18,1.3,.9,-2.9,1.03,-3,metal);
  // 夜間入口照明交由既有日夜循環接管。
  for(const z of [-6,6]){
    const lamp=new THREE.PointLight(0xffdfb0,12,7,2);
    lamp.position.set(-1.8,3.3,z);parent.add(lamp);
  }
}
