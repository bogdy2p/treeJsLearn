if (debug_mode_on) {
    showDebugHUD();
}


document.addEventListener('mousemove', onDocumentMouseMove, false);

initializeEmptyScene();

displayScene1Stuff();


function displayScene1Stuff() {

}
setTimeout(function () {
    playScene1();
}, 5000);


function playScene1() {


    //after Everything is loaded ,


    // 1. Display the wheel
    // 
    moveTheWheelToCenter();
    function moveTheWheelToCenter() {
        var wheel = scene.getObjectByName('grupRoata');
        console.log(wheel.position);
        if (wheel) {
            wheel.position.x = 0;
            wheel.position.y = 0;
            wheel.position.z = 0;

        }
        console.log(wheel.position);
    }
    
    animateWheelLeftRight60degree();
    // 
    // 
    // 2. Animate a little rotation to the wheel (60 degrees left , 60 degrees right
    // 
    function animateWheelLeftRight60degree() {
        console.log("Animating left ,  animating Light");
        
        //animation to left , 60 degree
        function rotat60degreeOverXSeconds(object,axis,time) {
            
        }
        // animation to right , 2 * 60 degree;
        //return animation to middle sceeen
        
    }
    // 
    // 
    // 3. Fly-in the disruptors only with the 3 colours specified , 
    // 4. Make the user choose a disruptor model/color.
    // After chosing , proceed to scene2 :)




}


//                displaySceneInformation();

animate();
function initializeEmptyScene() {
    container = document.getElementById('container');
    scene = new THREE.Scene();
    raycaster = new THREE.Raycaster();
    clock = new THREE.Clock();
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

    addPerspectiveCameraToScene();
    addOrbitControlsToScene();
    addLightingToScene(lightingPositions);




    setUpGroups(groups_array);
    load3DOBJmodelsWithDefaultMaterials();
//                    loadObjWithoutMaterials();
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x559955, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    container.appendChild(renderer.domElement);
    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
    renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);

}

function initParticles() {
    particleGroup = new SPE.Group({
        texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
        maxAge: 5,
        hasPerspective: true,
        colorize: true
    });
    emitter = new SPE.Emitter({
        position: new THREE.Vector3(-11.5, 45, -2),
        positionSpread: new THREE.Vector3(0, 0, 0),
        acceleration: new THREE.Vector3(0, 30, 00),
        accelerationSpread: new THREE.Vector3(0, 5, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        velocitySpread: new THREE.Vector3(10, 10, 10),
        colorStart: new THREE.Color(0x111111),
        colorEnd: new THREE.Color(0x000000),
        sizeStart: 15,
        sizeEnd: 500,
        particleCount: 100,
    });
    particleGroup.addEmitter(emitter);
    scene.add(particleGroup.mesh);
}



function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render(clock.getDelta());
    TWEEN.update();
}

function restartEngine(parameters)
{
    engine.destroy();
    engine = new ParticleEngine();
    engine.setValues(parameters);
    engine.initialize();
}


function onDocumentMouseDown(event) {
    event.preventDefault();
    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    renderer.domElement.addEventListener('mouseout', onDocumentMouseOut, false);
    var mouseVector = new THREE.Vector3();
    mouseVector.x = 2 * (event.clientX / SCREEN_WIDTH) - 1;
    mouseVector.y = 1 - 2 * (event.clientY / SCREEN_HEIGHT);
    raycaster.setFromCamera(mouseVector, camera);
    var intersectedObjects = raycaster.intersectObjects(scene.children, true);
    if (intersectedObjects.length > 0) {

        var Object = intersectedObjects[0];
        console.log(Object.object.parent.parent);
        switch (Object.object.parent.name) {

            case 'sevenColourBoxes':


                temp_material = Object.object.material.color;
                temp_color = Object.object.material.color.getHex();
                temp_specular = Object.object.material.specular.getHex();
                console.log(temp_material);
                switchBattery({color: temp_color, shininess: 30, specular: temp_specular, metal: true, side: THREE.DoubleSide});
                removeBatteryColourOptions();
                break;
            case 'threeColourBoxes':

                mechanism_temp_material = Object.object.material;
                var mechanism = scene.getObjectByName('shell_mecanism_tigara');
                mechanism.children[0].material = mechanism_temp_material;
                removeDisruptorColourOptions();
                break;
            case 9:
                console.log("You clicked the disruptor");
                break;
            case 'buton_mare':
                console.log("You clicked START");
                startButtonClick();
                break;
            case 'optionsGroup':

                optionsGroup = scene.getObjectByName("optionsGroup");
                console.log(optionsGroup);
                console.log(scene);
                console.log(window.SCREEN_WIDTH);
                console.log(window.SCREEN_HEIGHT);
                break;
            case 'buton_mic_1':
                console.log("You pressed the +");
                plusButtonClick();
                break;
            case 'buton_mic_2':
                console.log("You pressed the -");
                minusButtonClick();
                break;
            case 13:
                console.log("Why did you click the screen ?");
                break;
            case 14:
                console.log("Why click the Filter ?");
                break;
            default:
//                                console.log(Object.object.name);
//                                console.log("UNKNOWN CLICK. ID OR NAME NOT RECOGNIZED");
//                                console.log(Object);
                break;
        }


        //
        // LOGIC FOR THE BATTERY CHOSING PART
        //


        switch (Object.object.parent.parent.parent.name) {
            case "batteryChoicesGroup":
                var clickedObject = Object.object.parent.parent;
                console.log(clickedObject);

                var old_choice_object = null;
                if (battery_chosen == null) {
                    battery_chosen = clickedObject.name;

                    clickedObject.position.y += 30;
                } else {
//                                    camera.rotation.y = clickedObject.rotation.y;
                    var old_choice_name = battery_chosen;
                    if (clickedObject.name == battery_chosen) {
//                                        console.log("YOU CHOSE THIS BATTERY");
                        var chosenMaterial = clickedObject.children[0].material;

                        temp_material = Object.object.material.color;
                        temp_color = Object.object.material.color.getHex();
                        temp_specular = Object.object.material.specular.getHex();
//                                        console.log(temp_material);
                        switchBattery({color: temp_color, shininess: 30, specular: temp_specular, metal: true, side: THREE.DoubleSide});
//                                        removeBatteryColourOptions();
                        removeBatteryChosingScene();



                    } else {

                        old_choice_object = scene.getObjectByName(old_choice_name);
                        battery_chosen = clickedObject.name;
                        old_choice_object.position.y -= 30;
                        clickedObject.position.y += 30;
                    }
                }
                break;
        }
    }

}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    targetRotationX = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.002;
}

function onDocumentMouseUp(event) {
    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    renderer.domElement.addEventListener('mouseout', onDocumentMouseOut, false);
    resetButtonPositions();
}

