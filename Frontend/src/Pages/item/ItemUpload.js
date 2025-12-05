import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import NavigationBarUserProfile from '../../Components/navigationbar/NavigationBarUserProfile';
import Success from '../../Components/alerts/Success';
import Error from '../../Components/alerts/Error';
import { use } from 'react';






export default function ItemUpload() {

    const provinceNames = ["Northern", "North Western", "Western", "North Central", "Central", "Sabaragamuwa", "Eastern", "Uva", "Southern"];
    const districtNames = {

        "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Mulathivu", "Vavuniya"],
        "North Western": ["Puttalam", "Kurunagala"],
        "North Central": ["Pollonaruwa", "Anuradhapura"],
        "Western": ["Gampaha", "Colombo", "Kaluthara"],
        "Central": ["Matale", "Kandy", "Nuwara Eliya"],
        "Sabaragamuwa": ["Kegalle", "Ratnapura"],
        "Eastern": ["Trincomalee", "Batticaloa", "Ampara"],
        "Uva": ["Badulla", "Monaragala"],
        "Southern": ["Galle", "Matara", "Hambantota"]
    };



    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [Description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [userId, setUserId] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const baseURL = process.env.REACT_APP_BASE_URL;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;


    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setUserId(user.id);

        } else {
            navigate('/login');
        }

    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(false);
        setError(null);
        setShowSuccess(false);
        try {
            const response = await axios.get(`${baseURL}/location-id`, {
                params: {
                    province: province,
                    district: district

                }

            });

            await uploadItem(response.data);

        } catch (err) {
            console.log(err);
            setShowError(true);
            if (err.response.data) {
                setError(err.response.data);
            }
            else {
                setError(err.message);
            }
        }

    }

    const uploadItem = async (location) => {
        console.log(location);
        try {

            const formData = new FormData();
            formData.append("file", imageUrl);
            formData.append("brand", brand);
            formData.append("model", model);
            formData.append("description", Description);
            formData.append("price", price);
            formData.append("userId", userId);
            formData.append("locationId", location);




            const response = await axios.post(`${baseURL}/add-item`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }


            });

            setShowSuccess(true);



        }
        catch (err) {
            console.log(err);
            setShowError(true);
            if (err.response.data) {
                if (err.response.data === "Token expired" || err.response.data === "Invalid token" || err.response.data === "Authorization header missing") {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                } else {
                    setError(err.response.data);

                }
            }
            else {
                setError(err.message);
            }

        };
    };








    return (


        <div>
            <NavigationBarUserProfile />
            <form onSubmit={handleSubmit} className='p-5'>

                <div class="grid gap-6  mb-6 md:grid-cols-2">

                    <div>
                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                        <input type="text" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apple" required value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>

                    <div>
                        <label for="model" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                        <input type="text" id="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Iphone 12" required value={model} onChange={(e) => setModel(e.target.value)} />
                    </div>

                </div>




                <label for="countries" class="block mb-2   mt-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}>

                    <option selected>Province</option>
                    {

                        provinceNames.map((provinceValue, index) => (
                            <option key={index} value={provinceValue}>
                                {provinceValue}
                            </option>
                        ))
                    }

                </select>


                <label for="countries" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}>
                    <option selected>District</option>

                    {province && districtNames[province] && districtNames[province].map((districtValue, index) => (
                        <option key={index} value={districtValue}>
                            {districtValue}
                        </option>
                    ))}

                </select>





                <label for="description" class="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." value={Description} onChange={(e) => setDescription(e.target.value)}></textarea>



                <label for="price" class="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
                <input type="number" id="price" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rs." required value={price} onChange={(e) => setPrice(e.target.value)} />



                <div>

                    <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload an image</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" required
                        onChange={(e) => {
                            if (e.target.files[0].size > MAX_FILE_SIZE) {
                                setShowError(true);
                                setError('File size should be less than 5MB');
                                e.target.value = null;
                            } else {
                                setShowError(false);
                                setError(null);
                                setImageUrl(e.target.files[0])
                            }
                        }} />
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>

                <button type="submit" class="text-gray-100 bg-gradient-to-r from-green-300 to-blue-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post ad</button>

            </form>

            {
                showSuccess && (
                    <Success successMsg="Item uploaded successfully" onClose={() => navigate('/profile', { state: { activeTab: 'myads' } })} />

                )
            }
            {
                showError && (
                    <Error error={error} onClose={() => {
                        setError(null);
                        setShowError(false);
                    }} />)
            }


        </div>
    )
}


//location Id eka retrieve kireema -> province, district