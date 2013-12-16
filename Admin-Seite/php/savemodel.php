<?PHP 
/*###################################################################
	
	Author: Michael Heil

	Description: Saving recieved XML file to XML directory
		
	ChangeLog: Changes						Version		Date
			   inital Version 				1.0 		12.09.2013
		
################################################################### */
?>

<?php
	//Set recieved data
	$filename = $_POST['name'];
	$xmlFile = $_POST['xmlfile'];

	echo $filename;
	echo $xmlFile;
	//Write XML File
	if(isset($filename)){
		$filename = "xml/" . $filename . ".xml";

		$fp = fopen($filename, "w");
		fwrite($fp, $xmlFile);
		fclose($fp);
	}
?>
