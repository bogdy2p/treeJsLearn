function rotateObjectY(objectName, direction, time, amount) {
    var Object = scene.getObjectByName(objectName);

    if (amount == null) {
        amount = Math.PI / 4;
    }

    rotateLeft = new TWEEN.Tween(Object.rotation).to({y: amount}, time).easing(TWEEN.Easing.Quadratic.EaseInOut);
    rotateRight = new TWEEN.Tween(Object.rotation).to({y: -amount}, time).easing(TWEEN.Easing.Quadratic.EaseInOut);
    if (direction == 'left') {
        rotateLeft.start();
    } else if (direction == 'right') {
        rotateRight.start();
    }
}
function rotateObjectX(objectName, direction, time, amount) {
    var Object = scene.getObjectByName(objectName);

    if (amount == null) {
        amount = Math.PI / 4;
    }

    rotateLeft = new TWEEN.Tween(Object.rotation).to({x: amount}, time).easing(TWEEN.Easing.Quadratic.EaseOut);
    rotateRight = new TWEEN.Tween(Object.rotation).to({x: -amount}, time).easing(TWEEN.Easing.Quadratic.EaseOut);
    if (direction == 'left') {
        rotateLeft.start();
    } else if (direction == 'right') {
        rotateRight.start();
    }
}
function rotateObjectZ(objectName, direction, time, amount) {
    var Object = scene.getObjectByName(objectName);

    if (amount == null) {
        amount = Math.PI / 4;
    }

    rotateLeft = new TWEEN.Tween(Object.rotation).to({z: amount}, time).easing(TWEEN.Easing.Quadratic.EaseOut);
    rotateRight = new TWEEN.Tween(Object.rotation).to({z: -amount}, time).easing(TWEEN.Easing.Quadratic.EaseOut);
    if (direction == 'left') {
        rotateLeft.start();
    } else if (direction == 'right') {
        rotateRight.start();
    }
}


function flyInPart(objectName, current, time) {
    var top = current;
    top.y += 150;
    var ActualObject = scene.getObjectByName(objectName);
    if (ActualObject) {
//        console.log(Object.parent);
        var update = function () {
            console.log("entered update of flyInPart");
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        // remove previous tweens if needed
//        TWEEN.removeAll();
        var easing = TWEEN.Easing.Quadratic.EaseInOut;
        // build the tween lift the battery from the support
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: -46, rotation: 0.3}, time)
//            .delay(userOpts.delay)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

function flyOutPart(objectName, current, time) {
    var top = current;
    
    var ActualObject = scene.getObjectByName(objectName);
    if (ActualObject) {
//        console.log(Object.parent);
        var update = function () {
            console.log("entered update of flyInPart");
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        // remove previous tweens if needed
//        TWEEN.removeAll();
        var easing = TWEEN.Easing.Quadratic.EaseIn;
        // build the tween lift the battery from the support
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: +150, rotation: 0.3}, time)
//            .delay(userOpts.delay)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

//function rotate60(objectName, direction, time, amount) {
//    var Object = scene.getObjectByName(objectName);
//    if (amount == null) {
//        amount = Math.PI / 4;
//    }
//    rotateLeft = new TWEEN.Tween(Object.rotation).to({y: amount}, time).easing(TWEEN.Easing.Quadratic.EaseOut);
//    rotateRight = new TWEEN.Tween(Object.rotation).to({y: -amount}, time).easing(TWEEN.Easing.Quadratic.EaseOut);
//    if (direction == 'left') {
//        rotateLeft.start();
//    } else if (direction == 'right') {
//        rotateRight.start();
//    }
//}
//
//
//function rotate360(objectName, direction, time, amount) {
//    if (amount == null) {
//        amount = Math.PI / 4;
//    }
//    var Object = scene.getObjectByName(objectName);
//    rotateLeft = new TWEEN.Tween(Object.rotation).to({y: amount}, time).easing(TWEEN.Easing.Quadratic.EaseOut);
//    rotateRight = new TWEEN.Tween(Object.rotation).to({y: -amount}, time).easing(TWEEN.Easing.Quadratic.EaseOut);
//    if (direction == 'left') {
//        rotateLeft.start();
//    } else if (direction == 'right') {
//        rotateRight.start();
//    }
//}        


  function animateWheelRotation(direction) {

        rotateObjectY('grupRoata', direction, 3000, 4 * Math.PI / 2);

    }
    function animateBatteryChoicesGroupRotation(direction) {

        rotateObjectY('batteryChoicesGroup', direction, 3000, 4 * Math.PI / 2);

    }
    function animateDisruptorChoicesGroupRotation(direction) {

        rotateObjectY('disruptorChoicesGroup', direction, 3000, 4 * Math.PI / 2);

    }
    function animateDisruptorFlyIns() {

        for (i = 0; i < 8; i++) {
            flyInPart('group_clona_disruptor_' + i, wheel_hole_positions[i], 200 + 200 * i);
        }
    }

    function animateDisruptorFlyOuts() {
        for (i = 0; i < 8; i++) {
//            console.log('flying part ' + (7 - i));
            flyOutPart('group_clona_disruptor_' + (7 - i), wheel_hole_positions[(7 - i)], 500 + 500 * i);
        }
    }

    function animateBatteriesFlyIns() {

        for (i = 0; i < 8; i++) {
            flyInPart('group_clona_baterie_' + i, wheel_hole_positions[i], 200 + 200 * i);
        }
    }

    function animateBatteriesFlyOuts() {
        for (i = 0; i < 8; i++) {
//            console.log('flying part ' + (7 - i));
            flyOutPart('group_clona_baterie_' + (7 - i), wheel_hole_positions[(7 - i)], 500 + 500 * i);
        }
    }