import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useParams } from 'react-router-dom';
import ItemUpdate from '../../Pages/item/ItemUpdate';
import Success from '../alerts/Success';
import Error from '../alerts/Error';

export default function ItemsByUser
    ({ user }) {


    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL;


    const [successMsg, setSuccessMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [deletedItem, setDeletedItem] = useState(null);



    useEffect(() => {
        if (user) {

            getItems(user);
        }

    }, [user]);



    const getItems = async (user) => {

        try {
            const response = await axios.get(`${baseURL}/items-by-user-id/` + user.id);
            setItems(response.data);

        }
        catch (err) {

            setError(err);
        };





    };


    const deleteItem = async (Id) => {
        setDeletedItem(null);
        setShowError(false);
        setShowSuccess(false);
        try {

            const response = await axios.delete(`${baseURL}/delete-item/` + Id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);
            setSuccessMsg("Item deleted successfully!");
            setShowSuccess(true);
            getItems(user);


        }
        catch (err) {
            console.log(err);
            if (err.response.data) {
                setError(err.response.data);
            } else {
                setError(err.message);
            }
            setShowError(true);
            setDeletedItem(Id);

        };



    };

    const updateItem = (item) => {
        setDeletedItem(null);
        setShowError(false);
        setShowSuccess(false);
        navigate(`/item-update/${item.id}`, { state: { item } });
    };

    return (
        <div>


            {showSuccess && (
                <Success
                    successMsg={successMsg}
                    onClose={() => { setShowSuccess(false) }}
                />
            )}


            <Badge className='mt-3 mb-3 ml-5 bg-gradient-to-r from-green-300 to-blue-700' bg="secondary"><h6 className='mt-1'>My ads</h6></Badge>



            {
                items.length === 0 ? (

                    <figure class="flex flex-column items-center">

                        <img class="rounded-l h-25 w-25" src="box_11951545.png" alt="image description" />


                        <figcaption class="  px-4 text-lg text-black bottom-6">
                            <p>No results found!</p>
                        </figcaption>
                    </figure>

                ) : (


                    <Row xs={2} md={4} className="g-4 ">
                        {items.map(item => (
                            <Col key={item.id}>
                                <div class="w-full ml-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                    {/* update seen ek */}

                                    <Link to={`/item/${item.id}`}>
                                        {/* <img className="p-8 rounded-t-lg product-image" src={`http://localhost:8080${item.imageUrl}`} alt="product" /> */}
                                        <img className="p-8 rounded-t-lg product-image" src={item.imageUrl} alt="product" />
                                    </Link>
                                    <div class="px-4 pb-4">

                                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.brand}</h5>
                                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.model}</h5>




                                        <div className='flex items-center location '>
                                            <span class="flex w-3 h-3 me-1 bg-green-500 rounded-full"></span>
                                            <h6 class="text-lg mt-1.5  dark:text-white">{item.location.district},{item.location.province}</h6>
                                        </div>



                                        <div className="priceCart">
                                            <span class="text-3xl font-bold text-gray-900 dark:text-white">Rs.{item.price}</span>

                                        </div>


                                        <div class="flex items-center justify-evenly mt-4 md:mt-6">
                                            <a class=" cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-100 bg-gradient-to-r from-green-300 to-blue-700 rounded-lg  hover:text-gray-900  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline" onClick={() => updateItem(item)}>Update</a>
                                            <a class=" cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-100 focus:outline-none bg-gradient-to-r from-green-300 to-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 no-underline" onClick={() => deleteItem(item.id)} >Delete</a>


                                        </div>



                                    </div>
                                    <div className='mb-4'>

                                        {showError && item.id == deletedItem && (
                                            <Error
                                                error={error}
                                                onClose={() => {
                                                    setShowError(false);
                                                    setDeletedItem(null);
                                                }}
                                            />
                                        )}

                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )
            }







        </div>
    )
}
