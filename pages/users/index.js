import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import productFacade from "../../facades/productFacade";
import Link from "next/link";
import {useRouter} from "next/router";
import ProtectedPage from "../../components/ProtectedPage";
import userFacade from "../../facades/userFacade";
import ConfirmActionModal from "../../components/ConfirmActionModal";


function Index() {

    const [users, setUsers ] = useState([]);
    const router = useRouter();




    useEffect(() => {
        userFacade.getAllUsers().then(setUsers)
    },  [router.isReady]);

    const[showConfirmModal,setShowConfirmModal] = useState(false);

    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [toDelete, setToDelete] = useState({
        id: "",
    })


    const deleteTrigger = (e) =>{
        setToDelete({id:e.target.id})
        setShowConfirmModal(true)
    }

    const deleteUser = async ()=>{
        await userFacade.deleteUserAccountAdmin(toDelete);
        await  userFacade.getAllUsers().then(setUsers);
        setShowConfirmModal(false)
    }


    return(
        <>
            <ProtectedPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            {
                isAuthenticated &&

            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
                <ConfirmActionModal show={showConfirmModal} setShow={setShowConfirmModal} func={deleteUser} desc={{title:"Delete user account", text:"Are you sure? \n this action cannot be undone!"}} />
                <table class="table table-striped table-hover border-top ">
                    <thead class="thead-dark">
                    <tr>
                        <th>id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>email</th>
                        <th className='text-end'>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map( (user,key) =>
                            <tr style={{cursor:"pointer"}} key={user.id}>
                                <td className='table-data'>{user.id }</td>
                                <td className='table-data'>{user.firstName }</td>
                                <td className='table-data'>{user.lastName }</td>
                                <td className='table-data'>{user.email }</td>
                                <td className='table-data'>{user.email }</td>
                                <td className='table-data text-end'><Button className={"btn-danger"} id={user.id} onClick={deleteTrigger}>Delete user</Button></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>}
        </>
    )
}

export default Index;