function onDocumentMouseOut(event) {
    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    renderer.domElement.addEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentTouchStart(event) {
//                    alert("TOUCH DETECTED");
//                    alert(event);
}

function onDocumentTouchMove(event) {
//                    alert("TOUCH MOVEMENT DETECTED");
}

function startButtonClick() {
    var startButton = scene.getObjectByName('buton_mare');
    var twoClicksDifference = 0;
    var threeClicksDifference = 0;
    startButton.position.x += 0.3;
    startButtonCounter += 1;
    startButtonCounter2 += 1;
    if (device_status === "OFF") {

        startButtonPushStart = clock.elapsedTime;
        startButtonPushed = true;
        if (startButtonCounter % 3 == 1) {
            clearTimeout();
            startClick1 = clock.elapsedTime;
            timer_running = true;
            setTimeout(function () {
                if (timer_running) {


                    displayStartInformation();
//                                    console.log('SOMETHING WENT WRONG');
//                                    console.log("the 400 ms timeout has been exceeded or too many clicks");
                } else {
                    if (startButtonCounter2 > 0)
                        if ((startButtonCounter2 % 3) == 0)
                        {
//                                            console.log("I THINK WE SHOULD START THE LIGHTER (LOGO)");
//                                            console.log(startButtonCounter2);
                        }

                }
            }, 400);
        }
        if (startButtonCounter % 3 == 2) {
            clearTimeout();
            startClick2 = clock.elapsedTime;
            twoClicksDifference = startClick2 - startClick1;
            timer_running = false;
//                            console.log("2Clizks");
//                            console.log(twoClicksDifference);

        }
        if (startButtonCounter % 3 == 0) {
            clearTimeout();
            startClick3 = clock.elapsedTime;
            threeClicksDifference = startClick3 - startClick1;
            timer_running = false;
//                            startButtonCounter = 0;
//                            console.log("3Clizks");
//                            console.log(threeClicksDifference);

            startDisruptorWithLogo();
            device_status = "ON";
        }


        console.log("ClickNUMBER");
        console.log(startButtonCounter);
//                        

    }
    setTimeout(function () {
        timer_running = true;
        startButtonCounter = 0;
    }, 600);
    if (device_status === "ON") {

//                        alert('THE DEVICE IS ONLINE');

    }
}

function plusButtonClick() {
    console.log("Plusbuttonclick LOGGED");
    var buttonSmall1 = scene.getObjectByName('buton_mic_1');
    buttonSmall1.position.x += 0.3;
    console.log(device_status);
    if (device_status === "ON") {
        console.log(device_state);
        console.log(device_variables);
        switch (device_state) {

            case 'ohmz':
                console.log('ohmz');
                device_variables.ohmz += 0.01;
                refreshDisruptorInformations();
                break;
            case 'volt':
                console.log('volt');
                device_variables.volt += 0.1;
                refreshDisruptorInformations();
                break;
            case 'watt':
                console.log('watt');
                if (device_variables.watt < 49.6) {
                    device_variables.watt += 0.5;
                } else {
                    device_variables.watt = 6.0;
                }
                refreshDisruptorInformations();
                break;
        }
    }





}

function minusButtonClick() {
    console.log("Minusbutton click LOGGED");
    var buttonSmall2 = scene.getObjectByName('buton_mic_2');
    buttonSmall2.position.x += 0.3;
    console.log(device_status);
    if (device_status === "ON") {
        console.log(device_state);
        console.log(device_variables);
        switch (device_state) {

            case 'ohmz':
                console.log('ohmz');
                device_variables.ohmz -= 0.01;
                refreshDisruptorInformations();
                break;
            case 'volt':
                console.log('volt');
                device_variables.volt -= 0.1;
                refreshDisruptorInformations();
                break;
            case 'watt':
                console.log('watt');
                if (device_variables.watt > 6.4) {
                    device_variables.watt -= 0.5;
                } else {
                    device_variables.watt = 50.0;
                }
                refreshDisruptorInformations();
                break;
        }
    }



}

function resetButtonPositions() {
    var startButton = scene.getObjectByName('buton_mare');
    var buttonSmall1 = scene.getObjectByName('buton_mic_1');
    var buttonSmall2 = scene.getObjectByName('buton_mic_2');
    startButton.position.x = 0;
    buttonSmall1.position.x = 0;
    buttonSmall2.position.x = 0;
}

function render(dt) {

//                    if (loadProgress == 100) {
//                        if (!innokin_centered_to_screen) {
//                            basicColorizeOBJ();
//                            if (!debug_mode_on) {
//                                console.clear();
//                            }
//                            load8times();
//                            console.log("Cleared OnDocumentMouseMove");
//                            innokin_centered_to_screen = true;
//                        }
//                    }

    if (particleGroup) {
        particleGroup.tick(dt);
    }
    batteryChoicesGroup = scene.getObjectByName("batteryChoicesGroup");
    if (batteryChoicesGroup) {
        support = scene.getObjectByName("roata");
        if (support) {
//                            support.rotation.y += 0.001;
        }
//                        batteryChoicesGroup.rotation.y += 0.001;

    }
    var rotationSpeed = 10;
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

    largeScreenShown = scene.getObjectByName('largeScreen');
    if (largeScreenShown) {
        largeScreenShown.position.copy(camera.position);
        largeScreenShown.rotation.copy(camera.rotation);
        largeScreenShown.translateZ(-150);
        largeScreenShown.updateMatrix();
        largeScreenShown.translateY(-40);
        largeScreenShown.translateX(80);
    }




    var newlightposition = camera.position;
    pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();
    // setViewport parameters:
    //  lower_left_x, lower_left_y, viewport_width, viewport_height

    renderer.setViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.clear();
    // left side
    renderer.setViewport(1, 1, SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
    renderer.render(scene, camera);
}


function switchBattery(materialColor) {

    setupTweenBatteryOut();
    setupTweenBatteryIn();
    tweenBatteryUp.start();
    setTimeout(function () {
        colorizeBattery(materialColor);
    }, 2400);
    setTimeout(function () {
        tweenBatteryOut.stop();
        tweenBatteryIn.start();
    }, 3000);
    setTimeout(function () {
        tweenBatteryIn.stop();
    }, 4700);
    setTimeout(function () {
//                        alert("Click sound");
    }, 5200);
}

function removeFilter() {

    setupTweenFilterRotate();
    setupTweenFilterGoUp();
    setupTweenFilterGoOut();
}


function startDisruptorWithLogo() {
    var small_screen_already_exists = scene.getObjectByName('smallScreen');
    if (!small_screen_already_exists) {
        //ONLY ADD THE SCREENS IF THEY ARE NOT ALREADY PRESENT !!!



        var screenDynamicTexture = new THREEx.DynamicTexture(400, 200);
        screenDynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
        var planeGeometry1 = new THREE.PlaneBufferGeometry(45, 20, 30, 30);
        var planeGeometry2 = new THREE.PlaneBufferGeometry(112, 50, 30, 30);
        var planeMaterial = new THREE.MeshBasicMaterial({
            map: screenDynamicTexture.texture
        });
        var ScreenPlane = new THREE.Mesh(planeGeometry1, planeMaterial);
        ScreenPlane.name = 'smallScreen';
        var LargeScreen = new THREE.Mesh(planeGeometry2, planeMaterial);
        LargeScreen.name = 'largeScreen';
        grupMecanism = scene.getObjectByName('grupMecanism');


        grupMecanism.add(ScreenPlane);
        ScreenPlane.position.x = -15.8; // DEPTH BIGGER IS INSIDE
        ScreenPlane.position.z = -1.9; // LEFT RIGHT (smaller is LEFT
        ScreenPlane.position.y = 13; // TOP BOTTOM
        ScreenPlane.rotation.z = Math.PI / 2;
        ScreenPlane.rotation.y = -Math.PI / 2;
        screenDynamicTexture.texture.needsUpdate = true;
        screenDynamicTexture.clear('#667788');
        var logoImage = document.getElementById("logoImage");
        screenDynamicTexture.drawImage(logoImage, 20, 50);
        screenDynamicTexture.drawTextCooked(
                {
                    align: 'center',
                    text: '          INNOKIN',
                    lineHeight: 0.35,
                    fillStyle: '#FDFDFD',
                    font: "bold " + (0.2 * 190) + "px Arial"
                }
        );
        screenDynamicTexture.drawTextCooked(
                {
//                                    margin: 0.15,
                    text: '                                      TECHNOLOGY',
                    align: 'center',
                    lineHeight: 0.3,
                    fillStyle: '#FDFDFD',
                    font: "" + (0.2 * 190) + "px DisrupterLCDFont",
                    family: "DisrupterLCDFont"
                }
        );
        ScreenPlane.scale.x = 0.25;
        ScreenPlane.scale.y = 0.25;
        ScreenPlane.scale.z = 0.25;
        LargeScreen.scale.x = 0.5;
        LargeScreen.scale.y = 0.5;
        LargeScreen.scale.z = 0.5;
        scene.add(LargeScreen);
        setTimeout(function () {
            grupMecanism.remove(ScreenPlane);
            scene.remove(LargeScreen);
        }, 2000);
        setTimeout(function () {
            displayDisruptor();
        }, 2100);
    } else {
        alert('Cannot add doubles @ this');
    }
}


function displayStartInformation() {


    var small_screen_already_exists = scene.getObjectByName('smallScreen');
    if (!small_screen_already_exists) {
        //ONLY ADD THE SCREENS IF THEY ARE NOT ALREADY PRESENT !!!
        var screenDynamicTexture = new THREEx.DynamicTexture(400, 150);
        screenDynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
        var planeGeometry1 = new THREE.PlaneBufferGeometry(45, 20, 30, 30);
        var planeGeometry2 = new THREE.PlaneBufferGeometry(112, 50, 30, 30);
        var planeMaterial = new THREE.MeshBasicMaterial({
            map: screenDynamicTexture.texture
        });
        var ScreenPlane = new THREE.Mesh(planeGeometry1, planeMaterial);
        ScreenPlane.name = 'smallScreen';
        var LargeScreen = new THREE.Mesh(planeGeometry2, planeMaterial);
        LargeScreen.name = 'largeScreen';
        grupMecanism.add(ScreenPlane);
        ScreenPlane.position.x = -15.8; // DEPTH BIGGER IS INSIDE
        ScreenPlane.position.z = -1.9; // LEFT RIGHT (smaller is LEFT
        ScreenPlane.position.y = 13; // TOP BOTTOM
        ScreenPlane.rotation.z = Math.PI / 2;
        ScreenPlane.rotation.y = -Math.PI / 2;
        screenDynamicTexture.texture.needsUpdate = true;
        screenDynamicTexture.clear('#667788');
        screenDynamicTexture.drawTextCooked(
                {
                    text: "        OFF",
                    lineHeight: 0.35,
                    fillStyle: '#FDFDFD',
                    font: "bold " + (0.2 * 256) + "px Arial"
                }
        );
        screenDynamicTexture.drawTextCooked(
                {
                    text: "                         Click 3x ON",
                    lineHeight: 0.35,
                    fillStyle: '#FDFDFD',
                    font: "bold " + (0.2 * 256) + "px Arial"
                });
        ScreenPlane.scale.x = 0.25;
        ScreenPlane.scale.y = 0.25;
        ScreenPlane.scale.z = 0.25;
        LargeScreen.scale.x = 0.5;
        LargeScreen.scale.y = 0.5;
        LargeScreen.scale.z = 0.5;
        scene.add(LargeScreen);
        setTimeout(function () {
            grupMecanism.remove(ScreenPlane);
            scene.remove(LargeScreen);
        }, 1500);
    } else {
        alert('Cannot add doubles @ this');
    }
}


function displayDisruptor() {

    var small_screen_already_exists = scene.getObjectByName('smallScreen');
    if (!small_screen_already_exists) {
        //ONLY ADD THE SCREENS IF THEY ARE NOT ALREADY PRESENT !!!

        var screenDynamicTexture = new THREEx.DynamicTexture(400, 200);
        screenDynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
        var planeGeometry1 = new THREE.PlaneBufferGeometry(45, 20, 30, 30);
        var planeGeometry2 = new THREE.PlaneBufferGeometry(112, 50, 30, 30);
        var planeMaterial = new THREE.MeshBasicMaterial({
            map: screenDynamicTexture.texture
        });
        console.log(planeMaterial);
        planeMaterial.name = 'textureMaterialScreen';
        console.log(planeMaterial);
        var ScreenPlane = new THREE.Mesh(planeGeometry1, planeMaterial);
        ScreenPlane.name = 'smallScreen';
        var LargeScreen = new THREE.Mesh(planeGeometry2, planeMaterial);
        LargeScreen.name = 'largeScreen';
        grupMecanism.add(ScreenPlane);
        ScreenPlane.position.x = -15.8; // DEPTH BIGGER IS INSIDE
        ScreenPlane.position.z = -1.9; // LEFT RIGHT (smaller is LEFT
        ScreenPlane.position.y = 13; // TOP BOTTOM
        ScreenPlane.rotation.z = Math.PI / 2;
        ScreenPlane.rotation.y = -Math.PI / 2;
        screenDynamicTexture.texture.needsUpdate = true;
        screenDynamicTexture.clear('#667788');
        //OHM INFORMATION
        screenDynamicTexture.drawTextCooked(
                {
                    margin: 0.05,
                    text: device_variables.ohmz + ohmLetter,
                    lineHeight: 0.35,
                    fillStyle: '#FDFDFD',
                    font: "" + (0.20 * 256) + "px Arial"
                }
        );
        //VOLTAGE INFORMATION
        screenDynamicTexture.drawTextCooked(
                {
                    margin: 0.05,
                    top: 0.5,
                    text: '                          ' + device_variables.volt + 'V',
                    lineHeight: 0.35,
                    fillStyle: '#FDFDFD',
                    font: "" + (0.20 * 256) + "px Arial"
                }
        );
        //WATTAGE INFORMATION
        screenDynamicTexture.drawTextCooked(
                {
                    text: '      ' + device_variables.watt + 'W',
                    lineHeight: 0.5,
                    fillStyle: '#FDFDFD',
                    font: "" + (0.3 * 256) + "px Arial"
                }
        );
        //BATTERY INFORMATION
        screenDynamicTexture.drawTextCooked(
                {
                    text: '                                            B',
                    lineHeight: 0.25,
                    fillStyle: '#00FDFD',
                    font: "bold " + (0.2 * 256) + "px Arial"
                }
        );
        ScreenPlane.scale.x = 0.25;
        ScreenPlane.scale.y = 0.25;
        ScreenPlane.scale.z = 0.25;
        LargeScreen.scale.x = 0.5;
        LargeScreen.scale.y = 0.5;
        LargeScreen.scale.z = 0.5;
        scene.add(LargeScreen);
        setRemoteVisible();
    } else {
        alert('Cannot add doubles @ this');
    }
}
function refreshDisruptorInformations() {

    var existingSmallScreen = scene.getObjectByName('smallScreen');
    var existingLargeScreen = scene.getObjectByName('largeScreen');
    var newScreenDynamicTexture = new THREEx.DynamicTexture(400, 200);
    newScreenDynamicTexture.name = 'screenDynamicTexture';
    newScreenDynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
    newScreenDynamicTexture.texture.needsUpdate = true;
    newScreenDynamicTexture.clear('#667788');
    //OHM INFORMATION
    newScreenDynamicTexture.drawTextCooked(
            {
                margin: 0.05,
                text: device_variables.ohmz + ohmLetter,
                lineHeight: 0.35,
                fillStyle: '#FDFDFD',
                font: "" + (0.20 * 256) + "px Arial"
            }
    );
    //VOLTAGE INFORMATION
    newScreenDynamicTexture.drawTextCooked(
            {
                margin: 0.05,
                top: 0.5,
                text: '                          ' + device_variables.volt + 'V',
                lineHeight: 0.35,
                fillStyle: '#FDFDFD',
                font: "" + (0.20 * 256) + "px Arial"
            }
    );
    //WATTAGE INFORMATION
    newScreenDynamicTexture.drawTextCooked(
            {
                text: '      ' + device_variables.watt + 'W',
                lineHeight: 0.5,
                fillStyle: '#FDFDFD',
                font: "" + (0.3 * 256) + "px Arial"
            }
    );
    //BATTERY INFORMATION
    newScreenDynamicTexture.drawTextCooked(
            {
                text: '                                            B',
                lineHeight: 0.25,
                fillStyle: '#00FDFD',
                font: "bold " + (0.2 * 256) + "px Arial"
            }
    );
    var newPlaneMaterial = new THREE.MeshBasicMaterial({
        map: newScreenDynamicTexture.texture
    });
    existingSmallScreen.material = newPlaneMaterial;
    existingLargeScreen.material = newPlaneMaterial;
}

function startTheDisruptor(text_to_display) {


    var small_screen_already_exists = scene.getObjectByName('smallScreen');
    if (!small_screen_already_exists) {
        //ONLY ADD THE SCREENS IF THEY ARE NOT ALREADY PRESENT !!!

        var screenDynamicTexture = new THREEx.DynamicTexture(400, 200);
        screenDynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
        var planeGeometry1 = new THREE.PlaneBufferGeometry(45, 20, 30, 30);
        var planeGeometry2 = new THREE.PlaneBufferGeometry(112, 50, 30, 30);
        var planeMaterial = new THREE.MeshBasicMaterial({
            map: screenDynamicTexture.texture
        });
        var ScreenPlane = new THREE.Mesh(planeGeometry1, planeMaterial);
        ScreenPlane.name = 'smallScreen';
        var LargeScreen = new THREE.Mesh(planeGeometry2, planeMaterial);
        LargeScreen.name = 'largeScreen';
        grupMecanism.add(ScreenPlane);
        ScreenPlane.position.x = -15.8; // DEPTH BIGGER IS INSIDE
        ScreenPlane.position.z = -1.9; // LEFT RIGHT (smaller is LEFT
        ScreenPlane.position.y = 13; // TOP BOTTOM
        ScreenPlane.rotation.z = Math.PI / 2;
        ScreenPlane.rotation.y = -Math.PI / 2;
        screenDynamicTexture.texture.needsUpdate = true;
        screenDynamicTexture.clear('#667788');
        screenDynamicTexture.drawTextCooked(
                {
                    text: text_to_display,
                    lineHeight: 0.3,
                    fillStyle: '#FDFDFD',
                    font: "bold " + (0.2 * 256) + "px Arial"
                }
        );
        ScreenPlane.scale.x = 0.25;
        ScreenPlane.scale.y = 0.25;
        ScreenPlane.scale.z = 0.25;
        LargeScreen.scale.x = 0.5;
        LargeScreen.scale.y = 0.5;
        LargeScreen.scale.z = 0.5;
        scene.add(LargeScreen);
    } else {
        alert('Cannot add doubles @ this');
    }
}





var onProgress = function (xhr) {

    if (xhr.lengthComputable) {
//                        alert('TRUE');
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }

}

var onLoad = function (xhr) {
//                    console.log("OnLOAD CALLED !");
};
var onError = function (xhr) {

};
var texture = new THREE.Texture();

function load3DOBJmodelsWithDefaultMaterials() {
    var manager = new THREE.LoadingManager();
    var objLoader = new THREE.OBJLoader(manager);
    manager.onProgress = function (item, loaded, total) {
        loadProgress = loaded / total * 100;
    }
    var testMaterial = new THREE.MeshPhongMaterial(batteryMaterials.pink_battery);
    var testMaterial2 = new THREE.MeshPhongMaterial(batteryMaterials.red_battery);
    var testMaterial3 = new THREE.MeshPhongMaterial(batteryMaterials.blue_battery);
    var roataMaterial = new THREE.MeshPhongMaterial(defaultMaterials.defaultMechanism);
    loadObjectsAndAssignMaterials(roata_only, roataMaterial, 'grupRoata');
    loadObjectsAndAssignMaterials(baterie_only, testMaterial, 'grupBaterie');
    loadObjectsAndAssignMaterials(filtru_only, testMaterial2, 'grupFiltru');
    loadObjectsAndAssignMaterials(mecanism_only, testMaterial3, 'grupMecanism');

    function loadObjectsAndAssignMaterials(array, defaultMaterial, groupName) {
        var group = scene.getObjectByName(groupName);
        array.forEach(function (name) {
            objLoader.load('js/daes/OBJ/' + name + '.obj', function (object) {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.map = texture;
                    }
                });
                object.name = name;
                object.scale.x = 0.5;
                object.scale.y = 0.5;
                object.scale.z = 0.5;
                group.position.y = -600;
                group.add(object);
                object.children[0].material = defaultMaterial;
                if (!debug_mode_on) {
                    console.clear();
                }
            }, onProgress, onError);
        });
    }





}


