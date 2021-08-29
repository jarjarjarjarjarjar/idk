img = "";
status = "";
objects = [];
//user_image = "";

function preload() {
    //img = loadImage(user_image)
    img = loadImage("dog_cat.jpg")
}

function setup() {
    //image(img, 0, 0);
    //console.log(img.height)
    //console.log(img.width)
    //canvas = createCanvas(img.width,img.height);
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded")
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}



function draw() {
    //user_image=document.getElementById("user_img").value
    //image(img, 0, 0, img.width,img.height);
    image(video, 0, 0, 380,380);
        if(status != "")
        {
            r = random(255)
            g = random(255)
            b = random(255)
            objectDetector.detect(video, gotResult);    
            for (i = 0; i < objects.length; i++)
            {
                document.getElementById("status").innerHTML= "Status : Object Dectected"
                document.getElementById("number_of_objects").innerHTML = "Number of objects detcted are :"+ objects.length
                
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
}