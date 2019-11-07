// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge #115: Snake Game Redux
// https://youtu.be/OMoVcohRgZA

let snake;
let rez = 20;
let food;
let w;
let h;

let classifier;
let label = "Waiting...";
let tm_url = "https://teachablemachine.withgoogle.com/models/Jxcl8HTe/";

let gameLoop;

// STEP 1: Load the model!
function preload() {
    classifier = ml5.soundClassifier("https://storage.googleapis.com/tm-model/Jxcl8HTe/model.json");
}

function setup() {
    createCanvas(640, 480);

    classifyAudio();

    w = floor(width / rez);
    h = floor(height / rez);
    //frameRate(5);
    snake = new Snake();
    foodLocation();

    gameLoop = setInterval(moveSnake, 250);
}

// STEP 2 classify!
function classifyAudio() {
    classifier.classify(gotResults);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    if (results[0].confidence > 0.7) {
        label = results[0].label;
    }
    controlSnake();
}

function foodLocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        snake.setDir(1, 0);
    } else if (keyCode === DOWN_ARROW) {
        snake.setDir(0, 1);
    } else if (keyCode === UP_ARROW) {
        snake.setDir(0, -1);
    } else if (key == " ") {
        snake.grow();
    }
}

function controlSnake() {
    if (label === "left") {
        snake.setDir(-1, 0);
    } else if (label === "right") {
        snake.setDir(1, 0);
    } else if (label === "down") {
        snake.setDir(0, 1);
    } else if (label === "up") {
        snake.setDir(0, -1);
    }
}

function draw() {
    background(220);

    textSize(64);
    fill(0);
    textAlign(CENTER, CENTER);
    text(label, width / 2, height - 32);

    scale(rez);

    snake.show();

    noStroke();
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);
}

function moveSnake() {
    if (snake.eat(food)) {
        foodLocation();
    }
    snake.update();

    if (snake.endGame()) {
        print("END GAME");
        background(255, 0, 0);
        clearInterval(gameLoop);
        noLoop();
    }
}
