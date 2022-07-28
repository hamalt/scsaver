import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'What it is',
    Svg: require('@site/static/img/icons8-what.svg').default,
    description: (
      <>
        A JavaScript library that implements the screen saver function on the browser.
      </>
    ),
  },
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/icons8-easy.svg').default,
    description: (
      <>
        Scsaver.js is designed to be easy to use and customize.
      </>
    ),
  },
  {
    title: 'Vanilla JavaScript',
    Svg: require('@site/static/img/icons8-javascript.svg').default,
    description: (
      <>
        The code is JavaScript only and does not use jQuery.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
