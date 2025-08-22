import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.125.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.125.2/examples/jsm/loaders/GLTFLoader.js';


let startbtn = document.getElementById('1');
let optbtn = document.getElementById('2');
let setbtn = document.getElementById('3');
let exitbtn = document.getElementById('4');
let preloader = document.getElementById('preloader');

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
camera.position.z = 23
let bgmodel = './planet.glb';
const loader = new GLTFLoader();

loader.load('./outerspace.glb',
    (spacemodel)=>{
        let space = spacemodel.scene
        scene.add(space);
        space.position.set(0, 0, -125);
        function animeround(){
            space.rotation.y += 0.0004;
        requestAnimationFrame(animeround);
    }
    animeround()

    },
    ()=>{

    },
    ()=>{

    }

)


loader.load(bgmodel,
    (gltf)=>{
        console.log(gltf)
        bgmodel = gltf.scene
        scene.add(bgmodel)
        bgmodel.position.set(0, 0, 0);
        bgmodel.rotation.set(0,-2,0)
    function animateround(){
        // do{
            bgmodel.rotation.y += 0.0004;
        // }while(bgmodel.rotation.y > -1.1)
        requestAnimationFrame(animateround);
    }
    animateround()
    preloader.style.display = 'none';
    document.getElementById('4').addEventListener('click', () => {
        bgmodel.position.set(50, 0, -60)
    })

    startbtn.onclick = function changescene(){
    if (camera.position.z > -123) {
        camera.position.z -= 3;
        requestAnimationFrame(changescene);
    }}

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enableZoom = true;
    // controls.minDistance = 10;
    // controls.maxDistance = 50;
    // controls.enablePan = true;
    // controls.maxPolarAngle = Math.PI / 2;
    // controls.update();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    bgmodel.traverse((child) => {
        if (child.isMesh) {
            child.material.roughness = 1; // Adjust roughness
            child.material.metalness = 0.4; // Adjust metalness
            child.material.emissive = new THREE.Color(0x00FFFF);
            child.material.emissiveIntensity = 0.3; // Adjust emissive intensity

        }
    });
    }
)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Increased intensity
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2); // Increased intensity
pointLight.position.set(100, 100, 150);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0x0000ff, 0.7); // Increased intensity
directionalLight.position.set(100, 100, 60);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.getElementById('bgmodel').appendChild(renderer.domElement)

const al = new THREE.AmbientLight(0xffffff, 1);
const pl = new THREE.PointLight(0xffffff ,1)
pl.position.set(100,100,100)
// const dl = new THREE.DirectionalLight(0xffffff , 5)
// dl.position.set(100,40,30)
scene.add(al)
scene.add(pl)
// scene.add(dl)

function rerender() {
    requestAnimationFrame(rerender);
    renderer.render(scene, camera);
};
rerender();

