---
title: Custom
---
### One route, multiple HTTP methods

Sometimes you may need a route to respond to multiple HTTP methods; sometimes you may need a route to respond to a
custom HTTP method. You can accomplish both with the Route object's `via()` method. This example demonstrates how
to map a resource URI to a callback that responds to multiple HTTP methods.

```php
<?php
$app = new \Slim\Slim();
$app->map('/foo/bar', function() {
    echo "I respond to multiple HTTP methods!";
})->via('GET', 'POST');
$app->run();
```

The route defined in this example will respond to both GET and POST requests for the resource identified by “/foo/bar”.
Specify each appropriate HTTP method as a separate string argument to the Route object's `via()` method. Like other
Route methods (e.g. `name()` and `conditions()`), the `via()` method is chainable:

```php
<?php
$app = new \Slim\Slim();
$app->map('/foo/bar', function() {
    echo "Fancy, huh?";
})->via('GET', 'POST')->name('foo');
$app->run();
```

### One route, custom http methods

The Route object's `via()` method is not limited to just GET, POST, PUT, DELETE, and OPTIONS methods. You may also
specify your own custom HTTP methods (e.g. if you were responding to WebDAV HTTP requests). You can define a route
that responds to a custom “FOO” HTTP method like this:

```php
<?php
$app = new \Slim\Slim();
$app->map('/hello', function() {
    echo "Hello";
})->via('FOO');
$app->run();
```
