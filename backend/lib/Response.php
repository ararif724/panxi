<?php

class Response
{
    public function __construct($content, $code = 200, $type = 'text/html', $charset = 'UTF-8')
    {
        header("Content-Type: $type; charset=$charset");
        http_response_code($code);
        echo $content;
    }
}
