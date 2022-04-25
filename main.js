var song1="";
var song2="";
var left_wrist_x= 0;
var left_wrist_y= 0;
var right_wrist_x= 0;
var right_wrist_y= 0;
var score_left_wrist=0;
var score_right_wrist=0;
var song1_status= "";
var song2_status= "";

function preload() {
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup() {
    canvas= createCanvas(600,500);
    canvas.position(380, 400);
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotResults);

}

function modelloaded() {
console.log("PoseNet modelloaded");

}

function gotResults(results) {
    if (results.length>0) {
        console.log(results);
        left_wrist_x= results[0].pose.leftWrist.x;
        left_wrist_y= results[0].pose.leftWrist.y;
        console.log("Position Of left Wrist : x- " +left_wrist_x + " y- "+ left_wrist_y);
        right_wrist_x= results[0].pose.rightWrist.x;
        right_wrist_y= results[0].pose.rightWrist.y;
        console.log("Position Of Right Wrist : x- "+ right_wrist_x + " y- "+ right_wrist_y);
        
        score_left_wrist= results[0].pose.keypoints[9].score;
        score_right_wrist= results[0].pose.keypoints[10].score;
        console.log("Score for Right Wrist= " + score_right_wrist+  "Score for Left Wrist= " + score_left_wrist);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
fill ("yellow")
    if (score_right_wrist>0.2) {
        circle(right_wrist_x, right_wrist_y, 20);
        song2.stop();
        if (song1_status==false) {
        song1.play();
        document.getElementById("song").innerHTML= "Playing The Harry Potter Theme Song"
        } 
    }
    if (score_left_wrist>0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        song1.stop();
        if (song2_status==false) {
        song2.play();
        document.getElementById("song").innerHTML= "Playing The Peter Pan Song";
        } }
 
    
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}