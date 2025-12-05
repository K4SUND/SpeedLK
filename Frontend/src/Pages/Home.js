import React, { useEffect, useState } from 'react';
import Items from '../Components/item/Items';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import NavigationBarDefault from '../Components/navigationbar/NavigationBarDefault';


export default function Home


  () {

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
  const [locationId, setLocationId] = useState(null);
  const [error, setError] = useState(null);


  const baseURL = process.env.REACT_APP_BASE_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (province === '' || district === '') {
      setDistrict('');
      setProvince('');
      setLocationId(null);
      return;
    }


    if (province === 'Province' || district === 'District') {
      setDistrict('');
      setProvince('');
      setLocationId(null);
      return;
    }

    try {

      const response = await axios.get(`${baseURL}/location-id`, {
        params: {
          province: province,
          district: district

        }
      });
      const newLocationId = response.data;
      if (newLocationId) {
        setLocationId(newLocationId);

      }
    }
    catch (err) {
      setError(err);
      alert("Please enter valid province and district");
      setLocationId(null);
    }





  };



  return (
    <div>
      <NavigationBarDefault />

      <Badge className='mb-4 ml-10 border-gray-200 bg-gradient-to-r from-green-300 to-blue-700' bg="secondary"><h6 className='mt-1'>All ads</h6></Badge>

      <form className='flex flex-row mb-10 ml-10 ' onSubmit={handleSubmit}>


        <div className='flex flex-row items-start justify-between mr-10'>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select province</label>

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
        </div>

        <div className='flex flex-row items-start justify-between mr-10'>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select district</label>

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
        </div>

        <div className='flex flex-row items-start justify-between'>

          <button type="submit" class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white border-gray-200 bg-gradient-to-r from-green-300 to-blue-700 dark:bg-gray-900 rounded-lg border hover:from-green-400 hover:to-blue-800 focus:ring-4 focus:outline-none focus:bg-teal-300 dark:hover:from-green-400 dark:hover:to-blue-800 dark:focus:ring-blue-800">
            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>Search
          </button>
        </div>

      </form>

      <Items locationId={locationId} />







    </div>

  )
}
