<?php
require_once('../backend/route.php');
if(getenv('DEBUG') != false){
    error_reporting(0);
}

require_once('../backend/vendor/telnyx/init.php');
\Telnyx\Telnyx::setApiKey(getenv('TELNYX_KEY'));

date_default_timezone_set('Asia/Hong_Kong');

$route = $_GET['route'] ?? '';
$router->load($route, $_SERVER['REQUEST_METHOD']);
