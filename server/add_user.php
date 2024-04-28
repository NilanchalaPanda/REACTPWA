<?php

ini_set("session.cookie_domain", '.localhost');
session_set_cookie_params(3600, '/', '.localhost', true, true);

session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Methods: POST");
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
    header("Access-Control-Allow-Methods: POST");
    header('Access-Control-Allow-Credentials: true');
    exit();
}

// Database connection
require_once 'db_connection.php';

if (mysqli_connect_error()) {
    echo json_encode(array("success" => false, "message" => "Database connection failed"));
    exit();
}

// Get JWT token from headers
$token = null;
$headers = apache_request_headers();
if (isset($headers['Authorization'])) {
    $token = $headers['Authorization'];
} else {
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "Unauthorized"));
    exit();
}

// Verify and decode JWT token
require_once('../vendor/autoload.php'); // Include the JWT library
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

// Function to verify and decode JWT token
function verifyJWT($token) {
    $secretKey = "your_secret_key"; // Replace with your secret key
    try {
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        return false;
    }
}

// Verify JWT token
$decodedToken = verifyJWT(str_replace("Bearer ", "", $token));

if (!$decodedToken) {
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "Unauthorized access"));
    exit();
}

// Token is valid, retrieve user data
$userId = $decodedToken->user_id;

// // Log the contents of the POST data to a file
// $logDescription = "New User Added: "; // Add your description here

// // Exclude password field
// $postData = $_POST;
// unset($postData['password']);

// $logData = $logDescription . json_encode($postData) . PHP_EOL;
// file_put_contents('post_data.log', $logData, FILE_APPEND);



// Check if all required fields are present in the request
if (!isset($_POST['name'], $_POST['mobile'], $_POST['email'], $_POST['password'])) {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "All fields are required"));
    exit();
}

$name = $_POST['name'];
$mobile = $_POST['mobile'];
$email = $_POST['email'];
$password = $_POST['password'];
$csrfToken = $_POST['csrf_token'];

// CSRF token validation
$csrfTokenSession = isset($_SESSION['csrf_token']) ? $_SESSION['csrf_token'] : '';
if (!isset($_SESSION['csrf_token']) || $csrfToken !== $_SESSION['csrf_token']) {
    echo json_encode(array("success" => false, "message" => "CSRF token validation failed"));
    exit();
}


// Hash the password before storing it
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepare SQL statement to insert user into "newusers" table
$sql = "INSERT INTO newusers (name, mobile, email, password) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $mobile, $email, $hashedPassword);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(array("success" => true, "message" => "User added successfully"));
} else {
    http_response_code(500);
    echo json_encode(array("success" => false, "message" => "Failed to add user"));
}

// Close database connection
$stmt->close();
$conn->close();
?>