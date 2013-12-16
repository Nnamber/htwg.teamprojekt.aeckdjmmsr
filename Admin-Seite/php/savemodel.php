<?php		if(version_compare(phpversion(), '5.3.0', '<')){		if (get_magic_quotes_gpc()) {			$htmlString = stripslashes($_POST['htmlString']);					}	}else{		$htmlString = $_POST['htmlString'];	}
	//Set recieved data
	$filename = $_POST['filename'];
	$message = array();	
	if(isset($filename)){		$filename = "../uploads/" . $filename . ".html";

		$fp = fopen($filename, "w");		fwrite($fp, $htmlString);
		fclose($fp);				$filename . ".html";		$message[error] = false;		$message[message] = $_POST['filename'].".html";
	}else{		$message[error] = true;	}	echo json_encode($message);
?>
