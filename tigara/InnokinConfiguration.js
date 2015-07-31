var debug_mode_on = false;
var debugZoomoutAmmount = 1;
var no_polar = false;
var objectToMoveOnDebug = 'roata';
var scale_to_move = 0.5;
var selectList;
var scalesList;
var lightingHelperEnabled = false;
var axisHelperEnabled = true;
var overrideSceneNumber = 4;

//SMOKE PART
var playSmoke = null;
var removeSmoke = null;
var smoking = false;
var ammount_of_ms_to_press = 1500;
var resetTimeout = null;

//END SMOKE PART

var all_obj_models_loaded = false;
var sceneNumber = 0;
var loadProgress = 0;
var battery_chosen = null;
var disruptor_chosen = null;
var filter_chosen = null;
var object_is_not_split = true;
var innokin_centered_to_screen = false;
var device_status = "OFF";
var device_state = 'watt';
var startButtonTime = null;
var startClick1 = null;
var startClick2 = null;
var startClick3 = null;
var timer_running = false;
var disruptor_started = false;
var startButtonPushStart = null;
var startButtonPushed = false;
//Device variables should be 10 times the actual values
var device_variables = {
    ohmz: 5,
    volt: 63,
    watt: 450,
    battery: 1000,
}

var ohmLetter = String.fromCharCode(0x2126);
var group, groupMecanism, groupFiltru, groupBaterie, groupRoata, groupDevice, group3, batteryChoicesGroup;
var disruptor;
var battery;
var tigara;
var container, mapCanvas;
var controls, controls2;
var camera, mapCamera, scene, scene2, renderer, raycaster, raycasterMap;
var positions, colors;
var mouseX = 0, mouseY = 0;
var mouseXOnMouseDown = 0;
var ASPECT_RATIO, SCREEN_WIDTH, SCREEN_HEIGHT;
var targetRotation = 0;
var startButton, minusButtonCylinder, plusButtonCylinder, filtruTigara, chargerCube, disrupterCube;
var targetRotationOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var pointLight;
var startButtonCounter = 0;
var startButtonCounter2 = 0;
var chargerMaterial;
var tweenBatteryOut, tweenBatteryIn, tweenBatteryUp, tweenBatteryDown;
var startTime = Date.now();
var emitter, particleGroup;
var disruptor_colours_shown = false;
var battery_colours_shown = false;

//Screen Part variables

var screenDynamicTexture;
var planeGeometry1;
var planeGeometry2;
var planeMaterial;
var ScreenPlane;
var LargeScreen;


var userOpts = {
    liftoff: 16,
    range: 2000,
    duration: 1500,
    delay: 0,
    easing: 'Exponential.EaseIn',
    quintic_in: 'Quintic.EaseOut',
}