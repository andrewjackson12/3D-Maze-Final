//Import the Three.js module and other dependencies
import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

//Fires load event when page is loaded

window.onload = function() {

//Define the WebGL renderer:

var renderer = new THREE.WebGLRenderer(); //specify the we will use WebGL
renderer.setSize( 800, 600 ); //scene size (Width, Height)
document.body.appendChild( renderer.domElement );

//Initialize (create) the scene:

var scene = new THREE.Scene();

//Define the camera:

var camera = new THREE.PerspectiveCamera(
35,             // Field of view
800 / 600,      // Aspect ratio
0.1,            // Near plane
10000           // Far plane
);
camera.position.x= 0;  //default value anyway
camera.position.y= 0;  
camera.position.z = 80;
camera.lookAt( scene.position );
//Rotating camera to align with plane and sky
camera.rotation.x = 1.5708 * 2;
//Testing camera position
console.log(camera.position);

//First person controls creation and setting of speed
const fpControls = new FirstPersonControls(camera, renderer.domElement);
//Setting speed, can be changed
fpControls.lookSpeed = 0.002;
fpControls.movementSpeed = 0.5;

//Not allowing vertical sight, ensures camera stays at the same Y coord
fpControls.lookVertical = false;


//Loading in 2 textures for walls

const texture = new THREE.TextureLoader().load( "../brickwall.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

const texture2 = new THREE.TextureLoader().load( "../mossystone.jpg");
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.set( 4, 4 );


//Creating walls for the maze
const wallGeometry = new THREE.BoxGeometry( 30, 6, 1 ); 
//Adding texture to the wall
const wallMaterial = new THREE.MeshBasicMaterial( {map: texture2} ); 
const wallBody = new THREE.Mesh( wallGeometry, wallMaterial ); 
wallBody.position.z = 90;
wallBody.position.x = -5;
//Setting wallBody name for later collision detection
wallBody.name = 'wall';
wallBody.rotation.y = 1.5708;
scene.add( wallBody );

//Second wall
const wallGeometry2 = new THREE.BoxGeometry(30, 6, 1);
const wallMaterial2 = new THREE.MeshBasicMaterial( {map: texture} ); 
const wallBody2 = new THREE.Mesh( wallGeometry2, wallMaterial2 ); 
wallBody2.position.z = 90;
wallBody2.position.x = 5;
wallBody2.rotation.y = 1.5708;
wallBody2.name = 'wall';

scene.add(wallBody2);

//Third wall
const wallBody3 = wallBody.clone();
wallBody3.rotation.y = 1.5708 * 2;
wallBody3.position.z = 75;
wallBody3.position.x = 0;
wallBody3.scale.x = 0.3;
scene.add(wallBody3);

//Fourth wall
const wallBody4 = wallBody3.clone();
wallBody4.position.z = 105;
wallBody4.position.x = -38;
wallBody4.scale.x = 2.2;
scene.add(wallBody4);

//Fifth wall
const wallBody5 = wallBody3.clone();
wallBody5.position.z = 105;
wallBody5.position.x = 9;
scene.add(wallBody5);

//sixth wall
const wallBody6 = wallBody5.clone();
wallBody6.rotation.y = 1.5708;
wallBody6.position.z = 110;
wallBody6.position.x = 13;
scene.add(wallBody6);

//seventh wall
const wallBody7 = wallBody5.clone();
wallBody7.position.z = 115;
wallBody7.position.x = -23;
wallBody7.scale.x = 2.4;
scene.add(wallBody7);

//eighth wall
const wallBody8 = wallBody6.clone();
wallBody8.position.x = -71;
wallBody8.position.z = 120;
wallBody8.scale.x = 1;
scene.add(wallBody8);

//Ninth wall
const wallBody9 = wallBody8.clone();
wallBody9.position.x = -59;
wallBody9.position.z = 121;
wallBody9.scale.x = 0.4;
scene.add(wallBody9);

//Tenth wall
const wallBody10 = wallBody4.clone();
wallBody10.position.x = -34;
wallBody10.position.z = 127;
wallBody10.scale.x = 1.7;
scene.add(wallBody10);

//Eleventh wall
const wallBody11 = wallBody10.clone();
wallBody11.position.x = -86;
wallBody11.position.z = 135;
wallBody11.scale.x = 1;
scene.add(wallBody11);

//12th wall
const wallBody12 = wallBody6.clone();
wallBody12.position.x = -101;
wallBody12.position.z = 140;
scene.add(wallBody12);

//13th wall
const wallBody13 = wallBody11.clone();
wallBody13.position.x = -80;
wallBody13.position.z = 145;
wallBody13.scale.x = 1.4;
scene.add(wallBody13);

//14th wall
const wallBody14 = wallBody6.clone();
wallBody14.position.x = -60;
wallBody14.position.z = 142;
wallBody14.scale.x = 0.2;
scene.add(wallBody14);

//15th wall
const wallBody15 = wallBody13.clone();
wallBody15.position.x = -40;
wallBody15.position.z = 139;
scene.add(wallBody15);

//16th wall
const wallBody16 = wallBody14.clone();
wallBody16.position.x = -9;
wallBody16.position.z = 150;
wallBody16.scale.x = 1.5;
scene.add(wallBody16);

//17th wall
const wallBody17 = wallBody16.clone();
wallBody17.position.x = -19;
wallBody17.position.z = 155;
wallBody17.scale.x = 1.1;
scene.add(wallBody17);


//Creating plane and adding it to scene for the sky
const geometry1 = new THREE.PlaneGeometry( 300, 600 );
const material1 = new THREE.MeshStandardMaterial( {color: 0x0c67f7} );
const plane = new THREE.Mesh( geometry1, material1 );

plane.position.y = 5;
plane.rotation.x = 1.5708;
scene.add( plane );

//Creating plane and adding it to scene for the ground
const geometry2 = new THREE.PlaneGeometry( 300, 600 );
const material2 = new THREE.MeshStandardMaterial( {color: 0x703913} );
const plane2 = new THREE.Mesh( geometry2, material2 );

plane2.position.y = -3;
plane2.material.side = THREE.BackSide;

plane2.rotation.x = 1.5708;
scene.add( plane2 );


//Loading MTL File for OBJ File texture
const mtlLoader = new MTLLoader()
mtlLoader.load(
    '12221_Cat_v1_l3.mtl',
    (materials) => {
        materials.preload()
        console.log(materials)

//OBJLoader
const loader = new OBJLoader();

//load a resource
loader.load(
	//resource URL
	'../Cat.obj',
	// called when resource is loaded
	function ( object ) {
        //Changing position and scale of the object
        object.position.x = 0;
        object.position.y = -3;
        object.position.z = 90;
        object.rotation.y = 1.5708 * 2;
        object.rotation.x = 1.5708;
        object.scale.x = 0.05;
        object.scale.y = 0.05;
        object.scale.z = 0.05;
		var catTexture = new THREE.TextureLoader().load('../Cat_diffuse.jpg')

		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = catTexture;
			}
		});

		scene.add( object );
	

	},
	//called when loading is in progress
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	//called when loading has error
	function ( error ) {

		console.log( 'An error happened' );

	}
)}
);

