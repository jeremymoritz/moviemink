<?php require_once '_inc/constants.php'; ?>
<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='UTF-8'>
	<meta name='description' content="Time to Cheat at Hanging With Friends!">
	<meta name='keywords' content='hanging, with, friends, david moritz, moritz, david'>
	<title>Hanging with Cheaters!</title>
	<link rel="stylesheet" href="hangingCheat.css" type="text/css">
	<link href='http://fonts.googleapis.com/css?family=Roboto:900' rel='stylesheet' type='text/css'>
	<!--<link rel="stylesheet" href="mobile.css" type="text/css" media="only screen and (max-width: 980px)"> -->
	<!-- <link rel='stylesheet' type='text/css' href='hangingCheat.css'> -->
	<!--[if lt IE 9]>
		<script src='http://html5shim.googlecode.com/svn/trunk/html5.js'></script>
		<script src='http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js'></script>
	<![endif]-->
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	  ga('create', 'UA-29987303-5', 'hangcheat.com');
	  ga('send', 'pageview');
	
	</script>
</head>
<body>
	<div id='container'>
	<header class='title'>
		<img src='_img/title.png' alt=' ' title='Hanging with Cheaters!'>
	</header>
	<section id='content'>
		<?php foreach(array('solve', 'create', 'test', 'play') as $btn) {
			echo "<span id='{$btn}Button'><input type='image' src='_img/$btn.png' alt='$btn' class='$btn toppers'></span>";
		} ?>
<!--
		&nbsp;&nbsp;&nbsp;&nbsp;
    	<span id='solveButton'><input type='image' src='_img/solve.png' alt=' '></span> &nbsp;&nbsp;&nbsp;&nbsp;<!--onclick='testResults(); return false' -- >
    	<span id='createButton'><input type='image' src='_img/create.png' alt=' '></span> &nbsp;&nbsp;&nbsp;&nbsp;<!--onclick='createWord(); return false' -- >
    	<span id='testButton'><input type="image" src='_img/test.png' alt=' '></span><!--onclick='startTest(); return false' -- >
    	<span id='playButton'><input type="image" src='_img/play.png' alt=' '></span><!--onclick='startTest(); return false' -- >
-->
		<div id='formContainer'>
			<form name='solveForm' id='solveForm'>
				<p>Number of Letters:
					<?php for($i = 4; $i <= 8; $i++) {
						echo "<label for='nLetters$i'> &nbsp;&nbsp; $i</label><input id='nLetters$i' class='nLetters radio' type='radio' name='nLetters' value='$i' onclick='enableInput($i);'>";
					} ?>
<!--
					4<input type="radio" name="nLetters" value="4" onclick='enableInput(4);'> &nbsp;&nbsp;
			        5<input type="radio" name="nLetters" value="5" onclick='enableInput(5);'> &nbsp;&nbsp;
			        6<input type="radio" name="nLetters" value="6" onclick='enableInput(6);'> &nbsp;&nbsp;
			        7<input type="radio" name="nLetters" value="7" onclick='enableInput(7);'> &nbsp;&nbsp;
			        8<input type="radio" name="nLetters" value="8" onclick='enableInput(8);'>
-->
			    </p>
	        	<p id='mainLetters'>
	        		Which letters do you know?
	        		<?php for($i = 1; $i <= 8; $i++) {
		        		echo "<input type='text' maxlength='1' name='letter$i' size='1' disabled>";
	        		} ?>
<!--
	        		<input type='text' maxlength="1" name='letter1' size='1' disabled>
	        		<input type='text' maxlength="1" name='letter2' size='1' disabled>
	        		<input type='text' maxlength="1" name='letter3' size='1' disabled>
	        		<input type='text' maxlength="1" name='letter4' size='1' disabled>
	        		<input type='text' maxlength="1" name='letter5' size='1' disabled>
	        		<input type='text' maxlength="1" name='letter6' size='1' disabled>
	        		<input type='text' maxlength="1" name='letter7' size='1' disabled>
	        		<input type='text' maxlength="1" name='letter8' size='1' disabled>
