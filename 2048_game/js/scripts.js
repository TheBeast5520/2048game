var i, j, k;
var grid = [0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0];
var one_digit_size = 375;
var two_digit_size  = 300;
var three_digit_size = 275;
var four_digit_size = 200;
var colors = {
	"2":["#776e65", "#eee4da", one_digit_size],
	"4":["#776e65","#ede0c8", one_digit_size],
	"8":["#f9f6f2","#f2b179", one_digit_size],
	"16":["#f9f6f2","#f59563", two_digit_size],
	"32":["#f9f6f2","#f67c5f", two_digit_size],
	"64":["#f9f6f2","#f65e3b", two_digit_size],
	"128":["#f9f6f2","#edcf72", three_digit_size],
	"256":["#f9f6f2","#edcc61", three_digit_size],
	"512":["#f9f6f2","#edc850", three_digit_size],
	"1024":["#f9f6f2","#edc53f", four_digit_size],
	"2048":["#f9f6f2","#edc22e", four_digit_size],
	"other":["#f9f6f2","#3c3a32", four_digit_size]
}
var score=0;

var update_graphics = function() {
	for (i=0; i<16; i++) {
		if (grid[i] != 0) {
			/* Create tile */
			document.querySelector("#cell-"+i).innerHTML = "<div class=\"tile\"><span></span></div>";
			/* Set number */
			document.querySelector("#cell-"+i+" .tile span").textContent = grid[i];
			/* Set text-color & background color & fontsize */
			var vw =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			if (vw >= 992) {
				if ((""+grid[i]) in colors) {
					document.querySelector("#cell-"+i+" .tile span").style.color = colors[""+grid[i]][0];
					document.querySelector("#cell-"+i+" .tile span").style.fontSize = "calc("+colors[""+grid[i]][2]+"vw/100)";
					document.querySelector("#cell-"+i+" .tile").style.background = colors[""+grid[i]][1];
				} else {
					document.querySelector("#cell-"+i+" .tile span").style.color = colors["other"][0];
					document.querySelector("#cell-"+i+" .tile span").style.fontSize = "calc("+colors["other"][2]+"vw/100)";
					document.querySelector("#cell-"+i+" .tile").style.background = colors["other"][1];
				}
			} else {
				if ((""+grid[i]) in colors) {
					document.querySelector("#cell-"+i+" .tile span").style.color = colors[""+grid[i]][0];
					document.querySelector("#cell-"+i+" .tile span").style.fontSize = "calc("+colors[""+grid[i]][2]+"px/10000*1400)";
					document.querySelector("#cell-"+i+" .tile").style.background = colors[""+grid[i]][1];
				} else {
					document.querySelector("#cell-"+i+" .tile span").style.color = colors["other"][0];
					document.querySelector("#cell-"+i+" .tile span").style.fontSize = "calc("+colors["other"][2]+"px/10000*1400)";
					document.querySelector("#cell-"+i+" .tile").style.background = colors["other"][1];
				}
			}
		} else {
			document.querySelector("#cell-"+i).innerHTML = "";
		}
	}
	document.querySelector("#score").innerHTML = "Score: " + score;
}

update_graphics();