function loadObjWithoutMaterials() {
    var manager = new THREE.LoadingManager();
    var objLoader = new THREE.OBJLoader(manager);
    manager.onProgress = function (item, loaded, total) {
        loadProgress = loaded / total * 100;
    }
    loadObjectsAndAssignMaterials(roata_only, 'grupRoata');
    loadObjectsAndAssignMaterials(baterie_only, 'grupBaterie');
    loadObjectsAndAssignMaterials(filtru_only, 'grupFiltru');
    loadObjectsAndAssignMaterials(mecanism_only, 'grupMecanism');

    function loadObjectsAndAssignMaterials(array, groupName) {
        var group = scene.getObjectByName(groupName);
        array.forEach(function (name) {
            objLoader.load('js/daes/OBJ/' + name + '.obj', function (object) {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.map = texture;
                    }
                });
                object.name = name;
                object.scale.x = 0.5;
                object.scale.y = 0.5;
                object.scale.z = 0.5;
                group.position.y = -600;
                group.add(object);
                if (!debug_mode_on) {
                    console.clear();
                }
            }, onProgress, onError);
        });
    }





}


function basicColorizeOBJ() {

//                    grupBaterie.position.y = -15;
//                    grupFiltru.position.y = -15;
//                    grupMecanism.position.y = -15;
//                    grupBaterie.position.x = -9.45;
//                    grupBaterie.position.z = 2;
//                    grupFiltru.position.z = 2;
//                    grupFiltru.position.x = 5.5;
//                    grupMecanism.position.z = 2;
//                    grupMecanism.position.x = 5.5;
//                    grupRoata.position.y = -46;
    fixGroupsPositionsToCenter(groups_array);
    colorizeConnectors(defaultMaterials.defaultConnectorMaterial);
    colorizeBatteryInside(defaultMaterials.defaultBatteryInside);
    colorizeGlass(defaultMaterials.defaultFilterGlass);
    colorizeButtons(defaultMaterials.defaultFilter);
    colorizeBattery(defaultMaterials.defaultBatterySupport);
    colorizeFilter(defaultMaterials.defaultFilter);
    colorizeTopAndBottom(defaultMaterials.topAndBottom);
    colorizeScrews(defaultMaterials.defaultScrews);
    colorizeMechanism(defaultMaterials.defaultMechanism);
    colorizeLogos(defaultMaterials.defaultLogos);
    colorizeScreenFrame(defaultMaterials.defaultScreenTransparent);
    colorizeScreenGlass(defaultMaterials.defaultScreenTransparent);
    colorizeScreenBackground(defaultMaterials.defaultScreenBackground);
}


