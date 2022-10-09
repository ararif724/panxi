<?php
require_once('lib/Router.php');
$router = new Router();

$router->register('/', 'get', dirname(__FILE__) . '/pages/home.php');
$router->register('/xiongxiaomao2022', 'get', dirname(__FILE__) . '/pages/home.php');
$router->register('/generate', 'post', dirname(__FILE__) . '/pages/generate.php');
$router->register('/filter', 'get', dirname(__FILE__) . '/pages/get-filter.php');
$router->register('/filter', 'post', dirname(__FILE__) . '/pages/add-filter.php');
$router->register('/message', 'get', dirname(__FILE__) . '/pages/message.php');
$router->register('/webhook', 'post', dirname(__FILE__) . '/pages/webhook.php');
