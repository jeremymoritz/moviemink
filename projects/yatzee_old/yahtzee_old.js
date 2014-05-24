var currentDice = [],
	score = {},
	bonus = 0,
	lower = 0,
	roll = 2,
	mark = true;
	
score.bonus = 0;
score.bonusYahtzee = 0;
 
function createValue() {
	return Math.floor(Math.random() * 6) + 1;
}

function makeNewDice() {
	if(mark) {
		if (!currentDice.length){
			for (var i = 0; i < 5; i++) {
				var tempValue = createValue();
				var tempDie = {};
				tempDie.value = tempValue;
				tempDie.hold = false;
				currentDice.push(tempDie);
				document.getElementById("d" + i).innerHTML = "<img src='_img/d" + currentDice[i].value + ".png'>";
			}
			mark = false;
		} else {
			// RESET Dice //
			currentDice = [];
			holdDice = [];
			noHold = [];
			roll = 2;
			document.getElementById("roll").innerHTML = ""
			makeNewDice();
		}
	}
}

function holdThis(foo) {
	if (currentDice[foo].hold != true){
		document.getElementById("d" + foo).innerHTML = "<img src='_img/d" + currentDice[foo].value + "_hold.png'>";
		currentDice[foo].hold = true;
	} else {
		document.getElementById("d" + foo).innerHTML = "<img src='_img/d" + currentDice[foo].value + ".png'>";
		currentDice[foo].hold = false;
	}
}

function rollDice() {
	if (!currentDice[0]) {  // if there hasn't been a roll yet, make new dice
		makeNewDice();
		roll++;
	} 
	if (roll > 0){
		var allHeld = true;
		for (var i = 0; i < 5; i++){
				// keep the held dice //
			if (currentDice[i].hold != 1){
				currentDice[i].value = createValue();
				document.getElementById("d" + i).innerHTML = "<img src='_img/d" + currentDice[i].value + ".png'>";
				allHeld = false; 
			}
		}
		allHeld ? roll = roll : roll--; // if all are held, don't reduce roll
		document.getElementById("roll").innerHTML = "You have " + roll + " roll left!";
	}
}

function bonusPoint() {
    if (bonus >= 63) {
        score.bonus = 35;
        document.getElementById("bonus").innerHTML = 35;
    }
}

function ytzTotalScore() {
    var sum = 0
    for (var key in score) {
        sum = sum + score[key];
    }
    document.getElementById("totalScore").innerHTML = sum;
	document.getElementById("lowerScore").innerHTML = lower;
	document.getElementById("upperScore").innerHTML = bonus + score.bonus;
	mark = true
}

function scoreLower(name, amount) {
    document.getElementById(name).innerHTML = amount;
    score[name] = amount;
    lower += amount;
	ytzTotalScore();
}

function checkDice() {
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

function ytzChance() {
	if(!mark && !score.chance) {
	    var total = 0 
	    for (var i = 0; i < currentDice.length; i++){
		     total += currentDice[i].value;
	    }
	    scoreLower("chance", total);
	}
}

function ytzFullHouse() {
	if(!mark && !score.fullHouse) {
	    checkDice() == 5 ? scoreLower("fullHouse", 25) : scoreLower("fullHouse", 0);
	}
}

function ytzLargeStraight() {
	if(!mark && !score.largeStraight) {
	    if (checkDice() > 0) {
	        scoreLower("largeStraight", 0);
	    } else {
           var sum = 0
           for (var key in currentDice) {
				sum = sum + currentDice[key].value;
           }
           (sum == 15 || sum == 20) ? scoreLower("largeStraight", 40) : scoreLower("largeStraight", 0);
	    }
	}
}

function ytzSmallStraight() {
	if(!mark && !score.smallStraight) {
	    checkDice() > 1 ? scoreLower("smallStraight", 0) : scoreLower("smallStraight", 30);
	}
}

function ytzYahtzee() {
	if(!mark && !score.yahtzee) {
		if (checkDice() == 16) {
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
	if(!mark && checkDice() == 16) {
		score.bonusYahtzee += 100
	    document.getElementById("bonusYahtzee").innerHTML = score.bonusYahtzee;
	    lower += 100;
		ytzTotalScore();
	}
}

function ytzThreeOK() {
	if(!mark && !score.threeOK) {
	    if (checkDice() > 3) {
    	   var total = 0;
    	   for (var i = 0; i<currentDice.length; i++){
    		   total += currentDice[i].value;
    	   }
    	   scoreLower("threeOK", total);
	    } else {
	       scoreLower("threeOK", 0);
	    }
	}
}
function ytzFourOK() {
	if(!mark && !score.fourOK) {
	    if (checkDice() > 9) {
        	var total = 0;
        	for (var i = 0; i<currentDice.length; i++){
        		total += currentDice[i].value;
        	}
        	scoreLower("fourOK", total);
	    } else {
	        scoreLower("fourOK", 0);
	    }
	}
}

function ytzUpper(foo, bar) {
	if(!mark && !score[bar]) {
		var check = 0;
    	for (var i = 0; i < 5; i++){
    		if(currentDice[i].value == foo) {
    			check++;
    		}
    	}
		document.getElementById(bar).innerHTML = check * foo;
		score[bar] = check * foo;
		bonus += check * foo;
	    bonusPoint();
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
		newTd1.setAttribute('onclick', 'holdThis(' + i + ');');
		newImg.setAttribute('src', '_img/d5.png');
		newImg.setAttribute('alt', i + 1);
		newTd1.appendChild(newImg);
		newTr1.appendChild(newTd1);
		newButton.setAttribute('onclick', 'holdThis(' + i + ');');
		newButton.innerHTML = 'Hold';
		newTd2.appendChild(newButton);
		newTr2.appendChild(newTd2);
	}
	document.getElementById('dice').appendChild(newTr1);
	document.getElementById('dice').appendChild(newTr2);
}