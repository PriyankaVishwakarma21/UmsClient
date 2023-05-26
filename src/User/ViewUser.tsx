import React from "react";
import AddUser from "./AddUser";
import { deleteUser, getAllUsers } from "../api/UserApi";
import { User } from "../types/userInterface";
import EditUser from "./EditUser";

const ViewUser = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [users, setUsers] = React.useState<User[]>();
    const [editUser, setEditUser] = React.useState<User>();
    const [isEditUser, setISEditUser] = React.useState<boolean>(false);
    const [editUserIndex, setEditUserIndex] = React.useState<number>();
    React.useLayoutEffect(() => {
        getInitialData();
    }, []);

    const getInitialData = async () => {
        try {
            const response = await getAllUsers();
            console.log('response==> ', response);
            if (response.status === 200) {
                setUsers(response.data)
            }
        } catch (error) {
            console.log('Error in getInitialData of ViewUser: ', error);
        }
    }

    const handelEditUser = (user: User, index: number) => {
        setISEditUser(true);
        setEditUser(user);
    }
    const handleDelete = async (user: User) => {
        try {
            //@ts-ignore
            const response = await deleteUser(user.id);
            console.log('delete res==> ', response);
            if (response.status === 200) {
                alert('User deleted successfully!');
            }
        } catch (error) {
            console.log('Error in handleDelete in ViewUser: ', error);
        }
    }
    return (
        <div className="m-0">
            <div className='container'>
                <h1 className='flex-1 bg-red-500 p-4 text-lg text-center font-semibold font-semibold text-slate-100'>User Management System</h1>
                {
                    openModal &&
                    <AddUser
                        visible={openModal}
                        close={() => setOpenModal(false)}
                    />
                }
                {
                    isEditUser &&
                    <EditUser
                        user={editUser}
                        isEditUserClose={() => setISEditUser(false)}
                        isEditUserOpen={isEditUser}
                    />
                }

                <div className='p-4'>
                    <button className='bg-slate-600 text-white font-semibold text-center p-2 rounded-md' onClick={() => setOpenModal(!openModal)}>Add User</button>
                </div>
                <div className="container  mx-auto">
                    <table className="table-auto border border-1">
                        <thead className="p-3">
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user: User, index) => (

                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <button onClick={() => handelEditUser(user, index)}>Update</button>
                                            <button onClick={() => handleDelete(user)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewUser;