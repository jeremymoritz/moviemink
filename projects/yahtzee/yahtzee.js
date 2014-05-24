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
	    	var val = currentDice[i].value;
	        if (first.indexOf(val) == -1) {
	            first.push(val);
	        } else {
	            check += 1;
	            if (second.indexOf(val) == -1) {
	                second.push(val);
	            } else {
	                check += 2;
	                if (third.indexOf(val) == -1) {
	                    third.push(val);
	                } else {
	                    check += 3;
	                    if (fourth.indexOf(val) == -1) {
	                        fourth.push(val);
	                    }
	                }
	            }
	        }
	    }
	    return check;
	}

	this.checkSmall = function (currentDice) {
		currentDice = currentDice.sort( function(a,b) {
		    return a.value - b.value;
		});
	    var jump = false,
	    	set1	= [],
	    	set2	= [];
	    	
	    for (var i = 0; i < 4; i++){
	    	var die1 = currentDice[i].value;
	    	var die2 = currentDice[i+1].value;
	    	if( die1 + 1 == die2 ) {
		    	if(jump){
			    	set2.push(die1);
		    	} else {
			    	set1.push(die1);
		    	}
	    	} else if(die1 != die2) {
		    	jump = true;
	    	}
	    }
	    return (set1.length > 2 || set2.length > 2) ? true : false;
	}

	this.bonusPoint = function(checkBonus) {
	    if (checkBonus >= 63) {
	        this.bonus = 35;
	    }
	}
}
	
Die = function () {
	this.createValue = function() {
		this.value = Math.floor(Math.random() * 6) + 1;
	}
	this.createValue();
	if(arguments[0]) this.value = arguments[0];
	this.hold = false;
}

Player = function() {
	this.mark = true;
	this.roll = 2;
	this.upper = 0;
	this.lower = 0;
	this.total = 0;
	this.turns = 0;
	this.score = new Score();	
	this.currentDice = [];
	this.name = arguments[0] ? arguments[0] : "John Doe";
	
	this.makeNewDice = function() {
		if(this.mark) {
			if (!this.currentDice.length){
				for (var i = 0; i < 5; i++) {
					var tempDie = new Die();
					this.currentDice.push(tempDie);
					$("#d" + i).find("img").attr("src",'_img/d' + tempDie.value + ".png");
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
					$("#d" + i).find("img").attr("src","_img/d" + this.currentDice[i].value + ".png");
					allHeld = false; 
				}
			}
			allHeld ? this.roll = this.roll : this.roll--; // if all are held, don't reduce roll
			$("#roll").html("You have " + this.roll + " roll left!");
		}
	}
	
	this.holdThis = function(die) {
		if (this.currentDice[die].hold != true){
			$("#d" + die).find("img").attr("src","_img/d" + this.currentDice[die].value + "_hold.png");
			this.currentDice[die].hold = true;
		} else {
			$("#d" + die).find("img").attr("src","_img/d" + this.currentDice[die].value + ".png");
			this.currentDice[die].hold = false;
		}
	} 
}

function ytzCtrl($scope) {
	$s = $scope;
	$s.allPlayers = [];
	$s.player = null;
		 
	$s.addPlayer = function() {
		$s.player =  new Player($s.playerName);
		$s.playerName = "";
		$s.allPlayers.push($s.player);
	};

	$s.$watch('changePlayer', function(changePlayer) {
		var pos = $s.allPlayers.map(function(e) {return e.name}).indexOf(changePlayer);
		$s.player = $s.allPlayers[pos];
		$s.player = typeof $s.player !== 'undefined' ? $s.player : new Player("demo");
	});
		
	$s.ytzTotalScore = function() {
		var sum = 0;
	    for (var key in $s.player.score) {
	    	if( isNaN($s.player.score[key]) ) continue;
	        sum += $s.player.score[key];
	    }
	    $s.player.total = sum;
	    $s.player.turns++;
		$s.player.mark = true;
	}
		
	$s.scoreLower = function(name, amount) {
	    $s.player.score[name] = amount;
	    $s.player.lower += amount;
		$s.ytzTotalScore();
	}
		
	$s.ytzUpper = function(number, name) {
		if(!$s.player.mark && !$s.player.score[name]) {
			var check = 0;
	    	for (var i = 0; i < 5; i++){
	    		if($s.player.currentDice[i].value == number) {
	    			check++;
	    		}
	    	}
			$s.player.score[name] = check * number;
			$s.player.upper += check * number;
			$s.player.score.bonusPoint($s.player.upper);
		    $s.ytzTotalScore();
		}
	}
		
	$s.ytzChance = function() {
		if(!$s.player.mark && !$s.player.score.chance) {
		    var total = 0 
		    for (var i = 0; i < $s.player.currentDice.length; i++){
			     total += $s.player.currentDice[i].value;
		    }
		    $s.scoreLower("chance", total);
		}
	}
		
	$s.ytzFullHouse = function() {
		if(!$s.player.mark && !$s.player.score.fullHouse) {
		    $s.player.score.checkDice($s.player.currentDice) == 5 ? $s.scoreLower("fullHouse", 25) : $s.scoreLower("fullHouse", 0);
		}
	}
		
	$s.ytzLargeStraight = function() {
		if(!$s.player.mark && !$s.player.score.largeStraight) {
		    if ($s.player.score.checkDice($s.player.currentDice) > 0) {
		        $s.scoreLower("largeStraight", 0);
		    } else {
	           var sum = 0
	           for (var key in $s.player.currentDice) {
					sum = sum + $s.player.currentDice[key].value;
	           }
	           (sum == 15 || sum == 20) ? $s.scoreLower("largeStraight", 40) : $s.scoreLower("largeStraight", 0);
		    }
		}
	}
		
	$s.ytzSmallStraight = function() {
		if(!$s.player.mark && !$s.player.score.smallStraight) {
		    $s.player.score.checkSmall($s.player.currentDice) ? $s.scoreLower("smallStraight", 30) : $s.scoreLower("smallStraight", 0);
		}
	}
		
	$s.ytzYahtzee = function() {
		if(!$s.player.mark && !$s.player.score.yahtzee) {
			$s.player.score.checkDice($s.player.currentDice) == 16 ? $s.scoreLower("yahtzee", 50) : $s.scoreLower("yahtzee", 0);
		}
	}
		
	$s.ytzBonusYahtzee = function() {
		if(!$s.player.mark && $s.player.score.checkDice($s.player.currentDice) == 16) {
			$s.player.score.bonusYahtzee += 100;
		    $s.player.lower += 100;
			$s.ytzTotalScore();
		}
	}
		
	$s.ytzThreeOK = function() {
		if(!$s.player.mark && !$s.player.score.threeOK) {
		    if ($s.player.score.checkDice($s.player.currentDice) > 3) {
	    	   var total = 0;
	    	   for (var i = 0; i < $s.player.currentDice.length; i++){
	    		   total += $s.player.currentDice[i].value;
	    	   }
	    	   $s.scoreLower("threeOK", total);
		    } else {
		       $s.scoreLower("threeOK", 0);
		    }
		}
	}
	
	$s.ytzFourOK = function() {
		if(!$s.player.mark && !$s.player.score.fourOK) {
		    if ($s.player.score.checkDice($s.player.currentDice) > 9) {
	        	var total = 0;
	        	for (var i = 0; i < $s.player.currentDice.length; i++){
	        		total += $s.player.currentDice[i].value;
	        	}
	        	$s.scoreLower("fourOK", total);
		    } else {
		        $s.scoreLower("fourOK", 0);
		    }
		}
	}
}