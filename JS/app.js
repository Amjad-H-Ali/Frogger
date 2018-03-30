//Get Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.beginPath();
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
	drawFrog(){
	
		ctx.moveTo(this.x - 15, this.y - 15)
		ctx.lineTo(this.x  , this.y)
		// ctx.strokeStyle = this.color;
		
		ctx.moveTo(this.x + 15, this.y + 15)
		ctx.lineTo(this.x , this.y)
		// ctx.strokeStyle = this.color;

		ctx.moveTo(this.x + 15, this.y - 15)
		ctx.lineTo(this.x , this.y)
		// ctx.strokeStyle = this.color;

		ctx.moveTo(this.x - 15, this.y + 15)
		ctx.bezierCurveTo(this.x , this.y,this.x ,this.x ,this.x ,this.x )
		ctx.strokeStyle = this.color;

		ctx.stroke();
		 
 		console.log(this);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		
		
		ctx.fill();
	}

	
}
