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
    multiplier = 1;
    controls.noZoom = true;
    controls.noRotate = true;
//    controls.minDistance = 40;
//    controls.maxDistance = 100;
    camera.position.x = -41.26555087900631 * multiplier;
    camera.position.y = 35.05179776153716 * multiplier;
    camera.position.z = 29.535452843228835 * multiplier;
    camera.rotation.x = -0.5769296339006073;
    camera.rotation.y = -0.8441911673592711;
    camera.rotation.z = -0.452726163970057;
    setDebugCameraProperties();

}

function setCameraPositionScene2() {
    multiplier = 1.456;
    multiplier = 1;
    multiplier = 1.2;
    controls.noZoom = false;
    controls.noRotate = false;
    controls.minDistance = 100;
    controls.maxDistance = 150;
    camera.position.x = -120 / multiplier;
    camera.position.y = 80 / multiplier;
    camera.position.z = 20 / multiplier;
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
    multiplier = 1;
    controls.noRotate = false;
   
    controls.minAzimuthAngle = - Infinity; // radians
	controls.maxAzimuthAngle 
//    controls.noPan = false;
//    camera.position.x = -120 * multiplier;
//    camera.position.y = 80 * multiplier;
//    camera.position.z = 20 * multiplier;
//    camera.rotation.x = -1.32581;
//    camera.rotation.y = -0.96872;
//    camera.rotation.z = -1.27628;
//
//
//    camera.position.x = -56.37748752010526 * multiplier;
//    camera.position.y = 69.80148876473167 * multiplier;
//    camera.position.z = -44.15122950889827 * multiplier;
//    camera.rotation.x = -2.134788998491361;
//    camera.rotation.y = -0.5989491813424832;
//    camera.rotation.z = -2.4136008035803767;
//

    //try3
//    camera.position.x = -75.47639375128176;
//    camera.position.y = -17.980596768532852;
//    camera.position.z = -54.76625675649709;
//    camera.rotation.x = 2.6798487003295572;
//    camera.rotation.y = -0.8611304274918877;
//    camera.rotation.z = 2.780643921146614;


//    try4
    camera.position.x = -75.07179904582648;
    camera.position.y = 15.027656674615061;
    camera.position.z = -64.33035459946542;
    camera.rotation.x = -2.9121065744547727;
    camera.rotation.y = -0.8491482583344366;
    camera.rotation.z = -2.9679892414057765;

    controls.minPolarAngle = 0.7;
    controls.maxPolarAngle = 1.8;
    controls.minDistance = 45;
    controls.maxDistance = 120;
    controls.noPan = false;

    setDebugCameraProperties();
}

function setDebugCameraProperties() {
    if (debug_mode_on) {

//        controls.noRotate = false;
        controls.maxDistance = 10000;
//        controls.minDistance = 1;
//        controls.noZoom = false;
//        controls.noPan = false;
        controls.minPolarAngle = -0.8;
        controls.maxPolarAngle = 8;
        camera.position.x = camera.position.x * debugZoomoutAmmount;
        camera.position.y = camera.position.y * debugZoomoutAmmount;
        camera.position.z = camera.position.z * debugZoomoutAmmount;
    }
}