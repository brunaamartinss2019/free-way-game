const FPS = 1000 / 60;

const CANVAS_W = 700;
const CANVAS_H = 400;

const BG_MAIN = '/assets/images/bgs/carretera.png';

const BG_VX = 7;
const GROUND_Y = 2;

const KEY_UP = 38;
const KEY_DOWN = 40;

const CHICKEN_VY = 3;

const CAR_SPAWN_INTERVAL = 500;

//posiçoes verticais onde os carros podem aparecer.
const LANE_Y_POSITIONS = [
    370, //faixa mais perto
    204,
    270,
    232, // faixa mais longe
];

const LANE_Y_POSITIONS_SLOW = [
    338, 
    128,
    52, // faixa mais longe
];

const LANE_Y_POSITIONS_ALL = [
    90, 
    166,
    305,
];

const SAFE_ZONE_Y = 1; //Coordenada vertical. Se for alcançada significa que a galinha venceu. Limite superior que a galinha tem q cruzar

const DEBUG = true;