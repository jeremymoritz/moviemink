Score = function() {
	this.bonus = 0;
	this.bonusYahtzee = 0;

	this.checkDice = function (currentDice) {
	    var first = [],
	    	second = [],
	    	third = [],
	    	fourth = [],
	    	check = 0;
	    	
	    for (var i = 0; i < 5; i++){
	        if (first.indexOf(currentDice[i].value) == -1) {
	            first.push(currentDice[i].value);
	        } else {
	            check += 1;
	            if (second.indexOf(currentDice[i].value) == -1) {
	                second.push(currentDice[i].value);
	            } else {
	                check += 2;
	                if (third.indexOf(currentDice[i].value) == -1) {
	                    third.push(currentDice[i].value);
	                } else {
	                    check += 3;
	                    if (fourth.indexOf(currentDice[i].value) == -1) {
	                        fourth.push(currentDice[i].value);
	                    }
	                }
	            }
	        }
	    }
	    return check;
	}

	this.bonusPoint = function(checkBonus) {
	    if (checkBonus >= 63) {
	        this.bonus = 35;
	        $("#bonus").html(35);
	    }
	}
}
	
Die = function () {
	this.createValue = function() {
		this.value = Math.floor(Math.random() * 6) + 1;
	}
	this.createValue();
	this.hold = false;
}

Player = function() {
	this.mark = true;
	this.roll = 2;
	this.checkBonus = 0;
	this.lower = 0;
	this.total = 0;
	this.turns = 0;
	this.score = new Score();	
	this.currentDice = [];
	this.name = arguments[0] ? arguments[0] : "John Doe";
	$("#playerName").html(this.name);
	
	this.makeNewDice = function() {
		if(this.mark) {
			if (!this.currentDice.length){
				for (var i = 0; i < 5; i++) {
					var tempDie = new Die();
					this.currentDice.push(tempDie);
					$("#d" + i).html("<img src='_img/d" + tempDie.value + ".png'>");
				}
				this.mark = false;
			} else {
				// RESET Dice //
				this.currentDice = [];
				this.roll = 2;
				$("#roll").html("");
				this.makeNewDice();
			}
		}
	}

	this.rollDice = function() {
		if (!this.currentDice[0] || this.mark) {  // if there hasn't been a roll yet, make new dice
			this.makeNewDice();
			this.roll++;
		} 
		if (this.roll > 0){
			var allHeld = true;
			for (var i = 0; i < 5; i++){
					// keep the held dice //
				if (this.currentDice[i].hold != 1){
					this.currentDice[i] = new Die();
					$("#d" + i).html("<img src='_img/d" + this.currentDice[i].value + ".png'>");
					allHeld = false; 
				}
			}
			allHeld ? this.roll = this.roll : this.roll--; // if all are held, don't reduce roll
			$("#roll").html("You have " + this.roll + " roll left!");
		}
	}
	
	this.holdThis = function(die) {
		if (this.currentDice[die].hold != true){
			$("#d" + die).html("<img src='_img/d" + this.currentDice[die].value + "_hold.png'>");
			this.currentDice[die].hold = true;
		} else {
			$("#d" + die).html("<img src='_img/d" + this.currentDice[die].value + ".png'>");
			this.currentDice[die].hold = false;
		}
	} 
}

var allPlayers = [];

player = new Player("demo");

function newPlayer() {
	var proceed = typeof player !== 'undefined' ? player.mark : true;
	if(proceed) {
		var name = prompt("What is the player name?", "John");
		var tempPlayer = new Player(name);
		allPlayers.push(tempPlayer);
		player = tempPlayer;
		ytzTotalScore();
		showScore();
	} else {
		return false;
	}
}

function switchPlayer() {
	var proceed = typeof player !== 'undefined' ? player.mark : false;
	if(proceed) {
		var message = "Choose the numebr of one of these players:";
		var i = 1;
		allPlayers.forEach(function(player) {
			message += ("\n" + (i++) + ". " + player.name);
		});
		var switchPlay = parseInt(prompt(message, ""));
		if(switchPlay <= 0) return false;
		player = allPlayers[switchPlay - 1];
		$("#playerName").html(player.name);
		ytzTotalScore();
	} else {
		return false;
	}
}

function showScore() {
	allPlayers.sort(function(a, b) {
		return b.total - a.total;
	})
	$("#scoreTable").html("");
	scoreTable = document.getElementById("scoreTable");
	var i = 1;
	allPlayers.forEach(function(player) {
		var tempTr = document.createElement("tr"),
			tempTd1 = document.createElement("td"),
			tempTd2 = document.createElement("td"),
			tempTd3 = document.createElement("td");
			
		tempTd1.innerHTML = (i++) + ". " + player.name;
		tempTd2.innerHTML = player.turns;
		tempTd3.innerHTML = player.total;
		tempTr.appendChild(tempTd1);
		tempTr.appendChild(tempTd2);
		tempTr.appendChild(tempTd3);
		scoreTable.appendChild(tempTr);
	});
}

