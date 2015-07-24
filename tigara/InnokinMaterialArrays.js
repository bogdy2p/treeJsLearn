var disruptorMaterials = {
    silver_material: {color: 0xE4E4EE, shininess: 50, specular: 0xE4E4EE, metal: true, side: THREE.DoubleSide},
    black_material: {color: 0xFFFFFF, shininess: 50, specular: 0x040404, metal: true, side: THREE.DoubleSide},
    golden_material: {color: 0xEAE0D7, shininess: 50, specular: 0xEAE0D7, metal: true, side: THREE.DoubleSide},
};
var batteryMaterials = {
    black_battery: {color: 0xFFFFFF, shininess: 50, specular: 0x040404, metal: true, side: THREE.DoubleSide},
    blue_battery: {color: 0x009EFA, shininess: 50, specular: 0x005ECA, metal: true, side: THREE.DoubleSide},
    pink_battery: {color: 0xFA55BB, shininess: 50, specular: 0xFA55BB, metal: true, side: THREE.DoubleSide},
    red_battery: {color: 0xFF6677, shininess: 30, specular: 0x990000, metal: true, side: THREE.DoubleSide},
    green_battery: {color: 0x00FF00, shininess: 50, specular: 0x00FF00, metal: true, side: THREE.DoubleSide},
    purple_battery: {color: 0xFF00FF, shininess: 50, specular: 0xFF00FF, metal: true, side: THREE.DoubleSide},
    whiteblue_battery: {color: 0x009EFA, shininess: 50, specular: 0x00FFFF, metal: true, side: THREE.DoubleSide},
};
var optionsMaterials = {
    //SPECULAR
    black: {color: 0xFFFFFF, shininess: 50, specular: 0x040404, metal: true, side: THREE.DoubleSide},
    blue: {color: 0x009EFA, shininess: 50, specular: 0x005ECA, metal: true, side: THREE.DoubleSide},
    pink: {color: 0xFA55BB, shininess: 50, specular: 0xFA55BB, metal: true, side: THREE.DoubleSide},
    red: {color: 0xFF6677, shininess: 30, specular: 0x990000, metal: true, side: THREE.DoubleSide},
    green: {color: 0x00FF00, shininess: 50, specular: 0x00FF00, metal: true, side: THREE.DoubleSide},
    purple: {color: 0xFF00FF, shininess: 50, specular: 0xFF00FF, metal: true, side: THREE.DoubleSide},
    whiteblue: {color: 0x009EFA, shininess: 50, specular: 0x00FFFF, metal: true, side: THREE.DoubleSide},
};
var defaultMaterials = {
    defaultBatterySupport: batteryMaterials.blue_battery,
    defaultBatteryInside: batteryMaterials.black_battery,
    defaultMechanism: disruptorMaterials.silver_material,
    defaultFilter: {color: 0xCCCCCC, shininess: 50, specular: 0xAACCDD, metal: true, side: THREE.DoubleSide},
    defaultFilterGlass: {color: 0xFFFFFF, shininess: 10, specular: 0xDDDDDD, transparent: true, opacity: 0.3, side: THREE.DoubleSide},
    topAndBottom: {color: 0xCCCCCC, shininess: 50, specular: 0xBBBBBB, metal: true, side: THREE.DoubleSide},
    defaultScrews: {color: 0xCCCCCC, shininess: 50, specular: 0xAACCDD, metal: true, side: THREE.DoubleSide},
    defaultLogos: {color: 0xEAE0D7, shininess: 50, specular: 0xEAE0D7, metal: true, side: THREE.DoubleSide},
    defaultConnectorMaterial: {color: 0x9F8F53, shininess: 50, specular: 0xEAE0D7, metal: true, side: THREE.DoubleSide},
    defaultScreenTransparent: {color: 0x009900, shininess: 10, specular: 0xFF00FF, transparent: true, opacity: 0.3, side: THREE.DoubleSide},
    defaultScreenFrame: {color: 0x55500F, shininess: 50, specular: 0x33B0F0, metal: true, side: THREE.DoubleSide},
    defaultScreenBackground: {color: 0x33300F, shininess: 50, specular: 0x22A0C0, metal: true, side: THREE.DoubleSide},
};