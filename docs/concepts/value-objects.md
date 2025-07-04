---
title: PSR-7 and Value Objects
---

Slim supports [PSR-7](https://github.com/php-fig/http-message) interfaces for its Request and Response objects. 
This makes Slim flexible because it can use _any_ PSR-7 implementation. 
For example, you could return an instance of `GuzzleHttp\Psr7\CachingStream` or any instance returned by the `GuzzleHttp\Psr7\stream_for()` function.

Slim provides its own PSR-7 implementation. 
However, you are free to [install a third-party implementation](../start/installation).

## Value objects

Request and Response objects are [_immutable value objects_](http://en.wikipedia.org/wiki/Value_object).
They can be "changed" only by requesting a cloned version that has updated property values. 
Value objects have a nominal overhead because they must be cloned when their properties are updated. 
This overhead does not affect performance in any meaningful way.

You can request a copy of a value object by invoking any of its PSR-7 interface methods (these methods typically have a `with` prefix). 
For example, a PSR-7 Response object has a `withHeader($name, $value)` method that returns a cloned value object with the new HTTP header.

```php
<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/foo', function (Request $request, Response $response, array $args) {
    $payload = json_encode(['hello' => 'world'], JSON_PRETTY_PRINT);
    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
```

The PSR-7 interface provides these methods to transform Request and Response objects:

* `withProtocolVersion($version)`
* `withHeader($name, $value)`
* `withAddedHeader($name, $value)`
* `withoutHeader($name)`
* `withBody(StreamInterface $body)`

The PSR-7 interface provides these methods to transform Request objects:

* `withMethod($method)`
* `withUri(UriInterface $uri, $preserveHost = false)`
* `withCookieParams(array $cookies)`
* `withQueryParams(array $query)`
* `withUploadedFiles(array $uploadedFiles)`
* `withParsedBody($data)`
* `withAttribute($name, $value)`
* `withoutAttribute($name)`

The PSR-7 interface provides these methods to transform Response objects:

* `withStatus($code, $reasonPhrase = '')`

Refer to the [PSR-7 documentation](https://www.php-fig.org/psr/psr-7/) 
for more information about these methods.
