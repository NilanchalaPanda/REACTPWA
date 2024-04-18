<?php

session_start();
require_once "connect.php";
// // Log session ID to file
// $logDescription = "Session ID in login.php: "; // Description for the log entry
// $logData = $logDescription . session_id() . PHP_EOL;
// file_put_contents('post_data.log', $logData, FILE_APPEND);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;

require_once 'db_connection.php';



if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $inputOTP = isset($_POST['otp']) ? $_POST['otp'] : false;

    if ($email && $password) {
        // Check if email exists
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                // Password is correct, generate JWT token
                $token = generateJWT($user['id']); // Assuming 'id' is the unique identifier for the user

                // Generate CSRF token
                $csrfToken = bin2hex(random_bytes(32)); // Generate a random CSRF token
                $_SESSION['csrf_token'] = $csrfToken;

                $otp = mt_rand(11111,99999);
                $_SESSION['otp'] = $otp;
                sendEmail('Login OTP - 2 factor authentication','2factor',$email,"<br><br>Your OTP for login is $otp and it'll expire in 2 minutes.");

                // Send CSRF token and JWT token in response
                echo json_encode(array("success" => true, "message" => "Details fetched", "csrf_token" => $csrfToken, "token" => $token,"dotp"=>$otp));
                
                // // Log the email address from the POST data to a file
                // $logDescription = "New User logged in: "; // Add your description here

                // // Extract email from $_POST if it exists
                // $email = isset($_POST['email']) ? $_POST['email'] : 'No email provided';

                // // Log only the email address
                // $logData = $logDescription . $email . PHP_EOL;
                // file_put_contents('post_data.log', $logData, FILE_APPEND);

                exit(); // Exit script after sending tokens
            } else {
                echo json_encode(array("success" => false, "message" => "Incorrect password"));
                exit();
            }
        } else {
            echo json_encode(array("success" => false, "message" => "User not found"));
            exit();
        }
    } else if($inputOTP){
        if(isset($_SESSION['otp']) && $_SESSION['otp'] == $inputOTP) {
            echo json_encode(array("success" => true, "message" => "OTP verified"));
        }
        else {
            echo json_encode(array("success" => false, "message" => "Incorrect OTP"));
        }
    }
    else{    
        echo "Missing required fields";
    }

    $conn->close();
}

// Function to generate JWT token
function generateJWT($userId) {
    $secretKey = "your_secret_key"; // Replace with your secret key
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;  // Token expires in 1 hour
    $payload = array(
        'user_id' => $userId,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );
    return JWT::encode($payload, $secretKey, 'HS256'); // Include algorithm 'HS256'
}
?>