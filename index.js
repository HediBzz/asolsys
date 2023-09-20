
import * as THREE from "three";
import { ColorManagement } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';

import * as env from './const.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


// textureLoader
const textureLoader = new THREE.TextureLoader();
const video = document.createElement('video');
video.src = 'textures/sun/sunvid.mov';
video.loop = true; // La vidéo boucle en continu
video.muted = true; // Activez le mode muet pour éviter la lecture du son
video.play(); // Commencez la lecture de la vidéo
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter; // Réglez le filtrage pour une meilleure qualité
videoTexture.magFilter = THREE.LinearFilter;
const sunTexture = textureLoader.load("textures/sun/sunmap.jpg");
const backgroundTexture = textureLoader.load("textures/starmap_8k.jpeg");

// Create materials with textures
const backgroundMaterial = new THREE.MeshBasicMaterial({
    map: backgroundTexture,
    side: THREE.BackSide,
});
const sunMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
});

var solarSystem = new THREE.Object3D();
scene.add(solarSystem);

function render() {


    //ajouter des ombres
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

// Appelez la fonction render pour commencer l'animation
render(); camera.position.z = 10;