---
title: Custom
---
A Slim application delegates rendering of templates to its view object. A custom view is a subclass
of `\Slim\View` that implements this interface:

```php
<?php
public render(string $template);
```

The view object's `render` method must return the rendered content of the template specified by its
`$template` argument. When the custom view’s render method is invoked, it is passed the desired template
pathname (relative to the Slim application's “templates.path” setting) as its argument. Here's an example
custom view:

```php
<?php
class CustomView extends \Slim\View
{
    public function render($template)
    {
        return 'The final rendered template';
    }
}
```

The custom view can do whatever it wants internally so long as it returns the template’s rendered output as a string.
A custom view makes it easy to integrate popular PHP template systems like Twig or Smarty.

:::info Heads Up!
A custom view may access data passed to it by the Slim application's
`render()` method with `$this->data`.
:::

You can browse ready-to-use custom views that work with popular PHP template engines in the Slim-Extras repository
on GitHub.

### Example View

```php
<?php
class CustomView extends \Slim\View
{
    public function render($template)
    {
        // $template === 'show.php'
        // $this->data['title'] === 'Sahara'
    }
}
```

### Example Integration

If the custom view is not discoverable by a registered autoloader, it must be required before the Slim application
is instantiated.

```php
<?php
require 'CustomView.php';

$app = new \Slim\Slim(array(
    'view' => new CustomView()
));

$app->get('/books/:id', function ($id) use ($app) {
    $app->render('show.php', array('title' => 'Sahara'));
});

$app->run();
```
