<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $secret = "6LcU5rkrAAAAACLD8DtGhnNE3pqssSGfuzZdrmjJ"; // your secret key
    $response = $_POST['g-recaptcha-response'] ?? '';

    if (!$response) { echo "❌ Captcha missing"; exit; }

    // Verify captcha with Google
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}&remoteip={$_SERVER['REMOTE_ADDR']}");
    $captcha_success = json_decode($verify);

    if ($captcha_success->success) {
        // Prepare data to send to Google Script
        $postData = $_POST;

        $urls = [
            "https://script.google.com/macros/s/AKfycbyMzyLttOEepL6xxd1UzMPfxQAeHxKCryPSUxo26_Dc2-f0ed2RGpCwl8RKezWEVaU4/exec",
            "https://script.google.com/macros/s/AKfycbyPbLh3KKpInMuVSUPU8HLHF_VwvGUg_S9I2QjjHzYtEwK_8Eb71B6ho0qpWIdVFxkZVA/exec"
        ];

        foreach ($urls as $url) {
            $options = [
                'http' => [
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'POST',
                    'content' => http_build_query($postData),
                ],
            ];
            $context = stream_context_create($options);
            file_get_contents($url, false, $context);
        }

        echo "✅ Message sent successfully!";
    } else {
        echo "❌ reCAPTCHA failed. Please try again.";
    }
}
?>