function colorizeScreenBackground(materialColor) {
    var screenBackground = scene.getObjectByName('ecran_behind');
    screenBackground.position.x = 4.5;
    screenBackground.position.y = -6;
    screenBackground.scale.x = 0.6;
    screenBackground.scale.z = 0.6;
    screenBackground.scale.y = 0.8;
    screenBackground.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}

function colorizeScreenGlass(materialColor) {
    var screenGlass = scene.getObjectByName('sticlaEcran');
    if (screenGlass) {
        screenGlass.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    }
}

function colorizeScreenFrame(materialColor) {
    var screenFrame = scene.getObjectByName('ecran');
    if (screenFrame) {
        screenFrame.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    }

}

function colorizeConnectors(materialColor) {

    var powerConnectors = scene.getObjectByName('partea_superioara_stecher');
    var sipcaConnector = scene.getObjectByName('filet_capac_mecanism_tigara');
    powerConnectors.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    sipcaConnector.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}

function colorizeBatteryInside(materialColor) {
    var insideBattery = scene.getObjectByName('baterie');
    var insideBatteryBottom = scene.getObjectByName('baterie_2');
    insideBattery.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    insideBatteryBottom.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}

function colorizeLogos(materialColor) {
    var filterLogo = scene.getObjectByName('logo_sipca');
    var batteryLogo = scene.getObjectByName('logo_textura_baterie');
    var bottomLogo = scene.getObjectByName('text_baterie_bottom');
    var insideLogo = scene.getObjectByName('text_mecanism_interior');
    filterLogo.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    batteryLogo.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    bottomLogo.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    insideLogo.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}

