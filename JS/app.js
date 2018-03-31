//Global Vars
//The Value to increment/Decrement X,Y when Moving Frog
let speed = 50;



//Get Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//Add an evnt listener to DOC
document.addEventListener('keydown',(e)=>{
	const key = e.key;
	//Change Frogger Position when Keys are pressed
	if(key === 'ArrowRight'){

		frogger.x += speed;
	}
	else if(key === 'ArrowLeft'){

		frogger.x -= speed;
	}
	else if(key === 'ArrowUp' ){
		
		frogger.y -= speed;
	}
	else if(key === 'ArrowDown'){
		
		frogger.y += speed;
	}
	//Erase And Draw New Position of Frog And redraw Scene
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// scene.drawScene();
	// frogger.drawFrog()
})


//Make Frog Object
const frogger = {
	//How Many Lives our Hero will Have
	life: 5,
	//Position hero in center of width of canvas
	x: canvas.width/2,
	y: canvas.height - 70,
	r: 10,
	//Color of Body
	color: 'rgb(102,153,0)',
	//Function to draw body
	drawFrog(){ 	console.log("drawFrog");

		//Arms & Legs Width
		ctx.lineWidth = 3;
		//Draw Left Arm and Right Leg
		ctx.beginPath();
		ctx.moveTo(this.x - 15, this.y - 15);
		ctx.lineTo(this.x + 15 , this.y + 15);
		ctx.strokeStyle = this.color;

		ctx.stroke();
		//Draw Right Arm and Left Leg
		ctx.beginPath();
		ctx.moveTo(this.x - 15, this.y + 15);
		ctx.lineTo(this.x + 15 , this.y - 15);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		// Draw Body Part
		ctx.beginPath();
 		console.log(this);
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();

		ctx.closePath();
	},


	
}



//Make Scene Object
const scene = {
	//Draw Everything in Scene
	drawScene(){
		this.land.drawLand();
		this.dangerZone.water.drawWater();
		this.dangerZone.street.drawStreet();
	},
	//The Safe Zone
	land:{
			x: 0,//Draw From
			y: 0,//Draw From
			w: canvas.width,//Size of land Horizontally
			h: canvas.height/7,//Size of Land Vertically
			color:'#B2F699',//Color Of Land
				drawLand(){ //Draw 3 Peices of land
						for(let i = 0; i < 3; i ++){
						ctx.beginPath();
						ctx.rect(this.x , i * 300, this.w, this.h)
						ctx.fillStyle = this.color;
						ctx.fill();
						ctx.closePath();
						
						}

			},

	},
	//Danger zone is the water and Street
	dangerZone:{
				x: 0,
				y: canvas.height/7,//Where to draw from
				w: canvas.width,
				h: canvas.height/3.5, //Two Times bigger than land
				color: ['#1491CB','rgb(0,0,0)'],
				//Water Object
				water:{
					drawWater(){ 
					
						ctx.beginPath();
						ctx.rect(scene.dangerZone.x , scene.dangerZone.y , scene.dangerZone.w, scene.dangerZone.h)
						ctx.fillStyle = scene.dangerZone.color[0];
						ctx.fill();
						ctx.closePath();
						// Reset the value of y for next time
						scene.dangerZone.y = canvas.height/7;
					}
					
					
				},
				//Street Object
				street:{
					rows: [ 
						{
							name:'row1',
							x:0,
							y:550,
							vehicles:[]
						},
					 	{	name:'row2',
							x:2,
							y:5,
							vehicles:[]

					 	},
					 	{
					 		name:'row3',
							x:2,
							y:5,
							vehicles:[]
					 	}
					 ],
					drawStreet(){
						ctx.beginPath();
						ctx.rect(scene.dangerZone.x , scene.dangerZone.y + 300 , scene.dangerZone.w, scene.dangerZone.h)
						ctx.fillStyle = scene.dangerZone.color[1];
						ctx.fill();
						ctx.closePath();
						// reset the value of y for next time
						scene.dangerZone.y = canvas.height/7;
					},
					vehicleFactory(){
						const newVehicle = new Vehicle(this.rows[0].x, this.rows[0].y,100,50,'blue',1);

						this.rows[0].vehicles.push(newVehicle);

					}
				}
			
	}	
}

class Vehicle {
	constructor(x,y,w,h,color,speed){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.speed = speed;
		}
		drawVehicle(){
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.w, this.h)
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		}
		move(){	


			if(this.x + this.speed > canvas.width){
				this.x = -canvas.width;
			}

			this.x += this.speed;
			
			scene.drawScene();
			frogger.drawFrog();	
			this.drawVehicle();

				
				
				
		}
	

}

scene.dangerZone.street.vehicleFactory()
scene.dangerZone.street.rows[0].vehicles[0].drawVehicle()

const animate = ()=>{

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scene.dangerZone.street.rows[0].vehicles[0].move()

	window.requestAnimationFrame(animate);
}



scene.drawScene();
frogger.drawFrog();



