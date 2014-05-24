<?php   // Breakfast Page 
	require_once "_inc/constants.php";
?>  
<?=$header;?>
<?=$topper;?>
			<h3>Welcome to the order page for the Mittera Breakfast Meeting</h3>
			<section id='breakfastForm'>
				<form action='breakfastForm.php' method='post' id='filledForm' onsubmit='return formValidate()'>
					<table>
						<tbody>
							<tr><th>Name*</th><td><input type='text' name='name'></td></tr>
							<tr><th>Email*</th><td><input type='text' name='email'></td></tr>
							<tr><th>Egg Entre&eacute;</th><td><?= makeList('eggs');?></td></tr>
							<tr><th>Side Choice</th><td><?= makeList('side');?></td></tr>
							<tr><th>Al a Carte</th><td><?= makeList('opt', false);?></td></tr>
							<tr><th>Questions, Comments, or Special Request</th><td><textarea name='comments' rows='6' maxlength='500' placeholder='Special needs, allergies, etc.'></textarea></td></tr>
							<tr><th></th><td><input type='submit' value='Order Up!' name='submit'></td></tr>
						</tbody>
					</table>
					<p>*Required</p>
				</form>
			</section>
<?=$footer;?>	
