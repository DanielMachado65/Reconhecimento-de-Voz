<?php 
	$existingNames = array("Daniel", "Dennis", "Danny", "Jane");
	if (isset($_POST['suggestion'])) {
		echo "<p>" + $_POST['suggestion'] + "</p>";
		$name = $_POST['suggestion'];
		if (!empty($name)){
			foreach ($existingNames as $names) {
				if (strpos($names, $name) !== false) {
					echo $names;
					echo "<br>";
				} 
			}
		}	
	}
?>