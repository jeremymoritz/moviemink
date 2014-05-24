<?php 
	function confirmQuery($resultSet) {
		if (!$resultSet) {
			die("Database connection Failed: " . mysql_error());
		}
	}
	
	function displayWords($page_set) {
		while ($page = mysql_fetch_array($page_set)) {
					$output = "<li>";
					$output .= "{$page['word']}</li>";
					echo $output;
				}
	}
	
	function getWords() {
		global $connection;
		$query = "SELECT *
				FROM words
				LIMIT 0, 10";
		$page_set = mysql_query($query, $connection);
		confirmQuery($page_set);
		echo 'I like myself!';
		displayWords($page_set);
	}
	
	function wordList() {
		global $connection;
		$regExp = "";
		$common = "";
		$nLetters = "";
		$order = "";
		$limit = "";
		if(isset($_GET['regExp'])) {
			$regExp = " WHERE word REGEXP '" . $_GET['regExp'] . "'";
		}
		if(isset($_GET['common'])) {
			$common = " AND common=1";
		}
		if(isset($_GET['nLetters'])) {
			$nLetters = " AND nLetters=" . $_GET['nLetters'];
		}
		if(isset($_GET['order'])) {
			$order = " ORDER BY `words`.`nLetters` DESC";
		}
		if(isset($_GET['highLimit'])) {
			if(isset($_GET['lowLimit'])) {
				$lowLimit = $_GET['lowLimit'];
			} else {
				$lowLimit = 0;
			}				
			$limit = " LIMIT " . $lowLimit. ", " . $_GET['highLimit'];
		}
		$query = "SELECT *"
			.	" FROM words"
			. $regExp
			. $common
			. $nLetters
			. $order
			. $limit;
		$words_set = mysql_query($query, $connection);
		confirmQuery($words_set);
		$output = '';
		while ($page = mysql_fetch_array($words_set)) {
			$output .= "{$page['word']}" . ',';
		}
		trim($output, ',');
		echo $output;
	}
	
	function playWord() {
		global $connection;
		$limit = ($_GET['limit']);
		if ($_GET['common'] == 1) {
			$common = " WHERE common = 1";
		} else {
			$common = " ";
		}
		$query = "SELECT word"
			.	" FROM words"
			. $common
			.	" LIMIT "
			. $limit
			.	" , 1";
		$words_set = mysql_query($query, $connection);
		confirmQuery($words_set);
		$output = '';
		while ($page = mysql_fetch_array($words_set)) {
			$output .= "{$page['word']}" . ',';
		}
		trim($output, ',');
		echo $output;
	}
	
	function makeLetterTable($id='lettersTable') {
		$letters = array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","?");
		$table = "<table id='$id'>";
		$count = 0;
		for ($i = 0; $i < 4; $i++) {
			$table .= "<tr>";
			for($j = 0; $j < 7; $j++) {
				if($count == count($letters)) continue;
				$table .="<td";
				$table .= $letters[$count] != "?" ? ">{$letters[$count]}" : " colspan='2'>";
				$table .="</td>";
				$count++;
			}
			$table .= "</tr>";
		}
		$table .= "</table>";
		return $table;
	}
?>
