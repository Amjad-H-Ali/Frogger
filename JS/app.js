//Global Variables

//H3 Tag to input score and Lives
let lives = document.getElementById('lives');
let score = document.getElementById('score');

//Controls Animation function
let control = true;

//Get Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//Image Object for Sprites
const sprites = new Image();
sprites.src = 'images/spritemap.png';
const sprites2 = new Image();
sprites2.src = 'images/croc.png';
const sprites3 = new Image();
sprites3.src = 'images/bug.png';


//General Game Object
const theFroggerGame = {

	round: 1,

	//Where the bugs will be stored
	bugArray:[],

	//Get random position for life bug
	randomPosition(coor){

		return coor === 'x' ?  Math.floor(Math.random() * 700) + 100 : (Math.floor(Math.random() * 10) + 3) * 45;
 		//100 - 800//100 - 550

	},
	//Generate life bug
	generateBug(){
		const newBug = new Bug (this.randomPosition('x'), this.randomPosition('y'), 25, 0, undefined, 'bug');
		this.bugArray.push(newBug);
	},
	//Remove Bug
	removeBug(){

		this.bugArray = [];
	},

	//Function to Attach frog on log
	attachLog(logSpeed){
		frogger.x += logSpeed;
		
	},
	gameOver(){
		frogger.score = 0;
		frogger.life = 5;
	},
	changeRound(){
		this.round += 1;

		for(let i = 0, r = scene.dangerZone.street.rows.length; i < r ; i ++){
			for(let j = 0, v = scene.dangerZone.street.rows[i].vehicles.length ; j < v ; j ++){
				if(scene.dangerZone.street.rows[i].name !== 'row2' && scene.dangerZone.street.rows[i].name !== 'row5'){ 
					scene.dangerZone.street.rows[i].vehicles[j].speed +=1
				}
				else{scene.dangerZone.street.rows[i].vehicles[j].speed -=1}
			}					
		}	
	}
	
}	

const pause = document.getElementById('pause');

pause.addEventListener('click',(e)=>{
	control === false ? (control = true, animate()) : control = false; 
})



//Add an evnt listener to DOC
document.addEventListener('keydown',(e)=>{
	const key = e.key;

	if(frogger.alive) {
		switch(key){
			
			case 'ArrowRight':
				frogger.sx = 240;
				frogger.x +=  frogger.speed;
				setTimeout(()=>{
					frogger.sx = 160;
				}, 175);
				break;

			case 'ArrowLeft':
				frogger.sx = 560;
				frogger.x -= frogger.speed;
				setTimeout(()=>{
					frogger.sx = 480;
				}, 175);
				break;
			
			case 'ArrowUp':
				frogger.sx = 80;	
				frogger.y -= frogger.speed;
				if(frogger.y < 80){
					frogger.increaseScore();
				};
				setTimeout(()=>{
					frogger.sx = 0;
				}, 175);
				break;
			
			case 'ArrowDown':
				frogger.sx = 400;	
				frogger.y += frogger.speed;
				setTimeout(()=>{
					frogger.sx = 320;
				}, 175);
				break;	
		};
	};

})


