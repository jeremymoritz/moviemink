function Player(playerName) {
	var self = this;

	self.name = playerName || "John Doe";
	self.pile = new Pile();
}

function Card(cardValue, cardSuit) {
	var self = this;

	self.owner = null;
	self.value = cardValue;
	self.suit = cardSuit;
}

function Battle() {
	var self = this;

	self.allSuits = ["spades", "hearts", "diamonds", "clubs"];
	self.allValues = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
	self.spoils = new Pile();
	self.active = new Pile();
	self.fight = function fight(players) {
		setTimeout(function log() {
			console.log('Its been 3 seconds');
		}, 3000);
		// players.forEach(function forEachPlayer(eachPlayer) {
		// 	if(eachPlayer.pile.cards.length) return;
		// 	self.active.cards.push( eachPlayer.pile.giveCard() );
		// });
		// self.winner = self.active.cards.sortStrong();

		for(var i = 0; i < 100000; i++) {
			var a = 0;
		}
		console.log("slow");
	}
	self.sortStrong = function sortStrong() {
		self.cards.sort(function sortStrongest(a,b) {
			if( a.strength < b.strength)
				return 1;
			if( a.strength > b.strength)
				return -1;
			return 0;
		});
		return self.cards[0];
	}

	self.spoils = function giveSpoils(winner) {
		if(winner.arena === true) {
			$s.war(winner);
		} else {
			$s.shuffle($s.inPlay);
			$s.inPlay.forEach(function forEachCard(eachCard) {
				winner.pile.push(eachCard);
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
			if(eachPlayer.pile.length > 3) {
				$s.inPlay.push( eachPlayer.pile.shift() );
				$s.inPlay.push( eachPlayer.pile.shift() );
				$s.inPlay.push( eachPlayer.pile.shift() );
			} else {
				for(var i = 1; i < eachPlayer.pile.length; i++) {
					$s.inPlay.push( eachPlayer.pile.shift() );
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


	self.giveCard = function giveCard() {
		if(self.cards.length) {
			return self.cards.shift();
		}
	}
}

function Pile() {
	var self = this;

	self.cards = [];
	self.allSuits = ["spades", "hearts", "diamonds", "clubs"];
	self.allValues = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
	self.shuffle = function shuffle() {
		self.cards = _.shuffle(self.cards);
	}
	self.buildDeck = function buildDeck() {
		self.cards = [];
		self.allSuits.forEach( function forEachSuit(eachSuit) {
			self.allValues.forEach( function forEachValue(eachValue) {
				self.cards.push( new Card(eachSuit, eachValue));
			});
		});
		self.shuffle();
	}

	self.deal = function deal(players) {
		var i = 0;
		while (self.cards.length) {
			var nthPlayer = (i++ % players.length);
			players[nthPLayer].pile.cards.push(self.cards.shift());
		}
	}
}

var war = angular.module('war',[]);

war.controller('warCtrl', ['$scope', function($scope) {
	$s = $scope;
	$s.allPlayers = [];
	$s.start = false;
	$s.pastBattles = [];
	$s.playerName = '';

	$s.buildDeck = function buildDeck() {
		$s.start = true;
		var pile = new Pile();
		pile.build();
		pile.deal($s.allPlayers);
	}

	$s.addPlayer = function addPlayer() {
		$s.allPlayers.push( new Player($s.playerName) );
		$s.playerName = '';
	}

	$s.play = function playCards() {
		var battle = new Battle();
		battle.fight($s.allPlayers);
		$s.pastBattles.push( battle );
		console.log("quick");
	}
}]);
