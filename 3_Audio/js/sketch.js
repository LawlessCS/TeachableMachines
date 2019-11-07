let TM_URL = "https://teachablemachine.withgoogle.com/models/oipKyyfG/";


let classifier;

let label = "Waiting...";

// STEP 1: Load the model!
function preload() {
    classifier = ml5.soundClassifier("https://storage.googleapis.com/tm-model/oipKyyfG/model.json");
}

function setup() {
    createCanvas(640, 520);

    // STEP 2: Start classifying
    classifyAudio();
}

// STEP 2 classify!
function classifyAudio() {
    classifier.classify(gotResults);
}

function draw() {
    background(0);

    // STEP 4: Draw the label
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(256);

    let out = "🎧";

    if (label == "sniff") {
        out = "👃";
    } else if(label == "pop") {
        out = "💥";
    } else if (label == "hum") {
        out = "🔊";
    }

    text(out, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(error, results) {

    if (error) {
        console.error(error);
        return;
    }

    label = results[0].label;
}
