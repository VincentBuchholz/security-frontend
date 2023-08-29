import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";




function MyApp({ Component, pageProps }) {
  return(<>

        <NavBar></NavBar>
        <div className={"container"}>
            <Component {...pageProps} />
        </div>


  </>
  )
}

export default MyApp
