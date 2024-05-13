<?php
// db_connection.php

$conn = new mysqli("localhost", "root", "Pranav@01", "pwa");

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
}
?>
