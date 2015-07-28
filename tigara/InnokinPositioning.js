function moveTheWheelToCenter() {
    var wheel = scene.getObjectByName('grupRoata');
    if (wheel) {
        wheel.position.x = 0;
        wheel.position.y = -46;
        wheel.position.z = 0;
    }
}

function resetWheelRotation() {
    var wheel = scene.getObjectByName('grupRoata');
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


function staticizeSevenBoxes() {

    sevenBoxesGroup = scene.getObjectByName("sevenColourBoxes");
    if (sevenBoxesGroup) {
        var boxes = [];
        for (i = 0; i < 7; i++) {
            boxes[i] = sevenBoxesGroup.children[i];
            boxes[i].position.copy(camera.position);
            boxes[i].rotation.copy(camera.rotation);

            boxes[i].translateZ(-300);
            boxes[i].translateY(100);
            boxes[i].translateX(-110 + 40 * i);
        }
    }
}

function staticizeThreeBoxesGroup() {

    threeBoxesGroup = scene.getObjectByName("threeColourBoxes");
    if (threeBoxesGroup) {
        goldenBox = threeBoxesGroup.children[0];
        silverBox = threeBoxesGroup.children[1];
        blackBox = threeBoxesGroup.children[2];
        goldenBox.position.copy(camera.position);
        goldenBox.rotation.copy(camera.rotation);
        goldenBox.updateMatrix();
        goldenBox.translateZ(-300);
        goldenBox.translateX(40);
        goldenBox.translateY(100);
        silverBox.position.copy(camera.position);
        silverBox.rotation.copy(camera.rotation);
        silverBox.updateMatrix();
        silverBox.translateZ(-300);
        silverBox.translateX(-40);
        silverBox.translateY(100);
        blackBox.position.copy(camera.position);
        blackBox.rotation.copy(camera.rotation);
        blackBox.updateMatrix();
        blackBox.translateZ(-300);
        blackBox.translateX(-00);
        blackBox.translateY(100);
    }
}

function staticizeOptionsGroup() {

    optionsGroup = scene.getObjectByName("optionsGroup");
    if (optionsGroup) {

        optionBox1 = optionsGroup.children[0];
//                        optionBox2 = optionsGroup.children[1];
//                        optionBox3 = optionsGroup.children[2];
        optionBox1.position.copy(camera.position);
        optionBox1.rotation.copy(camera.rotation);
//                        optionBox2.position.copy(camera.position);
//                        optionBox2.rotation.copy(camera.rotation);
//                        optionBox3.position.copy(camera.position);
//                        optionBox3.rotation.copy(camera.rotation);

        optionBox1.translateZ(-250); // BIGGER IS MORE TO THE CAMERA
        optionBox1.translateY(-30); // top bottom  (bottom is about 80)
        optionBox1.translateX(window.SCREEN_WIDTH / 2 - 800); // 0 - middle , + = to right , - = to left
//                        optionBox2.translateZ(-250); // BIGGER IS MORE TO THE CAMERA
//                        optionBox2.translateY(-55); // top bottom  (bottom is about 80)
//                        optionBox2.translateX(-120); // 0 - middle , + = to right , - = to left
//                        optionBox3.translateZ(-250); // BIGGER IS MORE TO THE CAMERA
//                        optionBox3.translateY(-80); // top bottom  (bottom is about 80)
//                        optionBox3.translateX(-120); // 0 - middle , + = to right , - = to left

        optionBox1.updateMatrix();
//                        optionBox2.updateMatrix();
//                        optionBox3.updateMatrix();

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
    camera.position.x = -115.35;
    camera.position.y = 27.86;
    camera.position.z = 84.36;
    camera.rotation.x = -0.31897;
    camera.rotation.y = -0.91447;
    camera.rotation.z = -0.25590;
}

function setCameraPositionScene2() {
    camera.position.x = -120;
    camera.position.y = 80;
    camera.position.z = 20;
    camera.rotation.x = -1.32581;
    camera.rotation.y = -0.96872;
    camera.rotation.z = -1.27628;
}