function colorizeMechanism(materialColor) {
    var mechanism = scene.getObjectByName('shell_mecanism_tigara');
    var mechanismBottom = scene.getObjectByName('partea_inferioara_stecher');
    mechanism.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    mechanismBottom.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}

function colorizeGlass(materialColor) {
    var sticla = scene.getObjectByName('sticla');
    sticla.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}
function colorizeButtons(materialColor) {
    var bigButton = scene.getObjectByName('buton_mare');
    var smallButton1 = scene.getObjectByName('buton_mic_1');
    var smallButton2 = scene.getObjectByName('buton_mic_2');
    bigButton.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    smallButton1.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    smallButton2.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}
function colorizeBattery(materialColor) {
    var batteryCover = scene.getObjectByName('invelis_baterie');
    var sticla = scene.getObjectByName('sticla');
    var usb = scene.getObjectByName('battery_usb');
    usb.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    batteryCover.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    var sticlaColor = materialColor;
    sticlaColor.transparent = true;
    sticlaColor.opacity = 0.2;
    sticla.children[0].material = new THREE.MeshPhongMaterial(sticlaColor);
    //Reset Opacity to FULL
    sticlaColor.transparent = false;
    sticlaColor.opacity = 1;
}
function colorizeFilter(materialColor) {
    var sipca = scene.getObjectByName('sipca');
    var mechanismMagnet = scene.getObjectByName('buton_interior_mecanism_tigara');
    sipca.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    mechanismMagnet.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}

function colorizeTopAndBottom(materialColor) {
    var fund_mecanism_tigara = scene.getObjectByName('fund_mecanism_tigara');
    var capac_mecanism_tigara = scene.getObjectByName('capac_mecanism_tigara');
    var capac_baterie = scene.getObjectByName('capac_baterie');
    var fund_baterie = scene.getObjectByName('fund_baterie');
    fund_mecanism_tigara.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    capac_mecanism_tigara.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    capac_baterie.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    fund_baterie.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}
function colorizeScrews(materialColor) {
    var screwset1 = scene.getObjectByName('suruburi_capac_mecanism_tigara');
    var screwset2 = scene.getObjectByName('suruburi_capac_baterie');
    var screwset3 = scene.getObjectByName('suruburi_baterie');
    var screwset4 = scene.getObjectByName('suruburi_fund_baterie');
    var screwset5 = scene.getObjectByName('suruburi_fund_mecanism_tigara');
    screwset1.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    screwset2.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    screwset3.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    screwset4.children[0].material = new THREE.MeshPhongMaterial(materialColor);
    screwset5.children[0].material = new THREE.MeshPhongMaterial(materialColor);
}