-->
	        	</p>
	        	<p id='rulingOut'>
	        		Which letters are ruled out?
	        		<input class='ruledOut' type='text' name='notUsed' placeholder='no commas or spaces'>
	        	</p>
	        	<p>
	        		<label for='commonWordFull'>Common Words Only?</label>
	        		<input type='checkbox' id='commonWordFull' name='full' onclick='testResults()'>
	        	</p>
                <button onclick='testResults(); return false'>GO!</button> &nbsp; <input type='reset' value='Start Over'>
	        	<p id='percentage'>&nbsp;</p>
				<div class='fixedImage'>		
					<img src='_img/hangingGuy.png' alt=' ' class='rightImg'>
				</div>
				<table id='solveTable' class='wordTable' border='1'> </table>
			</form>
			<form name='createForm' id='createForm'>
	        	<p>
	        		Which letters do we have to work with?
	        		<input type='text' name='notUsed' placeholder='no commas or spaces'>
	        	</p>
	        	<p>
	        		<label for='wordValuesClick'>Show word values?</label>
	        		<input type='checkbox' name='wordValues' id='wordValuesClick'>
	        	</p>
	        		<div id='wordValuesInput'>
	        			<p>
	        				Where is the bonus location? 
							<?php for($i = 1; $i <= 8; $i++) {
								echo "<label for='bonusLocation$i'> &nbsp;&nbsp; $i</label><input type='radio' id='bonusLocation$i' name='bonusLocation' value='$i'>";
							} ?>
<!--
								1<input type="radio" name="bonusLocation" value="1"> &nbsp;&nbsp;
						        2<input type="radio" name="bonusLocation" value="2"> &nbsp;&nbsp;
						        3<input type="radio" name="bonusLocation" value="3"> &nbsp;&nbsp;
						        4<input type="radio" name="bonusLocation" value="4"> &nbsp;&nbsp;
						        5<input type="radio" name="bonusLocation" value="5"> &nbsp;&nbsp;
						        6<input type="radio" name="bonusLocation" value="6"> &nbsp;&nbsp;
						        7<input type="radio" name="bonusLocation" value="7"> &nbsp;&nbsp;
						        8<input type="radio" name="bonusLocation" value="8">
-->
	        			</p>
	        			<p>
	        				What is the bonus type? 
	        				<?php foreach(array('2'=>'DW','3'=>'TW','dl'=>'DL','tl'=>'TL') as $k => $v) {
		        				echo "<label for='bonusType$v'> &nbsp;&nbsp; $v</label><input type='radio' id='bonusType$v' name='bonusType' value='$k'>";
	        				} ?>
<!--
								DW<input type="radio" name="bonusType" value="2"> &nbsp;&nbsp;
						        TW<input type="radio" name="bonusType" value="3"> &nbsp;&nbsp;
						        DL<input type="radio" name="bonusType" value="dl"> &nbsp;&nbsp;
						        TL<input type="radio" name="bonusType" value="tl"> &nbsp;&nbsp;
-->
	        			</p>
	        		</div>
	        	<p>
	        		<label for='commonWordFull2'>Common Words Only?</label>
	        		<input type='checkbox' id='commonWordFull2' name='full' onclick='createWord()'>
	        	</p>
                <button onclick='createWord(); return false'>GO!</button> &nbsp; <input type='reset' value='Start Over'>
	        	<p id='computerMiss'>&nbsp;</p>
				<div class='fixedImage'>		
					<img src='_img/hangingGuy.png' alt=' ' class='rightImg'>
				</div>
	        	<table id='createTable' class='wordTable' border='1'> </table>
			</form>
			<form name='testForm' id='testForm'>
	        	<p>
	        		You wish to test your word against the computerAI?<br>
	        		Write the word here:
	        		<input type='text' name='testAI' id='testAI' placeholder='Try Me' >
	        	</p>
	        	<p>
	        		<label for='commonWordFull3'>Common Words Only?</label>
	        		<input type='checkbox' id='commonWordFull3' name='full'> (Easier to guess)
	        	</p>
	        	<button onclick='startTest(); return false'>GO!</button>
	        	<p id='nextGuessAI'>&nbsp;</p>
				<div class='fixedImage'>
					<iphone class='half'>
						<computerai>
							<topperai></topperai>
							<strikesai>
								<strikeholder id='strikeList'>
									<ul>
										<li></li>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</strikeholder>
							</strikesai>
							<betweenai></betweenai>
							<spacesai id='spacesAI' class='spaces0'>
							</spacesai>
							<belowai></belowai>
							<lettersai>
								<?= makeLetterTable(); ?>
