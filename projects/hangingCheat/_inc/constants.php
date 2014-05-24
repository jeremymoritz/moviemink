<?php
	session_start();
//Database Constants
define("DB_SERVER", "localhost");
define("DB_USER", "movi9804_hang");
define("DB_PASS", "o=5Fd*ZtR.(o");
define("DB_NAME", "movi9804_words");

	$connection = mysql_connect(DB_SERVER, DB_USER, DB_PASS);
	if (!$connection) {
		die("Database Issue please contact David Moritz");
	};
	$databaseSelect = mysql_select_db(DB_NAME, $connection); 
	
	require_once("functions.php");
?>