function displayDisruptorColourOptions() {

    if (disruptor_colours_shown === false) {
        console.log("SHOULD DISPLAY 3 COLOURS TO CHOOSE FROM FOR THE DISRUPTOR");
        var boxGeometry = new THREE.BoxGeometry(25, 25, 25, 25);
        var goldenMaterial = new THREE.MeshPhongMaterial(disruptorMaterials.golden_material);
        var silverMaterial = new THREE.MeshPhongMaterial(disruptorMaterials.silver_material);
        var blackMaterial = new THREE.MeshPhongMaterial(disruptorMaterials.black_material);
        var box1 = new THREE.Mesh(boxGeometry, goldenMaterial);
        box1.name = "GoldenBox";
        var box2 = new THREE.Mesh(boxGeometry, silverMaterial);
        box2.name = "SilverBox";
        var box3 = new THREE.Mesh(boxGeometry, blackMaterial);
        box3.name = "BlackBox";
        threeColourBoxes = new THREE.Group();
        threeColourBoxes.name = "threeColourBoxes";
        threeColourBoxes.add(box1);
        threeColourBoxes.add(box2);
        threeColourBoxes.add(box3);
        if (battery_colours_shown) {
            removeBatteryColourOptions();
        }

        scene.add(threeColourBoxes);
        disruptor_colours_shown = true;
    } else {
        console.log("The 3 colour boxes already are on the screen.");
    }
}

function removeDisruptorColourOptions() {

    if (disruptor_colours_shown) {
        console.log(scene);
        threeColourBoxes = scene.getObjectByName("threeColourBoxes");
        scene.remove(threeColourBoxes);
        disruptor_colours_shown = false;
    } else {
        console.log("Cannot remove threeColourBoxes if they dont exist");
    }
}


//                function displayBatteryColourOptions() {
//                    if (battery_colours_shown === false) {
//                        var boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16);
//                        var mat1 = new THREE.MeshPhongMaterial(batteryMaterials.red_battery);
//                        var mat2 = new THREE.MeshPhongMaterial(batteryMaterials.green_battery);
//                        var mat3 = new THREE.MeshPhongMaterial(batteryMaterials.purple_battery);
//                        var mat4 = new THREE.MeshPhongMaterial(batteryMaterials.blue_battery);
//                        var mat5 = new THREE.MeshPhongMaterial(batteryMaterials.pink_battery);
//                        var mat6 = new THREE.MeshPhongMaterial(batteryMaterials.black_battery);
//                        var mat7 = new THREE.MeshPhongMaterial(batteryMaterials.whiteblue_battery);
//                        var box1 = new THREE.Mesh(boxGeometry, mat1);
//                        box1.name = "batteryColour_box1";
//                        var box2 = new THREE.Mesh(boxGeometry, mat2);
//                        box2.name = "batteryColour_box2";
//                        var box3 = new THREE.Mesh(boxGeometry, mat3);
//                        box3.name = "batteryColour_box3";
//                        var box4 = new THREE.Mesh(boxGeometry, mat4);
//                        box4.name = "batteryColour_box4";
//                        var box5 = new THREE.Mesh(boxGeometry, mat5);
//                        box5.name = "batteryColour_box5";
//                        var box6 = new THREE.Mesh(boxGeometry, mat6);
//                        box6.name = "batteryColour_box6";
//                        var box7 = new THREE.Mesh(boxGeometry, mat7);
//                        box7.name = "batteryColour_box7";
//                        sevenColourBoxes = new THREE.Group();
//                        sevenColourBoxes.name = "sevenColourBoxes";
//                        sevenColourBoxes.add(box1);
//                        sevenColourBoxes.add(box2);
//                        sevenColourBoxes.add(box3);
//                        sevenColourBoxes.add(box4);
//                        sevenColourBoxes.add(box5);
//                        sevenColourBoxes.add(box6);
//                        sevenColourBoxes.add(box7);
//                        scene.add(sevenColourBoxes);
//                        if (disruptor_colours_shown) {
//                            removeDisruptorColourOptions();
//                        }
//                        battery_colours_shown = true;
//                    } else {
//                        console.log("The 7 colour boxes already are on the screen.");
//                    }
//                }
function removeBatteryChosingScene() {

    var batteries_group_present = scene.getObjectByName("batteryChoicesGroup");
    if (batteries_group_present) {
        scene.remove(batteries_group_present);
    }

}

//                function removeBatteryColourOptions() {
//
//                    if (battery_colours_shown) {
//                        sevenColourBoxes = scene.getObjectByName("sevenColourBoxes");
//                        scene.remove(sevenColourBoxes);
//                        battery_colours_shown = false;
//                    } else {
//                        console.log("Cannot remove sevenColourBoxes if they dont exist");
//                    }
//
//
//                }

//                function changeMecanismColor(color) {
//                    console.log("attempting to change mechanism color to " + color);
//                    var mecanism_tigara_mesh = scene.getObjectByName("mecanism_tigara").children[0];
//                    switch (color) {
//                        case "black":
//                            var blackBatteryMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, shininess: 50, specular: 0x040404, metal: true, side: THREE.DoubleSide});
//                            mecanism_tigara_mesh.material = blackBatteryMaterial;
//                            break;
//                        case "gold":
//                            var goldPolished = new THREE.MeshPhongMaterial({color: 0xEAE0D7, shininess: 50, specular: 0xEAE0D7, metal: true, side: THREE.DoubleSide});
//                            mecanism_tigara_mesh.material = goldPolished;
//                            break;
//                        case "silver":
//                            var silverPolished = new THREE.MeshPhongMaterial({color: 0xE4E4EE, shininess: 50, specular: 0xE4E4EE, metal: true, side: THREE.DoubleSide});
//                            mecanism_tigara_mesh.material = silverPolished;
//                            break;
//                        default:
//                            console.log("The colors you must chose are : black, gold or silver");
//                            break;
//                    }
//                }

function innokinSplitInThree() {
    var mechanism = scene.getObjectByName('grupPrincipal');
    var filter = scene.getObjectByName('grupFiltru');
    var battery = scene.getObjectByName('grupBaterie');
    if (object_is_not_split) {
        mechanism.position.x = -14.45;
        filter.position.x = 5.5;
        battery.position.x = 10.55;
        object_is_not_split = false;
//                        console.log(mechanism.position);
//                        console.log(filter.position);
//                        console.log(battery.position);
        //HARDCODED?

    } else {
        object_is_not_split = true;
        mechanism.position.x = 5.5;
        filter.position.x = 5.5;
        battery.position.x = -9.45;
//                        console.log(mechanism.position);
//                        console.log(filter.position);
//                        console.log(battery.position);

    }
}

function playButonMareAction() {

    if (startButtonCounter % 6 == 0) {
//                        console.log(scene);
        grupParticule = scene.getObjectByProperty('type', 'PointCloud');
//                        console.log(grupParticule);
        emitter = null;
        particleGroup = null;
        scene.remove(grupParticule);
    } else if (startButtonCounter % 3 == 0) {
        initParticles();
    }

}


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///                        TWEENS                           ///
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

function setupTweenBatteryOut()
{
    batteryGroup = scene.getObjectByName("grupBaterie");
    var update = function () {
        batteryGroup.position.y = current.y;
        batteryGroup.position.x = current.x;
        batteryGroup.position.z = current.z;
    }
    console.log("Battery Current Position");
    console.log(batteryGroup.position);
    var current = {x: -9.45, y: -15, z: 2};
    // remove previous tweens if needed
    TWEEN.removeAll();
    var easing2 = TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
    // build the tween lift the battery from the support
    tweenBatteryUp = new TWEEN.Tween(current)
            .to({y: +userOpts.liftoff}, userOpts.duration / 2)
            .delay(userOpts.delay)
            .easing(easing2)
            .onUpdate(update);
    tweenBatteryOut = new TWEEN.Tween(current)
            .to({x: +userOpts.range}, userOpts.duration)
            .delay(userOpts.delay)
            .easing(easing2)
            .onUpdate(update);
    tweenBatteryUp.chain(tweenBatteryOut);
    // start the first
}

