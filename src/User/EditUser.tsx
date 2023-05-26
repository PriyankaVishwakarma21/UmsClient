import React from "react";
import { Formik, FormikProps } from "formik";
import * as yup from 'yup';
import { User } from '../types/userInterface';
import { editUser } from "../api/UserApi";

const EditUser = (props: any) => {
  console.log(' edit use props----> ', props)
  //   const { close } = props;
  const { user, isEditUserOpen, isEditUserClose } = props;

  const initialValues = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    username: user.username
  }

  const validationSchema = yup.object({
    name: yup.string()
      .required('Name is required.'),
    username: yup.string()
      .required('Username is required.'),
    email: yup.string()
      .email()
      .required('Email is required.'),
    phone: yup.string()
      .required('Phone is required.'),
  })

  const handleSubmit = async (values: User) => {
    console.log('edituser---> ', values)
    try {
      const response = await editUser(values);
      console.log('res edit user===> ', response);
      if (response.status === 200) {
        alert("User updated successfully.");
      }
    } catch (error) {
      console.log('Error in handleSubmit EditUser: ', error);
    }
  }

  return (
    <div>
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Edit User
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => isEditUserClose()}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {
                  (props: FormikProps<User>) => (
                    <div>

                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div>
                          <label >Name</label>
                          <input type="text"
                            className="w-full py-1 pl-1 mb-2 border border-slate-400 focus:border-red-400 rounded"
                            placeholder="Enter name"
                            onChange={props.handleChange('name')}
                            onBlur={props.handleBlur('name')}
                            value={props.values.name}
                          />
                          {props.errors.name && props.touched.name && <span className="text-red-600">{props.errors.name}</span>}
                        </div>
                        <div>
                          <label className="mt-2" >Username</label>
                          <input type="text"
                            className="w-full py-1 pl-1 mb-2 border border-slate-400 focus:border-red-400 rounded"
                            placeholder="Enter username"
                            onChange={props.handleChange('username')}
                            onBlur={props.handleBlur('username')}
                            value={props.values.username}
                          />
                          {props.errors.username && props.touched.username && <span className="text-red-600">{props.errors.username}</span>}
                        </div>
                        <div>
                          <label className="mt-2" >Email</label>
                          <input type="email"
                            className="w-full py-1 pl-1 mb-2 border border-slate-400 focus:border-red-400 rounded"
                            placeholder="Enter email"
                            onChange={props.handleChange('email')}
                            onBlur={props.handleBlur('email')}
                            value={props.values.email}
                          />
                          {props.errors.email && props.touched.email && <span className="text-red-600">{props.errors.email}</span>}
                        </div>
                        <div>
                          <label className="mt-2">Phone Number</label>
                          <input type="text"
                            className="w-full py-1 pl-1 mb-2 border border-slate-400 focus:border-red-400 rounded"
                            placeholder="Enter phone"
                            onChange={props.handleChange('phone')}
                            onBlur={props.handleBlur('phone')}
                            value={props.values.phone}
                          />
                          {props.errors.phone && props.touched.phone && <span className="text-red-600">{props.errors.phone}</span>}
                        </div>

                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                        <button className='bg-slate-600 text-white font-semibold text-center px-6 py-2 rounded-md mr-3' onClick={() => isEditUserClose()}>Close</button>
                        <button className='bg-red-500 text-white font-semibold text-center px-6 py-2 rounded-md' onClick={() => props.handleSubmit()}>Save</button>
                      </div>
                    </div>
                  )
                }
              </Formik>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>

    </div>
  )

}

export default EditUser;