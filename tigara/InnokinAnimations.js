
var final_position_y = -30;


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// GENERAL 
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
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
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////// WHEEL SPECIFIC ONLY
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////




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
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        var easing = TWEEN.Easing.Quadratic.EaseIn;
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

function animateWheelGroupRotation(direction) {
    rotateWheelY('groupRoata', direction, 2000, 4 * Math.PI / 2);

}

function animateWheelFlyIn() {
    flyInWheel('groupRoata', wheel_scene_positions[0], 500);
}

function animateWheelFlyOut() {
    flyOutWheel('groupRoata', wheel_scene_positions[1], 500);
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
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////// FILTER SPECIFIC ONLY
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function flyInFilter(objectName, current, time, general_height) {
    var top = current;
    top.y += 100;
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

function flyOutFilter(objectName, current, time) {
    var top = current;
//    top.y = current.y - 150;
    var ActualObject = scene.getObjectByName(objectName);
    if (ActualObject) {
        var update = function () {
            ActualObject.position.y = current.y;
            ActualObject.position.x = current.x;
            ActualObject.position.z = current.z;
        }
        var easing = TWEEN.Easing.Quartic.EaseIn;
        tweenBatteryDown = new TWEEN.Tween(top)
                .to({y: +150}, time)
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
    }
}

function animateFiltersFlyIn() {
    setCameraPositionScene3();
    flyInFilter('group_clona_filtru_0', filter_clone_positions[0], 780, -70);
    flyInFilter('group_clona_filtru_1', filter_clone_positions[1], 900, -70);
}

function animateFiltersFlyOut() {
    flyOutFilter('group_clona_filtru_0', filter_clone_positions[0], 1500);
    flyOutFilter('group_clona_filtru_1', filter_clone_positions[1], 1500);
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////// DISRUPTOR SPECIFIC ONLY
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////





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
                .easing(easing)
                .onUpdate(update);
        tweenBatteryDown.start();
    } else {
        console.log(objectName);
        console.log("NO ActualObject ... Something wrong here");
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

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////// BATTERY SPECIFIC ONLY
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



function animateBatteryChoicesGroupRotation(direction) {
    rotateObjectY('batteryChoicesGroup', direction, 2000, 4 * Math.PI / 2);
}

function animateBatteriesFlyIns() {
    for (i = 0; i < 8; i++) {
        flyInPart('group_clona_baterie_' + i, wheel_hole_positions[i], 150 + 200 * i, battery_clone_general_height);
    }
}

function animateBatteriesFlyOuts() {
    for (i = 0; i < 8; i++) {
        flyOutPart('group_clona_baterie_' + (7 - i), wheel_hole_positions[(7 - i)], 500 + 500 * i);
    }
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////// ASSEMBLY SCENE ANIMATION
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



function flyInChosenDisruptor(objectName, animationTime) {
    var theDisruptor = scene.getObjectByName(objectName);
    var fromWhere = {x: -60, y: -30, z: -60};
    var position1 = {x: 0, y: -50, z: 0};
    var position2 = {x: 0, y: -30, z: 0};
    if (theDisruptor) {
        var update = function () {
            theDisruptor.position.y = fromWhere.y;
            theDisruptor.position.x = fromWhere.x;
            theDisruptor.position.z = fromWhere.z;
        }
        var easing = TWEEN.Easing.Quadratic.EaseIn;
        flyDisruptorToPositionBelow = new TWEEN.Tween(fromWhere)
                .to(position1, animationTime / 3)
                .easing(easing)
                .onUpdate(update);
        flyDisruptorToPositionCorrect = new TWEEN.Tween(fromWhere)
                .to(position2, animationTime / 8)
                .easing(easing)
                .onUpdate(update);
        flyDisruptorToPositionBelow.chain(flyDisruptorToPositionCorrect);


        flyDisruptorToPositionBelow.start();
    } else {
        console.log("NO DISRUPTOR FOUND IN SCENE.");
    }
}

function flyInChosenBattery(objectName, animationTime) {
    var theBattery = scene.getObjectByName(objectName);
    var fromWhere = {x: 80, y: 70, z: 80};
    var position1 = {x: -15, y: 20, z: 0};
    var position2 = {x: -15, y: -27, z: 0};
    var position3 = {x: -15, y: -30, z: 0};
    if (theBattery) {
        var update = function () {
            theBattery.position.y = fromWhere.y;
            theBattery.position.x = fromWhere.x;
            theBattery.position.z = fromWhere.z;
        }
        var easing = TWEEN.Easing.Quadratic.EaseIn;
        flyBatteryToPosition1 = new TWEEN.Tween(fromWhere)
                .to(position1, animationTime / 2)
                .easing(easing)
                .onUpdate(update);
        flyBatteryToPosition2 = new TWEEN.Tween(fromWhere)
                .to(position2, animationTime / 6)
                .easing(easing)
                .delay(200)
                .onUpdate(update);
        flyBatteryToPosition3 = new TWEEN.Tween(fromWhere)
                .to(position3, animationTime / 10)
                .easing(easing)
                .delay(200)
                .onUpdate(update);
        flyBatteryToPosition1.chain(flyBatteryToPosition2);
        flyBatteryToPosition2.chain(flyBatteryToPosition3);
        flyBatteryToPosition1.start();
    } else {
        console.log("NO BATTERY FOUND IN SCENE.");
    }
}

function flyInChosenFilter(objectName, animationTime) {




    var rotateToo = true;
    var theFilter = scene.getObjectByName(objectName);

    var fromWhere = {x: 60, y: -30, z: 60};
    var position1 = {x: -0, y: 20, z: 0};
    var position2 = {x: -11, y: -28, z: -2};
    var position3 = {x: -11, y: -30, z: -2};

    var rotation = {y: -14.3}
    if (theFilter) {
        var update = function () {
            theFilter.position.y = fromWhere.y;
            theFilter.position.x = fromWhere.x;
            theFilter.position.z = fromWhere.z;
        }
        var easing = TWEEN.Easing.Quadratic.EaseIn;
        flyFilterToPosition1 = new TWEEN.Tween(fromWhere)
                .to(position1, animationTime / 2)
                .easing(easing)
                .delay(200)
                .onUpdate(update);
        flyFilterToPosition2 = new TWEEN.Tween(fromWhere)
                .to(position2, animationTime / 6)
                .easing(easing)
                .delay(400)
                .onUpdate(update);
        flyFilterToPosition3 = new TWEEN.Tween(fromWhere)
                .to(position3, animationTime / 10)
                .easing(easing)
                .delay(400)
                .onUpdate(update);
        if (rotateToo) {
            rotateFilter = new TWEEN.Tween(theFilter.rotation)
                    .to(rotation, animationTime)
                    .easing(easing)
                    .delay(400)
                    .onUpdate(update);
        }
        flyFilterToPosition1.chain(flyFilterToPosition2);
        flyFilterToPosition2.chain(flyFilterToPosition3);
        flyFilterToPosition1.start();

        setTimeout(function () {

            rotateFilter.start();
        }, 500);

//        if (debug_mode_on) {
//            setTimeout(function () {
//                var asd2 = scene.add(drawAxes(900, theFilter.position, theFilter.rotation));
//            }, 2000);
//        }



    } else {
        console.log("NO FILTER FOUND IN SCENE.");
    }
}
