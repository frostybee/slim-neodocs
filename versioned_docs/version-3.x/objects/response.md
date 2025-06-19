---
title: Response
---

Your Slim app's routes and middleware are given a PSR-7 response object that
represents the current HTTP response to be returned to the client. The response
object implements the [PSR-7 ResponseInterface][psr7] with which you can
inspect and manipulate the HTTP response status, headers, and body.

[psr7]: http://www.php-fig.org/psr/psr-7/#3-2-1-psr-http-message-responseinterface

## How to get the Response object

The PSR-7 response object is injected into your Slim application routes as the
second argument to the route callback like this:

```php
<?php
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

$app = new \Slim\App;
$app->get('/foo', function (ServerRequestInterface $request, ResponseInterface $response) {
    // Use the PSR-7 $response object

    return $response;
});
$app->run();
```

The PSR-7 response object is injected into your Slim application _middleware_
as the second argument of the middleware callable like this:

```php
<?php
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

$app = new \Slim\App;
$app->add(function (ServerRequestInterface $request, ResponseInterface $response, callable $next) {
    // Use the PSR-7 $response object

    return $next($request, $response);
});
// Define app routes...
$app->run();
```

## The Response Status

Every HTTP response has a numeric [status code][statuscodes]. The status code
identifies the _type_ of HTTP response to be returned to the client. The PSR-7
Response object's default status code is `200` (OK). You can get the PSR-7
Response object's status code with the `getStatusCode()` method like this.

[statuscodes]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10

```php
$status = $response->getStatusCode();
```

You can copy a PSR-7 Response object and assign a new status code like this:

```php
$newResponse = $response->withStatus(302);
```

## The Response Headers

Every HTTP response has headers. These are metadata that describe the HTTP
response but are not visible in the response's body. Slim's PSR-7
Response object provides several methods to inspect and manipulate its headers.

### Get All Headers

You can fetch all HTTP response headers as an associative array with the PSR-7
Response object's `getHeaders()` method. The resultant associative array's keys
are the header names and its values are themselves a numeric array of string
values for their respective header name.

```php
$headers = $response->getHeaders();
foreach ($headers as $name => $values) {
    echo $name . ": " . implode(", ", $values);
}
```

### Get One Header

You can get a single header's value(s) with the PSR-7 Response object's
`getHeader($name)` method. This returns an array of values for the given header
name. Remember, _a single HTTP header may have more than one value!_

```php
$headerValueArray = $response->getHeader('Vary');
```

You may also fetch a comma-separated string with all values for a given header
with the PSR-7 Response object's `getHeaderLine($name)` method. Unlike the
`getHeader($name)` method, this method returns a comma-separated string.

```php
$headerValueString = $response->getHeaderLine('Vary');
```

### Detect Header

You can test for the presence of a header with the PSR-7 Response object's
`hasHeader($name)` method.

```php
if ($response->hasHeader('Vary')) {
    // Do something
}
```

### Set Header

You can set a header value with the PSR-7 Response object's
`withHeader($name, $value)` method.

```php
$newResponse = $oldResponse->withHeader('Content-type', 'application/json');
```

:::info Reminder
The Response object is immutable. This method returns a *copy* of the Response object that has the new header value. **This method is destructive**, and it *replaces* existing header values already associated with the same header name.
:::

### Append Header

You can append a header value with the PSR-7 Response object's
`withAddedHeader($name, $value)` method.

```php
$newResponse = $oldResponse->withAddedHeader('Allow', 'PUT');
```

:::info Reminder
Unlike the `withHeader()` method, this method *appends* the new value to the set of values that already exist for the same header name. The Response object is immutable. This method returns a *copy* of the Response object that has the appended header value.
:::

### Remove Header

You can remove a header with the Response object's `withoutHeader($name)` method.

```php
$newResponse = $oldResponse->withoutHeader('Allow');
```

:::info Reminder
The Response object is immutable. This method returns a *copy* of the Response object that has the appended header value.
:::

## The Response Body

An HTTP response typically has a body. Slim provides a PSR-7 Response object
with which you can inspect and manipulate the eventual HTTP response's body.

Just like the PSR-7 Request object, the PSR-7 Response object implements
the body as an instance of `\Psr\Http\Message\StreamInterface`. You can get
the HTTP response body `StreamInterface` instance with the PSR-7 Response
object's `getBody()` method. The `getBody()` method is preferable if the
outgoing HTTP response length is unknown or too large for available memory.

```php
$body = $response->getBody();
```

The resultant `\Psr\Http\Message\StreamInterface` instance provides the following
methods to read from, iterate, and write to its underlying PHP `resource`.

* `getSize()`
* `tell()`
* `eof()`
* `isSeekable()`
* `seek()`
* `rewind()`
* `isWritable()`
* `write($string)`
* `isReadable()`
* `read($length)`
* `getContents()`
* `getMetadata($key = null)`

Most often, you'll need to write to the PSR-7 Response object. You can write
content to the `StreamInterface` instance with its `write()` method like this:

```php
$body = $response->getBody();
$body->write('Hello');
```

You can also _replace_ the PSR-7 Response object's body with an entirely new
`StreamInterface` instance. This is particularly useful when you want to pipe
content from a remote destination (e.g. the filesystem or a remote API) into
the HTTP response. You can replace the PSR-7 Response object's body with
its `withBody(StreamInterface $body)` method. Its argument **MUST** be an
instance of `\Psr\Http\Message\StreamInterface`.

```php
$newStream = new \GuzzleHttp\Psr7\LazyOpenStream('/path/to/file', 'r');
$newResponse = $oldResponse->withBody($newStream);
```

:::info Reminder
The Response object is immutable. This method returns a *copy* of the Response object that contains the new body.
:::

## Returning JSON

Slim's Response object has a custom method `withJson($data, $status, $encodingOptions)` to help simplify the process of returning JSON data.

The `$data` parameter contains the data structure you wish returned as JSON. `$status` is optional, and can be used to return a custom HTTP code. `$encodingOptions` is optional, and are the same encoding options used for [`json_encode()`][json_encode].

In it's simplest form, JSON data can be returned with a default 200 HTTP status code.

```php
$data = array('name' => 'Bob', 'age' => 40);
$newResponse = $oldResponse->withJson($data);
```

We can also return JSON data with a custom HTTP status code.

```php
$data = array('name' => 'Rob', 'age' => 40);
$newResponse = $oldResponse->withJson($data, 201);
```

The `Content-Type` of the Response is automatically set to `application/json;charset=utf-8`.

If there is a problem encoding the data to JSON, a `\RuntimeException($message, $code)` is thrown containing the values of [`json_last_error_msg()`][json_last_error_msg] as the `$message` and [`json_last_error()`][json_last_error] as the `$code`.

:::info Reminder
The Response object is immutable. This method returns a *copy* of the Response object that has a new Content-Type header. **This method is destructive**, and it *replaces* the existing Content-Type header. The Status is also replaced if a $status was passed when `withJson()` was called.
:::

[json_encode]: http://php.net/manual/en/function.json-encode.php
[json_last_error]: http://php.net/manual/en/function.json-last-error.php
[json_last_error_msg]: http://php.net/manual/en/function.json-last-error-msg.php

## Returning a Redirect

Slim's Response object has a custom method `withRedirect($url, $status = null)` when you wish to return a redirect to another URL. You provide the `$url` where you wish the client to be redirected to along with an optional `$status` code. The status code defaults to `302` if not provided.

```php
return $response->withRedirect('/new-url', 301);
```
