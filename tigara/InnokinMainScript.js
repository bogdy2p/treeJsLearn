if (debug_mode_on) {
    showDebugHUD();
}


document.addEventListener('mousemove', onDocumentMouseMove, false);

initializeEmptyScene();

setTimeout(function () {
    playScene1();
}, 4000);

function playScene1() {
    console.log("Playing Scene 1");
    animateDisruptorFlyIns();
}




function playScene2() {
    console.log("Playing Scene 2");

    animateWheelFlyIn();
    setTimeout(function () {
        animateBatteriesFlyIns();
        animateWheelGroupRotation('left');
    }, 200);

}


function playScene3() {
    console.log("Started Playing Scene 3");
    animateFiltersFlyIn();


}



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
    //Modify The Camera Position for Scene1.
    setCameraPositionScene1();

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
        if (Object.object.parent.name) {
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
                    console.log("UNKNOWN CLICK. ID OR NAME NOT RECOGNIZED");
                    break;
            }
        }

        //
        // LOGIC FOR THE BATTERY CHOSING PART
        //

        if (Object.object.parent.parent.parent.name) {
            switch (Object.object.parent.parent.parent.name) {
                case "batteryChoicesGroup":
                    var clickedObject = Object.object.parent.parent;
                    //                console.log(clickedObject);
                    var old_choice_object = null;
                    if (battery_chosen == null) {
                        battery_chosen = clickedObject.name;

                        clickedObject.position.y += 30;
                    } else {
                        var old_choice_name = battery_chosen;
                        if (clickedObject.name == battery_chosen) {
                            var chosenMaterial = clickedObject.children[0].material;
                            temp_material = Object.object.material.color;
                            temp_color = Object.object.material.color.getHex();
                            temp_specular = Object.object.material.specular.getHex();
                            colorizeBattery({color: temp_color, shininess: 30, specular: temp_specular, metal: true, side: THREE.DoubleSide});
                            removeScene2();
                            setTimeout(function () {
                                playScene3();
                            }, 3000);
                        } else {
                            old_choice_object = scene.getObjectByName(old_choice_name);
                            battery_chosen = clickedObject.name;
                            old_choice_object.position.y -= 30;
                            clickedObject.position.y += 30;
                        }
                    }
                    break;

                case "disruptorChoicesGroup":
                    var clickedObject = Object.object.parent.parent;
                    var old_choice_object = null;
                    if (disruptor_chosen == null) {
                        disruptor_chosen = clickedObject.name;

                        clickedObject.position.y += 30;
                    } else {
                        var old_choice_name = disruptor_chosen;
                        if (clickedObject.name == disruptor_chosen) {
                            var chosenMaterial = clickedObject.children[0].material;
                            temp_material = Object.object.material.color;
                            temp_color = Object.object.material.color.getHex();
                            temp_specular = Object.object.material.specular.getHex();
                            colorizeMechanism({color: temp_color, shininess: 30, specular: temp_specular, metal: true, side: THREE.DoubleSide});
                            removeDisruptorChosingScene();
                        } else {
                            old_choice_object = scene.getObjectByName(old_choice_name);
                            disruptor_chosen = clickedObject.name;
                            old_choice_object.position.y -= 30;
                            clickedObject.position.y += 30;
                        }
                    }
                    break;
            }
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

    if (loadProgress == 100) {
        if (!innokin_centered_to_screen) {
            basicColorizeOBJ();
            if (!debug_mode_on) {
                console.clear();
            }
            loadDisruptorChoices();
            loadBatteryChoices();
            loadFilterChoices();
            console.log("Cleared OnDocumentMouseMove");
            innokin_centered_to_screen = true;
        }
    }

    if (particleGroup) {
        particleGroup.tick(dt);
    }



    staticizeThreeBoxesGroup();
    staticizeSevenBoxes();
    staticizeDisruptors();
    staticizeLargeScreenCanvas();



    var newlightposition = camera.position;
    pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();
    // setViewport parameters:
    //  lower_left_x, lower_left_y, viewport_width, viewport_height

    renderer.setViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.clear();
// left side     renderer.setViewport(1, 1, SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
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
        groupMecanism = scene.getObjectByName('groupMecanism');


        groupMecanism.add(ScreenPlane);
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
            groupMecanism.remove(ScreenPlane);
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
        groupMecanism.add(ScreenPlane);
        ScreenPlane.position.x = -15.8; // DEPTH BIGGER IS INSIDE
        ScreenPlane.position.z = -1.9; // LEFT RIGHT (smaller is LEFT
        ScreenPlane.position.y = 13; // TOP BOTTOM
        ScreenPlane.rotation.z = Math.PI / 2;
        ScreenPlane.rotation.y = -Math.PI / 2;
        screenDynamicTexture.texture.needsUpdate = true;
        screenDynamicTexture.clear('#667788');
        screenDynamicTexture.drawTextCooked({
            text: "        OFF",
            lineHeight: 0.35,
            fillStyle: '#FDFDFD',
            font: "bold " + (0.2 * 256) + "px Arial"
        }
        );
        screenDynamicTexture.drawTextCooked({
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
            groupMecanism.remove(ScreenPlane);
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
        groupMecanism.add(ScreenPlane);
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
                    fillStyle: '#FDFDFD', font: "" + (0.20 * 256) + "px Arial"
                }
        );
        //VOLTAGE INFORMATION
        screenDynamicTexture.drawTextCooked(
                {
                    margin: 0.05,
                    top: 0.5,
                    text: '                          ' + device_variables.volt + 'V',
                    lineHeight: 0.35,
                    fillStyle: '#FDFDFD', font: "" + (0.20 * 256) + "px Arial"
                }
        );
        //WATTAGE INFORMATION
        screenDynamicTexture.drawTextCooked({
            text: '      ' + device_variables.watt + 'W',
            lineHeight: 0.5,
            fillStyle: '#FDFDFD',
            font: "" + (0.3 * 256) + "px Arial"
        }
        );
        //BATTERY INFORMATION
        screenDynamicTexture.drawTextCooked({
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
                margin: 0.05, text: device_variables.ohmz + ohmLetter,
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
                fillStyle: '#00FDFD', font: "bold " + (0.2 * 256) + "px Arial"
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
        groupMecanism.add(ScreenPlane);
        ScreenPlane.position.x = -15.8; // DEPTH BIGGER IS INSIDE
        ScreenPlane.position.z = -1.9; // LEFT RIGHT (smaller is LEFT
        ScreenPlane.position.y = 13; // TOP BOTTOM
        ScreenPlane.rotation.z = Math.PI / 2;
        ScreenPlane.rotation.y = -Math.PI / 2;
        screenDynamicTexture.texture.needsUpdate = true;
        screenDynamicTexture.clear('#667788');
        screenDynamicTexture.drawTextCooked({
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
    loadObjectsAndAssignMaterials(roata_only, roataMaterial, 'groupRoata');
    loadObjectsAndAssignMaterials(baterie_only, testMaterial, 'groupBaterie');
    loadObjectsAndAssignMaterials(filtru_only, testMaterial2, 'groupFiltru');
    loadObjectsAndAssignMaterials(mecanism_only, testMaterial3, 'groupMecanism');

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
    loadObjectsAndAssignMaterials(roata_only, 'groupRoata');
    loadObjectsAndAssignMaterials(baterie_only, 'groupBaterie');
    loadObjectsAndAssignMaterials(filtru_only, 'groupFiltru');
    loadObjectsAndAssignMaterials(mecanism_only, 'groupMecanism');

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

    //    bringDeviceToCenterScreen(groups_array);
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

function removeScene2() {
    console.clear();
    //    console.log(scene);     console.log("removing scene2");
    var roataGroup = scene.getObjectByName("groupRoata");

    if (roataGroup) {
        animateWheelGroupRotation('right');
        animateBatteriesFlyOuts();
        animateWheelFlyOut();
//        scene.remove(roataGroup);
    }
}

function removeDisruptorChosingScene() {
    animateDisruptorFlyOuts();
    setTimeout(function () {
        setCameraPositionScene2();
        playScene2();
    }, 2800);
}

function innokinSplitInThree() {
    var mechanism = scene.getObjectByName('groupPrincipal');
    var filter = scene.getObjectByName('groupFiltru');
    var battery = scene.getObjectByName('groupBaterie');
    if (object_is_not_split) {
        mechanism.position.x = -14.45;
        filter.position.x = 5.5;
        battery.position.x = 10.55;
        object_is_not_split = false;

    } else {
        object_is_not_split = true;
        mechanism.position.x = 5.5;
        filter.position.x = 5.5;
        battery.position.x = -9.45;

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
        batteryGroup = scene.getObjectByName("groupBaterie");
                var update = function () {
                batteryGroup.position.y = current.y;
                        batteryGroup.position.x = current.x;
                        batteryGroup.position.z = current.z;
                }
        console.log("Battery Current Position");
                console.log(batteryGroup.position);
                var current = {x: - 9.45, y: - 15, z: 2};
                // remove previous tweens if needed
                TWEEN.removeAll();
                var easing2 = TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
                // build the tween lift the battery from the support
                tweenBatteryUp = new TWEEN.Tween(current)
                .to({y: + userOpts.liftoff}, userOpts.duration / 2)
                .delay(userOpts.delay)
                .easing(easing2)
                .onUpdate(update);
                tweenBatteryOut = new TWEEN.Tween(current)
                .to({x: + userOpts.range}, userOpts.duration)
                .delay(userOpts.delay)
                .easing(easing2)
                .onUpdate(update);
                tweenBatteryUp.chain(tweenBatteryOut);
                // start the first }

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
                                var current = {x: 2000, y: userOpts.liftoff, z: - 30};
                                        // remove previous tweens if needed
                                        TWEEN.removeAll();
                                        // convert the string from dat-gui into tween.js functions 
                                        var easing = TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
                                        var quintic = TWEEN.Easing[userOpts.quintic_in.split('.')[0]][userOpts.quintic_in.split('.')[1]];
                                        // build the tween to go ahead
                                        tweenBatteryIn = new TWEEN.Tween(current)
                                        .to({x: - 9.45, y: 15, z: 2}, userOpts.duration)
                                        .delay(userOpts.delay)
                                        .easing(quintic)
                                        .onUpdate(update);
                                        // build the tween to go backward
                                        tweenBatteryDown = new TWEEN.Tween(current)
                                        .to({x: - 9.45, y: - 15, z: 2}, userOpts.duration / 2)
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



                        function loadBatteryChoices() {
                        var batteryChoicesGroup = new THREE.Group();
                                batteryChoicesGroup.name = "batteryChoicesGroup";
                                groupRoata = scene.getObjectByName('groupRoata');
                                groupRoata.add(batteryChoicesGroup);
                                var materials = [
                                        new THREE.MeshPhongMaterial(batteryMaterials.whiteblue_battery),
                                        new THREE.MeshPhongMaterial(batteryMaterials.black_battery),
                                        new THREE.MeshPhongMaterial(batteryMaterials.blue_battery),
                                        new THREE.MeshPhongMaterial(batteryMaterials.green_battery),
                                        new THREE.MeshPhongMaterial(batteryMaterials.pink_battery),
                                        new THREE.MeshPhongMaterial(batteryMaterials.purple_battery),
                                        new THREE.MeshPhongMaterial(batteryMaterials.red_battery),
                                        new THREE.MeshPhongMaterial(disruptorMaterials.silver_material), ];
                                var rotations = [0, 7, 6, 5, 4, 3, 2, 1];
                                var degree_45 = Math.PI / 4;
                                for (i = 0; i < 8; i++) {
                        //Create a new clone Group
                        var newGroup = new THREE.Group();
                                newGroup.name = 'group_clona_baterie_' + i;
                                newGroup.position.x = wheel_hole_positions[i].x;
                                newGroup.position.y = wheel_hole_positions[i].y + 950;
                                newGroup.position.z = wheel_hole_positions[i].z;
                                newGroup.rotation.y = rotations[i] * degree_45;
                                for (k = 0; k < baterie_only.length; k++) {
                        var newObject = scene.getObjectByName(baterie_only[k]).clone(); newObject.name = 'testbaterie_' + i + baterie_only[k];
                                if (baterie_only[k] == 'invelis_baterie') {
                        newObject.children[0].material = materials[i];
                        }
                        newGroup.add(newObject);
                        }
                        batteryChoicesGroup.add(newGroup);
                        }
                        }

                        function loadDisruptorChoices() {
                        var disruptorChoicesGroup = new THREE.Group();
                                disruptorChoicesGroup.name = "disruptorChoicesGroup";
                                scene.add(disruptorChoicesGroup);
                                var materials = [
                                        new THREE.MeshPhongMaterial(disruptorMaterials.golden_material),
                                        new THREE.MeshPhongMaterial(disruptorMaterials.black_material),
                                        new THREE.MeshPhongMaterial(disruptorMaterials.silver_material),
                                ];
                                for (i = 0; i < 3; i++) {
                        //Create a new clone Group
                        var newGroup = new THREE.Group();
                                newGroup.name = 'group_clona_disruptor_' + i;
                                newGroup.position.x = disruptor_positions_three_only[i].x;
                                newGroup.position.y = disruptor_positions_three_only[i].y + 750;
                                newGroup.position.z = disruptor_positions_three_only[i].z;
                                for (k = 0; k < mecanism_only.length; k++) {
                        var newObject = scene.getObjectByName(mecanism_only[k]).clone(); newObject.name = 'testmecanism' + i + mecanism_only[k];
                                if (mecanism_only[k] == 'shell_mecanism_tigara') {
                        newObject.children[0].material = materials[i];
                        }
                        newGroup.add(newObject);
                        }
                        disruptorChoicesGroup.add(newGroup);
                        }
                        }

                        function loadFilterChoices() {
                        var filterChoicesGroup = new THREE.Group();
                                filterChoicesGroup.name = "filterChoicesGroup"; scene.add(filterChoicesGroup);
                                var materials = [
                                        new THREE.MeshPhongMaterial(disruptorMaterials.golden_material),
                                        new THREE.MeshPhongMaterial(disruptorMaterials.black_material),
                                        //        new THREE.MeshPhongMaterial(disruptorMaterials.silver_material),
                                ];
                                for (i = 0; i < 2; i++) {
                        //Create a new clone Group
                        var newGroup = new THREE.Group();
                                newGroup.name = 'group_clona_filtru_' + i;
                                newGroup.position.x = disruptor_positions_three_only[i].x;
                                newGroup.position.y = disruptor_positions_three_only[i].y + 750;
                                newGroup.position.z = disruptor_positions_three_only[i].z;
                                for (k = 0; k < filtru_only.length; k++) {
                        var newObject = scene.getObjectByName(filtru_only[k]).clone(); newObject.name = 'testfiltru' + i + filtru_only[k];
                                if (filtru_only[k] == 'shell_mecanism_tigara') {
                        newObject.children[0].material = materials[i];
                        }
                        newGroup.add(newObject);
                                }
                        filterChoicesGroup.add(newGroup);
                        } } function clearScene() {
                        var childrens = scene.children;
                                while (scene.children.length > 0) {
                        for (i = 0; i < childrens.length; i++) {
                        scene.remove(childrens[i]);
                                }
                        console.log(scene); }
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

                        function test() {
                        console.log(scene);
//    console.log(camera.rotation);
//    setCameraPositionScene1();
                                }