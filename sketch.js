let cameraCtrl;
let controller;
let axis;
let heat;

function setup() {
  createCanvas(600, 600, WEBGL);
  
  axis = new Axis();
  cameraCtrl = new Camera();
  controller = new Controls();
  
}

function draw() {
  background(220);
  cameraCtrl.update();
  axis.show();
  controller.simuCtrl.update();
  
  
  
  if (controller.animCtrl.run == 2){
    heat = new heatObject(controller.simuCtrl); 
  }
  if (controller.animCtrl.run == 0){
    
  }
  if (controller.animCtrl.run == 1){
    heat.compute();
  }
  heat.show3D()
}

function mouseWheel(event){
  if (keyIsPressed){
    cameraCtrl.rotation(event);
  }
  else{
    cameraCtrl.zoom(event); // Zoom in/out the scene.
  }
  return false
}

function mousePressed() {
  cameraCtrl.mousePressed();
  print(mouseX, mouseY)
}

function mouseDragged() {
  cameraCtrl.translation();
}

