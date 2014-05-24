<?php
ob_start();
$header = "<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='utf-8' />
	<title>Mittera Breakfast Order</title>
	<meta name='description' content='This is the page for ordering your breakfast at the Mittera clientele meeting' />
	<meta name='author' content='David Moritz' />
	<link rel='shortcut icon' href='favicon.ico' />
	<link rel='stylesheet' type='text/css' href='_inc/main.css' />
</head>";

$topper = "
<body>
	<header>
		<h1>Mittera</h1>
		<h2>Mittera Breakfast Order</h2>
	</header>";
  
$footer = "	
	<footer>		
		<script src='//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></script>
		<script src='http://malsup.github.com/jquery.form.js'></script> 		<!-- This is a plug-in I use for submitting forms via Ajax -->
		<script src='_inc/mittera.js'></script>
	</footer>
</body>
</html>";
?>

