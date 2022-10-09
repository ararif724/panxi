<?php

if (isset($_GET['number']) && $_GET['number'] != '') {

    $result = \Telnyx\PhoneNumber::All(["filter" => [
        "phone_number" => $_GET['number']
    ]]);

    if (count($result->data) > 0 && $result->data[0]->phone_number == $_GET['number']) {

        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        $charsLength = strlen($chars) - 1;
        $code = '';
        for ($i = 1; $i <= 8; $i++) {
            $code .= $chars[rand(0, $charsLength)];
        }

        require_once(dirname(__FILE__) . '/../database.php');

        $update = $db->prepare('UPDATE `number` SET `code` = ? WHERE `number` = ?');
        $update->bind_param('ss', $code, $_GET['number']);
        $update->execute();

        if ($db->affected_rows === 0) {
            $insert = $db->prepare('INSERT INTO `number` (`number`, `code`) VALUES (?, ?)');
            $insert->bind_param('ss', $_GET['number'], $code);
            $insert->execute();
        }

        new Response(json_encode(['result' => 'success', 'code' => $code]));
    } else {
        new Response(json_encode(['mess' => 'This is not valid or your purchased no!']), 400);
    }
} else {
    new Response(json_encode(['mess' => 'Please provide a valid phone number including country code']), 400);
}
