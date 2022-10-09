<?php
require_once(dirname(__FILE__).'/Response.php');

class Router
{

    private $routes = [];

    public function __construct()
    {
        $env = explode("\n", file_get_contents(dirname(__FILE__).'/../../.env'));
        foreach($env as $val){
            if($val != ''){
                @putenv($val);
            }
        }
    }

    public function register($route, $method, $filePath)
    {
        $route = trim($route, '/');
        $method = strtolower($method);
        $this->routes[$route][$method] = $filePath;
    }

    public function load($route, $method)
    {
        $route = trim($route, '/');
        $method = strtolower($method);
        if (isset($this->routes[$route])) {
            if (isset($this->routes[$route][$method])) {
                return require_once($this->routes[$route][$method]);
            }
            return new Response('Method Not Allowed', 405);
        }
        return new Response('Not Found', 404);
    }
}
