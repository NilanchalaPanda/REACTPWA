<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

session_start();
// Log received data
// file_put_contents('received_data.log', print_r($_POST, true));
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
                echo json_encode(array("token" => $token));
                exit(); // Exit script after sending token
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
