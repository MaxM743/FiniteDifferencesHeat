class heatObject{
  constructor(parameters){
    this.parameters = parameters;

    this.grid = zeros(this.parameters.Nx, this.parameters.Ny);
    
    this.dirichlet = zeros(this.parameters.Nx, this.parameters.Ny);
    this.neumann = zeros(this.parameters.Nx, this.parameters.Ny);
    this.grid = multCstMat(this.parameters.T_i, ones(this.parameters.Nx, this.parameters.Ny));
    this.Q = this.createQ(this.parameters.selectQ.value());
  }
  
  compute(){
    let newgrid = copyMat(this.grid);
    
    let dx = this.parameters.dx;
    let dy = this.parameters.dy;
    let dt = this.parameters.dt;
    let D = this.parameters.D; 
    for (let i = 1; i < newgrid.length - 1; i++){
      for(let j = 1; j < newgrid[0].length - 1; j++){
        newgrid[i][j] = this.grid[i][j] + D * dt * ((this.grid[i+1][j] + this.grid[i-1][j]         - 2 * this.grid[i][j])/(dx**2) + (this.grid[i][j+1]  + this.grid[i][j-1] -                 2*this.grid[i]            [j])/(dy**2)) + this.Q[i][j] * dt;  
      }
    }
    this.grid = newgrid;
  }

  createQ(distrib){
    let Nx = this.parameters.Nx;
    let Ny = this.parameters.Ny;
    
    
    if (distrib == 'random'){
      return randMat(Nx, Ny, 0, 4000);
    }   
    if (distrib == 'sinus'){
      return sinMat(Nx, Ny, 10000);
    }
    if (distrib == 'exp'){
      return expMat(Nx, Ny);
    }
    
  }
  
  show3D(){
   
    let dx = this.parameters.dx;
    let dy = this.parameters.dy;
    
    for (let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid[0].length; j++){
        
        push();
        let cval = map(this.grid[i][j], findMin(this.grid), findMax(this.grid), 0, 255);
        fill(200, 0, int(cval));
        translate(i*dx, j*dy, this.grid[i][j]/2);
        box(dx, dy, this.grid[i][j]);
        pop();
      }
    } 
  }
}

