import {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import productFacade from "../../facades/productFacade";
import Link from "next/link";
import {useRouter} from "next/router";
import ProtectedPage from "../../components/ProtectedPage";
import {notFound} from "next/navigation";
import { useCart } from '/Context/CartContext';

function Index() {

    const[result, setResult] = useState("")
    const [products, setProducts ] = useState([]);
    const router = useRouter();
    const[search,setSearch] = useState();
    const[searchProducts,setSearchProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            productFacade.getAllProducts().then((p) =>{
                setProducts(p)
                setSearchProducts(p)
            })

        }
        fetchProducts();
    }, []);
    const handleAddToCart = (product) => {
        addToCart(product, 1);
        showNotification(product.id)

    };
    const showNotification = (id) => {

        let infoText = document.getElementById("product#"+id)
        infoText.style.opacity=100
        setTimeout(() => {
            infoText.style.opacity=0
        }, 1000);
    }

    const handleSearch = (e) => {
        setSearchProducts(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return(
        <>

        <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
            <h1>Products</h1>
            <Form>
            <Form.Group className="mb-3" controlId="start">
                <Form.Control required type="text" onChange={handleSearch}  placeholder="Search" />
            </Form.Group>
            </Form>
            <div className="row row-eq-height">
                {searchProducts.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100 mb-4 box-shadow">
                            <img src='/notFound.jpg' className="card-img-top" alt={product.name} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">Price: ${product.price}</p>

                                <div id={"product#" +product.id} className="mt-auto alert alert-success p-2 mb-0" style={{display:"block", opacity:0}}  role="alert">
                                                Product added to cart!
                                </div>
                                <button type="button" className="mt-auto btn btn-lg btn-block btn-outline-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>

                            </div>
                        </div>


                    </div>
                ))}

            </div>
        </div>
            </>
    )
}

export default Index;