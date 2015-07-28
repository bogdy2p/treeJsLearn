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
