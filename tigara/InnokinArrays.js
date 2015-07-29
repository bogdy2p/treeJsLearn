
var wheel_general_height = -30;
var battery_clone_general_height = 10;

var wheel_hole_positions = [
    {x: 16, y: 300, z: 2},
    {x: 10, y: 300 + 60, z: 12.5},
    {x: -2, y: 300, z: 16},
    {x: -13, y: 300, z: 10},
    {x: -16.2, y: 300, z: -1.8},
    {x: -10.2, y: 300, z: -12.7},
    {x: 1.8, y: 300, z: -16.2},
    {x: 13, y: 300, z: -10},
];

var disruptor_clone_positions = [
    {x: 33.5, y: -120, z: -30},
    {x: 33.5, y: -120, z: 2},
    {x: 32.5, y: -120, z: 34},
];


var filter_clone_positions = [
    {x: -10, y: 0, z: -15},
    {x: 33, y: 0, z: -15},
];

var wheel_scene_positions = [
    {x: 0, y: -46, z: 0},
    {x: 0, y: 0, z: 0},
];


var groups_array = [
    {name: "groupPrincipal", x: 0, y: 0, z: 0},
    {name: "groupFiltru", x: 5.5, y: -15, z: 2},
    {name: "groupBaterie", x: -9.45, y: -15, z: 2},
    {name: "groupRoata", x: 0, y: -46, z: 0},
    {name: "groupMecanism", x: 5.5, y: -15, z: 2},
];


var roata_only = [
    'roata',
]

var filtru_only = [
    'sipca',
    'sticla',
    'logo_sipca',
];
var mecanism_only = [
    'buton_interior_mecanism_tigara',
    'buton_mare',
    'buton_mic_1',
    'buton_mic_2',
    'capac_mecanism_tigara',
    'ecran',
    'ecran_behind',
    'ecran_rama',
    'filet_buton',
    'filet_capac_mecanism_tigara',
    'fund_mecanism_tigara',
    'partea_inferioara_stecher',
    'partea_superioara_stecher',
    'shell_mecanism_tigara',
    'suruburi_capac_mecanism_tigara',
    'suruburi_fund_mecanism_tigara',
    'text_mecanism_interior',
];
var baterie_only = [
    'baterie',
    'baterie_2',
    'capac_baterie',
    'fund_baterie',
    'invelis_baterie',
    'logo_textura_baterie',
    'suruburi_baterie',
    'suruburi_capac_baterie',
    'suruburi_fund_baterie',
    'text_baterie_bottom',
    'battery_usb',
];
var array_of_names = [
    'sipca',
    'sticla',
    'baterie',
    'baterie_2',
    'battery_usb',
    'buton_interior_mecanism_tigara',
    'buton_mare',
    'buton_mic_1',
    'buton_mic_2',
    'capac_baterie',
    'capac_mecanism_tigara',
    'ecran',
    'ecran_behind',
    'ecran_rama',
    'filet_buton',
    'filet_capac_mecanism_tigara',
    'fund_baterie',
    'fund_mecanism_tigara',
    'invelis_baterie',
    'logo_sipca',
    'logo_textura_baterie',
    'partea_inferioara_stecher',
    'partea_superioara_stecher',
    'shell_mecanism_tigara',
    'suruburi_baterie',
    'suruburi_capac_baterie',
    'suruburi_capac_mecanism_tigara',
    'suruburi_fund_baterie',
    'suruburi_fund_mecanism_tigara',
    'text_baterie_bottom',
    'text_mecanism_interior',
];

var lightingPositions = [
    {x: 300, y: 300, z: 0},
    {x: 0, y: 300, z: 300},
    {x: 0, y: -300, z: 300},
    {x: -300, y: 300, z: 0},
    {x: -300, y: 0, z: -300},
    {x: 0, y: -300, z: -300}
];


//ARRAYS USED FOR DEBUGGING ONLY

var debug_all_objects = [
    'buton_interior_mecanism_tigara',
    'buton_mare',
    'buton_mic_1',
    'buton_mic_2',
    'capac_mecanism_tigara',
    'ecran',
    'ecran_behind',
    'ecran_rama',
    'filet_buton',
    'filet_capac_mecanism_tigara',
    'fund_mecanism_tigara',
    'partea_inferioara_stecher',
    'partea_superioara_stecher',
    'shell_mecanism_tigara',
    'suruburi_capac_mecanism_tigara',
    'suruburi_fund_mecanism_tigara',
    'text_mecanism_interior',
    'sipca',
    'sticla',
    'logo_sipca',
    'baterie',
    'baterie_2',
    'capac_baterie',
    'fund_baterie',
    'invelis_baterie',
    'logo_textura_baterie',
    'suruburi_baterie',
    'suruburi_capac_baterie',
    'suruburi_fund_baterie',
    'text_baterie_bottom',
    'battery_usb'];
var debug_test_objects = [
    'testCylinder1',
    'testCylinder2',
    'testCylinder3',
    'testCylinder4',
    'testCylinder5',
    'testCylinder6',
    'group_clona_baterie_0',
    'group_clona_baterie_1',
    'group_clona_baterie_2',
    'group_clona_baterie_3',
    'group_clona_baterie_4',
    'group_clona_baterie_5',
    'group_clona_baterie_6',
    'group_clona_baterie_7',
    'group_clona_disruptor_0',
    'group_clona_disruptor_1',
    'group_clona_disruptor_2',
    'group_clona_filtru_0',
    'group_clona_filtru_1',
];
var scales = [
    0.1, 0.2, 0.5, 1, 2, 3, 5, 10, 30, 50
];


