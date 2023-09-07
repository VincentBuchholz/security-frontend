import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";
import authFacade from "../facades/authFacade";
import {useEffect, useState} from "react";

export default function Home() {

    const[isAuthenticated,setIsAuthenticated] = useState("loading");

    const router = useRouter();

    useEffect(()=>{
        (async () => {
            let result = await authFacade.verifyAdmin();
            if(result.status === 200){
                router.push("/products")
            } else {
                router.push("/shop")
            }
        })();
    },[router.isReady])

        return (
            <>
                Loading...
            </>
        )

}
