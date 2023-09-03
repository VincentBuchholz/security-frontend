import {useRouter} from "next/router";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-bootstrap';
import Link from "next/link"
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useState} from "react";
function NavBar() {
    const router = useRouter();

    const [user,setUser] = useState({
        firstName: "testUser",
        roles:['ADMIN']
    })


    return(
        <Navbar expand="sm" className="p-3 mb-3" style={{backgroundColor:"#343a3f"}}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Link className={"link"} href="/">
                            Dashboard
                            </Link>
                    <Link  className={"link"} href="/test" passHref>
                        test
                        {/*<Nav.Link>Dashboard</Nav.Link>*/}
                    </Link>

                    <Link  className={"link"} href="/products" passHref>
                        products
                        {/*<Nav.Link>Dashboard</Nav.Link>*/}
                    </Link>

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
            {/*    /!*{user && (*!/*/}
            {/*    /!*    <NavDropdown title={user.firstName} active={router.pathname.includes("account")} id="basic-nav-dropdown" align="end">*!/*/}
            {/*    /!*        <Link href="/account" passHref>*!/*/}
            {/*    /!*            <NavDropdown.Item active={router.pathname.includes("account")}>Account</NavDropdown.Item>*!/*/}
            {/*    /!*        </Link>*!/*/}
            {/*    /!*        <NavDropdown.Divider />*!/*/}
            {/*    /!*        <NavDropdown.Item*!/*/}

            {/*    /!*        >*!/*/}
            {/*    /!*            Log out*!/*/}
            {/*    /!*        </NavDropdown.Item>*!/*/}

            {/*    /!*    </NavDropdown>*!/*/}
            {/*    /!*)}*!/*/}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;