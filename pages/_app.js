import '../styles/globals.css';
import Layout from '../components/layout/Layout';


function HomePage({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default HomePage;
