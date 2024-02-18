import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.SphereGeometry(1, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
const numMeshes = 6;
const meshes = [];
const boundingSpheres = [];

for (let i = 0; i < numMeshes; i++) {
	const edges = new THREE.EdgesGeometry(geometry);
	const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
	const wireframe = new THREE.LineSegments(edges, lineMaterial);
	const group = new THREE.Group();
	group.add(wireframe);
	scene.add(group);
	wireframe.position.x = Math.random() * 10 - 5;
	wireframe.position.y = Math.random() * 10 - 5;
	wireframe.position.z = Math.random() * 10 - 5;
	meshes.push(wireframe)

	const boundingSphere = new THREE.Sphere(wireframe.position, 1);
	boundingSpheres.push(boundingSphere);
}


camera.position.z = 10;
camera.position.x = 
controls.update();

const gravitationalConstant = 1;

function checkCollision(sphere1, sphere2) {
	const distance = sphere1.center.distanceTo(sphere2.center);
	return distance < sphere1.radius + sphere2.radius;
  }

  function resolveCollision(mesh1, mesh2) {
	const separationVector = new THREE.Vector3().copy(mesh1.position).sub(mesh2.position).normalize();
	const separationDistance = mesh1.geometry.boundingSphere.radius + mesh2.geometry.boundingSphere.radius;
	const displacement = separationVector.multiplyScalar(separationDistance);
	mesh1.position.copy(mesh2.position).add(displacement);
  }

function animate() {
	requestAnimationFrame( animate );

	for (let i = 0; i < numMeshes; i++) {
        for (let j = 0; j < numMeshes; j++) {
          if (i !== j) {
			const force = new THREE.Vector3().copy(meshes[j].position).sub(meshes[i].position);
            const distance = force.length();
            force.normalize().multiplyScalar(gravitationalConstant / (distance * distance));
            meshes[i].position.add(force);

			if (checkCollision(boundingSpheres[i], boundingSpheres[j])) {
			  resolveCollision(meshes[i], meshes[j]);
			}
          }
        }
      }

    controls.update();

	renderer.render( scene, camera );
}

animate();