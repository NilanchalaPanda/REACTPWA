<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$otp = isset($_POST['otp']) ? $_POST['otp'] : '';
$otp_session = $_SESSION['otp'];

if($otp==$otp_session){
    http_response_code(200);
    echo("Verification complete");
}
else{
    http_response_code(401);
    echo("Unauthorised access");
    exit();
}
?>