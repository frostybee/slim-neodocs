---
title: Application
---

The Application, (or `Slim\App`) is the entry point to your Slim application and is used to register the routes that link to your callbacks or controllers.

```php
// instantiate the App object
$app = new \Slim\App();

// Add route callbacks
$app->get('/', function ($request, $response, $args) {
    return $response->withStatus(200)->write('Hello World!');
});

// Run application
$app->run();
```

## Application Configuration

The Application accepts just one argument. This can be either a [Container](../concepts/di) instance or
an array to configure the default container that is created automatically.

There are also a number of settings that are used by Slim. These are stored in the `settings`
configuration key. You can also add your application-specific settings.

For example, we can set the Slim setting `displayErrorDetails` to true and also configure
Monolog like this:

```php
$config = [
    'settings' => [
        'displayErrorDetails' => true,

        'logger' => [
            'name' => 'slim-app',
            'level' => Monolog\Logger::DEBUG,
            'path' => __DIR__ . '/../logs/app.log',
        ],
    ],
];
$app = new \Slim\App($config);
```


### Retrieving Settings

As the settings are stored in the DI container so you can access them via the `settings` key in container factories. For example:

```php
$loggerSettings = $container->get('settings')['logger'];
```

You can also access them in route callables via `$this`:

```php
$app->get('/', function ($request, $response, $args) {
    $loggerSettings = $this->get('settings')['logger'];
    // ...
    
    return $response;
});
```

### Updating Settings

If you need to add or update settings stored in the DI container *after* the container is initialized,
you can use the `replace` method on the settings container. For example:

```php
$settings = $container->get('settings');
$settings->replace([
    'displayErrorDetails' => true,
    'determineRouteBeforeAppMiddleware' => true,
]);
```

## Slim Default Settings

Slim has the following default settings that you can override:

**`httpVersion`**
: The protocol version used by the [Response](../objects/response) object.
  (Default: `'1.1'`)

**`responseChunkSize`**
: Size of each chunk read from the Response body when sending to the browser.
  (Default: `4096`)

**`outputBuffering`**
: If `false`, then no output buffering is enabled. If `'append'` or `'prepend'`, then any `echo` or `print` statements are captured and are either appended or prepended to the Response returned from the route callable.
  (Default: `'append'`)

**`determineRouteBeforeAppMiddleware`**
: When true, the route is calculated before any middleware is executed. This means that you can inspect route parameters in middleware if you need to.
  (Default: `false`)

**`displayErrorDetails`**
: When true, additional information about exceptions are displayed by the [default error handler](../handlers/error).
  (Default: `false`)

**`addContentLengthHeader`**
: When true, Slim will add a `Content-Length` header to the response. If you are using a runtime analytics tool, such as New Relic, then this should be disabled.
  (Default: `true`)

**`routerCacheFile`**
: Filename for caching the FastRoute routes. Must be set to a valid filename within a writeable directory. If the file does not exist, then it is created with the correct cache information on first run.
  Set to `false` to disable the FastRoute cache system.
  (Default: `false`)
