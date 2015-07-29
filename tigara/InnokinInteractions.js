// LOGIC FOR CLICKING THE THREE BUTTONS 
function buttonClicksLogic(objectname) {
    switch (objectname) {
        case 'buton_mare':
            console.log("You clicked BUTON MARE");
            if (device_status == 'OFF') {
                startButtonClick();
            } else {
                startButtonClickedDeviceStarted();
            }
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
            break;
    }
}

function cloneChoicesGroupLogic(Object) {
    switch (Object.object.parent.parent.parent.name) {
        case "batteryChoicesGroup":
            var clickedObject = Object.object.parent.parent;
            var old_choice_object = null;
            if (battery_chosen == null) {
                battery_chosen = clickedObject.name;
                clickedObject.position.y += 30;
            } else {
                var old_choice_name = battery_chosen;
                if (clickedObject.name == battery_chosen) {
                    theName = battery_chosen + "invelis_baterie";
                    var batteryIntendedToBeClicked = scene.getObjectByName(battery_chosen + "invelis_baterie");
                    var batteryChosenMaterial = batteryIntendedToBeClicked.children[0].material;
                    temp_battery_color = batteryChosenMaterial.color.getHex();
                    temp_battery_specular = batteryChosenMaterial.specular.getHex();
                    colorizeBattery({color: temp_battery_color, shininess: 30, specular: temp_battery_specular, metal: true, side: THREE.DoubleSide});
                    removeScene2();
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
                clickedObject.position.y += 10;
            } else {
                var old_choice_name = disruptor_chosen;
                if (clickedObject.name == disruptor_chosen) {
                    theName = disruptor_chosen + "shell_mecanism_tigara";
                    var whatActuallyClicked = scene.getObjectByName(disruptor_chosen + "shell_mecanism_tigara");
                    var chosenMaterial = whatActuallyClicked.children[0].material;
                    temp_disruptor_color = chosenMaterial.color.getHex();
                    temp_disruptor_specular = chosenMaterial.specular.getHex();
                    colorizeMechanism({color: temp_disruptor_color, shininess: 30, specular: temp_disruptor_specular, metal: true, side: THREE.DoubleSide});
                    removeScene1(1000);
                } else {
                    old_choice_object = scene.getObjectByName(old_choice_name);
                    disruptor_chosen = clickedObject.name;
                    old_choice_object.position.y -= 10;
                    clickedObject.position.y += 10;
                }
            }
            break;
        case "filterChoicesGroup":
            var zAmount = 20;
            var clickedObject = Object.object.parent.parent;
            var old_choice_object = null;
            if (filter_chosen == null) {
                filter_chosen = clickedObject.name;
                clickedObject.position.z += zAmount;
                clickedObject.position.y += zAmount;
            } else {
                var old_choice_name = filter_chosen;
                if (clickedObject.name == filter_chosen) {
                    removeScene3();
                } else {
                    old_choice_object = scene.getObjectByName(old_choice_name);
                    filter_chosen = clickedObject.name;
                    old_choice_object.position.z -= zAmount;
                    old_choice_object.position.y -= zAmount;
                    clickedObject.position.y += zAmount;
                    clickedObject.position.z += zAmount;
                }
            }
            break;
    }
}