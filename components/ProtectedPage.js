import {useEffect, useState} from "react";
import authFacade from "../facades/authFacade";
import {useRouter} from "next/router";

function ProtectedPage({isAuthenticated,setIsAuthenticated}) {

    const router = useRouter();

    useEffect(()=>{
        (async () => {
            let result = await authFacade.verifyAdmin();
            if(result.status === 200){
                setIsAuthenticated(true)
            } else {
                await router.push("/");
            }
        })();
    },[router.isReady])

    if(isAuthenticated === false){
        return (
            <>
            Loading...
            </>
        )
    }

}

export default ProtectedPage;