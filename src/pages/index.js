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
              <button
                className={clsx("button button--outline button--lg", styles.communityButton)}
                onClick={() => {
                  document.getElementById('community-section')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>
                Community
              </button>
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
        <div className={styles.installCard}>
          <div className={styles.installHeader}>
            <div className={styles.installIcon}>📦</div>
            <div>
              <h3>Get Started with Composer</h3>
              <p className={styles.installSubtitle}>
                We recommend installing the Slim Framework with the{' '}
                <a href="https://getcomposer.org/" target="_blank" rel="noopener noreferrer">
                  Composer
                </a>{' '}
                dependency manager.
              </p>
            </div>
          </div>
          
          <div className={styles.installStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>Create a new project</h4>
              <p>
                The easiest way to start working with Slim is to create a project using{' '}
                <a href="https://github.com/slimphp/Slim-Skeleton">Slim-Skeleton</a> as a base:
              </p>
              <CodeBlock language="bash">
                $ composer create-project slim/slim-skeleton [my-app-name]
              </CodeBlock>
              <p className={styles.stepNote}>Replace <code>[my-app-name]</code> with the desired directory name for your new application.</p>
            </div>
          </div>

          <div className={styles.installStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>Run your application</h4>
              <p>You can then run it with PHP's built-in webserver:</p>
              <CodeBlock language="bash">
                $ cd [my-app-name]; php -S localhost:8080 -t public
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: 'HTTP Router',
      icon: '🚀',
      description: 'Slim provides a fast and powerful router that maps route callbacks to specific HTTP request methods and URIs. It supports parameters and pattern matching.'
    },
    {
      title: 'Middleware',
      icon: '🔧',
      description: 'Build your application with concentric middleware to tweak the HTTP request and response objects around your Slim app.'
    },
    {
      title: 'PSR-7 Support',
      icon: '📋',
      description: 'Slim supports any PSR-7 HTTP message implementation so you may inspect and manipulate HTTP message method, status, URI, headers, cookies, and body.'
    },
    {
      title: 'Dependency Injection',
      icon: '⚡',
      description: 'Slim supports dependency injection so you have complete control of your external tools. Use any PSR-11 ContainerInterface implementation.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h1" className={styles.sectionTitle}>
          <span>Features</span>
        </Heading>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <Heading as="h3" className={styles.featureTitle}>{feature.title}</Heading>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community-section" className={styles.section}>
      <div className="container">
        <Heading as="h1" className={styles.sectionTitle}>
          <span>Community</span>
        </Heading>
        <p className={styles.communityIntro}>
          You can chat with other Slim Framework developers to share code or troubleshoot tricky issues using
          either Slack or Discourse.
        </p>
        <div className={styles.communityGrid}>
          <div className={styles.communityCard}>
            <div className={styles.communityIcon}>💬</div>
            <Heading as="h3">Slack</Heading>
            <p>
              We can be found on <a href="https://slack.com">Slack</a> at{' '}
              <a href="https://slimphp.slack.com">slimphp.slack.com</a>.
            </p>
            <div className={styles.center}>
              <Link
                className={clsx("button button--primary button--lg", styles.primaryButton)}
                href="https://join.slack.com/t/slimphp/shared_invite/zt-81z2y3cy-vHjPqNH_7x_5d5PubtW~Og">
                Get Access to the Slack Channel
              </Link>
            </div>
          </div>
          <div className={styles.communityCard}>
            <div className={styles.communityIcon}>💡</div>
            <Heading as="h3">Discourse forum</Heading>
            <p>
              We also have a Discourse forum at{' '}
              <a href="https://discourse.slimframework.com/">discourse.slimframework.com/</a> for when you have a more in depth question.
            </p>
            <div className={styles.center}>
              <Link
                className={clsx("button button--primary button--lg", styles.primaryButton)}
                href="https://discourse.slimframework.com/">
                Visit the forum
              </Link>
            </div>
          </div>
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
