<?php
session_start();

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$csrf_token = bin2hex(random_bytes(32)); // Generate CSRF token
$_SESSION['csrf_token'] = $csrf_token; // Store token in session

header('Content-Type: application/json');
echo json_encode(['csrf_token' => $csrf_token]);
?>
