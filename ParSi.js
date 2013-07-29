var pi = 3.14159265358979;
var particles = new Array();


function to_radians(degrees) {
	return degrees * (pi/180);
}

function to_degrees(radians) {
	return radians / (pi/180);
}

function absol(val) {
	if (val < 0) {
		val = 0 - val;
	}
	return val;
}

function Position(x, y) {
	this.x = x;
	this.y = y;
}

function Resolved() {
	this.x = 0;
	this.y = 0;
}

function resolve(f) {
	var retur = new Resolved;

	var po = f.angle;
	if (f.angle >= 0 && f.angle < 90) {
		retur.x = f.force * Math.sin(to_radians(po));
		retur.y = f.force * Math.cos(to_radians(po));
	} else if (f.angle >= 90 && f.angle < 180) {
		po = f.angle - 90;
		retur.x = f.force * Math.cos(to_radians(po));
		retur.y = -f.force * Math.sin(to_radians(po));
	} else if (f.angle >= 180 && f.angle < 270) {
		po = f.angle - 180;
		retur.x = -f.force * Math.sin(to_radians(po));
		retur.y = -f.force * Math.cos(to_radians(po));
	} else {
		po = f.angle - 270;
		retur.x = -f.force * Math.cos(to_radians(po));
		retur.y = f.force * Math.sin(to_radians(po));
	}
	
	return retur;
}

function Force(force, angle) {
	this.force = force;
	this.angle = angle;
	this.balance = function (f) {
		var ax = new Resolved();
		var bx = new Resolved();
		ax = resolve(this);
		bx = resolve(f);


		var newe = new Position;
		newe.x = ax.x + bx.x;
		newe.y = ax.y + bx.y;

		//printf("New %f %f\n", new.x, new.y);


		this.force = Math.sqrt((newe.x*newe.x)+(newe.y*newe.y)); // if the values are negative then them times themselves is positive. For it to be under 0, such as Math.sqrt(-1) it would need to be a complex number, hence no validation
		var tmpangle;
		//printf("New %f %f\n", absol(new.x), absol(new.y));
		if (newe.x >= 0 && newe.y >= 0) {
			tmpangle = to_degrees(Math.atan(absol(newe.x)/absol(e.y)));
			// We are in the top right
		} else if (newe.x >= 0 && newe.y <= 0) {
			tmpangle = to_degrees(Math.atan(absol(newe.y)/absol(newe.x))) + 90;
		} else if (newe.x <= 0 && newe.y <= 0) {
			tmpangle = to_degrees(Math.atan(absol(newe.x)/absol(newe.y))) + 180;
		} else if (newe.x <= 0 && newe.y >= 0) {
			tmpangle = to_degrees(Math.atan(absol(newe.y)/absol(newe.x))) + 270;
		}
		
		console.log(tmpangle);
		
		this.angle = tmpangle;

		return 1;
	};
	this.wait = function (time) {
		var xinc, yinc;
		var x = new Resolved();
		x = resolve(this.force);
		var xinc = ((x.x*time*time)/2);
		var yinc = ((x.y*time*time)/2);

		var xpo = 0;
		var ypo = 0;
		console.log(xinc + " - " + yinc + ",, " + this.pos.x + " - " + this.pos.y);
		console.log(this.force.angle + ",");
		xpo = f.pos.x + xinc;
		ypo = f.pos.y + yinc;
	
		var l = new Position(xpo, ypo);
		return l;
	};
}

function print_position(p){
	return "x "+p.x+" y "+p.y;
}

function print_force(f) {
	return "force "+f.force+" angle "+f.angle;
}

function print_particle(p) {
	return print_position(p.pos) + "<br>" + print_force(p.force);
}

function Particle(x, y, force, angle) {
	this.force = new Force(force, angle);
	this.pos = new Position(x,y);
	return "Particle created";
}

