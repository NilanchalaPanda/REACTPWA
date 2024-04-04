<?php
header('Access-Control-Allow-Origin: *');

$conn = new mysqli("localhost", "root", "Pranav@01", "pwa");

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    // Check if the keys exist in the $_POST array
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Proceed with your SQL query only if all keys are present
    if ($name && $mobile && $email && $password) {
        // Hash the password before storing it
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $sql = "INSERT INTO users(name, mobile, email, password) VALUES('$name', '$mobile', '$email', '$hashedPassword');";
        $res = mysqli_query($conn, $sql);

        if ($res) {
            echo "Success!";
        } else {
            echo "Error!";
        }
    } else {
        echo "Missing required fields!";
    }
    $conn->close();
}
?>
