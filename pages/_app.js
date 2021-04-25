import '../styles/globals.css'
import '../styles/style.css'
import 'semantic-ui-css/semantic.min.css'
import Layout from "../src/components/Layout";

function App({ Component, pageProps }) {
  return(
      <Layout>
        <Component {...pageProps} />
      </Layout>
      )
}

export default App