//Make Frog Object
const frogger = {
	// Score 
	score: 0,
	//How Many Lives our Hero will Have
	life: 5,
	//The Value to increment/Decrement X,Y when Moving Frog
	speed : 43,
	//The x position of the frogger sprite in the sheet
	sx:0,
	//Dead or alive
	alive: true,
	//Position hero in center of width of canvas
	x: canvas.width/2,
	y: canvas.height - 75,
	r: 10,
	//Color of Body
	color: 'rgb(102,153,0)',
	//Function to draw body
	drawFrog(){ 	
		
		// //Arms & Legs Width
		// ctx.lineWidth = 3;
		// //Draw Left Arm and Right Leg
		// ctx.beginPath();
		// ctx.moveTo(this.x - 15, this.y - 15);
		// ctx.lineTo(this.x + 15 , this.y + 15);
		// ctx.strokeStyle = this.color;

		// ctx.stroke();
		// //Draw Right Arm and Left Leg
		// ctx.beginPath();
		// ctx.moveTo(this.x - 15, this.y + 15);
		// ctx.lineTo(this.x + 15 , this.y - 15);
		// ctx.strokeStyle = this.color;
		// ctx.stroke();
		// // Draw Body Part
		// ctx.beginPath();
 	// 	console.log(this);
		// ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		// ctx.fillStyle = this.color;
		// ctx.fill();

		// ctx.closePath();

		// Added Sprite Image of Frog
		
		ctx.drawImage(sprites, this.sx, 0, 80, 80, this.x - 20, this.y - 20, 45, 45);
		
		// setTimeout( () => { 

		// 	switch(this.direction){
				
		// 		case 'N':
		// 			sx = 0;
		// 			break;

		// 		case 'S':
		// 			sx = 320;
		// 			break;

		// 		case 'E':
		// 			sx = 160;
		// 			break;

		// 		case 'W':
		// 			sx = 480;
		// 			break;
		// 	};
		// 	console.log('timeout')

		// }, 3000);
	
	
	},
	decrementLives(){
		this.life -= 1;
		if(this.life === 0){
			theFroggerGame.gameOver();
		}
	},
	increaseScore(){
		this.score += 100;
		control = false;
		theFroggerGame.changeRound();
		setTimeout(()=>{
			this.x = canvas.width/2;
			this.y = canvas.height - 75;
			theFroggerGame.generateBug();
			control = true;
			animate();
		},700);
			
	},
	decrementScore(){
		if(this.score > 0){
			this.score -= 100;
		}

	},
	die(){
		this.alive = false;
		this.decrementLives();
		this.decrementScore();
		;
		
		this.sx = 640;
		
		setTimeout(()=>{
			this.sx = 720;
			console.log('time2');
		},700)
		setTimeout(()=>{
			this.sx = 800;
			console.log('time3');
		},1400)
		setTimeout(()=>{
			this.sx = 0;
			this.x = canvas.width/2;
			this.y = canvas.height -75;
			this.alive = true;
			theFroggerGame.generateBug()
		},2400)

	}


	
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
		color: '#A569BD',//Color Of Land
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
			color: ['#3498DB','#566573','#C28F2E'],
			//Water Object
			water:{
				//Rows In The Water
				rows: 
				[ 
					{
						name:'row1',
						x:0,
						y:260,
						speed:2.5,
						'log count': 3,
						'croc count': 2,
						space: 300,
						vehicles:[],
						logImg:'log1',
						crocImg: 'croc1',
						crocs:[]
					},
					{	
						name:'row2',
						x:0,
						y:220,
						speed:-3,
						'log count': 2,
						'croc count': 3,
						space:275,
						vehicles:[],
						logImg:'log1',
						crocImg:'croc2',
						crocs:[]

					},
					{
					 	name:'row3',
						x:0,
						y:180,
						speed:3,
						'log count': 2,
						'croc count': 1,
						space:375, 
						vehicles:[],
						logImg:'log1',
						crocImg:'croc1',
						crocs:[]
					},
					{
					 	name:'row4Water',
						x:0,
						y:140,
						speed:-2,
						'log count': 1,
						'croc count': 2,
						space:250, 
						vehicles:[],
						logImg:'log1',
						crocImg:'croc2',
						crocs:[]
					},
					{
					 	name:'row5',
						x:0,
						y:100,
						speed:3,
						'log count': 2,
						'croc count': 2,
						space:270, 
						vehicles:[],
						logImg:'log1',
						crocImg:'croc1',
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
					for(let i = 0, len = this.rows.length; i < len; i ++){
						for(let j = 0, lc = this.rows[i]['log count'] ; j < lc; j ++){
							const newLog = new Log(this.rows[i].x + (j * this.rows[i].space) , this.rows[i].y, 40, this.rows[i].speed, this.rows[i].name, this.rows[i].logImg);
							this.rows[i].vehicles.push(newLog);
							this.rows[i].vehicles[j].drawVehicle();
							

						}
					}	
					
				},
				crocFactory(){
					for(let i = 0, len = this.rows.length; i < len ; i ++){
						for(let j = 0, cc = this.rows[i]['croc count']; j < cc; j ++){
							const newCroc = new Croc(this.rows[i].x + (this.rows[i]['log count'] * this.rows[i].space) + (j * 180), this.rows[i].y, 40, this.rows[i].speed, this.rows[i].name, this.rows[i].crocImg)
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
						speed:3,
						'vehicle count': 3,
						space: 200,
						vehicleImg:['car2', 'car3'],
						vehicles:[]
					},
					{	
						name:'row2',
						x:0,
						y:520,
						speed:-4,
						'vehicle count': 3,
						space: 300,
						vehicleImg:['car1', 'car4', 'car5'],
						vehicles:[]

					},
					{
					 	name:'row3',
						x:0,
						y:480,
						speed:3,
						'vehicle count': 3,
						space: 350,
						vehicleImg:['car2', 'car3'],
						vehicles:[]
					 },
					{
						name: 'row4',
						x: 0,
						y: 440,
						speed: 2,
						'vehicle count':5,
						space:375,
						vehicleImg:['car2', 'car3'],
						vehicles:[]

					},
					{
						name: 'row5',
						x: 0,
						y: 400,
						speed: -2,
						'vehicle count':2,
						space: 200,
						vehicleImg:['car1', 'car4', 'car5'],
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
					for(let i = 0, len = this.rows.length; i < len ; i ++){
						for(let j = 0, vc = this.rows[i]['vehicle count']; j < vc; j++){
							//(x,y,l,h,color,speed, row name)
							const newVehicle = new Vehicle(this.rows[i].x + (this.rows[i].space * j), this.rows[i].y, 40, this.rows[i].speed, this.rows[i].name, this.rows[i].vehicleImg[Math.floor( Math.random() * this.rows[i].vehicleImg.length)]);
							this.rows[i].vehicles.push(newVehicle);
							this.rows[i].vehicles[j].drawVehicle();
						};
					};	
						

				}
			}
			
	}	
}

//Make A Vehicle Class
class Vehicle {
		constructor(x, y, h, speed, row, img){
			this.x = x;
			this.y = y;
			this.w = 40;
			this.h = h;
			this.speed = speed;
			this.row = row;
			this.img = img;

		}
		drawVehicle(){
			// ctx.beginPath();
			// ctx.rect(this.x, this.y, this.w, this.h)
			// ctx.fillStyle = this.color;
			// ctx.fill();
			// ctx.closePath();

			switch(this.img){
				case 'car1':

					ctx.drawImage(sprites, 0, 80, 80, 80, this.x, this.y, this.w, this.h);
					break;

				case 'car2':
					ctx.drawImage(sprites, 80, 80, 80, 80, this.x, this.y, this.w, this.h);
					break;

				case 'car3':
					ctx.drawImage(sprites, 160, 80, 80, 80, this.x, this.y, this.w, this.h);
					break;

				case 'car4':
					ctx.drawImage(sprites, 240, 80, 80, 80, this.x, this.y, this.w, this.h);
					break;

				case 'car5':
					this.w = 130;
					ctx.drawImage(sprites, 320, 80, 130, 80, this.x, this.y, this.w, this.h);
					break;
				case 'log1':
					ctx.drawImage(sprites, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
					break;
				case 'croc1':
					ctx.drawImage(sprites2, this.sx, 176, 127, 48, this.x, this.y, this.w, this.h);
					break;
				case 'croc2':
					ctx.drawImage(sprites2, this.sx, 104, 127, 48, this.x, this.y, this.w, this.h);
					break;
				case 'bug':
					ctx.drawImage(sprites3, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
					break;
								


				// case 'log2':
				// 	this.w = 392;
				// 	ctx.drawImage(sprites, 248, 160, 392, 80, this.x, this.y, this.w, this.h);
				// 	break;
				// case 'log3':
				// 	this.w = 256;
				// 	ctx.drawImage(sprites, 0, 240, 256, 80, this.x, this.y, this.w, this.h);
				// 	break;									

			}	


		}
		move(){	
			//Conditionals to bring back vehicles on canvas

			if(this.x > (canvas.width + 150) && this.row !== 'row2'){
				this.x = -150;
			}
			//If vehicle is moving in Reverse
			else if(this.x < -150 && (this.row === 'row2' || this.row === 'row5' || this.row === 'row4Water' )){

				this.x = canvas.width + 150 ; 
				
			}
			
			this.x += this.speed;
			
			this.drawVehicle();

				
		}
		//Detect Collision To Frog
		detectCollision(){
			let left = this.x;
			let right = this.x + this.w;
			let top = this.y;
			let bottom = this.y + this.h;
			let frogLeft = frogger.x;
			let frogRight = frogger.x + frogger.r;
			let frogTop = frogger.y;
			let frogBottom = frogger.y + frogger.r;
			//If any one of these are true , returns true, meaning not colliding.
			return !(left >= frogRight || right <= frogLeft || top >= frogBottom || bottom <= frogTop)

		}
	
}

//Make A log Class
class Log extends Vehicle{
	constructor(x, y, h, speed, row, img){
		super(x, y, h, speed, row, img);
		this.w = 180;
		this.sx = 8;
		this.sy = 160;
		this.sw = 180;
		this.sh = 80;
	}



}

//Make A Crocodile Class 
class Croc extends Vehicle{
	constructor(x, y, h, speed, row, img){
		super(x, y, h, speed, row, img);
		this.sx = 127;
		this.w = 127;
	
	}

}

//Make Life bug Class
class Bug extends Vehicle{
	constructor(x, y, h, speed, row, img){
		super(x, y, h, speed, row, img);

		this.w = 45;
		this.sx = 0;
		this.sy = 0;
		this.sw = 600;
		this.sh = 400;
	}
}









const animate = ()=>{
	//Draw Scene
	scene.drawScene();


	//Let's assume frog is not on log
	let frogOnLog = false;



	// Draw Each Log 
	for(let i = 0, r = scene.dangerZone.water.rows.length; i < r ; i ++){
	
		for(let j = 0, v = scene.dangerZone.water.rows[i].vehicles.length ; j < v ; j ++){
			//Move Each Log
			scene.dangerZone.water.rows[i].vehicles[j].move();
			
			//Detect Collision For Each Log
			if(scene.dangerZone.water.rows[i].vehicles[j].detectCollision() === true && frogger.alive === true){
				//Frog is on log, set to true.
				frogOnLog = true;
				//Attach the frog to the log
				theFroggerGame.attachLog(scene.dangerZone.water.rows[i].vehicles[j].speed);
			};
		};

		for(let j = 0, v = scene.dangerZone.water.rows[i].crocs.length ; j < v ; j ++){
			//Move each croc
			scene.dangerZone.water.rows[i].crocs[j].move();
		};	

	};


	// If frog is in water area, we only need to check if on log to determine safety. Anything other than logs resets game.
	if (frogger.y > 100 && frogger.y < 300){
		if(frogOnLog === false && frogger.alive === true){
			frogger.die();
		}
	}
	




		
	//Draw Frogger
	frogger.drawFrog();



	//Draw Each Car
	for(let i = 0, r = scene.dangerZone.street.rows.length; i < r ; i ++){
		for(let j = 0, v = scene.dangerZone.street.rows[i].vehicles.length ; j < v ; j ++){
			//Move Each Car
			scene.dangerZone.street.rows[i].vehicles[j].move();
			//Detect Collision For each Car
			if(scene.dangerZone.street.rows[i].vehicles[j].detectCollision() === true && frogger.alive === true){
				frogger.die();
			};
		};
	};

 
	
	//Draw Bug
	if(theFroggerGame.bugArray[0]){
		theFroggerGame.bugArray[0].drawVehicle();
		if(theFroggerGame.bugArray[0].detectCollision()){
			theFroggerGame.removeBug();
			frogger.life += 1;
		}
	}


	
	lives.innerText = 'Lives: ' + frogger.life ;
	score.innerText = 'Score: ' + frogger.score;




	
	if(control === true){

		window.requestAnimationFrame(animate);
	}
		
};


//Add Objects into their Associated Arrays
lives.innerText = 'Lives: ' + frogger.life ;
score.innerText = 'Score: ' + frogger.score;

scene.drawScene();
frogger.drawFrog();
scene.dangerZone.street.vehicleFactory()
scene.dangerZone.water.logFactory()
scene.dangerZone.water.crocFactory()
theFroggerGame.generateBug()


// animate();





