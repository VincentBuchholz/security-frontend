import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import productFacade from "../../facades/productFacade";
import Link from "next/link";
import {useRouter} from "next/router";


function Index() {

    const[result, setResult] = useState("")
    const [products, setProducts ] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            productFacade.getAllProducts().then(setProducts)
        }
        fetchProducts();
    }, []);
    const testFetch = () =>{
        productFacade.getAllProducts().then( setResult)
    }


    return(
        <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
            <Link href={'products/create'}>
                <Button className="btn-primary float-end mb-3">Create</Button>
            </Link>
            <table class="table table-striped table-hover border-top ">
                <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th className='text-end'>Price</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map( (product,key) =>
                        <tr style={{cursor:"pointer"}} key={product.id} onClick={() => router.push(/products/ + product.id)}>
                            <td className='table-data'>{product.name }</td>
                            <td className='table-data'>{product.description }</td>
                            <td className='table-data text-end'>{product.price }</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default Index;