function setupTweenBatteryIn()
{
    var complete = function () {
        console.log("BATTERY ATTACHED. PLAYING A CLICK SOUND !");
        setTimeout(function () {
//                            alert("PLAYING CLICK SOUND NOW");
        }, 300);
    }

    var update = function () {
        batteryGroup.position.x = current.x;
        batteryGroup.position.y = current.y;
        batteryGroup.position.z = current.z;
    }
    var current = {x: 2000, y: userOpts.liftoff, z: -30};
    // remove previous tweens if needed
    TWEEN.removeAll();
    // convert the string from dat-gui into tween.js functions 
    var easing = TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
    var quintic = TWEEN.Easing[userOpts.quintic_in.split('.')[0]][userOpts.quintic_in.split('.')[1]];
    // build the tween to go ahead
    tweenBatteryIn = new TWEEN.Tween(current)
            .to({x: -9.45, y: 15, z: 2}, userOpts.duration)
            .delay(userOpts.delay)
            .easing(quintic)
            .onUpdate(update);
    // build the tween to go backward
    tweenBatteryDown = new TWEEN.Tween(current)
            .to({x: -9.45, y: -15, z: 2}, userOpts.duration / 2)
            .delay(userOpts.delay)
            .easing(easing)
            .onUpdate(update)
            .onComplete(complete);
    tweenBatteryIn.chain(tweenBatteryDown);
    // after tweenHead do tweenBack
//                    tweenHead.chain(tweenBack);
    // after tweenBack do tweenHead, so it is cycling
//                    tweenBack.chain(tweenHead);
}

function setupTweenFilterRotate()
{
    var update = function () {
        filtruTigara.rotation.y = current.rotY;
        filtruTigara.position.x = current.x;
        filtruTigara.position.y = current.y;
    }
    var current = {x: 2000, y: userOpts.liftoff, rotY: 0};
    // remove previous tweens if needed
    TWEEN.removeAll();
    // convert the string from dat-gui into tween.js functions 
    var easing = TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
    var quintic = TWEEN.Easing[userOpts.quintic_in.split('.')[0]][userOpts.quintic_in.split('.')[1]];
//                    console.log(easing);
    // build the tween to go ahead
//                    tweenFilterRotate = new TWEEN.Tween(current)
//                            .to({x: 15, y: userOpts.liftoff}, userOpts.duration)
//                            .delay(userOpts.delay)
//                            .easing(quintic)
//                            .onUpdate(update);
    // build the tween to go backward
//                    tweenBatteryDown = new TWEEN.Tween(current)
//                            .to({x: 15, y: 0}, userOpts.duration / 2)
//                            .delay(userOpts.delay)
//                            .easing(easing)
//                            .onUpdate(update);
//                    var tweenBack = new TWEEN.Tween(current)
//                            .to({x: -userOpts.range}, userOpts.duration)
//                            .delay(userOpts.delay)
//                            .easing(easing)
//                            .onUpdate(update);
//                    tweenBatteryIn.chain(tweenBatteryDown);
    // after tweenHead do tweenBack
//                    tweenHead.chain(tweenBack);
    // after tweenBack do tweenHead, so it is cycling
//                    tweenBack.chain(tweenHead);

    // start the first
//                    tweenHead.start();
}

function setupTweenFilterGoUp()
{
    // 
    var update = function () {
        chargerCube.position.x = current.x;
        chargerCube.position.y = current.y;
    }
    var current = {x: 2000, y: userOpts.liftoff};
    // remove previous tweens if needed
    TWEEN.removeAll();
    // convert the string from dat-gui into tween.js functions 
    var easing = TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
    var quintic = TWEEN.Easing[userOpts.quintic_in.split('.')[0]][userOpts.quintic_in.split('.')[1]];
//                    console.log(easing);
    // build the tween to go ahead
    tweenBatteryIn = new TWEEN.Tween(current)
            .to({x: 15, y: userOpts.liftoff}, userOpts.duration)
            .delay(userOpts.delay)
            .easing(quintic)
            .onUpdate(update);
    // build the tween to go backward
    tweenBatteryDown = new TWEEN.Tween(current)
            .to({x: 15, y: 0}, userOpts.duration / 2)
            .delay(userOpts.delay)
            .easing(easing)
            .onUpdate(update);
//                    var tweenBack = new TWEEN.Tween(current)
//                            .to({x: -userOpts.range}, userOpts.duration)
//                            .delay(userOpts.delay)
//                            .easing(easing)
//                            .onUpdate(update);
    tweenBatteryIn.chain(tweenBatteryDown);
    // after tweenHead do tweenBack
//                    tweenHead.chain(tweenBack);
    // after tweenBack do tweenHead, so it is cycling
//                    tweenBack.chain(tweenHead);

    // start the first
//                    tweenHead.start();
}

function setupTweenFilterGoOut()
{
    // 
    var update = function () {
        chargerCube.position.x = current.x;
        chargerCube.position.y = current.y;
    }
    var current = {x: 2000, y: userOpts.liftoff};
    // remove previous tweens if needed
    TWEEN.removeAll();
    // convert the string from dat-gui into tween.js functions 
    var easing = TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
    var quintic = TWEEN.Easing[userOpts.quintic_in.split('.')[0]][userOpts.quintic_in.split('.')[1]];
//                    console.log(easing);
    // build the tween to go ahead
    tweenBatteryIn = new TWEEN.Tween(current)
            .to({x: 15, y: userOpts.liftoff}, userOpts.duration)
            .delay(userOpts.delay)
            .easing(quintic)
            .onUpdate(update);
    // build the tween to go backward
    tweenBatteryDown = new TWEEN.Tween(current)
            .to({x: 15, y: 0}, userOpts.duration / 2)
            .delay(userOpts.delay)
            .easing(easing)
            .onUpdate(update);
    colladaLoader
//                    var tweenBack = new TWEEN.Tween(current)
//                            .to({x: -userOpts.range}, userOpts.duration)
//                            .delay(userOpts.delay)
//                            .easing(easing)
//                            .onUpdate(update);
    tweenBatteryIn.chain(tweenBatteryDown);
    // after tweenHead do tweenBack
//                    tweenHead.chain(tweenBack);
    // after tweenBack do tweenHead, so it is cycling
//                    tweenBack.chain(tweenHead);

    // start the first
//                    tweenHead.start();
}


function setRemoteVisible() {

    if (debug_mode_on) {
        remoteDiv = document.getElementById("remoteDiv");
        remoteDiv.style.display = "inline";
    }

}

