//Get Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Make Frog Object
const frogger = {
	//How Many Lives our Hero will Have
	life: 5,
	body:{
		//Position hero in center of width of canvas
		x: canvas.width/2,
		y: canvas.height - 50,
		r: 10,
		//Color of Body
		color: 'rgb(102,153,0)',
		//How Many arms
		legs:2,
		//How many legs
		arms:2,
		drawBody(){
			console.log(this);
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
				ctx.fillStyle = this.color;
				ctx.fill();
		},
		//Function to draw body
		drawFrog(){
			this.drawBody()
		},

	}
}
