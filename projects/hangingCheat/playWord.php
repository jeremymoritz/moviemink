<?php 
	require_once '_inc/constants.php';
		playWord();
	if(isset($connection)) {
		mysql_close($connection);
	}
?>