//Adding ambient light to the scene
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


//Adding spotlight to the scene
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );


//COLLISION DETECTION TEST
function checkCollision(camera, walls) {
    //Check if the camera object is valid (test)
    if (!camera || !camera.position) {
        console.error("Camera is not properly initialized.");
        return false; //Unable to perform collision detection
    }

    //Create a raycaster from the camera's position
    const raycaster = new THREE.Raycaster(camera.position, camera.getWorldDirection(new THREE.Vector3()));

    //Setting short range for the raycaster so it only detects when camera actually collides with a wall
    raycaster.near = 0;
    raycaster.far = 1; 

    //Checking for intersections
    const intersects = raycaster.intersectObjects(walls);

    //If intersections are found
    if (intersects.length > 0) {
        //Loop through the intersections
        for (const intersect of intersects) {
            //Check if the intersected object is a wall
            if (intersect.object.type === 'Mesh' && intersect.object.name.startsWith('wall')) {
                //If a collision with a wall is detected, return true. Utility function for updating camera position
                console.log("Collision with a wall detected");
                return true; 
            }
        }
    }

    //No collision detected
    return false;
}

//Function that calls for checkCollision function, if it returns true this updates the camera's position
const updateCameraPosition = () => {
    //Update the camera's position based on controls
    fpControls.update(1.0);

    //If the camera has collided with any of the walls
    if (checkCollision(camera, [wallBody, wallBody2, wallBody3, wallBody4, wallBody5, wallBody6, wallBody7, wallBody8, wallBody9, wallBody10, wallBody11, wallBody12, wallBody13, wallBody14, wallBody15, wallBody16, wallBody17])) {
		console.log("Colliding with a wall");
        //Set camera position back to the start of the maze
		camera.position.x= 0; 
		camera.position.y= 0;  
		camera.position.z = 80;		
    }

    // Render the scene
    renderer.render(scene, camera);
};
//Animate function
function animate() {
    requestAnimationFrame(animate);

    fpControls.update(1.0);
	updateCameraPosition();
    renderer.render(scene, camera);
}


animate();


}