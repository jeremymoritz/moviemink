Player = function makePlayer() {
	this.name = arguments[0] ? arguments[0] : "John Doe";
	this.deck = new Deck();
/*
	this.arena = false;
	this.warCard = null;
	this.getWarCard = function getWarCard() {
		this.warCard = this.deck.shift();
		this.warCard.owner = this;
	}
*/
}
	
Card = function makeCard() {
	this.allSuits = ["spades", "hearts", "diamonds", "clubs"];
	this.allValues = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
	this.owner = null;
/*
	this.createSuit = function createSuit() {
		return this.allSuits[ Math.floor(Math.random() * 4) ];
	}	
	this.createValue = function createValue() {
		return this.allValues[ Math.floor(Math.random() * 13) ];
	}
*/
	this.suit = arguments[0] ? arguments[0] : null;
	this.value = arguments[1] ? arguments[1] : null;
	this.strength = this.allValues.indexOf(this.value);
}

Battle = function makeBattle() {
	this.spoils = new Deck();
	this.active = new Deck();
	this.fight = function fight(players) {
		players.forEach(function forEachPlayer(eachPlayer) {
			if(eachPlayer.deck.cards.length) return;
			this.active.cards.push( eachPlayer.deck.giveCard() );
		});
		this.winner = this.active.cards.sortStrong();
	}
	
	$s.spoils = function giveSpoils(winner) {
		if(winner.arena === true) {
			$s.war(winner);
		} else {
			$s.shuffle($s.inPlay);
			$s.inPlay.forEach(function forEachCard(eachCard) {
				winner.deck.push(eachCard);
			});
			$s.exitArena();
		}
	}
	
	$s.war = function war(winner) {
		$s.allPlayers.forEach(function forEachPlayer(eachPlayer) {
			if(eachPlayer.warCard === null) return;
			if(eachPlayer.warCard.strength !== winner.warCard.strength){
				eachPlayer.warCard = null;
				return;
			}
			if(eachPlayer.deck.length > 3) {
				$s.inPlay.push( eachPlayer.deck.shift() );
				$s.inPlay.push( eachPlayer.deck.shift() );
				$s.inPlay.push( eachPlayer.deck.shift() );
			} else {
				for(var i = 1; i < eachPlayer.deck.length; i++) {
					$s.inPlay.push( eachPlayer.deck.shift() );
				}
			}
			eachPlayer.getWarCard(); 
			eachPlayer.arena = false;
		});
		$s.attack();
	}
	
	$s.exitArena = function exitArena() {
		$s.allPlayers.forEach(function forEachPlayer(eachPlayer) {
			eachPlayer.arena = false;
			eachPlayer.warCard = null;
		});
	}
}

Deck = function makeDeck() {
	this.cards = [];
	this.shuffle = function shuffle() {
		var len = this.cards.length;
		var i = len;
		 while (i--) {
		 	var p = parseInt(Math.random()*len);
			var t = this.cards[i];
	  		this.cards[i] = this.cards[p];
		  	this.cards[p] = t;
	 	}
	}
	this.sortStrong = function sortStrong() {
		this.cards.sort(function sortStrongest(a,b) {
			if( a.strength < b.strength)
				return 1;
			if( a.strength > b.strength)
				return -1;
			return 0;
		});
		return this.cards[0];
	}
	this.giveCard = function giveCard() {
		if(this.cards.length) {
			return this.cards.shift();
		}
	}
	this.build = function buildDeck() {	
		this.cards = [];
		var buildCard = new Card();
		buildCard.allSuits.forEach( function forEachSuit(eachSuit) {
			buildCard.allValues.forEach( function forEachValue(eachValue) {
				this.cards.push( new Card(eachSuit, eachValue));
			});
		});
		this.shuffle();
	}	
	this.deal = function deal(players) {
		this.cards.forEach( function DealToPlayers(card) {
			players.sort(function smallestDeck(a,b) {
			    if (a.deck.cards.length > b.deck.cards.length)
			      return 1;
			    if (a.deck.cards.length < b.deck.cards.length)
			      return -1;
			    // a must be equal to b
			    return 0;
			});
			card.owner = players[0];
			players[0].deck.cards.push(card);
		});
		this.cards = [];
	}
}

function warCtrl($scope) {
	$s = $scope;
	$s.deck = new Deck();
	$s.allPlayers = [];
	$s.start = false;
	$s.history = [];

/*		 
	$s.addCard = function addCard() {
		$s.card =  new Card($s.cardSuit, $s.cardValue);
		$s.cardSuit = "";
		$s.cardValue = "";
		$s.allCards.push($s.card);
	}
*/
	
	$s.buildDeck = function buildDeck() {
		$s.start = true;
		$s.deck.build();
		$s.deck.deal($s.allPlayers);
	}
	
	$s.addPlayer = function addPlayer() {
		$s.allPlayers.push( new Player($s.playerName) );
		$s.playerName = "";
	}
	
	$s.play = function playCards() {
		var battle = new Battle();
		$s.history.push( battle.fight($s.allPlayers));
	}
}