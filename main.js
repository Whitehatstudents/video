img="";
status1="";
objects=[];
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded()
{
    console.log("model loaded");
    status1=true;
}
function draw()
{
    image(video,0,0,380,380);
    if(status1!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objects detected"; 
            fill("black");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("tan");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResult(error,results)
{
    if(error)  
    {
        console.error(error);
    } 
    else{
        console.log(results);
        objects=results;
    }
}

