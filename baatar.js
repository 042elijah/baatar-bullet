Baatar.prototype = new Entity();

function Baatar(game) {
	this.game = game;
	this.animation = new Animation(ASSET_MANAGER.getAsset("./img/baatar_temp.png"), 0, 0, 32, 64, 1, 1, true, false);
	this.x = 50;
	this.y = 50;
	
	//suite of variables for horizontal movement		(ALL_CAPS = psuedo constant)
	this.hspeed = 0;
	this.MAX_HSPEED = 13;
	this.HACCEL = 2;
	this.HDECCEL = this.HACCEL;
	
	//suite of variables for the vertical movement		(ALL_CAPS = psuedo constant)
	this.vspeed = 0;
	this.MAX_VSPEED = 13;
	this.VACCEL = 2;
	this.VDECCEL = this.VACCEL;
}

Baatar.prototype.update = function() {
	this.horizontal = (this.game.d || this.game.a);
	this.vertical = (this.game.w || this.game.s);
	
	if(this.horizontal) {
		//sanitizing input (why is no press = undefined?  not false?)
		this.d = isNaN(this.game.d) ? false : this.game.d;
		this.a = isNaN(this.game.a) ? false : this.game.a;
		//add or subtract from hspeed depending on right/left
		this.hspeed += ((+this.d * this.HACCEL) - (+this.a * this.HACCEL));
	} else if(Math.abs(this.hspeed) < this.HDECCEL) {
		//if hspeed is < HDECCEL, we dont want to subtract from it,
		//cause that would mean slight backwards acceleration from decceleration, which is jank.
		this.hspeed = 0;
	} else if(this.hspeed != 0) {
		//subtracts decceleration from hspeed if hspeed positive, else adds it.
		this.hspeed -= (+this.d * this.HDECCEL) - (+this.a * this.HDECCEL);
	}
	//handling top speed
	if(Math.abs(this.hspeed) > this.MAX_HSPEED) 
		this.hspeed = this.MAX_HSPEED * Math.sign(this.hspeed);
	this.x += this.hspeed;
	
	if(this.vertical) {
		//sanitizing input (why is no press = undefined?  not false?)
		this.s = isNaN(this.game.s) ? false : this.game.s;
		this.w = isNaN(this.game.w) ? false : this.game.w;
		//add or subtract from hspeed depending on right/left
		this.vspeed += ((+this.s * this.VACCEL) - (+this.w * this.VACCEL));
	} else if(Math.abs(this.vspeed) < this.VDECCEL) {
		//if hspeed is < HDECCEL, we dont want to subtract from it,
		//cause that would mean slight backwards acceleration from decceleration, which is jank.
		this.vspeed = 0;
	} else if(this.vspeed != 0) {
		//subtracts decceleration from hspeed if hspeed positive, else adds it.
		this.vspeed -= (+this.s * this.VDECCEL) - (+this.w * this.VDECCEL);
	}
	//handling top speed
	if(Math.abs(this.vspeed) > this.MAX_VSPEED) 
		this.vspeed = this.MAX_VSPEED * Math.sign(this.vspeed);
	this.y += this.vspeed;
}

Baatar.prototype.draw = function(ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
}