<?php   // Breakfast Form Submission
	require_once "_inc/constants.php";  
	echo $header;
	
if(isset($_POST['submit'])) {
	//	They've filled out the form and submitted it.  Now let's insert their info into the database!
	global $connection;
	$query = "INSERT INTO `mittera_breakfast` ";		// creating query
	$queryKeys = "( ";
	$queryValues = " ) VALUES ( ";
	//	Send a mailer to Contact at Mittera
	$name = apiPOST('name');
	$email = apiPOST('email');
	$ip = $_SERVER['REMOTE_ADDR'];
	$date = date('Y-m-d H:i:s',strtotime('-1 hour'));	//	this accounts for our Central timezone
	$message = "<b>Mittera Breakfast Client:</b><br><br>\n";	// creating $message
	foreach ($_POST as $k => $v) {
		if ($v == on) {	
		    $tempPos = strpos($k, "_");	
		    $value = substr($k, $tempPos+1);
			$message .= "Also: $value<br>";
			$queryKeys .= "`$k`,";
			$queryValues .= "'1',"; 
		} elseif ($k == "submit") {
			$message .= "Date: $date<br>\n"
					. "I.P.: $ip";
		} elseif ($k == "specialEggs"){
			$message .= "Special Eggs: $v<br>";
			$queryKeys .= "`eggs_Special Order`,";
			$queryValues .= "'$v',";
		} else {				
			$key = ucfirst($k);		
		    $tempPos = strpos($v, "_") + 1;	
		    if($tempPos > 1) {
		    	$value = substr($v, $tempPos);
				if ($k != "eggs_Special Order") {
					continue;
				}	
				$queryKeys .= "`$v`,";
				$queryValues .= "'1',"; 
		    } else {
		    	$value = $v;
				$queryKeys .= "`$k`,";
				$queryValues .= "'$v',"; 
		    }
		    $message .= "$key: $value<br>";
		}
	};
	$queryKeys = substr($queryKeys, 0, -1);
	$queryValues = substr($queryValues, 0, -1); 			// remove the final ","
	$query .= $queryKeys . $queryValues . ")";
	$result = mysql_query($query, $connection);	
	$subject = "Mittera Breakfast for $name";
	$headers = "From: Mittera <support@mittera.com>\n"
		. "Reply-To: Margie Gehringer <margie.gehringer@mittera.com>\n"
		. "MIME-Version: 1.0\n"
		. "Content-type: text/html; charset=iso-8859-1\n"
		. "Cc:david@moviemink.com\n"
		//. "Bcc:margie.gehringer@mittera.com"  // If Margie would like copies of the emails as well
		;		
	$message = preg_replace("#(?<!\r)\n#si", "\r\n", $message);	// Fix any bare linefeeds in the message to make it RFC821 Compliant
	$headers = preg_replace('#(?<!\r)\n#si', "\r\n", $headers); 	// Make sure there are no bare linefeeds in the headers
	$to = "$email";
	
	mail($to,$subject,$message,$headers);
}
	echo $footer;
?>	