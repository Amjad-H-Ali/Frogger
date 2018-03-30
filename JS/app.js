//Global Vars
let speed = 2;



//Get Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//Add an evnt listener to DOC
document.addEventListener('keydown',(e)=>{
	const key = e.key;
	//Change Frogger Direction When User clicks on Arrow Keys
	if(key === 'ArrowRight'){
		// frogger.direction = 'E';
		frogger.x += speed;
	}
	else if(key === 'ArrowLeft'){
		// frogger.direction = 'W';
		frogger.x -= speed;
	}
	else if(key === 'ArrowUp' ){
		// frogger.direction = 'N';
		frogger.y -= speed;
	}
	else if(key === 'ArrowDown'){
		// frogger.direction = 'S';
		frogger.y += speed;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	frogger.drawFrog()
})


//Make Frog Object
const frogger = {
	//How Many Lives our Hero will Have
	life: 5,
	//Direction Frog Moves
	direction: 'N',
	//Position hero in center of width of canvas
	x: canvas.width/2,
	y: canvas.height - 50,
	r: 10,
	//Color of Body
	color: 'rgb(102,153,0)',
	//Function to draw body
	drawFrog(){
		ctx.lineWidth = 3;

		ctx.beginPath();
		ctx.moveTo(this.x - 15, this.y - 15);
		ctx.lineTo(this.x + 15 , this.y + 15);
		ctx.strokeStyle = this.color;

		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.x - 15, this.y + 15);
		ctx.lineTo(this.x + 15 , this.y - 15);
		ctx.strokeStyle = this.color;
		ctx.stroke();

		ctx.beginPath();
 		console.log(this);
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	
}

frogger.drawFrog()



