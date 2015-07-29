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

    screenDynamicTexture.drawText('\uE001', 25, 130, '#FDFDFD', (0.6 * 190) + "px DisrupterLCDFont");
    screenDynamicTexture.drawText('innokin', 170, 90, '#FDFDFD', (0.2 * 190) + "px DisrupterLCDFont");
    screenDynamicTexture.drawText('technology', 145, 130, '#FDFDFD', (0.2 * 190) + "px DisrupterLCDFont");

    setTimeout(function () {
        screenDynamicTexture.clear('#667788');
        displayDisruptor();
    }, 1500);
}


function displayStartInformation() {
    generalStartScreen();
    screenDynamicTexture.drawText('OFF', 150, 90, '#FDFDFD', (0.2 * 256) + "px DisrupterLCDFont");
    screenDynamicTexture.drawText('click 3x on', 45, 145, '#FDFDFD', (0.2 * 256) + "px DisrupterLCDFont");
    generalTurnOffScreen(1500);
}


function displayDisruptor() {
    generalStartScreen();
    drawAllFourOnTexture(screenDynamicTexture);
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
    drawAllFourOnTexture(newScreenDynamicTexture);
    var newPlaneMaterial = new THREE.MeshBasicMaterial({
        map: newScreenDynamicTexture.texture
    });
    existingSmallScreen.material = newPlaneMaterial;
    existingLargeScreen.material = newPlaneMaterial;
}




function drawAllFourOnTexture(screenDynamicTexture) {
    fineTuneVariablesDisplay();
    //Draw OHMZ
    screenDynamicTexture.drawText(device_variables.ohmz + '\u03A9', 10, 90, '#FDFDFD', (0.2 * 256) + "px DisrupterLCDFont");
    //Draw Volts
    screenDynamicTexture.drawText(volt_ammount_display + 'v', 10, 150, '#FDFDFD', (0.2 * 256) + "px DisrupterLCDFont");

    // Draw WATTAGE AMMOUNT INFORMATION
    screenDynamicTexture.drawText(watt_ammount_display, 150, 130, '#FDFDFD', (0.3 * 256) + "px DisrupterLCDFont");
    // Draw WATTAGE LOGO Information
    screenDynamicTexture.drawText('w', 289, 130, '#FDFDFD', (0.3 * 256) + "px DisrupterLCDFont");
    //Draw Battery
    screenDynamicTexture.drawText('\uE000', 345, 120, '#FFFFFF', (0.3 * 256) + "px DisrupterLCDFont");
}

function fineTuneVariablesDisplay() {
    if (device_variables.volt < 10) {
        volt_ammount_display = '0' + device_variables.volt;
    } else {
        volt_ammount_display = device_variables.volt;
    }
    if (device_variables.watt % 1 == 0.5) {
        watt_ammount_display = device_variables.watt;
        if (device_variables.watt < 10) {
            watt_ammount_display = ' ' + watt_ammount_display;
        }
    } else {
        watt_ammount_display = device_variables.watt + '.0';
        if (device_variables.watt < 10) {
            watt_ammount_display = ' ' + watt_ammount_display;
        }
    }
}