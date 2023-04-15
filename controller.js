class animControls{
  constructor(){
    this.run = 2;
  
    this.runButton = createButton('Run !');
    this.runButton.position(0, height);
    this.runButton.mousePressed(() => {this.run = (this.run + 1)%2}); 
    
    this.resetButton = createButton('Reset !');
    this.resetButton.position(this.runButton.width, height);
    this.resetButton.mousePressed(() => {this.run = 2}); 
  }

}

class simuControls{
  constructor(){
    this.Nx = 1;
    this.Ny = 1;
    this.T_i = 0;
    this.T_b = 100;
    this.D = 1e6;
    this.dx = width/this.Nx;
    this.dy = height/this.Ny;
    this.dt = min(this.dx**2, this.dy**2)/(4*this.D); //Stability condition 
    
    this.NxSlider = createSlider(5, 50, 10);
    this.NySlider = createSlider(5, 50, 10);
        
    this.NxSlider.position(0, height+30); 
    this.NySlider.position(0, height+50);
    
    this.NxSlider.style('width', '80px');
    this.NySlider.style('width', '80px');
    
    this.selectQ = createSelect();
    this.selectQ.position(1.5*this.NxSlider.width, this.NxSlider.y);
    this.selectQ.option('random');
    this.selectQ.option('sinus');
    this.selectQ.option('exp');
    
    this.update();
  }
  update(){
    this.Nx = this.NxSlider.value();
    this.Ny = this.NySlider.value();
    this.dx = width/this.Nx;
    this.dy = height/this.Ny;
    this.dt = min(this.dx**2, this.dy**2)/(4*this.D); //Stability condition 
  }

  
  
}

class Controls{
  constructor(){
    this.animCtrl = new animControls(); 
    this.simuCtrl = new  simuControls();
  }
}

