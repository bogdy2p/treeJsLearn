function addLightingToScene(lightingPositions) {
    var directionalLightStrength = 0.15;
    var increase = 1;
    for (i = 0; i < lightingPositions.length; i++) {
        var directLight = new THREE.DirectionalLight(0xffffff, directionalLightStrength);
        directLight.position.set(lightingPositions[i].x, lightingPositions[i].y, lightingPositions[i].z);
        directLight.name = "luminaDirectionala" + i;
        scene.add(directLight);
    }
}

function setUpGroups(groups_array) {
    for (i = 0; i < groups_array.length; i++) {

        group = new THREE.Group();
        group.name = groups_array[i].name;
        scene.add(group);
    }
}

function fixGroupsPositionsToCenter(groups_array) {
    console.log("fixGroupsPositionsToCenter");
    for (i = 0; i < groups_array.length; i++) {
        var group = scene.getObjectByName(groups_array[i].name);
        group.position.set(groups_array[i].x, groups_array[i].y, groups_array[i].z);

    }

}