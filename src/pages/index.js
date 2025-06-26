import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroBackground}></div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.titleContainer}>
              <div className={styles.siteTitle}>Slim</div>
              <div className={styles.siteSlogan}>a micro framework for PHP</div>
            </div>
            <p className={styles.leadText}>
              Slim is a PHP micro framework that helps you quickly write simple
              yet powerful web applications and APIs.
            </p>
            <div className={styles.featureHighlights}>
              <div className={styles.highlight}>⚡ Fast & Lightweight</div>
              <div className={styles.highlight}>🎯 PSR-7 Compatible</div>
              <div className={styles.highlight}>🔧 Easy to Use</div>
            </div>
            <div className={styles.buttons}>
              <Link
                className={clsx("button button--primary button--lg", styles.primaryButton)}
                to="/docs/v4">
                Get Started
              </Link>
              <Link
                className={clsx("button button--outline button--lg", styles.blogButton)}
                to="/blog">
                Blog
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.codeExample}>
              <div className={styles.darkCodeBlock}>
                <CodeBlock language="php" title="Hello World Example">
{`<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});

$app->run();`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function DownloadInstall() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h1" className={styles.sectionTitle}>
          <span>Download & Install</span>
        </Heading>
        <p>
          We recommend you install the Slim Framework with the{' '}
          <a href="https://getcomposer.org/" target="_blank" rel="noopener noreferrer">
            Composer
          </a>{' '}
          dependency manager.
        </p>
        <p>
          The easiest way to start working with Slim is to create a project using{' '}
          <a href="https://github.com/slimphp/Slim-Skeleton">Slim-Skeleton</a> as a base
          by running this bash command:
        </p>
        <CodeBlock language="bash">
          $ composer create-project slim/slim-skeleton [my-app-name]
        </CodeBlock>
        <p>Replace <code>[my-app-name]</code> with the desired directory name for your new application.</p>
        <p>You can then run it with PHP's built-in webserver:</p>
        <CodeBlock language="bash">
          $ cd [my-app-name]; php -S localhost:8080 -t public
        </CodeBlock>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: 'HTTP Router',
      icon: '✈️',
      description: 'Slim provides a fast and powerful router that maps route callbacks to specific HTTP request methods and URIs. It supports parameters and pattern matching.'
    },
    {
      title: 'Middleware',
      icon: '🎯',
      description: 'Build your application with concentric middleware to tweak the HTTP request and response objects around your Slim app.'
    },
    {
      title: 'PSR-7 Support',
      icon: '🔄',
      description: 'Slim supports any PSR-7 HTTP message implementation so you may inspect and manipulate HTTP message method, status, URI, headers, cookies, and body.'
    },
    {
      title: 'Dependency Injection',
      icon: '🔌',
      description: 'Slim supports dependency injection so you have complete control of your external tools. Use any PSR-11 ContainerInterface implementation.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h1" className={styles.sectionTitle}>
          <span>Features</span>
        </Heading>
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--6">
              <div className={styles.feature}>
                <Heading as="h3">
                  <span className={styles.featureIcon}>{feature.icon}</span> {feature.title}
                </Heading>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h1" className={styles.sectionTitle}>
          <span>Community</span>
        </Heading>
        <p>
          You can chat with other Slim Framework developers to share code or troubleshoot tricky issues using
          either Slack or Discourse.
        </p>
        <Heading as="h2">Slack</Heading>
        <p>
          We can be found on <a href="https://slack.com">Slack</a> at{' '}
          <a href="https://slimphp.slack.com">slimphp.slack.com</a>.
        </p>
        <div className={styles.center}>
          <Link
            className="button button--primary button--lg"
            href="https://join.slack.com/t/slimphp/shared_invite/zt-81z2y3cy-vHjPqNH_7x_5d5PubtW~Og">
            Get Access to the Slack Channel
          </Link>
        </div>
        <Heading as="h2">Discourse forum</Heading>
        <p>
          We also have a Discourse forum at{' '}
          <a href="https://discourse.slimframework.com/">discourse.slimframework.com/</a> for when you have a more in depth question.
        </p>
        <div className={styles.center}>
          <Link
            className="button button--primary button--lg"
            href="https://discourse.slimframework.com/">
            Visit the forum
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title={`Slim Framework`}
      description="Slim is a PHP micro framework that helps you quickly write simple yet powerful web applications and APIs.">
      <HomepageHeader />
      <main>
        <DownloadInstall />
        <Features />
        <Community />
      </main>
    </Layout>
  );
}
