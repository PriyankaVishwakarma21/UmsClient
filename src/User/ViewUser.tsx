import React from "react";
import AddUser from "./AddUser";
import { deleteUser, getAllUsers } from "../api/UserApi";
import { User } from "../types/userInterface";
import EditUser from "./EditUser";

const ViewUser = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [users, setUsers] = React.useState<User[]>([]);
    const [editUser, setEditUser] = React.useState<User>();
    const [isEditUser, setISEditUser] = React.useState<boolean>(false);
    const [editUserIndex, setEditUserIndex] = React.useState<number>(0);
    React.useLayoutEffect(() => {
        getInitialData();
    }, []);

    const getInitialData = async () => {
        try {
            const response = await getAllUsers();
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
        setEditUserIndex(index);
    }
    const handleDelete = async (userId: number) => {
        try {
            const response = await deleteUser(userId);
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== response.data.id));
            }
        } catch (error) {
            console.log('Error in handleDelete in ViewUser: ', error);
        }
    }
    const addUserCallback = (user: User) => {
        setUsers([...users, user])
        setOpenModal(false);
    }

    const editUserCallback = (editUser: User) => {
        let currentArray = [...users];
        let updatedArray = { ...currentArray[editUserIndex] = editUser };
        //@ts-ignore
        updatedArray[editUserIndex] = currentArray;
        setUsers(currentArray);
        setISEditUser(false);
    }
    return (
        <div className="m-0">
            <div className='container '>
                <h1 className=' w-screen items-center justify-center bg-red-500 py-3 text-lg text-center font-semibold font-semibold text-slate-100'>User Management System</h1>
                {
                    openModal &&
                    <AddUser
                        visible={openModal}
                        close={() => setOpenModal(false)}
                        addUserCallback={addUserCallback}
                    />
                }
                {
                    isEditUser &&
                    <EditUser
                        user={editUser}
                        isEditUserClose={() => setISEditUser(false)}
                        isEditUserOpen={isEditUser}
                        editUserCallback={editUserCallback}
                    />
                }

                <div className='p-4'>
                    <button className='bg-slate-600 text-white font-semibold text-center p-2 rounded-md' onClick={() => setOpenModal(!openModal)}>Add User</button>
                </div>
                <div className="container items-center justify-center">
                    <table className="table-auto border-collapse border border-slate-500">
                        <thead className="p-3">
                            <tr>
                                <th className="border border-slate-600 p-3">Name</th>
                                <th className="border border-slate-600 p-3">Username</th>
                                <th className="border border-slate-600 p-3">Email</th>
                                <th className="border border-slate-600 p-3">Phone</th>
                                <th className="border border-slate-600 p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user: User, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border border-slate-700">{user.name}</td>
                                        <td className="p-2 border border-slate-700">{user.username}</td>
                                        <td className="p-2 border border-slate-700">{user.email}</td>
                                        <td className="p-2 border border-slate-700">{user.phone}</td>
                                        <td className="p-2 border border-slate-700">
                                            <button className="bg-slate-800 font-semibold text-white p-1 rounded mr-2" onClick={() => handelEditUser(user, index)}>Update</button>
                                            <button className="bg-red-500 font-semibold text-white p-1 rounded" onClick={() => handleDelete(index)}>Delete</button>
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