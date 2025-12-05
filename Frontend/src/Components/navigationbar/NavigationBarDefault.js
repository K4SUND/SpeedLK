import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import userIcon from '../../Assets/User.png';
import { useAuth } from '../../AuthContext';



export default function NavigationBarDefault() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();


  const setLogOut = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {

      setUser(JSON.parse(userString));
    }
  }, [])

  return (
    <div >



      <nav className="mb-4 border-gray-200 bg-gradient-to-r from-green-300 to-blue-700 dark:bg-gray-900">


        <div className="flex flex-wrap items-center justify-between h-auto max-w-screen-xl p-4 mx-auto ">



          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse no-underline hover:underline">
            <svg class="w-10 h-10  text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01" />
            </svg>
            <span className="self-center text-2xl font-semibold text-gray-800 whitespace-nowrap">SpeedLK</span>
          </a>



          <div className="space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            {
              user ? (
                <div className='dropdown'>

                  <button type="button" class=" h-10 w-10 p-0 text-sm text-gray-500 bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 hover:ring-4 hover:ring-gray-300 dark:hover:ring-gray-600" id="userInfo" aria-expanded="false">
                    <img src={userIcon} alt="User Icon" className="inline-block object-cover w-full h-full rounded-full " />

                    <div className='text-gray-900 bg-gray-200 rounded content'>


                      <a className="dropdown-item" onClick={() => navigate('/profile')}>Profile</a>
                      <a className="dropdown-item" onClick={() => { setLogOut() }}>Logout</a>


                    </div>


                  </button>

                </div>
              ) : (
                <Link to={`/login`}>
                  <button type="button" class=" h-10 w-10 text-sm text-gray-900 bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 hover:ring-2 hover:ring-black dark:hover:ring-gray-600" id="login" aria-expanded="false">
                    Login

                  </button>
                </Link>

              )
            }

          </div>



          <div className="items-center justify-between w-full nav md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-row p-3 mt-4 font-medium border border-gray-100 rounded-lg nav1 md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

              <li>
                <a href="/about" className="block px-4 py-2 ml-10 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <a href="/services" className="block px-4 py-2 mr-10 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
              </li>
              {user && (
                <li>
                  <a href="/item-upload" className="block px-4 py-2 ml-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Post Your AD</a>
                </li>
              )}
            </ul>

          </div>



        </div>

      </nav>



    </div>

  )
}
