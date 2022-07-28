import React, {useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';

// import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <h1 className="hero__title">{siteConfig.title}</h1>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

function HomepageCover() {
    const { siteConfig } = useDocusaurusContext();
    return (
      <header id="demo-cover" className="cover">
        <div className="cover-inner">
          <h1>{siteConfig.title}<small>0.1.5</small></h1>

          <p className="cover-tagline">{siteConfig.tagline}</p>

          <div className="demo">
            <h2 className="demo-headline">DEMO</h2>
            <div className="demo-control">
              <div className="demo-control-field demo-control-enabled">
                <button id="scsaver-toggle" className="rainbow" data-scsaver-enabled="false"><span className="demo-control-enabled-text">Scsaver.js <i id="demo-control-enabled-state">Enabled</i></span></button>
              </div>
              <div className="demo-control-field">
                <div className="demo-control-params">
                  <p><span className="demo-control-params-label">Wait time (ms): </span><span id="scsaver-wait-time">2000</span></p>
                  <p><span className="demo-control-params-label">Fade time (ms): </span>Show <span id="scsaver-show-time">300</span> / Hide <span id="scsaver-hide-time">300</span></p>
                  <p><span className="demo-control-params-label">Progress bar: </span><span id="scsaver-progress-bar">true</span></p>
                  <p><span className="demo-control-params-label">Release events: </span><span id="scsaver-release-events"></span></p>
                  <p><span className="demo-control-params-label">Release event interval: </span><span id="scsaver-event-interval">200</span></p>
                </div>
              </div>
            </div>
          </div>

          <div id="scsaver" className="scsaver black-rainbow">
            <div className="scsaver-inner">
                <h1>Hello, Scsaver.</h1>
            </div>
          </div>

          <div className="action-link">
            <Link to="https://github.com/hamalt/scsaver/" target="_blank" rel="noopener">GitHub</Link>
            <Link to="/docs/getting-started">Get Started</Link>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log("component!!");
            `
          }}
        />
      </header>
    );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    // demoTest();
    console.log("useEffect on Home");

  const option = {
    waitTime: 2000,
    showFadeTime: 300,
    hideFadeTime: 300,
    autoStart: false,
    progressBar: true,
    progressBarParent: '#demo-cover',
    events: [
      'mousemove',
      'click',
      'scroll',
    ],
    on: {
      init: function (e) {
        document.getElementById('scsaver-wait-time').innerText = this.settings.waitTime;
        document.getElementById('scsaver-progress-bar').innerText = this.settings.progressBar;
        document.getElementById('scsaver-show-time').innerText = this.settings.showFadeTime;
        document.getElementById('scsaver-hide-time').innerText = this.settings.hideFadeTime;

        this.settings.events.forEach(function (event) {
          let text = event;
          if ('' !== document.getElementById('scsaver-release-events').innerText) {
            text = ', ' + text;
          }

          document.getElementById('scsaver-release-events').innerText += text;
        });

        document.getElementById('scsaver-event-interval').innerText = this.settings.doInterval;
      },
      // showStart: function(e) {
      //   console.log("showStart");
      // },
      // hideStart: function(e) {
      //   console.log("hideStart");
      // },
    }
  }

  const scsaver = new Scsaver('#scsaver', option);

  const scsaverStateTextElm = document.getElementById('demo-control-enabled-state');
  const scsaverToggleElm = document.getElementById('scsaver-toggle');
  scsaverToggleElm.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.dataset.scsaverEnabled === 'true') {
      scsaver.disabled();
      e.target.dataset.scsaverEnabled = 'false';
      // scsaverStateTextElm.innerText = 'Enabled';
    } else {
      scsaver.enabled();
      e.target.dataset.scsaverEnabled = 'true';
      // scsaverStateTextElm.innerText = 'Disabled';
    }
  });
  }, []);
  // useEffect(() => {
  //   // Only logged in the browser console; nothing is logged during server-side rendering
  //   console.log("I'm now in the browser");
  // }, []);
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <Head>
        <meta property="og:description" content="My custom description" />
        <meta charSet="utf-8" />
        <title>Scsaver.js | Web page screensaver JavaScript library.</title>
        <link rel="stylesheet" href={useBaseUrl('/js/scsaver/scsaver.css?ver=0.1.5')} />
        {/* <script src={useBaseUrl('/js/scsaver/scsaver.min.js?ver=0.1.5')} />;
        <script src={useBaseUrl('/js/demo.js')} />; */}
      </Head>
      
      <HomepageCover />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
