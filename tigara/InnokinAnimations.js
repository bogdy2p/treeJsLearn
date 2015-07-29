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


function flyInPart(objectName, current, time, general_height) {
    var top = current;
    top.y += 350;
    var ActualObject = scene.getObjectByName(objectName);
    if (ActualObject) {
        var update = function () {
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;

        }
        var easing = TWEEN.Easing.Linear.EaseNone;
        // build the tween lift the battery from the support
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: general_height}, time)
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
        var update = function () {
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        var easing = TWEEN.Easing.Quadratic.EaseIn;
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: +600}, time)
//            .delay(userOpts.delay)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

function flyInWheel(objectName, current, time) {
    var top = current;
    top.y -= 350;
    var ActualObject = scene.getObjectByName(objectName);
    if (ActualObject) {
        var update = function () {
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        var easing = TWEEN.Easing.Quadratic.EaseInOut;
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: wheel_general_height}, time)
//            .delay(userOpts.delay)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

function flyOutWheel(objectName, current, time) {
    var top = current;

    var ActualObject = scene.getObjectByName(objectName).children[0];
    if (ActualObject) {
        var update = function () {
//            console.log("UPDATE OF FLYOUTTOBOTTOMPART");
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        var easing = TWEEN.Easing.Quadratic.EaseIn;
        // build the tween lift the battery from the support
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: -350}, time)
                .delay(1000)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

function flyOutFilter(objectName, current, time) {
    var top = current;
    top.y = current.y - 150;
    var ActualObject = scene.getObjectByName(objectName);
    if (ActualObject) {
        var update = function () {
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        var easing = TWEEN.Easing.Quartic.EaseOut;
        // build the tween lift the battery from the support
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: +150}, time)
//                .delay(50)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

function flyInDisruptorClone(objectName, current, time, general_height) {
    var top = current;
    top.y += 350;
    var ActualObject = scene.getObjectByName(objectName);
    if (ActualObject) {
        var update = function () {
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;

        }
        var easing = TWEEN.Easing.Linear.EaseNone;
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: general_height}, time)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

function flyOutDisruptorClone(objectName, current, time) {
    var top = current;

    var ActualObject = scene.getObjectByName(objectName);
    if (ActualObject) {
        var update = function () {
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        var easing = TWEEN.Easing.Quadratic.EaseIn;
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: +600}, time)
//            .delay(userOpts.delay)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}


function flyInChosenDisruptor() {
    var theDisruptor = scene.getObjectByName('groupMecanism');
    theDisruptor.position.x = 0;
    theDisruptor.position.y = -20;
    theDisruptor.position.z = 0;
}
function flyInChosenBattery() {
    var theBattery = scene.getObjectByName('groupBaterie');
    theBattery.position.x = -15;
    theBattery.position.y = -20;
    theBattery.position.z = 0;
}
function flyInChosenFilter() {
    var theFilter = scene.getObjectByName('groupFiltru');
    theFilter.position.x = 0;
    theFilter.position.y = -20;
    theFilter.position.z = 0;
}


function rotateWheelY(objectName, direction, time, amount) {
    var Object = scene.getObjectByName(objectName);

    if (amount == null) {
        amount = Math.PI / 4;
    }

    rotateLeft = new TWEEN.Tween(Object.rotation).to({y: amount}, time).easing(TWEEN.Easing.Linear.EaseNone);
    rotateRight = new TWEEN.Tween(Object.rotation).to({y: -amount}, time).easing(TWEEN.Easing.Linear.EaseNone);
    if (direction == 'left') {
        rotateLeft.start();
    } else if (direction == 'right') {
        rotateRight.start();
    }
}

function animateWheelGroupRotation(direction) {
    rotateWheelY('groupRoata', direction, 2500, 4 * Math.PI / 2);

}
function animateBatteryChoicesGroupRotation(direction) {
    rotateObjectY('batteryChoicesGroup', direction, 2000, 4 * Math.PI / 2);
}


function animateWheelFlyIn() {
    flyInWheel('groupRoata', {x: 0, y: -46, z: 0}, 500);
}

function animateWheelFlyOut() {
    flyOutWheel('groupRoata', {x: 0, y: 0, z: 0}, 500);
}


function animateBatteriesFlyIns() {
    for (i = 0; i < 8; i++) {
        flyInPart('group_clona_baterie_' + i, wheel_hole_positions[i], 150 + 250 * i, battery_clone_general_height);
    }
}

function animateBatteriesFlyOuts() {
    for (i = 0; i < 8; i++) {
        flyOutPart('group_clona_baterie_' + (7 - i), wheel_hole_positions[(7 - i)], 500 + 500 * i);
    }
}

function animateDisruptorFlyIns() {
    for (i = 0; i < 3; i++) {
        flyInDisruptorClone('group_clona_disruptor_' + i, disruptor_clone_positions[i], 200 + 500 * i, -30);
    }
}

function animateDisruptorFlyOuts() {
    for (i = 0; i < 3; i++) {
        flyOutPart('group_clona_disruptor_' + (3 - (i + 1)), disruptor_clone_positions[(3 - (i + 1))], 200 + 500 * i);
    }
}

function animateFiltersFlyIn() {
    console.log("flyinfFILTRU");
    setCameraPositionScene3();
    flyInPart('group_clona_filtru_0', {x: -10, y: 0, z: -15}, 300, -60);
    flyInPart('group_clona_filtru_1', {x: 33, y: 0, z: -15}, 300, -60);
}

function animateFiltersFlyOut() {
    flyOutFilter('group_clona_filtru_0', {x: -10, y: 0, z: -15}, 1500);
    flyOutFilter('group_clona_filtru_1', {x: 33, y: 0, z: -15}, 1500);
}