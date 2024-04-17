<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Start session
session_start();

$otp = isset($_POST['otp']) ? $_POST['otp'] : '';
$otp_session = $_SESSION['otp'];
// // Log session ID to file
// $logDescription = "Session ID in verify_otp.php: "; // Description for the log entry
// $logData = $logDescription . session_id() . PHP_EOL;
// file_put_contents('post_data.log', $logData, FILE_APPEND);
// // Log OTP from session to a file
// $logDescription = "OTP from Session: "; // Description for the log entry
// $logData = $logDescription . $otp_session . PHP_EOL;
// file_put_contents('post_data.log', $logData, FILE_APPEND);

if($otp == $otp_session) {
    http_response_code(200);
    echo("Verification complete");
} else {
    http_response_code(401);
    echo("Unauthorized access");
    exit();
}
?>
