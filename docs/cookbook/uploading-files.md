---
title: Uploading files using POST forms
---

Files that are uploaded using forms in POST requests can be retrieved with the Request method `getUploadedFiles()`.

When uploading files using a POST request, make sure your file upload form has the
attribute `enctype="multipart/form-data"` otherwise `getUploadedFiles()` will return an empty array.

If multiple files are uploaded for the same input name, add brackets after the input name in the HTML, otherwise only one uploaded file will be returned for the input name by `getUploadedFiles()`.

Below is an example HTML form that contains both single and multiple file uploads.

```html title="Example HTML form for file uploads"
<!-- make sure the attribute enctype is set to multipart/form-data -->
<form method="post" enctype="multipart/form-data">
    <!-- upload of a single file -->
    <p>
        <label>Add file (single): </label><br/>
        <input type="file" name="example1"/>
    </p>

    <!-- multiple input fields for the same input name, use brackets -->
    <p>
        <label>Add files (up to 2): </label><br/>
        <input type="file" name="example2[]"/><br/>
        <input type="file" name="example2[]"/>
    </p>

    <!-- one file input field that allows multiple files to be uploaded, use brackets -->
    <p>
        <label>Add files (multiple): </label><br/>
        <input type="file" name="example3[]" multiple="multiple"/>
    </p>

    <p>
        <input type="submit"/>
    </p>
</form>
```

Uploaded files can be moved to a directory using the `moveTo` method. 
Below is an example application that handles the uploaded files of the HTML form above.

```php title="Example Slim application to handle the uploaded files"
<?php

use DI\ContainerBuilder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\UploadedFileInterface;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$containerBuilder = new ContainerBuilder();
$container = $containerBuilder->build();

$container->set('upload_directory', __DIR__ . '/uploads');

AppFactory::setContainer($container);
$app = AppFactory::create();

$app->post('/', function (ServerRequestInterface $request, ResponseInterface $response) {
    $directory = $this->get('upload_directory');
    $uploadedFiles = $request->getUploadedFiles();

    // handle single input with single file upload
    $uploadedFile = $uploadedFiles['example1'];
    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
        $filename = moveUploadedFile($directory, $uploadedFile);
        $response->getBody()->write('Uploaded: ' . $filename . '<br/>');
    }

    // handle multiple inputs with the same key
    foreach ($uploadedFiles['example2'] as $uploadedFile) {
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $filename = moveUploadedFile($directory, $uploadedFile);
            $response->getBody()->write('Uploaded: ' . $filename . '<br/>');
        }
    }

    // handle single input with multiple file uploads
    foreach ($uploadedFiles['example3'] as $uploadedFile) {
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $filename = moveUploadedFile($directory, $uploadedFile);
            $response->getBody()->write('Uploaded: ' . $filename . '<br/>');
        }
    }

    return $response;
});

/**
 * Moves the uploaded file to the upload directory and assigns it a unique name
 * to avoid overwriting an existing uploaded file.
 *
 * @param string $directory The directory to which the file is moved
 * @param UploadedFileInterface $uploadedFile The file uploaded file to move
 *
 * @return string The filename of moved file
 */
function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile)
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

    // see http://php.net/manual/en/function.random-bytes.php
    $basename = bin2hex(random_bytes(8));
    $filename = sprintf('%s.%0.8s', $basename, $extension);

    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

    return $filename;
}

$app->run();
```
