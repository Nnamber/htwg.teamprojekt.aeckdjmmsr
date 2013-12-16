<?php		if(version_compare(PHP_VERSION, '5.3.0', '<')){  	  set_magic_quotes_runtime(0);	}
	//Set recieved data
	$filename = $_POST['filename'];	$htmlString = $_POST['htmlString'];
	//Write XML File
	if(isset($filename)){		$filename = "../uploads/" . $filename . ".html";
		echo $filename;
		$fp = fopen($filename, "w");		fwrite($fp, $htmlString);
		fclose($fp);
	}
?>
