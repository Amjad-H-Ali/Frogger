//Global Vars
//The Value to increment/Decrement X,Y when Moving Frog
let speed = 8;



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
	//Erase And Draw New Position of Frog

	ctx.clearRect(0, 0, canvas.width, canvas.height); console.log("clear anvas");
	scene.land.drawLand();
	scene.dangerZone.water.drawWater();
	scene.dangerZone.street.drawStreet();
	frogger.drawFrog()
})


//Make Frog Object
const frogger = {
	//How Many Lives our Hero will Have
	life: 5,
	//Position hero in center of width of canvas
	x: canvas.width/2,
	y: canvas.height - 50,
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
	
	land:{
			x: 0,
			y: 0,
			w: canvas.width,
			h: canvas.height/7,
			color:'#B2F699',
			drawLand(){ 
						for(let i = 0; i < 3; i ++){
						ctx.beginPath();
						ctx.rect(this.x , i * 300, this.w, this.h)
						ctx.fillStyle = this.color;
						ctx.fill();
						ctx.closePath();
						
						}

			},

	},
	
	dangerZone:{
				x: 0,
				y: canvas.height/7,
				w: canvas.width,
				h: canvas.height/3.5, 
				color: ['#1491CB','rgb(0,0,0)'],		
				water:{
					drawWater(){ 
					
						ctx.beginPath();
						ctx.rect(scene.dangerZone.x , scene.dangerZone.y , scene.dangerZone.w, scene.dangerZone.h)
						ctx.fillStyle = scene.dangerZone.color[0];
						ctx.fill();
						ctx.closePath();
						// reset the value of y for next time
						scene.dangerZone.y = canvas.height/7;
					}
					
					
				},
				street:{
					drawStreet(){
						ctx.beginPath();
						ctx.rect(scene.dangerZone.x , scene.dangerZone.y + 300 , scene.dangerZone.w, scene.dangerZone.h)
						ctx.fillStyle = scene.dangerZone.color[1];
						ctx.fill();
						ctx.closePath();
						// reset the value of y for next time
						scene.dangerZone.y = canvas.height/7;
					}
				}
			
	}	
}

scene.land.drawLand();
scene.dangerZone.water.drawWater();
scene.dangerZone.street.drawStreet();
frogger.drawFrog();



