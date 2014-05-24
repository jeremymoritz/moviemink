<?php 
	require_once '_inc/constants.php';
	wordList();
	if(isset($connection)) {
		mysql_close($connection);
	}
?>