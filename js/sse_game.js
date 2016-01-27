/********
   Kids Animation JavaScript - Solar System Escape
   Author: Shyawn Karim
   Date: 5/17/2013
*/

$(document).ready(function(){

// Draw planets and spaceship
	$("canvas").drawImage({				/* Space */
	  	x: 3520,
	  	y: 240,
	  	source: "images/space2.gif",
	  	scale: 1,
	  	layer: true,
	  	draggable: false,
	  	name: "space",
	  	load: function(layer) {
    // Pan space background
    	$(this).animateLayer("space", {
      	x: -6700,
	  	y: 240,
    }, 150000);
  }
	  });

	$("canvas").drawImage({						/* asteroid */
	  	x: 3520,
	  	y: 240,
	  	source: "images/asteroid.png",
	  	scale: 1,
	  	layer: true,
	  	draggable: false,
	  	name: "mercury"}).animateLayer("mercury",  {
	  		x: -200,
	  		y: 240
	  	},15000);
	  	
	  

	  	$("canvas").drawImage({					/* Spaceship */
		x: 320,
		y: 240,
		source: "images/spaceship2.png",
		scale: 1,
		layer: true,
		draggable: true,
	})
});