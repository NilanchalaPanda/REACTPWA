<?php
include_once "connect.php";

session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
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
                sendEmail('Login OTP - 2factor','2factor',$email,"Hello User",",<br><br>Your OTP for login is '$otp' and it'll expire in 2 minutes.");

                // Send CSRF token and JWT token in response
                echo json_encode(array("csrf_token" => $csrfToken, "token" => $token));
                
                // // Log the email address from the POST data to a file
                // $logDescription = "New User logged in: "; // Add your description here

                // // Extract email from $_POST if it exists
                // $email = isset($_POST['email']) ? $_POST['email'] : 'No email provided';

                // // Log only the email address
                // $logData = $logDescription . $email . PHP_EOL;
                // file_put_contents('post_data.log', $logData, FILE_APPEND);

                exit(); // Exit script after sending tokens
            } else {
                echo "Incorrect password";
            }
        } else {
            echo "User not found";
        }
    } else {
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
