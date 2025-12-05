import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBarUserProfile from '../Components/navigationbar/NavigationBarUserProfile';
import { useAuth } from '../AuthContext';

export default function Login
    () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(`${baseURL}/login`, {

                email: email,
                password: password

            }
            );

            if (response.data) {
                console.log(response.data);

                if (response.data == "User not found") {
                    setError('User not found');
                }
                else if (response.data == "Invalid password") {
                    setError('Invalid password');
                }
                else {
                    login(response.data);
                    navigate('/');

                }
            }
            else {

                setError('Login Failed ');

            }
        }


        catch (err) {
            console.error('Error logging in', err);
            setError('Login Failed');
        }

    };






    return (
        <div>


            <NavigationBarUserProfile />

            <h1 class="mb-5 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to <span class="text-blue-600 dark:text-blue-500">Speed</span> LK</h1>




            <div className='flex items-center justify-center'>
                <div class="w-full flex justify-center items-center max-w-sm p-5 bg-gradient-to-r from-green-300 to-blue-700 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form class="space-y-6" onSubmit={handleSubmit}>
                        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to SpeedLK</h5>
                        <div>
                            <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" class="w-full text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div class="text-sm font-medium text-black dark:text-gray-300">
                            Not registered? <Link to="/register" class="text-black hover:underline dark:text-blue-500 ml-2">Create account</Link>
                        </div>
                        {error && <p class="text-red-600">{error}</p>}
                    </form>
                </div>

            </div>







        </div>
    );
}
