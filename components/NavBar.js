import {useRouter} from "next/router";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavItem, NavLink} from 'react-bootstrap';
import Link from "next/link"
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
import {getDecodedJwtToken} from "../util/tokenUtil";
import authFacade from "../facades/authFacade";

function NavBar({setIsLoggedIn}) {
    const router = useRouter();


    const [user,setUser] = useState({
        name: "...",
        role:""
    })

    useEffect(()=>{
        let token = getDecodedJwtToken();

        setUser({
            name: token.user.name,
            role: token.role[0]
        })

    },[])

     const handleLogout = async ()=>{
        await authFacade.logout();
         setIsLoggedIn(false)
         router.push("/")
    }




    return(
        <Navbar expand="sm" className="p-3 mb-3" style={{backgroundColor:"#343a3f"}}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                        <Link href="/">
                            <img src="../logo.png" height="30px" alt="Logo" style={{ filter: 'brightness(0) invert(1)' }}></img>
                        </Link>
                    <Link className={"link"} href="/">
                        {user.role === "Admin"? "Products": "Shop"}
                            </Link>

                    {user.role==="Admin" &&
                    <Link  className={"link"} href="/orders" passHref>
                        Orders
                        {/*<Nav.Link>Dashboard</Nav.Link>*/}
                    </Link>
                    }

                    {user.role ==="User" &&
                    <Link  className={"link"} href="/customerOrders" passHref>
                        Orders
                        {/*<Nav.Link>Dashboard</Nav.Link>*/}
                    </Link>
                    }
                </Nav>
                {/*<Nav className=" me-auto">*/}
                {/*    <Link href="/" passHref>*/}
                {/*        <NavLink>*/}
                {/*            <img src="/images/miracle_logo_inverted.png" height="24px" alt="Logo"></img>*/}
                {/*        </NavLink>*/}
                {/*    </Link>*/}
                {/*    <Link href="/" passHref>*/}
                {/*        <Nav.Link>Dashboard</Nav.Link>*/}
                {/*    </Link>*/}
                {/*    <Link href="/offers" passHref>*/}
                {/*        <Nav.Link active={router.pathname.includes("offers")}>Offers</Nav.Link>*/}
                {/*    </Link>*/}
                {/*    <Link href="/orders" passHref>*/}
                {/*        <Nav.Link active={router.pathname.includes("/orders")}>Orders</Nav.Link>*/}
                {/*    </Link>*/}

                {/*    <Link href="/purchase-orders" passHref>*/}
                {/*        <Nav.Link active={router.pathname.includes("purchase-orders")}>Purchase Orders</Nav.Link>*/}
                {/*    </Link>*/}

                {/*    <Link href="/invoices" passHref>*/}
                {/*        <Nav.Link active={router.pathname.includes("invoices")}>Invoices</Nav.Link>*/}
                {/*    </Link>*/}

                {/*    <Link href="/licenses" passHref>*/}
                {/*        <Nav.Link href="/licenses" active={router.pathname.includes("licenses")}>Licenses</Nav.Link>*/}
                {/*    </Link>*/}

                {/*    <NavDropdown active={router.pathname.includes("setup") || router.pathname.includes("users") || router.pathname.includes("organizations") || router.pathname.includes("products") || router.pathname.includes("product-groups") || router.pathname.includes("signature") || router.pathname.includes("nat-discount")}title="Settings" id="basic-nav-dropdown">*/}
                {/*        <Link href="/setup" passHref>*/}
                {/*            <NavDropdown.Item active={router.pathname.includes("setup")}>Setup</NavDropdown.Item>*/}
                {/*        </Link>*/}
                {/*        <NavDropdown.Divider />*/}
                {/*        <Link href="/templates" passHref>*/}
                {/*            <NavDropdown.Item active={router.pathname.includes("templates")}>Templates</NavDropdown.Item>*/}
                {/*        </Link>*/}
                {/*        <NavDropdown.Divider />*/}
                {/*        {user && user.roles.includes("ADMIN") &&*/}
                {/*            <>*/}
                {/*                <Link href="/users" passHref >*/}
                {/*                    <NavDropdown.Item active={router.pathname.includes("users")}>Users</NavDropdown.Item>*/}
                {/*                </Link>*/}
                {/*                <NavDropdown.Divider />*/}
                {/*            </>*/}
                {/*        }*/}
                {/*        <Link href="/organizations" passHref>*/}
                {/*            <NavDropdown.Item active={router.pathname.includes("organizations")}>Organizations</NavDropdown.Item>*/}
                {/*        </Link>*/}
                {/*        <NavDropdown.Divider />*/}
                {/*        <Link href="/products" passHref>*/}
                {/*            <NavDropdown.Item active={router.pathname.includes("products")}>Products</NavDropdown.Item>*/}
                {/*        </Link>*/}
                {/*        <NavDropdown.Divider />*/}
                {/*        <Link href="/product-groups" passHref>*/}
                {/*            <NavDropdown.Item active={router.pathname.includes("product-groups")}>Product groups</NavDropdown.Item>*/}
                {/*        </Link>*/}
                {/*        <NavDropdown.Divider />*/}
                {/*        <Link href="/signature" passHref>*/}
                {/*            <NavDropdown.Item active={router.pathname.includes("signature")}>Signature</NavDropdown.Item>*/}
                {/*        </Link>*/}
                {/*        <NavDropdown.Divider />*/}
                {/*        <Link href="/nat-discount" passHref>*/}
                {/*            <NavDropdown.Item active={router.pathname.includes("nat-discount")}>Nat discount</NavDropdown.Item>*/}
                {/*        </Link>*/}
                {/*    </NavDropdown>*/}
                {/*</Nav>*/}

                { user.role === "User" &&
                <Link className={"link"} href="/shop/cart" passHref>
                    cart
                    {/*<Nav.Link>Dashboard</Nav.Link>*/}
                </Link>
                }
                {user && (

                    <NavDropdown title={user.name} active={router.pathname.includes("account")} id="basic-nav-dropdown" align="end">
                        <NavDropdown.Item
                            onClick={() => router.push("/account")}>
                           Account
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            onClick={handleLogout}
                        >
                            Log out
                        </NavDropdown.Item>

                    </NavDropdown>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;