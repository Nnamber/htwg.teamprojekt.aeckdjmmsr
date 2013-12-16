<?php
$target_path = "../uploads/";

$target_path = $target_path . basename( $_FILES['uploadedFile']['name']); 
$message = array("error" => false, "message" => "");

if(move_uploaded_file($_FILES['uploadedFile']['tmp_name'], $target_path)) {
	$message["error"] = false;
	$message["message"] = $_FILES['uploadedFile']['name'];
} else{
	$message["error"] = true;
}
echo json_encode($message);
?> 