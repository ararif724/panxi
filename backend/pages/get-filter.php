<?php

if (isset($_GET['number']) && $_GET['number'] != '') {

    $result = \Telnyx\PhoneNumber::All(["filter" => [
        "phone_number" => $_GET['number']
    ]]);

    if (count($result->data) > 0 && $result->data[0]->phone_number == $_GET['number']) {

        require_once(dirname(__FILE__) . '/../database.php');

        $select = $db->prepare('SELECT `filter` FROM `filter` WHERE `number` = ?');
        $select->bind_param('s', $_GET['number']);
        $select->execute();
        $select->bind_result($filter);
        $select->fetch();

        new Response($filter ?? '[]');
    } else {
        new Response(json_encode(['mess' => 'This is not valid or your purchased no!']), 400);
    }
} else {
    new Response(json_encode(['mess' => 'Please provide a valid phone number including country code']), 400);
}