var left = function(event, complete) {
	if (complete==undefined) {
		complete=true;
	}
	var temp = Array.from(grid);
	for (i=0; i<4; i++) { // for each row
		var condense = [];
		var new_condense = [];
		for (j=0; j<4; j++) {
			if (grid[i*4+j]==0) continue; 
			condense[condense.length] = grid[i*4+j];
		}
		var counter = 1;
		while (true) {
			if (counter >= condense.length+1) break;
			if (counter == condense.length) {
				new_condense[new_condense.length] = condense[counter-1];
				counter++;
			} else {
				if (condense[counter]==condense[counter-1]) {
					new_condense[new_condense.length] = 2*condense[counter];
					score += 2*condense[counter];
					counter += 2;
				} else {
					new_condense[new_condense.length] = condense[counter-1]
					counter++;
				}
			}
		}
		for (j=0; j<new_condense.length; j++) grid[i*4 + j] = new_condense[j];
		for (j=new_condense.length; j<4; j++) grid[i*4 + j] = 0;
	}
	if (JSON.stringify(temp)!=JSON.stringify(grid) && complete) {
		add_tile();
		update_graphics();
	}
	return temp!=grid;
}
var right = function(event, complete) {
	if (complete==undefined) {
		complete=true;
	}
	var temp = Array.from(grid);
	for (i=0; i<4; i++) { // for each row
		var condense = [];
		var new_condense = [];
		for (j=3; j>=0; j--) {
			if (grid[i*4+j]==0) continue; 
			condense[condense.length] = grid[i*4+j];
		}
		var counter = 1;
		while (true) {
			if (counter >= condense.length+1) break;
			if (counter == condense.length) {
				new_condense[new_condense.length] = condense[counter-1];
				counter++;
			} else {
				if (condense[counter]==condense[counter-1]) {
					new_condense[new_condense.length] = 2*condense[counter];
					score += 2*condense[counter];
					counter += 2;
				} else {
					new_condense[new_condense.length] = condense[counter-1]
					counter++;
				}
			}
		}
		for (j=3; j>3-new_condense.length; j--) grid[i*4 + j] = new_condense[3-j];
		for (j=3-new_condense.length; j>=0; j--) grid[i*4 + j] = 0;
	}
	if (JSON.stringify(temp)!=JSON.stringify(grid) && complete) {
		add_tile();
		update_graphics();
	}
	return temp!=grid;
}
var up = function(event, complete) {
	if (complete==undefined) {
		complete=true;
	}
	var temp = Array.from(grid);
	for (i=0; i<4; i++) { // for each column
		var condense = [];
		var new_condense = [];
		for (j=0; j<4; j++) {
			if (grid[j*4+i]==0) continue; 
			condense[condense.length] = grid[j*4+i];
		}
		var counter = 1;
		while (true) {
			if (counter >= condense.length+1) break;
			if (counter == condense.length) {
				new_condense[new_condense.length] = condense[counter-1];
				counter++;
			} else {
				if (condense[counter]==condense[counter-1]) {
					new_condense[new_condense.length] = 2*condense[counter];
					score += 2*condense[counter];
					counter += 2;
				} else {
					new_condense[new_condense.length] = condense[counter-1]
					counter++;
				}
			}
		}
		for (j=0; j<new_condense.length; j++) grid[j*4+i] = new_condense[j];
		for (j=new_condense.length; j<4; j++) grid[j*4+i] = 0;
	}
	if (JSON.stringify(temp)!=JSON.stringify(grid) && complete) {
		add_tile();
		update_graphics();
	}
	return temp!=grid;
}
var down = function(event, complete) {
	if (complete==undefined) {
		complete=true;
	}
	var temp = Array.from(grid);
	for (i=0; i<4; i++) { // for each row
		var condense = [];
		var new_condense = [];
		for (j=3; j>=0; j--) {
			if (grid[j*4+i]==0) continue; 
			condense[condense.length] = grid[j*4+i];
		}
		var counter = 1;
		while (true) {
			if (counter >= condense.length+1) break;
			if (counter == condense.length) {
				new_condense[new_condense.length] = condense[counter-1];
				counter++;
			} else {
				if (condense[counter]==condense[counter-1]) {
					new_condense[new_condense.length] = 2*condense[counter];
					score += 2*condense[counter];
					counter += 2;
				} else {
					new_condense[new_condense.length] = condense[counter-1]
					counter++;
				}
			}
		}
		for (j=3; j>3-new_condense.length; j--) grid[j*4+i] = new_condense[3-j];
		for (j=3-new_condense.length; j>=0; j--) grid[j*4+i] = 0;
	}
	if (JSON.stringify(temp)!=JSON.stringify(grid) && complete) {
		add_tile();
		update_graphics();
	}
	return temp!=grid;
}
var add_tile = function() {
	var num_value = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4][Math.floor(Math.random()*10)];
	var open_spots = [];
	for (i=0; i<16; i++) {
		if (grid[i] == 0) {
			open_spots[open_spots.length] = i;
		}
	}
	grid[open_spots[Math.floor(Math.random()*open_spots.length)]] = num_value;
	return;
}

var start_game = function() {
	add_tile();
	update_graphics();
}

function swipedetect(el, callback){
  
    var touchsurface = el;
    var swipedir;
    var startX;
    var startY;
    var distX;
    var distY;
    var threshold = 100;
    var restraint = 75;
    var allowedTime = 300;
    var elapsedTime;
    var startTime;
    var handleswipe = callback || function(swipedir){};
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX 
        distY = touchobj.pageY - startY 
        elapsedTime = new Date().getTime() - startTime 
        console.log(distX, distY);
        if (elapsedTime <= allowedTime){ 
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
                swipedir = (distX < 0)? 'left' : 'right';
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ 
                swipedir = (distY < 0)? 'up' : 'down';
            } else {
            	swipedir = 'none';
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

var el = document.getElementById('grid-2048')
swipedetect(el, function(swipedir){
    if (swipedir =='left') left();
    else if (swipedir =='right') right();
    else if (swipedir =='up') up();
    else if (swipedir == 'down') down();
})

// document.querySelector("#left").addEventListener('click', left);
// document.querySelector("#right").addEventListener('click', right);
// document.querySelector("#up").addEventListener('click', up);
// document.querySelector("#down").addEventListener('click', down);

document.onkeydown = function(e) {
    switch(e.which) {
        case 37: // left
        	left();
        break;

        case 38: // up
        	up();
        break;

        case 39: // right
        	right();
        break;

        case 40: // down
        	down();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

var restart_game = function() {
	for (i=0; i<16; i++) {
		grid[i]=0;
	}
	score=0;
	add_tile();
}

add_tile();
update_graphics();

document.querySelector("#restart").addEventListener('click', function() {
	restart_game();
	update_graphics();
})