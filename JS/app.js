

//Generates Random Color For Cars, 56-255 RGB Because we want bright colors
const randomColor = ()=>{
	let red, green, blue;

	red = Math.floor(Math.random() * 200) + 56;
	
	green = Math.floor(Math.random() * 200) + 56;

	blue = Math.floor(Math.random() * 200) + 56;

	return 'rgb(' + red + ', ' + green  + ', ' + blue + ')'


}
//Get Random Size For Cars 50-149
const getRandomSize = () =>{
	return Math.floor((Math.random() * 100) + 50)
}


//Get Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//Add an evnt listener to DOC
document.addEventListener('keydown',(e)=>{
	const key = e.key;
	//Change Frogger Position when Keys are pressed
	if(key === 'ArrowRight'){

		frogger.x +=  frogger.speed;
	}
	else if(key === 'ArrowLeft'){

		frogger.x -= frogger.speed;
	}
	else if(key === 'ArrowUp' ){
		
		frogger.y -= frogger.speed;
	}
	else if(key === 'ArrowDown'){
		
		frogger.y += frogger.speed;
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
	//The Value to increment/Decrement X,Y when Moving Frog
	speed : 70,
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
		color:'#D2B4DE ',//Color Of Land
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
			color: ['#1491CB','rgb(0,0,0)','#C28F2E'],
			//Water Object
			water:{
				//Rows In The Water
				rows: 
				[ 
					{
						name:'row1',
						x:0,
						y:252,
						speed:1,
						'log count': 3,
						'croc count': 3,
						vehicles:[],
						crocs:[]
					},
					{	
						name:'row2',
						x:0,
						y:204,
						speed:-1,
						'log count': 2,
						'croc count': 4,
						vehicles:[],
						crocs:[]

					},
					{
					 	name:'row3',
						x:0,
						y:156,
						speed:2,
						'log count': 4,
						'croc count': 2, 
						vehicles:[],
						crocs:[]
					},
					{
					 	name:'row4Water',
						x:0,
						y:108,
						speed:-2,
						'log count': 4,
						'croc count': 2, 
						vehicles:[],
						crocs:[]
					}
				],
				//Draw Water
				drawWater(){ 
					
					ctx.beginPath();
					ctx.rect(scene.dangerZone.x , scene.dangerZone.y , scene.dangerZone.w, scene.dangerZone.h)
					ctx.fillStyle = scene.dangerZone.color[0];
					ctx.fill();
					ctx.closePath();
					// Reset the value of y for next time
					scene.dangerZone.y = canvas.height/7;
				},
				//Generate Logs And Push To Each Row
				logFactory(){	
					for(let i = 0; i < this.rows.length; i ++){
						for(let j = 0; j < this.rows[i]['log count']; j ++){
							const newLog = new Log(this.rows[i].x + (j * 200) , this.rows[i].y, 150, 40, scene.dangerZone.color[2], this.rows[i].speed, this.rows[i].name);
							this.rows[i].vehicles.push(newLog);
							this.rows[i].vehicles[j].drawVehicle();
							

						}
					}	
					
				},
				crocFactory(){
					for(let i = 0; i < this.rows.length; i ++){
						for(let j = 0; j < this.rows[i]['croc count']; j ++){
							const newCroc = new Croc(this.rows[i].x + (this.rows[i]['log count'] * 200) + (j * 200), this.rows[i].y, 150, 40, 'green', this.rows[i].speed, this.rows[i].name)
							this.rows[i].crocs.push(newCroc);
							this.rows[i].crocs[j].drawVehicle();
						}
					}
				}
			},	
			//Street Object
			street:{
				//Rows In the Street
				rows: 
				[ 
					{
						name:'row1',
						x:0,
						y:560,
						speed:5,
						'vehicle count': 2,
						space: 200,
						vehicles:[]
					},
					{	
						name:'row2',
						x:0,
						y:520,
						speed:-5,
						'vehicle count': 3,
						space: 300,
						vehicles:[]

					},
					{
					 	name:'row3',
						x:0,
						y:480,
						speed:8,
						'vehicle count': 3,
						space: 350,
						vehicles:[]
					 },
					{
						name: 'row4',
						x: 0,
						y: 440,
						speed: 3,
						'vehicle count':3,
						space:375,
						vehicles:[]

					},
					{
						name: 'row5',
						x: 0,
						y: 400,
						speed: -2,
						'vehicle count':2,
						space: 200,
						vehicles:[]

					}
				],
				//Draw Street
				drawStreet(){
					ctx.beginPath();
					ctx.rect(scene.dangerZone.x , scene.dangerZone.y + 300 , scene.dangerZone.w, scene.dangerZone.h)
					ctx.fillStyle = scene.dangerZone.color[1];
					ctx.fill();
					ctx.closePath();
					// reset the value of y for next time
					scene.dangerZone.y = canvas.height/7;
				},
				//Generate Vehicles And Push To Each Row
				vehicleFactory(){
					for(let i = 0; i < this.rows.length; i ++){
						for(let j = 0; j < this.rows[i]['vehicle count']; j ++){
							const newVehicle = new Vehicle(this.rows[i].x + (this.rows[i].space * j), this.rows[i].y, getRandomSize(), 40, randomColor() , this.rows[i].speed, this.rows[i].name);
							this.rows[i].vehicles.push(newVehicle);
							this.rows[i].vehicles[j].drawVehicle();
						}
					}	
						

				}
			}
			
	}	
}

//Make A Vehicle Class
class Vehicle {
		constructor(x,y,w,h,color,speed,row){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.color = color;
			this.speed = speed;
			this.row = row;
		}
		drawVehicle(){
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.w, this.h)
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		}
		move(){	


			if(this.x > (canvas.width + 150) && this.row !== 'row2'){
				this.x = -150;
			}
			else if(this.x < -150 && (this.row === 'row2' || this.row === 'row5' || this.row === 'row4Water' )){

				this.x = canvas.width +150 ; 
				
			}

			this.x += this.speed;
			
			
			this.drawVehicle();

				
		}
	
}

