<?php

use PHPMailer\PHPMailer\PHPMailer;

// session_start();
// include_once "../vendor/phpmailer/phpmailer/src/class.phpmailer.php";

require_once 'db_connection.php';

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
        // echo "Message has been sent successfully";
    }
}

?>

