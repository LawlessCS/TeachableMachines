let TM_URL = "https://teachablemachine.withgoogle.com/models/fFoHFrKf/";

// Video
let video;

let classifier;

let label = "Waiting...";

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/fFoHFrKf/model.json");
}

function setup() {
    createCanvas(640, 520);

    // Create the video
    video = createCapture(VIDEO);
    video.hide();

    // STEP 2: Start classifying
    classifyVideo();
}

// STEP 2 classify!
function classifyVideo() {
    classifier.classify(video, gotResults);
}

function draw() {
    background(0);

    // Draw the video
    //image(video, 0, 0);

    // STEP 4: Draw the label
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(256);

    let emoji = "⏳";

    if (label == "Hand") {
        emoji = "✋";
    } else if (label == "Face") {
        emoji = "😃";
    } else if (label == "Bottle") {
        emoji = "🍾";
    } else if (label == "Nothing") {
        emoji = "🤷";
    }

    text(emoji, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(error, results) {

    if (error) {
        console.error(error);
        return;
    }

    label = results[0].label;

    classifyVideo();
}
