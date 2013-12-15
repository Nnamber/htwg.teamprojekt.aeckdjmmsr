<?php
$target_path = "uploads/";

$target_path = $target_path . basename( $_FILES['uploadedFile']['name']); 

if(move_uploaded_file($_FILES['uploadedFile']['tmp_name'], $target_path)) {
    echo "<script>alert('Die Datei ".  basename( $_FILES['uploadedFile']['name']). " wurde erfolgreich hochgeladen')</script>";	
} else{
    echo "Ups, da ist was schief gegangen!";
}
  
?> 