function addColouredCylinders() {

    var height_for_all = -15.5;
    var geometry = new THREE.CylinderGeometry(8, 7, 2, 60);
    var material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
    var material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var material3 = new THREE.MeshBasicMaterial({color: 0x0033FF});
    var material4 = new THREE.MeshBasicMaterial({color: 0xFF33FF});
    var material5 = new THREE.MeshBasicMaterial({color: 0xFF3300});
    var material6 = new THREE.MeshBasicMaterial({color: 0x663311});
    var material7 = new THREE.MeshBasicMaterial({color: 0xCACA33});
    var material8 = new THREE.MeshBasicMaterial({color: 0xFF0000});
    var cylinder1 = new THREE.Mesh(geometry, material1);
    cylinder1.name = "testCylinder1";
    scene.add(cylinder1);
    cylinder1.position.x = 22;
    cylinder1.position.z = 22;
    cylinder1.position.y = height_for_all;
    var cylinder2 = new THREE.Mesh(geometry, material2);
    cylinder2.name = "testCylinder2";
    scene.add(cylinder2);
    cylinder2.position.x = 31;
    cylinder2.position.z = 0;
    cylinder2.position.y = height_for_all;
    var cylinder3 = new THREE.Mesh(geometry, material3);
    cylinder3.name = "testCylinder3";
    scene.add(cylinder3);
    cylinder3.position.x = -31;
    cylinder3.position.z = 0;
    cylinder3.position.y = height_for_all;
    var cylinder4 = new THREE.Mesh(geometry, material4);
    cylinder4.name = "testCylinder4";
    scene.add(cylinder4);
    cylinder4.position.x = -22;
    cylinder4.position.z = -22;
    cylinder4.position.y = height_for_all;
    var cylinder5 = new THREE.Mesh(geometry, material5);
    cylinder5.name = "testCylinder5";
    scene.add(cylinder5);
    cylinder5.position.x = -22;
    cylinder5.position.z = 22;
    cylinder5.position.y = height_for_all;
    var cylinder6 = new THREE.Mesh(geometry, material6);
    cylinder6.name = "testCylinder6";
    scene.add(cylinder6);
    cylinder6.position.x = 22;
    cylinder6.position.z = -22;
    cylinder6.position.y = height_for_all;
    var cylinder7 = new THREE.Mesh(geometry, material7);
    cylinder7.name = "testCylinder7";
    scene.add(cylinder7);
    cylinder7.position.x = 0;
    cylinder7.position.z = 31;
    cylinder7.position.y = height_for_all;
    var cylinder8 = new THREE.Mesh(geometry, material8);
    cylinder8.name = "testCylinder8";
    scene.add(cylinder8);
    cylinder8.position.x = 0;
    cylinder8.position.z = -31;
    cylinder8.position.y = height_for_all;
}


function moveXplus(objectName) {

    var object = scene.getObjectByName(objectName);
    if (object) {
        object.position.x += 1 * scale_to_move;
        console.log(object.position);
    } else {
        console.log("Object " + objectName + " does not exist on the screen");
    }
}

function moveXminus(objectName) {
    var object = scene.getObjectByName(objectName);
    if (object) {
        object.position.x -= 1 * scale_to_move;
        console.log(object.position);
    } else {
        console.log("Object " + objectName + " does not exist on the screen");
    }
}
function moveYplus(objectName) {
    var object = scene.getObjectByName(objectName);
    if (object) {
        object.position.y += 1 * scale_to_move;
        console.log(object.position);
    } else {
        console.log("Object " + objectName + " does not exist on the screen");
    }
}
function moveYminus(objectName) {
    var object = scene.getObjectByName(objectName);
    if (object) {
        object.position.y -= 1 * scale_to_move;
        console.log(object.position);
    } else {
        console.log("Object " + objectName + " does not exist on the screen");
    }
}
function moveZplus(objectName) {
    var object = scene.getObjectByName(objectName);
    if (object) {
        object.position.z += 1 * scale_to_move;
        console.log(object.position);
    } else {
        console.log("Object " + objectName + " does not exist on the screen");
    }
}
function moveZminus(objectName) {
    var object = scene.getObjectByName(objectName);
    if (object) {
        object.position.z -= 1 * scale_to_move;
        console.log(object.position);
    } else {
        console.log("Object " + objectName + " does not exist on the screen");
    }
}


function load8times() {
    var batteryChoicesGroup = new THREE.Group();
    batteryChoicesGroup.name = "batteryChoicesGroup";
    scene.add(batteryChoicesGroup);

    var materials = [
        new THREE.MeshPhongMaterial(batteryMaterials.whiteblue_battery),
        new THREE.MeshPhongMaterial(batteryMaterials.black_battery),
        new THREE.MeshPhongMaterial(batteryMaterials.blue_battery),
        new THREE.MeshPhongMaterial(batteryMaterials.green_battery),
        new THREE.MeshPhongMaterial(batteryMaterials.pink_battery),
        new THREE.MeshPhongMaterial(batteryMaterials.purple_battery),
        new THREE.MeshPhongMaterial(batteryMaterials.red_battery),
        new THREE.MeshPhongMaterial(batteryMaterials.green_battery),
    ];
    var general_height = -46;
    var positions = [
        {x: 16, y: general_height, z: 2},
        {x: 10, y: general_height, z: 12.5},
        {x: -2, y: general_height, z: 16},
        {x: -13, y: general_height, z: 10},
        {x: -16.2, y: general_height, z: -1.8},
        {x: -10.2, y: general_height, z: -12.7},
        {x: 1.8, y: general_height, z: -16.2},
        {x: 13, y: general_height, z: -10},
    ];

    var rotations = [0, 7, 6, 5, 4, 3, 2, 1];
    var degree_45 = Math.PI / 4;

    for (i = 1; i < 8; i++) {
        //Create a new clone Group
        var newGroup = new THREE.Group();
        newGroup.name = 'group_clona_baterie_' + i;
        newGroup.position.x = positions[i].x;
        newGroup.position.y = positions[i].y;
        newGroup.position.z = positions[i].z;
        newGroup.rotation.y = rotations[i] * degree_45;

        for (k = 0; k < baterie_only.length; k++) {
            var newObject = scene.getObjectByName(baterie_only[k]).clone();
            newObject.name = 'testbaterie_' + i + baterie_only[k];
            if (baterie_only[k] == 'invelis_baterie') {
                newObject.children[0].material = materials[i - 1];
            }
            newGroup.add(newObject);
        }
        batteryChoicesGroup.add(newGroup);
    }
}
function clearScene() {
    var childrens = scene.children;
    while (scene.children.length > 0) {
        for (i = 0; i < childrens.length; i++) {
            scene.remove(childrens[i]);
        }
        console.log(scene);
    }
}

function displaySceneInformation() {
    var informationDynamicTexture = new THREEx.DynamicTexture(100, 100);
    informationDynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
    var informationSquare = new THREE.PlaneBufferGeometry(100, 100, 0, 0);

    var informationPlaneMaterial = new THREE.MeshBasicMaterial({
        map: informationDynamicTexture.texture
    });
    var informationPlane = new THREE.Mesh(informationSquare, informationPlaneMaterial);
    informationPlane.name = 'informationPlane';
    scene.add(informationPlane);
}