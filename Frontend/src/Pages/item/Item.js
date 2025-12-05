import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../Components/navigationbar/NavigationBarDefault';

export default function Item() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        // axios.get(`http://localhost:8080/item/${id}`)
        axios.get(`${baseURL}/item/${id}`)
            .then(
                response => setItem(response.data)
            )
            .catch(err =>
                console.log(err)
            );

    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }



    return (
        <div>


            <Nav />

            {/* <img class="h-auto max-w-lg mx-auto" src={`http://localhost:8080${item.imageUrl}`} alt="item"/> */}
            <img class="h-auto max-w-lg mx-auto" src={item.imageUrl} alt="item" />

            <div className="mt-10 mb-10 ml-10 container1 ">




                <div class="grid gap-6 mb-3 md:grid-cols-3">

                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                        <label rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{item.brand}</label>
                    </div>

                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                        <label rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >{item.model}</label>
                    </div>

                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                        <label rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >{item.location.district}, {item.location.province}</label>

                    </div>
                </div>


                <label class="block mt-10 mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner Details:</label>
                <div class="grid gap-6 mb-3 md:grid-cols-2">

                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <label rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{item.user.name}</label>
                    </div>

                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <label rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >{item.user.phoneNumber}</label>
                    </div>

                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <label rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >{item.user.email}</label>

                    </div>
                </div>







                <label class="block mt-10 mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <p class="mb-3 text-gray-500 dark:text-gray-400">{item.description}</p>



                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <label rows="1" class="block w-50 p-1  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >Rs.{item.price}</label>





            </div>



        </div>
    )
}
