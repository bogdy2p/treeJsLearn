function moveTheWheelToCenter() {
        var wheel = scene.getObjectByName('grupRoata');
        if (wheel) {
            wheel.position.x = 0;
//            wheel.position.y = 0;
            wheel.position.z = 0;
        }
    }