function showDebugHUD() {
    function updateToMoveObject() {
        objectToMoveOnDebug = selectList.value;
    }
    function updateScaleToMoveObject() {
        scale_to_move = scalesList.value;
    }
    var myDiv = document.getElementById("debugDiv");

    for (i = 0; i < test_objects.length; i++) {
        all_objects.push(test_objects[i]);
    }

    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    selectList.setAttribute("onchange", "updateToMoveObject()");
    var scalesList = document.createElement("select");
    scalesList.id = "scaleSelect";
    scalesList.setAttribute("onchange", "updateScaleToMoveObject()");
    myDiv.appendChild(selectList);
    myDiv.appendChild(scalesList);
    for (var i = 0; i < all_objects.length; i++) {
        var option = document.createElement("option");
        option.value = all_objects[i];
        option.text = all_objects [i];
        selectList.appendChild(option);
    }

    for (var i = 0; i < scales.length; i++) {
        var option = document.createElement("option");
        option.value = scales[i];
        option.text = scales[i];
        scalesList.appendChild(option);
    }
}
function showLightingAndAxisDebug(lightingPositions) {

    //Add the 3-way AXIS
    var testHelper = new THREE.AxisHelper(50);
    scene.add(testHelper);

    //Collect the existing lights from the scene
    var lights = [];
    for (i = 0; i < lightingPositions.length; i++) {
        directLight = scene.getObjectByName('luminaDirectionala' + i);
        lights.push(directLight);
    }
    var testBoxGeom = new THREE.BoxGeometry(30, 30, 30, 30);
    var testBoxMat = new THREE.MeshBasicMaterial();
    //Create a white box for each of the light existing in the scene
    //Also display the  default ThreeJS lightHelpers
    var testBoxes = [];
    var LightHelperSize = 100;
    for (i = 0; i < lightingPositions.length; i++) {
        testBoxes[i] = new THREE.Mesh(testBoxGeom, testBoxMat);
        testBoxes[i].position.copy(lights[i].position);
        scene.add(testBoxes[i]);
        var LightHelper = new THREE.DirectionalLightHelper(lights[i], LightHelperSize);
        scene.add(LightHelper);
    }

}