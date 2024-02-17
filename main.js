import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.SphereGeometry(1, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );

const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const wireframe = new THREE.LineSegments(edges, lineMaterial);
const group = new THREE.Group();
// group.add(sphere);
group.add(wireframe);
scene.add(group);


camera.position.z = 5;
controls.update();

function animate() {
	requestAnimationFrame( animate );

    controls.update();

	renderer.render( scene, camera );
}

animate();