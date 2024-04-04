<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Authorization");

require_once 'vendor/autoload.php'; // Include JWT library

use Firebase\JWT\JWT;

// Retrieve token from the Authorization header
$token = isset(getallheaders()['Authorization']) ? getallheaders()['Authorization'] : '';

// Your JWT validation logic here
// Verify and decode the token to retrieve user ID
$secret_key = "your_secret_key"; // Same secret key used for JWT token generation
try {
    $decoded = JWT::decode($token, $secret_key, array('HS256'));
    $user_id = $decoded->user_id;

    // Your database query to fetch user data based on the user ID
    $conn = new mysqli("localhost", "root", "Pranav@01", "pwa");
    $sql = "SELECT * FROM users WHERE id = '$user_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Return user data as JSON response
        header('Content-Type: application/json');
        echo json_encode($user);
        exit();
    }
} catch (Exception $e) {
    // Token verification failed
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}
?>
