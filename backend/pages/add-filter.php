<?php

if (isset($_GET['number']) && $_GET['number'] != '') {

    $input = json_decode(file_get_contents('php://input'));

    if (isset($input->filter)) {
        $result = \Telnyx\PhoneNumber::All(["filter" => [
            "phone_number" => $_GET['number']
        ]]);

        if (count($result->data) > 0 && $result->data[0]->phone_number == $_GET['number']) {

            require_once(dirname(__FILE__) . '/../database.php');

            $filter = json_encode($input->filter);

            $update = $db->prepare('UPDATE `filter` SET `filter` = ? WHERE `number` = ?');
            $update->bind_param('ss', $filter, $_GET['number']);
            $update->execute();

            if ($db->affected_rows === 0) {
                $insert = $db->prepare('INSERT INTO `filter` (`number`, `filter`) VALUES (?, ?)');
                $insert->bind_param('ss', $_GET['number'], $filter);
                $insert->execute();
            }

            new Response(json_encode(['result' => 'success']));
        } else {
            new Response(json_encode(['mess' => 'This is not valid or your purchased no!']), 400);
        }
    } else {
        new Response(json_encode(['mess' => 'filter parameter missing!']), 400);
    }
} else {
    new Response(json_encode(['mess' => 'Please provide a valid phone number including country code']), 400);
}
