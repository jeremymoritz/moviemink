<?php 
	
	
	function confirmQuery($resultSet) {
		if (!$resultSet) {
			die("Database connection Failed: " . mysql_error());
		}
	}
	
	function makeNav() {
		global $connection;
		$query = "SELECT *"
			.	" FROM irc_pages"
			.	" WHERE Visible = 1"
			.	" ORDER BY irc_pages.Position ASC";
		$pages_set = mysql_query($query, $connection);
		confirmQuery($pages_set);
		$output = '<ul class="leftNav">';
		$output .= '<li><img src="_img/logo.gif" title="IRC logo" alt="Iowa Roofing Company Logo"></li>';
		while ($page = mysql_fetch_array($pages_set)) {
			$output .= "<li><a href='" . "{$page['Link']}" . "'>" . "{$page['Name']}" . "</a></li>";
		}
		$output .= "<li><img src='_img/bbb.jpg' title='BBB' alt='Better Business Bureau'></li>"
				.	"<li><img src='_img/credit_cards.jpg' title='Credit Cards' alt='We accept MasterCard and Visa'></li></ul>";
		return $output;
	}
	
	function getArticle($page='Home') {
		global $connection;
		$query = "SELECT *"
			.	" FROM irc_pages"
			.	" WHERE Name = '" . $page . "'";
		$pages_set = mysql_query($query, $connection);
		confirmQuery($pages_set);
		$result = mysql_fetch_array($pages_set);
		$output = "{$result['Content']}";
		return $output;
	}
	
	function submitReview($name='Anonymous',$title='',$review='I love Iowa Roofing!',$image='house_003.jpg') {
		global $connection;	
		$query = "INSERT INTO irc_reviews (
				name, title, text, img
			) VALUES (
				'{$name}', '{$title}' , '{$review}' , '{$image}'
			)";
		$result = mysql_query($query, $connection);
		if (mysql_affected_rows() == 1) {
			//success
			$message = "Success!";
		} else {
			//failed
			$message = "The review failed.";
			$message .= "<br />" . mysql_error();
		}
		echo $message;
	}
		
	function getReviews($page='Testimonials') {
		global $connection;
		$query = "SELECT *"
			.	" FROM irc_reviews"
			.	" WHERE visible = 1"
			.	" ORDER BY id";
		$reviews_set = mysql_query($query, $connection);
		confirmQuery($reviews_set);
		$output = "<h2>TESTIMONIALS</h2>";
		$output .= "<table class='reviewTable'><tbody>";
		$output .= "<thead><tr><td colspan='2'>From our very satisfied customers</td></tr></thead>";
		$odd1 = 1;
		while ($value = mysql_fetch_assoc($reviews_set)){
			//print_r($value);
			$output .= "<tr>";
			$reviewImg = "<td class='reviewImg'><img src='_img/{$value['img']}' alt='' title='{$value['name']}'></td>"; 
			$reviewText = "<td class='review'><span class='reviewText'>\"{$value['text']}\"</span><span class='reviewName'>{$value['name']}<br>{$value['title']}</span></td>";
			if ($odd1 % 2) {
				$output .= $reviewImg . $reviewText;
			} else {
				$output .= $reviewText . $reviewImg;
			}
			$output .= "</tr>";
			$odd1++;
			
		}
		$output .= "</tbody></table>";
		return $output;
	}
	
	//This file stores all basic functions
	
	function mysqlPrep($value) {
		$magic_quotes_active = get_magic_quotes_gpc();
		$new_enough_php = function_exists("mysql_real_escape_string"); // i.e. PHP >= v4.3.0
		if ( $new_enough_php ) { // PHP v4.3.0 or higher
			if ($magic_quotes_active) {
				$value = stripslashes( $value ) ; 
			}
			$value = mysql_real_escape_string($value);			
		} else {
			if (!$magic_quotes_active) {
				$value = addslashes($value);
			}
		}
		return $value;
	}
	
	function redirectTo($location = NULL) {
		if ($location != NULL) {
			header ("Location: {$location}");
			exit;
		}
	}
	
	function getAllSubjects($public = false) {
		global $connection;
		$query = "SELECT * 
				FROM subjects ";
		if ($public) { $query .= " WHERE visible = 1 ";} 
		$query .= "	ORDER BY position ASC";
		$subject_set = mysql_query($query, $connection);
		confirmQuery($subject_set);
		return $subject_set;
	}
	
	function getPagesForSubject($subject_id, $public = false) {
		global $connection;
		$query = "SELECT * 
				FROM pages 
				WHERE subject_id = {$subject_id} ";
		if ($public) { $query .= " AND visible = 1 ";}
		$query .= "ORDER BY position ASC";
		$page_set = mysql_query($query, $connection);
		confirmQuery($page_set);
		return $page_set;				
	}

	function getSubjectsById($subject_id) {
		global $connection;
		$query3 = "SELECT * ";
		$query3 .= "FROM subjects ";
		$query3 .= "WHERE id=" . $subject_id . " ";
		$query3 .= "LIMIT 1";
		$resultSet = mysql_query($query3, $connection);
		confirmQuery($resultSet);
		// if no rows are returned, it will use the first record
		if ($subject = mysql_fetch_array($resultSet)) {
			return $subject;
		} else {
			return false;
		}
	}
	
	function getPageById($page_id) {
		global $connection;
		$query4 = "SELECT * ";
		$query4 .= "FROM pages ";
		$query4 .= "WHERE id=" . $page_id . " ";
		$query4 .= "LIMIT 1";
		$resultSet = mysql_query($query4, $connection);
		confirmQuery($resultSet);
		// if no rows are returned, it will use the first record
		if ($subject = mysql_fetch_array($resultSet)) {
			return $subject;
		} else {
			getPagesById(1);
		}
	}

	function findTitle() {
		global $sel_subject;
		global $sel_page;
		global $sel_subj;
		if (isset($_GET['subj'])) {
			$sel_subj = $_GET['subj'];
			$sel_subject = getSubjectsById($sel_subj);
			$sel_page = "";
		} elseif (isset($_GET['page'])){
			$sel_page = $_GET['page'];
			$sel_subject = getPageById($sel_page);
			$sel_subj = "";
		} else {
			$sel_page = "";		
			$sel_subj = "";
			$sel_subject = NULL;
		}
	}

	function navigation($sel_subject, $sel_page, $edit = 'edit_subject.php', $editPage = 'content.php', $public = false) {
		$output =  " <ul class='subjects'>";
		$subject_set = getAllSubjects($public);
		while ($subject = mysql_fetch_array($subject_set)) {
			if (!$sel_page) {
				if ($sel_subject['id'] == $subject["id"]) {
					$output .= "<li class =\"selected\">"; 
				}	else {
					$output .= "<li>";
				}
			} else {
				$output .= "<li>";
			}
			$output .= "<a href='{$edit}?subj=" . urlencode($subject["id"]) . "'>{$subject['menu_name']}</a></li>";
			
			$page_set = getPagesForSubject($subject['id'], $public);
			
			if ($edit == 'edit_subject.php' || $sel_subject['id'] == $subject['id']) {
				$output .= "<ul class='pages'>";
				while ($page = mysql_fetch_array($page_set)) {
					if ($sel_page == $page["id"]) {
						$output .= "<li class =\"selected\">"; 	
					} else {
						$output .= "<li>";
					}
					$output .= "<a href='{$editPage}?page=" . urlencode($page["id"]) . "'>{$page['menu_name']}</a></li>";
				}	
				$output .= "</ul>";	
			}
		}
		if($public) { $output .= "<li><a href='login.php'>Log in</a></li>"; }							
		$output .= "</ul>";
		return $output;
	}

	function wordList($sel_subject, $sel_page, $edit = 'edit_subject.php', $editPage = 'content.php', $public = false) {
		$output =  " <ul class='subjects'>";
		$subject_set = getAllSubjects($public);
		while ($subject = mysql_fetch_array($subject_set)) {
			if (!$sel_page) {
				if ($sel_subject['id'] == $subject["id"]) {
					$output .= "<li class =\"selected\">"; 
				}	else {
					$output .= "<li>";
				}
			} else {
				$output .= "<li>";
			}
			$output .= "<a href='{$edit}?subj=" . urlencode($subject["id"]) . "'>{$subject['menu_name']}</a></li>";
			
			$page_set = getPagesForSubject($subject['id'], $public);
			
			if ($edit == 'edit_subject.php' || $sel_subject['id'] == $subject['id']) {
				$output .= "<ul class='pages'>";
				while ($page = mysql_fetch_array($page_set)) {
					if ($sel_page == $page["id"]) {
						$output .= "<li class =\"selected\">"; 	
					} else {
						$output .= "<li>";
					}
					$output .= "<a href='{$editPage}?page=" . urlencode($page["id"]) . "'>{$page['menu_name']}</a></li>";
				}	
				$output .= "</ul>";	
			}
		}
		if($public) { $output .= "<li><a href='login.php'>Log in</a></li>"; }							
		$output .= "</ul>";
		return $output;
	}
?>
