function addLightingToScene(lightingPositions) {
    var directionalLightStrength = 0.15;
    var increase = 1;
    for (i = 0; i < lightingPositions.length; i++) {
        var directLight = new THREE.DirectionalLight(0xffffff, directionalLightStrength);
        directLight.position.set(lightingPositions[i].x, lightingPositions[i].y, lightingPositions[i].z);
        directLight.name = "luminaDirectionala" + i;
        scene.add(directLight);
    }
    pointLight = new THREE.PointLight(0xcccccc, 0.3);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);
    if (debug_mode_on) {
        showLightingAndAxisDebug(lightingPositions);
    }
}

function setUpGroups(groups_array) {
    for (i = 0; i < groups_array.length; i++) {

        group = new THREE.Group();
        group.name = groups_array[i].name;
        scene.add(group);
    }
}



function addOrbitControlsToScene() {
    controls = new THREE.OrbitControls(camera, container);
    controls.noZoom = false;
    controls.minDistance = 80;
    controls.maxDistance = 120;
    controls.noPan = true;

    controls.minPolarAngle = 0.8;
    controls.maxPolarAngle = 1.2;
    if (no_polar) {
        controls.minPolarAngle = 1.1;
        controls.maxPolarAngle = 1.1;
    }
    if (debug_mode_on) {
        controls.minDistance = 2;
        controls.maxDistance = 1000;
        controls.noPan = false;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = 2 * Math.PI;
    }
}

function addPerspectiveCameraToScene() {
    camera = new THREE.PerspectiveCamera(50, ASPECT_RATIO, 1, 600);
    camera.position.x = -140;
    camera.position.y = 70;
    camera.position.z = 85;
    if (debug_mode_on) {
        camera = new THREE.PerspectiveCamera(50, ASPECT_RATIO, 1, 10000);
        camera.position.x = -120;
        camera.position.y = 80;
        camera.position.z = 20;
    }
    camera.rotateOnAxis(300);
    scene.add(camera);
}
