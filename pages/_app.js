import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import {useEffect, useState} from "react";
import Login from "./login";
import authFacade from "../facades/authFacade";
import { CartProvider } from '../Context/CartContext';




function MyApp({ Component, pageProps }) {

    const [loggedIn,setLoggedIn] = useState(false);

    useEffect( () => {

            (async () => {
                let result = await authFacade.verifyToken();
                setLoggedIn(result.status === 200);
            })();

    },[])


    if(loggedIn){
  return(<>

        <NavBar setIsLoggedIn={setLoggedIn}></NavBar>
        <div className={"container"}>
            <CartProvider>
            <Component {...pageProps} />
            </CartProvider>
        </div>


  </>
  )
    } else {
        return(<>
                <Login setLoggedIn={setLoggedIn} ></Login>
            </>
        )
    }
}

export default MyApp
