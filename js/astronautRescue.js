// Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

// Background Space image
var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
	backgroundReady = true;
};
backgroundImage.src = "images/space2.gif";

// Spaceship image
var spaceshipReady = false;
var spaceshipImage = new Image();
spaceshipImage.onload = function () {
	spaceshipReady = true;
};
spaceshipImage.src = "images/spaceship.png";

// Astronaut image
var astronautReady = false;
var astronautImage = new Image();
astronautImage.onload = function () {
	astronautReady = true;
};
astronautImage.src = "images/astronaut.png";

// Game objects
var spaceship = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};

var astronaut = {
	x: 0,
	y: 0
};

var astronautsRescued = 0;

// Keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player rescues an astronaut
var reset = function () {
	spaceship.x = canvas.width / 2.4;
	spaceship.y = canvas.height / 2.2;

	// Throw the astronaut somewhere on screen randomly
	astronaut.x = 32 + (Math.random() * (canvas.width - 64));
	astronaut.y = 32 + (Math.random() * (canvas.height - 64));
};

// Controlling the spaceship
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		spaceship.y -= spaceship.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		spaceship.y += spaceship.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		spaceship.x -= spaceship.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		spaceship.x += spaceship.speed * modifier;
	}

	// Collision Detection
	if (
		spaceship.x <= (astronaut.x + -12)
		&& astronaut.x <= (spaceship.x + 75)
		&& spaceship.y <= (astronaut.y + 25)
		&& astronaut.y <= (spaceship.y + 25)
	) {
		++astronautsRescued;
		reset();
	}
};

// Draw everything
var render = function () {
	if (backgroundReady) {
		ctx.drawImage(backgroundImage, -430, 0);
	}

	if (spaceshipReady) {
		ctx.drawImage(spaceshipImage, spaceship.x, spaceship.y);
	}

	if (astronautReady) {
		ctx.drawImage(astronautImage, astronaut.x, astronaut.y);
	}
      
	// Scoreboard
	ctx.fillStyle = "orange";
	ctx.font = "24px Jura";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Astronauts Rescued: " + astronautsRescued, 195, 10);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's rescue some astronauts!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible