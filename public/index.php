<?php
require_once('../backend/route.php');
if (getenv('DEBUG') == 'true') {
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', '0');
    ini_set('display_startup_errors', '0');
    error_reporting(0);
}

require_once('../backend/vendor/telnyx/init.php');
\Telnyx\Telnyx::setApiKey(getenv('TELNYX_KEY'));

date_default_timezone_set('Asia/Hong_Kong');

$route = $_GET['route'] ?? '';
$router->load($route, $_SERVER['REQUEST_METHOD']);
