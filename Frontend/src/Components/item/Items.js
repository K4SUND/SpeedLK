import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import "./Items.css";
import Item from '../../Pages/item/Item';
import { Link } from 'react-router-dom';
import Paging from '../Paging';




export default function Items({ locationId }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseURL = process.env.REACT_APP_BASE_URL;


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = items.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(items.length / itemsPerPage);




    useEffect(() => {
        const getItems = async () => {
            try {
                let response;
                if (locationId) {
                    response = await axios.get(`${baseURL}/items-by-location-id/${locationId}`);
                }
                else {

                    response = await axios.get(`${baseURL}/items`);

                }

                setItems(response.data);
                setCurrentPage(1);

            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };

        getItems();

    }, [locationId]);


    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };


    if (loading) {
        return (
            <div role="status" class="max-w-sm animate-pulse ml-10">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                <span class="sr-only">Loading...</span>
            </div>
        );
    }




    return (




        <div>



            {
                currentItems.length === 0 ? (

                    <figure class="flex flex-column items-center justify-center ml-12">

                        <img class="rounded-l h-25 w-25" src="box_11951545.png" alt="image description" />


                        <figcaption class="  px-4 text-lg text-black bottom-6">
                            <p>No results found!</p>
                        </figcaption>

                    </figure>

                ) : (

                    <div>

                        <Row xs={2} md={4} className="g-4 ">
                            {currentItems.map(item => (
                                <Col key={item.id}>
                                    <div class="w-full ml-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <Link to={`/item/${item.id}`}>
                                            <img className="p-8 rounded-t-lg product-image" src={item.imageUrl} alt="product" />
                                        </Link>
                                        <div class="px-4 pb-4">

                                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.brand}</h5>
                                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.model}</h5>


                                            <div class="flex items-center mt-2.5 mb-5">
                                                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                                                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                </div>
                                                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                                            </div>

                                            <div className='flex items-center location '>
                                                <span class="flex w-3 h-3 me-1 bg-green-500 rounded-full"></span>
                                                <h6 class="text-lg mt-1.5  dark:text-white">{item.location.district},{item.location.province}</h6>
                                            </div>



                                            <div className="priceCart">
                                                <span class="text-3xl font-bold text-gray-900 dark:text-white">Rs.{item.price}</span>

                                            </div>


                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Paging
                            currentPage={currentPage}
                            totalPages={totalPages}
                            goToPage={goToPage}
                        />

                    </div>







                )
            }








        </div>

    )
}
