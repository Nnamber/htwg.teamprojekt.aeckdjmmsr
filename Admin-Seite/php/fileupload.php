<?php
$target_path = "../uploads/";

$target_path = $target_path . basename( $_FILES['uploadedFile']['name']); 

if(move_uploaded_file($_FILES['uploadedFile']['tmp_name'], $target_path)) {
	$headerSuccess = "Location: ../index.html?success=uploads/".  basename( $_FILES['uploadedFile']['name']);
	header( $headerSuccess );
} else{
	$headerFail = "Location: ../index.html?fail=uploads/".  basename( $_FILES['uploadedFile']['name']);
	header( $headerFail );
}
?> 