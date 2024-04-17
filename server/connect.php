<?php

use PHPMailer\PHPMailer\PHPMailer;

session_start();
include_once "class.phpmailer.php";

$conn = new mysqli("localhost", "root", "atharva@123", "PWA2FA");

function sendEmail($subject, $from_name, $email, $content) {
    $mail = new PHPMailer();
    $mail->CharSet = "utf-8";
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    
    // Check if $client is empty or "gmail"
    $client = ""; // Assuming $client is defined somewhere else
    if ($client == "" || $client == "gmail") {
        $mail->Host = "smtp.gmail.com";
        $mail->Username = "mulamatharva43@gmail.com";
        $mail->Password = "tiboiecgorfpvszj";
        $mail->Port = 587;
        $mail->setFrom('mulamatharva43@gmail.com', $from_name);
    }
    
    // Check if $email is an array
    if (is_array($email)) {
        foreach ($email as $recipient) {
            $mail->AddAddress($recipient);
        }
    } else {
        $mail->AddAddress($email);
    }
    
    $mail->Subject = $subject;
    $mail->IsHTML(true);
    $mail->Body = $content;

    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message has been sent successfully";
    }
}

?>


<meta name="viewport" content="width=device-width,initial-scale=1.0">

<style>
body{
    display: flex;
    justify-content: center;
    align-items: center;
}
h1,h2,h3,h4{
    margin: 0px;
    padding: 0px;
}
</style>