function ytzTotalScore() {
    var sum = 0
    player.turns = -2;
    $(".display").html(".");
    for (var key in player.score) {
    	if( isNaN(player.score[key]) ) continue;
		$("#" + key).html(player.score[key]);
		player.turns++;   	
        sum += player.score[key];
    }
    player.total = sum;
    $("#totalScore").html(player.total);
	$("#lowerScore").html(player.lower);
	$("#upperScore").html(player.checkBonus + player.score.bonus);
	player.mark = true;
	showScore();
}

function scoreLower(name, amount) {
    $("#" + name).html(amount);
    player.score[name] = amount;
    player.lower += amount;
	ytzTotalScore();
}

function ytzChance() {
	if(!player.mark && !player.score.chance) {
	    var total = 0 
	    for (var i = 0; i < player.currentDice.length; i++){
		     total += player.currentDice[i].value;
	    }
	    scoreLower("chance", total);
	}
}

function ytzFullHouse() {
	if(!player.mark && !player.score.fullHouse) {
	    player.score.checkDice(player.currentDice) == 5 ? scoreLower("fullHouse", 25) : scoreLower("fullHouse", 0);
	}
}

function ytzLargeStraight() {
	if(!player.mark && !player.score.largeStraight) {
	    if (player.score.checkDice(player.currentDice) > 0) {
	        scoreLower("largeStraight", 0);
	    } else {
           var sum = 0
           for (var key in player.currentDice) {
				sum = sum + player.currentDice[key].value;
           }
           (sum == 15 || sum == 20) ? scoreLower("largeStraight", 40) : scoreLower("largeStraight", 0);
	    }
	}
}

function ytzSmallStraight() {
	if(!player.mark && !player.score.smallStraight) {
	    player.score.checkDice(player.currentDice) > 1 ? scoreLower("smallStraight", 0) : scoreLower("smallStraight", 30);
	}
}

function ytzYahtzee() {
	if(!player.mark && !player.score.yahtzee) {
		if (player.score.checkDice(player.currentDice) == 16) {
    	    scoreLower("yahtzee", 50);
    	    var newTd = document.createElement("td"),
    	    	newYahtzee = document.createElement("td"),
    	    	newButton = document.createElement("button");
    	    	
    	    newYahtzee.setAttribute('id', 'bonusYahtzee');
			newButton.setAttribute('onclick', 'ytzBonusYahtzee();');
			newButton.innerHTML = "Bonus Yahtzee";
			newTd.appendChild(newButton);
			document.getElementById("yahtzee").appendChild(newTd);
			document.getElementById("yahtzee").appendChild(newYahtzee);
	    } else {
	        scoreLower("yahtzee", 0);
	    }
	}
}

function ytzBonusYahtzee() {
	if(!player.mark && player.score.checkDice(player.currentDice) == 16) {
		player.score.bonusYahtzee += 100
	    $("#bonusYahtzee").html(player.score.bonusYahtzee);
	    player.lower += 100;
		ytzTotalScore();
	}
}

function ytzThreeOK() {
	if(!player.mark && !player.score.threeOK) {
	    if (player.score.checkDice(player.currentDice) > 3) {
    	   var total = 0;
    	   for (var i = 0; i < player.currentDice.length; i++){
    		   total += player.currentDice[i].value;
    	   }
    	   scoreLower("threeOK", total);
	    } else {
	       scoreLower("threeOK", 0);
	    }
	}
}
function ytzFourOK() {
	if(!player.mark && !player.score.fourOK) {
	    if (player.score.checkDice(player.currentDice) > 9) {
        	var total = 0;
        	for (var i = 0; i < player.currentDice.length; i++){
        		total += player.currentDice[i].value;
        	}
        	scoreLower("fourOK", total);
	    } else {
	        scoreLower("fourOK", 0);
	    }
	}
}

function ytzUpper(number, name) {
	if(!player.mark && !player.score[name]) {
		var check = 0;
    	for (var i = 0; i < 5; i++){
    		if(player.currentDice[i].value == number) {
    			check++;
    		}
    	}
		$("#" + name).html(check * number);
		player.score[name] = check * number;
		player.checkBonus += check * number;
	    ytzTotalScore();
	}
}

function initialDice() {
	var newTr1 = document.createElement('tr'),
		newTr2 = document.createElement('tr');
	
	newTr1.setAttribute('class', 'center');
	newTr2.setAttribute('class', 'center');
		
	for (var i = 0; i < 5; i++) {
		var newTd1 = document.createElement('td'),
			newImg = document.createElement('img'),
			newTd2 = document.createElement('td'),
			newButton = document.createElement('button');
			
		newTd1.setAttribute('id', 'd' + i);
		newTd1.setAttribute('onclick', 'player.holdThis(' + i + ');');
		newImg.setAttribute('src', '_img/d5.png');
		newImg.setAttribute('alt', i + 1);
		newTd1.appendChild(newImg);
		newTr1.appendChild(newTd1);
		newButton.setAttribute('onclick', 'player.holdThis(' + i + ');');
		newButton.innerHTML = 'Hold';
		newTd2.appendChild(newButton);
		newTr2.appendChild(newTd2);
	}
	document.getElementById('dice').appendChild(newTr1);
	document.getElementById('dice').appendChild(newTr2);
}