function wait(f, time) {
	// s = 1/2at^2
	var xinc, yinc;
	var x = new Resolved();
	x = resolve(f.force);
	var xinc = ((x.x*time*time)/2);
	var yinc = ((x.y*time*time)/2);

	var xpo = 0;
	var ypo = 0;
	console.log(xinc + " - " + yinc + ",, " + f.pos.x + " - " + f.pos.y);
	console.log(f.force.angle + ",");
	//if (f.force.angle >= 0 && f.force.angle <= 90) {
		xpo = f.pos.x + xinc;
		ypo = f.pos.y + yinc;
	/*} else if (f.force.angle >= 90 && f.force.angle <= 180) {
		xpo = f.pos.x + xinc;
		ypo = f.pos.y - yinc;
	} else if (f.force.angle >= 180 && f.force.angle <= 270) {
		xpo = f.pos.x - xinc;
		ypo = f.pos.y - yinc;
	} else {
		xpo = f.pos.x - xinc;
		ypo = f.pos.y + yinc;
	}*/
	var l = new Position(xpo, ypo);
	return l;
}

function TestCase(a, b) {
	this.a = a;
	this.b = b;
	
	this.time = 0;
	this.did_collide = false;
	this.run_simulation = function () {
		var xdist = absol(this.a.pos.x - this.b.pos.x);
		var ydist = absol(this.a.pos.y - this.b.pos.y);
		
		if (xdist > ydist) {
			var ar = new Resolved();
			var br = new Resolved();
			ar = resolve(this.a.force);
			br = resolve(this.b.force);
			var dt = (xdist / (absol(ar.x - br.x))) * absol(ar.x);
			console.log(dt);
			var l = 2*dt;
			var z = l / ar.x;
			console.log(z);
			var t = Math.sqrt(z);
			console.log(t);
			
			var ac = new Position();
			var bc = new Position();
			ac = wait(this.a, t);
			bc = wait(this.b, t);
			console.log(ac.x + "X, " + ac.y + "Y, AND B " + bc.x + "X, " + bc.y + "Y");
			ac.x = Math.round(ac.x * 1000)/1000;
			ac.y = Math.round(ac.y * 1000)/1000;
			bc.x = Math.round(bc.x * 1000)/1000;
			bc.y = Math.round(bc.y * 1000)/1000;
			console.log(ac.x + "X, " + ac.y + "Y, AND B " + bc.x + "X, " + bc.y + "Y");
			if ((ac.x == bc.x) && (ac.y == bc.y)) {
				this.time = t;
				this.did_collide = true;
			}
		} else {
			var ar = new Resolved();
			var br = new Resolved();
			ar = resolve(this.a.force);
			br = resolve(this.b.force);
			var dt = (ydist / (absol(ar.y - br.y))) * absol(br.y);
			var l = 2*dt;
			var z = l / br.y;
			var t = Math.sqrt(z);
			
			var ac = new Position();
			var bc = new Position();
			ac = wait(this.a, t);
			bc = wait(this.b, t);
			
			ac.x = Math.round(ac.x*1000)/1000;
			ac.y = Math.round(ac.y*1000)/1000;
			bc.x = Math.round(bc.x*1000)/1000;
			bc.y = Math.round(bc.y*1000)/1000;

			if ((ac.x == bc.x) && (ac.y == bc.y)) {
				this.time = t;
				this.did_collide = true;
			}
		}
		return 1;
	}
}

function print(p) {
	return p;
}

/*

var Particles = new Array();
Particles.push(new Position(2,3));

alert(Particles[0].x)

var q = new Force(14,110);
var p = new Force(8, 210);

console.log(q.force + " - " + q.angle);
console.log(p.force + " - " + p.angle);

q.balance(p);

console.log(q.force + " - " + q.angle);

var p = new Particle(0,0,1,45);
var l = wait(p, 2);
console.log(l.x+" - "+l.y);

var a = new Particle(0, 0, 4, 45);
var b = new Particle(25,0, 4, 315);
var qlo = new TestCase(a, b);

qlo.run_simulation();
console.log(qlo.did_collide + " - " + qlo.time);

*/