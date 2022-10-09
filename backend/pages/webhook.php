<?php

if (isset($_GET['webhook_secret']) && $_GET['webhook_secret'] == '39647e088e4546218c8011d9390a7c65') {
    $input = json_decode(file_get_contents('php://input'));

    if (
        isset($input->data->payload->from->phone_number) &&
        isset($input->data->payload->to[0]->phone_number) &&
        isset($input->data->payload->text)
    ) {
        require_once(dirname(__FILE__) . '/../database.php');
        $insert = $db->prepare('INSERT INTO `message` (`from`, `to`, `body`, `date_sent`) VALUES (?, ?, ?, ?)');
        $insert->bind_param('ssss', $from, $to, $body, $time);

        $from = htmlspecialchars($input->data->payload->from->phone_number);
        $to = htmlspecialchars($input->data->payload->to[0]->phone_number);
        $body = htmlspecialchars($input->data->payload->text);
        $time = date('Y-m-d H:i:s');

        $insert->execute();
    }
}
