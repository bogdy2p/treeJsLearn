function moveTheWheelToCenter() {
    var wheel = scene.getObjectByName('groupRoata');
    if (wheel) {
        wheel.position.x = 0;
        wheel.position.y = -46;
        wheel.position.z = 0;
    }
}

function resetWheelRotation() {
    var wheel = scene.getObjectByName('groupRoata');
    if (wheel) {
        wheel.rotation.x = 0;
        wheel.rotation.y = 0;
        wheel.rotation.z = 0;
    }
}


function bringDeviceToCenterScreen(groups_array) {
    console.log("fixGroupsPositionsToCenter");
    for (i = 0; i < groups_array.length; i++) {
        console.log("Fixing group " + groups_array[i].name + " to center pos.");
        var group = scene.getObjectByName(groups_array[i].name);
        group.position.set(groups_array[i].x, groups_array[i].y, groups_array[i].z);

    }

}

function staticizeDisruptors() {

    disruptorsGroup = scene.getObjectByName("disruptorChoicesGroup");
    if (disruptorsGroup) {

        disruptorsGroup.rotation.y = 0.65;
        for (i = 0; i < disruptorsGroup.children.length; i++) {
//            disruptorsGroup.children[i].position.copy(camera.position);
//            disruptorsGroup.children[i].rotation.copy(camera.rotation);
//            disruptorsGroup.children[i].translateZ(-150);
//            disruptorsGroup.children[i].translateY(-10);
//            disruptorsGroup.children[i].translateX(-10 + 30 * i);
        }
    }

}



function staticizeLargeScreenCanvas() {
    largeScreenShown = scene.getObjectByName('largeScreen');
    if (largeScreenShown) {
        largeScreenShown.position.copy(camera.position);
        largeScreenShown.rotation.copy(camera.rotation);
        largeScreenShown.translateZ(-150);
        largeScreenShown.updateMatrix();
        largeScreenShown.translateY(-40);
        largeScreenShown.translateX(80);
    }
}

function setCameraPositionScene1() {
    controls.noRotate = true;
    controls.minDistance = 80;
    controls.maxDistance = 100;
    camera.position.x = -60.1852;
    camera.position.y = 28.989;
    camera.position.z = 44.015;
    camera.rotation.x = -0.582393;
    camera.rotation.y = -0.85157;
    camera.rotation.z = -0.46001;
    setDebugCameraProperties();

}

function setCameraPositionScene2() {
    controls.noRotate = false;
    controls.minDistance = 100;
    controls.maxDistance = 140;
    camera.position.x = -120;
    camera.position.y = 80;
    camera.position.z = 20;
    camera.rotation.x = -1.32581;
    camera.rotation.y = -0.96872;
    camera.rotation.z = -1.27628;
    setDebugCameraProperties();
}

function setCameraPositionScene3() {

    controls.noRotate = true;
    camera.position.x = 0;
    camera.position.y = 54.0302;
    camera.position.z = 84.147;
    camera.rotation.x = -0.5708;
    camera.rotation.y = 0.0012516;
    camera.rotation.z = 0.0008;
    controls.minDistance = 100;
    controls.maxDistance = 180;
    controls.minPolarAngle = 1;
    controls.maxPolarAngle = 1;
    setDebugCameraProperties();
}

function setCameraPositionScene4() {
    controls.noRotate = false;
    camera.position.x = -120;
    camera.position.y = 80;
    camera.position.z = 20;
    camera.rotation.x = -1.32581;
    camera.rotation.y = -0.96872;
    camera.rotation.z = -1.27628;
    controls.minPolarAngle = 0.7;
    controls.maxPolarAngle = 1.8;
    controls.maxDistance = 160;
    setDebugCameraProperties();
}

function setDebugCameraProperties() {
    if (debug_mode_on) {
        zoomoutAmmount = 4;
        controls.noRotate = false;
        controls.maxDistance = 10000;
        controls.minDistance = 1;
        controls.noZoom = false;
        controls.noPan = false;
        controls.minPolarAngle = -0.8;
        controls.maxPolarAngle = 8;
        camera.position.x = camera.position.x * zoomoutAmmount;
        camera.position.y = camera.position.y * zoomoutAmmount;
        camera.position.z = camera.position.z * zoomoutAmmount;
    }
}