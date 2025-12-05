import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateUser
    ({ user }) {

    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPass, setConfirmPass] = useState(null);
    const [name, setName] = useState(null);
    const [number, setNumber] = useState(null);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL;



    useEffect(() => {

        if (user) {
            setUserId(user.id);
            setEmail(user.email);
            setName(user.name);
            setNumber(user.phoneNumber);
        }

    }, []);




    const update = async (e) => {

        e.preventDefault();



        if (password || confirmPass) {
            if (password !== confirmPass) {
                setError("Passwords aren't matched");
                setShowError(true);
                setShowSuccess(false);
                return;
            }
        }


        const userData = {
            id: userId,
            email: email || null,
            password: password || null,
            name: name || null,
            phoneNumber: number || null

        };

        try {
            const response = await axios.put(
                `${baseURL}/update-user`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            console.log(response.data);
            setShowError(false);
            setShowSuccess(true);




        }
        catch (err) {
            if (err.response.data) {
                setError(err.response.data);
            } else {
                setError(err.message);
            }

            setShowError(true);
        }



    }

    const cancelWhenSuccess = () => {
        setShowSuccess(false);
        navigate(0);

    }

    const cancelWhenError = () => {
        setError(null);
        setShowError(false);
    }



    return (
        <div>

            <form class="grid gap-6 ml-10 mb-3 md:grid-cols-2" onSubmit={update}>

                <label for="first_name" class="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Change details</label>
                <div></div>
                <div>

                    <label for="first_name" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setName(e.target.value) }} placeholder={name} ></input>
                </div>

                <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setNumber(e.target.value) }} placeholder={number} ></input>
                </div>

                <label for="first_name" class="block mt-4 mb-3 text-sm font-medium text-gray-900 dark:text-white">Change password</label>
                <div></div>
                <div>

                    <label for="countries" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                    <input type="password" rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter new password' ></input>

                </div>

                <div>
                    <label for="countries" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Confirm new password</label>
                    <input type="password" rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setConfirmPass(e.target.value) }} placeholder='Confirm new password' ></input>

                </div>

                <button type="submit" class=" w-50 mt-10  text-blue-700 hover:text-white border-2 border-blue-300 hover:bg-gradient-to-r from-green-300 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Update</button>


            </form>

            {
                showSuccess &&
                <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 mt-3 ml-10" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="sr-only">Check icon</span>
                    </div>
                    <div class="ms-3 text-sm font-normal">User is successfully updated.</div>
                    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close" onClick={() => { cancelWhenSuccess() }}>
                        <span class="sr-only">Close</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>

                    </button>
                </div>
            }
            {
                showError &&
                <div id="toast-warning" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 mt-3 ml-10 " role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                        </svg>
                        <span class="sr-only">Warning icon</span>
                    </div>
                    <div class="ms-3 text-sm font-normal">{error}</div>

                    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close" onClick={() => { cancelWhenError() }}>
                        <span class="sr-only">Close</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>

                </div>
            }



        </div>
    )
}