<!--
								<table id='lettersTable'>
									<tr>
							            <td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td>
							        </tr>
					                <tr>
					                    <td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td>
					                </tr>
					                <tr>
					                    <td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td>
					                </tr>
					                <tr>
					                    <td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td colspan="2"></td>
					                </tr>
								</table>
-->
							</lettersai>
						</computerai>
					</iphone>		
					<img src='_img/hangingGuy.png' alt=' ' class='rightImg'>
				</div>
				<table id='testTable' class='wordTable' border='1'> </table>
				<toybox>
					<img alt=' ' src="_img/toybox/4_spaces.jpg"><img alt=' ' src="_img/toybox/5_spaces.jpg"><img alt=' ' src="_img/toybox/6_spaces.jpg"><img alt=' ' src="_img/toybox/7_spaces.jpg"><img alt=' ' src="_img/toybox/8_spaces.jpg">
				</toybox>
			</form>
			<form name='playForm' id='playForm'>
	        	<p>
	        		Would you like to solve a word against the Computer AI?<br>
	        	</p>
	        	<p>
	        		<label for='commonWordFull4'>Common Words Only?</label>
	        		<input type='checkbox' id='commonWordFull4' name='full' checked> (Easier to guess)
	        	</p>
	        	<button onclick='playComputer(); return false'>GO!</button>
				<div class='fixedImage'>
					<iphone class='half'>
						<computerai>
							<topperai></topperai>
							<strikesai>
								<strikeholder id='strikePlayList'>
									<ul>
										<li></li>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</strikeholder>
							</strikesai>
							<betweenai></betweenai>
							<spacesai id='spacesPlayAI' class='spaces0'>
							</spacesai>
							<belowai></belowai>
							<lettersai>
								<?= makeLetterTable('lettersPlayTable'); ?>
<!--
								<table id='lettersPlayTable'>
									<tr>
							            <td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td>
							        </tr>
					                <tr>
					                    <td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td>
					                </tr>
					                <tr>
					                    <td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td>
					                </tr>
					                <tr>
					                    <td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td colspan="2"></td>
					                </tr>
								</table>
-->
							</lettersai>
						</computerai>
					</iphone>		
					<img src='_img/hangingGuy.png' alt=' ' class='rightImg'>
				</div>
<!--
				<toybox>
					<img alt=' ' src="_img/toybox/4_spaces.jpg"><img alt=' ' src="_img/toybox/5_spaces.jpg"><img alt=' ' src="_img/toybox/6_spaces.jpg"><img alt=' ' src="_img/toybox/7_spaces.jpg"><img alt=' ' src="_img/toybox/8_spaces.jpg">
				</toybox>
-->
			</form>
			<p>
				<a href='#footer' onclick='showMore(); return false' id='showMore'>
					Show more results!
				</a>
			</p>
		</div>
		<footer id='footer'>
			<p>Hanging With Cheaters created for the sole purpose of education with no intention to market or profit from Hanging With Friends image, game, or likeness.</p>
			<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
			<script src='hangingCheatNew.js'></script>
			<toybox>
				<?php foreach(scandir("_img/new") as $img) {
					echo "<img alt=' ' src='_img/toybox/$img'>";
				}?>
<!-- 				<img alt=' ' src="_img/toybox/iphone.png"><img alt=' ' src="_img/toybox/blank_green.png"><img alt=' ' src="_img/toybox/blank_red.png"><img alt=' ' src="_img/toybox/blank_letter.png"><img alt=' ' src="_img/toybox/strike_bg.png"><img alt=' ' src="_img/toybox/aboveStrike.jpg"><img alt=' ' src="_img/toybox/0_spaces.jpg"><img alt=' ' src="_img/toybox/below_spaces.jpg"><img alt=' ' src="_img/toybox/betweenStrikeSpace.jpg"> -->
			</toybox>				
		</footer>
	</section>
	</div>
</body>
</html>
<?php 
	if(isset($connection)) {
		mysql_close($connection);
	}
?>