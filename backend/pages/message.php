<?php

if (isset($_GET['code']) && $_GET['code'] != '') {

    require_once(dirname(__FILE__) . '/../database.php');

    $select = $db->prepare('SELECT `number`.`number`, `filter`.`filter` FROM `number` LEFT JOIN `filter` ON `number`.`number` = `filter`.`number` WHERE `number`.`code` = ?');
    $select->bind_param('s', $_GET['code']);
    $select->execute();
    $select->bind_result($number, $filter);
    $select->fetch();
    $select->close();

    if ($number) {
        $select = $db->prepare('SELECT * FROM `message` WHERE `to` = ?');
        $select->bind_param('s', $number);
        $select->execute();
        $result = $select->get_result();
        $message = $result->fetch_all(MYSQLI_ASSOC);
        $select->close();
        $db->close();

        $filteredMessage = [];
        $filteredId = [];

        if (count($message) > 0 && $filter) {
            $filter = json_decode($filter);
            foreach ($filter as $fltr) {
                if (time() <= strtotime($fltr->expiry)) {
                    foreach ($message as $msg) {
                        if (stripos($msg['body'], $fltr->keyword) !== false && !in_array($msg['id'], $filteredId)) {
                            $filteredId[] = $msg['id'];
                            $filteredMessage[] = $msg;
                        }
                    }
                }
            }
        }

        $resp = [
            'message' => $filteredMessage,
            'filter' => $filter ?? []
        ];

        new Response(json_encode($resp), 200);
    } else {
        new Response(json_encode(['mess' => 'Please provide a valid code']), 400);
    }
} else {
    new Response(json_encode(['mess' => 'Please provide a valid code']), 400);
}
