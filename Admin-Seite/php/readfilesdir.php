<?PHP 
/*###################################################################
	
	Author: Michael Heil

	Description: PHP script to fetch all files from xml directory
		
	ChangeLog: Changes						Version		Date
			   inital Version 				1.0 		12.09.2013
		
################################################################### */
?>

<?php
if ($handle = opendir('xml/')) {
    $counter = 0;
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != "..") {
            echo $file."+";
        }
    }
    closedir($handle);
}
?>
