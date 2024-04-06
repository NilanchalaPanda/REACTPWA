<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
    header("Access-Control-Allow-Methods: POST");
    exit();
}

// Database connection
require_once 'db_connection.php';

if (mysqli_connect_error()) {
    echo json_encode(array("message" => "Database connection failed"));
    exit();
}

// Get JWT token from headers
$token = null;
$headers = apache_request_headers();
if (isset($headers['Authorization'])) {
    $token = $headers['Authorization'];
} else {
    http_response_code(401);
    echo "Unauthorized";
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
    echo "Unauthorized Access";
    exit();
}

// Token is valid, retrieve user data
$userId = $decodedToken->user_id;

// Check if all required fields are present in the request
if (!isset($_POST['name'], $_POST['mobile'], $_POST['email'], $_POST['password'])) {
    http_response_code(400);
    echo "Missing required fields";
    exit();
}

$name = $_POST['name'];
$mobile = $_POST['mobile'];
$email = $_POST['email'];
$password = $_POST['password'];

// Hash the password before storing it
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepare SQL statement to insert user into "newusers" table
$sql = "INSERT INTO newusers (name, mobile, email, password) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $mobile, $email, $hashedPassword);

if ($stmt->execute()) {
    http_response_code(201);
    echo "User added successfully";
} else {
    http_response_code(500);
    echo "Failed to add user";
}

// Close database connection
$stmt->close();
$conn->close();
?>