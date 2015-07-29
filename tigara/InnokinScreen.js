function generalStartScreen() {
    var small_screen_already_exists = scene.getObjectByName('smallScreen');
    if (!small_screen_already_exists) {
        screenDynamicTexture = new THREEx.DynamicTexture(400, 200);
        screenDynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
        planeGeometry1 = new THREE.PlaneBufferGeometry(45, 20, 30, 30);
        planeGeometry2 = new THREE.PlaneBufferGeometry(112, 50, 30, 30);
        planeMaterial = new THREE.MeshBasicMaterial({map: screenDynamicTexture.texture});
        ScreenPlane = new THREE.Mesh(planeGeometry1, planeMaterial);
        ScreenPlane.name = 'smallScreen';
        LargeScreen = new THREE.Mesh(planeGeometry2, planeMaterial);
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
        ScreenPlane.scale.x = 0.25;
        ScreenPlane.scale.y = 0.25;
        ScreenPlane.scale.z = 0.25;
        LargeScreen.scale.x = 0.5;
        LargeScreen.scale.y = 0.5;
        LargeScreen.scale.z = 0.5;
        scene.add(LargeScreen);
    }
}

function generalTurnOffScreen(timeout) {
    var small_screen_already_exists = scene.getObjectByName('smallScreen');
    if (small_screen_already_exists) {
        setTimeout(function () {
            groupMecanism.remove(ScreenPlane);
            scene.remove(LargeScreen);
        }, timeout);

    }
}

function generalClearScreen(timeout) {
    setTimeout(function () {
        screenDynamicTexture.clear('#667788');
    }, timeout);
}


function startDisruptorWithLogo() {
    generalStartScreen();
     screenDynamicTexture.drawTextCooked(
            {
                align: 'left',
                text: '\uE001',
                lineHeight: 0.58,
                margin: 0.05,
                fillStyle: '#FDFDFD',
                font: "" + (0.6 * 190) + "px DisrupterLCDFont"
            }
    );
    screenDynamicTexture.drawTextCooked(
            {
                align: 'center',
                text: '      innokin',
                lineHeight: 0.35,
                fillStyle: '#FDFDFD',
                font: "" + (0.18 * 190) + "px DisrupterLCDFont"
            }
    );
    screenDynamicTexture.drawTextCooked(
            {
                text: '                            technology',
                align: 'center',
                lineHeight: 0.3,
                fillStyle: '#FDFDFD',
                font: "" + (0.18 * 190) + "px DisrupterLCDFont",
                family: "DisrupterLCDFont"
            }
    );
    setTimeout(function () {
        screenDynamicTexture.clear('#667788');
        displayDisruptor();
    }, 1500);

}


function displayStartInformation() {
    generalStartScreen();
    screenDynamicTexture.drawTextCooked(
            {
                text: "     OFF",
                lineHeight: 0.35,
                fillStyle: '#FDFDFD',
                font: "" + (0.2 * 256) + "px DisrupterLCDFont"
            }
    );
    screenDynamicTexture.drawTextCooked(
            {
                text: "              click 3x on",
                lineHeight: 0.33,
                fillStyle: '#FDFDFD',
                font: "" + (0.2 * 256) + "px DisrupterLCDFont"
            });


    generalTurnOffScreen(1500);
}


function displayDisruptor() {
    generalStartScreen();
    screenDynamicTexture.drawTextCooked(
            {
                margin: 0.05,
                text: device_variables.ohmz + ohmLetter,
                lineHeight: 0.35,
                fillStyle: '#FDFDFD',
                font: "" + (0.20 * 256) + "px DisrupterLCDFont"
            }
    );
    //VOLTAGE INFORMATION
    screenDynamicTexture.drawTextCooked(
            {
                margin: 0.05,
                top: 0.5,
                text: '                     ' + device_variables.volt + 'V',
                lineHeight: 0.35,
                fillStyle: '#FDFDFD',
                font: "" + (0.20 * 256) + "px DisrupterLCDFont"
            }
    );
    //WATTAGE INFORMATION
    screenDynamicTexture.drawTextCooked(
            {
                text: '      ' + device_variables.watt + 'W',
                lineHeight: 0.5,
                fillStyle: '#FDFDFD',
                font: "" + (0.3 * 256) + "px DisrupterLCDFont"
            }
    );
    //BATTERY INFORMATION
    screenDynamicTexture.drawTextCooked(
            {
                text: '                          B',
                lineHeight: 0.25,
                fillStyle: '#00FDFD',
                font: "" + (0.2 * 256) + "px DisrupterLCDFont"
            }
    );
//    generalClearScreen(5000);
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
                font: "" + (0.20 * 256) + "px DisrupterLCDFont"
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
                font: "" + (0.20 * 256) + "px DisrupterLCDFont"
            }
    );
    //WATTAGE INFORMATION
    newScreenDynamicTexture.drawTextCooked(
            {
                text: '      ' + device_variables.watt + 'W',
                lineHeight: 0.5,
                fillStyle: '#FDFDFD',
                font: "" + (0.3 * 256) + "px DisrupterLCDFont"
            }
    );
    //BATTERY INFORMATION
    newScreenDynamicTexture.drawTextCooked(
            {
                text: '                                            B',
                lineHeight: 0.25,
                fillStyle: '#00FDFD',
                font: "bold " + (0.2 * 256) + "px DisrupterLCDFont"
            }
    );
    var newPlaneMaterial = new THREE.MeshBasicMaterial({
        map: newScreenDynamicTexture.texture
    });
    existingSmallScreen.material = newPlaneMaterial;
    existingLargeScreen.material = newPlaneMaterial;
}