//Make A log Class
class Log extends Vehicle{
	constructor(x,y,w,h,color,speed,row){
		super(x, y, w, h, color, speed, row);
	}



}

//Make A Crocodile Class 
class Croc extends Vehicle{
	constructor(x,y,w,h,color,speed,row){
		super(x, y, w, h, color, speed, row);
	}
}






const animate = ()=>{
	//Draw Scene
	scene.drawScene();

	// Draw Each Croc
	for(let i = 0, r = scene.dangerZone.water.rows.length; i < r ; i ++){
		for(let j = 0, v = scene.dangerZone.water.rows[i].crocs.length ; j < v ; j ++){
			
			scene.dangerZone.water.rows[i].crocs[j].move();
		}
	}

	
	// Draw Each Log 
	for(let i = 0, r = scene.dangerZone.water.rows.length; i < r ; i ++){
		for(let j = 0, v = scene.dangerZone.water.rows[i].vehicles.length ; j < v ; j ++){
			scene.dangerZone.water.rows[i].vehicles[j].move();
		}
	}
	//Draw Frogger
	frogger.drawFrog();	

	//Draw Each Car
	for(let i = 0, r = scene.dangerZone.street.rows.length; i < r ; i ++){
		for(let j = 0, v = scene.dangerZone.street.rows[i].vehicles.length ; j < v ; j ++){
			scene.dangerZone.street.rows[i].vehicles[j].move();
		}
	}


	

	window.requestAnimationFrame(animate);
}

scene.drawScene();
frogger.drawFrog();

scene.dangerZone.street.vehicleFactory()
scene.dangerZone.water.logFactory()
scene.dangerZone.water.crocFactory()





