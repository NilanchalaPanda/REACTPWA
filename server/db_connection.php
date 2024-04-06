<?php
// db_connection.php

$conn = new mysqli("localhost", "root", "Nil@_2003", "pwa_project");

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
}
?>
