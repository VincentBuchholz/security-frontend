import {useEffect, useState} from "react";

import productFacade from "../../facades/productFacade";
import { useRouter } from 'next/router';
import {Col, FloatingLabel, Form, Row} from "react-bootstrap";
import ProtectedPage from "../../components/ProtectedPage";
import ConfirmActionModal from "../../components/ConfirmActionModal";

function IdPage() {

    const [product, setProduct] = useState({
        id: '',
        name:'',
        description: '',
        price: '',
        active: ''
    });
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        productFacade.getProductById(id).then((p) => {
            setProduct(p);
        })
    },  [router.isReady]);

    const save = async (e) => {
        e.preventDefault();
        const updateObj = product;
        await productFacade.updateProduct(updateObj);
        await router.push({
            pathname: '/products/',
        });

    };
    const deleteTrigger = () =>{
        setShowConfirmModal(true)
    }

    const deleteProduct = async (e) => {
        e.preventDefault();
        await productFacade.deleteProductById(product.id);
        await router.push({
            pathname: '/products/',
        });

    };
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.id]: e.target.value });
    };
    const[showConfirmModal,setShowConfirmModal] = useState(false);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    return(
    <>
        <ProtectedPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        {
            isAuthenticated &&

        <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
            {product && product.id &&
            <>
                <ConfirmActionModal show={showConfirmModal} setShow={setShowConfirmModal} func={deleteProduct} desc={{title:"Delete product ", text:"Are you sure? \n this action cannot be undone!"}} />

                <div className={'sticky-top bg-white mb-1'}>
                <Row>
                    <Col>
                        <h1 className="heading">{product.name}</h1>
                    </Col>
                </Row>
            </div>
            <Form id={'productForm'} onSubmit={save} >
                <Form.Group className="mb-3" controlId="sku">
                    <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="name">
                                    <FloatingLabel controlId="name" label="Name:" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            value={product.name}
                                            placeholder={'Name:'}
                                            onChange={handleChange}
                                            disabled={product.active ===0}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="price">
                                <FloatingLabel controlId="price" label="Price:" className="mb-3">
                                    <Form.Control
                                        type="number"
                                        value={product.price}
                                        placeholder={'Price:'}
                                        onChange={handleChange}
                                        disabled={product.active ===0}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="description">
                                <FloatingLabel controlId="description" label="Description:" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        value={product.description}
                                        placeholder={'Description:'}
                                        onChange={handleChange}
                                        disabled={product.active ===0}

                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>

                    </Row>
                    {product.active > 0 &&
                        <>
                            <button type="submit" className="btn btn-primary m-1">Save</button>
                            <button type="button" className="btn btn-danger m-1" onClick={deleteTrigger}>Delete</button>
                        </>}

                </Form.Group>
            </Form>
            </>}
        </div>
        }
        </>
    )
}

export default IdPage;