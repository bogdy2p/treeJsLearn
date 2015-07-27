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