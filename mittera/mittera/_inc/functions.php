<?php 	
	function confirmQuery($result) {
		if (!$result) {
			die("Database connection Failed: " . mysql_error());
		}
	}
		
	function makeList($list, $radio = true) { 	// Create food lists dynamically from database!
		global $connection;
		$query = "SHOW COLUMNS"
			.	" FROM mittera_breakfast";
		$result = mysql_query($query, $connection);
		confirmQuery($result);
		$listArray = array();
		$output = "<ul>\n";
		$noRepeat = 0;
		while ($column = mysql_fetch_assoc($result)) {
			if (strpos($column['Field'], $list) > -1) {			// This checks to make sure we don't get $columns outside the requested $list
	        	$tempPos = strpos($column['Field'], "_") + 1;
	        	$listOption = substr($column['Field'], $tempPos);
				$listOptionId = str_replace(" ","",$listOption);
				$imgTag = "<img alt='' src='_img/$listOptionId.png'>";
	        	$secondPos = strpos($listOption, "_");			// Some selections have more than one "_", this checks for that
				$quickOutput = "<li><input type='" . ($radio ? "radio" : "checkbox") . "' name='" . ($radio ? "$list' value='{$column['Field']}" : "{$column['Field']}") . "'";		
	        	if ($secondPos) {  // The extra "_" indicates that there are varieties of the particular choice
					$noRepeat++;
					$subOption = substr($listOption, $secondPos + 1);
					$subOptionId = str_replace(" ","",$subOption);
					$tempLen = strlen($subOption) + 1;
					$listOption = substr($listOption, 0, -$tempLen);  // This actual gets the value between the "_" marks
					$tempCheck = in_array($listOption, $listArray);
					if (!$tempCheck) {
						array_push($listArray, $listOption);
						$output .= "$quickOutput id='$listOptionId' class='moreOptions'>
							<label for='$listOptionId'>$listOption" . "$imgTag</label>
						 <ul class='subOption' id='$listOption" . "SubOption'>\n";
					}
					$output .= "$quickOutput id='$subOptionId'><label for='$subOptionId'>$subOption<img alt='' src='_img/$subOptionId.png'></label></li>\n";	
				} else {
					if($noRepeat > 0) {  		// This resets the $noRepeat and tells the function to close the variety <ul>
						$noRepeat = 0;
						$output .= "</ul></li>\n";
					}
					$output .= "$quickOutput id='$listOptionId'>
						<label for='$listOptionId'>$listOption" . "$imgTag</label>
					</li>\n";	
				}
	    	}
	    }
		$output .= "</ul>";
	    return $output;
	}
	
	function apiPost($key) {
		return isset($_POST[$key]) ? $_POST[$key] : false;
	}

	function isValidEmail ($email) {		//	Checks if an email is valid
		return preg_match("/^[a-zA-Z]\w+(\.\w+)*\@\w+(\.[0-9a-zA-Z]+)*\.[a-zA-Z]{2,4}$/", $email);
	}

	function mailTo($emailAddress) {
		return disguiseMail("<a href='mailto:$emailAddress' title='Send an Email'>$emailAddress</a>");
	}
?>
