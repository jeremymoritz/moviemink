<?php
//Database Constants
define("DB_SERVER", "localhost");
define("DB_USER", "***********");
define("DB_PASS", "*******");
define("DB_NAME", "**********");

	$connection = mysql_connect(DB_SERVER, DB_USER, DB_PASS);
	if (!$connection) {
		die("Database Failed");
	};
	$databaseSelect = mysql_select_db(DB_NAME, $connection);
	
	require_once("functions.php");
	require_once("mittera.php");
?>