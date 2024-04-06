<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Authorization");
header("Content-Type: application/json");


require_once('../vendor/autoload.php'); // Include the JWT library

use \Firebase\JWT\JWT;

// Function to verify and decode JWT token
function verifyJWT($token) {
    $secretKey = "your_secret_key"; // Replace with your secret key
    try {
        $decoded = JWT::decode($token, $secretKey, array('HS256'));
        return $decoded;
    } catch (Exception $e) {
        return false;
    }
}

// Get JWT token from headers
$token = null;
$headers = apache_request_headers();
if (isset($headers['Authorization'])) {
    $token = $headers['Authorization'];
} else {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized"));
    exit();
}

// Verify and decode JWT token
$decodedToken = verifyJWT(str_replace("Bearer ", "", $token));

if ($decodedToken) {
    // Token is valid, retrieve user data
    $userId = $decodedToken->user_id;

    // Database connection
    $conn = new mysqli("localhost", "root", "Pranav@01", "pwa");
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(array("message" => "Database connection failed"));
        exit();
    }

    // Prepare SQL statement
    $sql = "SELECT name, email, mobile FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user data exists
    if ($result->num_rows > 0) {
        $userData = $result->fetch_assoc();
        echo json_encode($userData);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "User not found"));
    }

    // Close database connection
    $stmt->close();
    $conn->close();
} else {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized"));
}
?>
