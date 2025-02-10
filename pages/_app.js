import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-solarizedlight.min.css';
import './../components/myLayout/index.scss';
// require('prismjs/themes/prism-solarizedlight.min.css');

function MyApp({ Component, pageProps }) {
  return (
    <>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
