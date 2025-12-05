import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav3 from '../../Components/navigationbar/NavigationBarUserProfile';




export default function ExchangeCurrency
  () {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [load, setLoad] = useState(false);




  const appId = process.env.REACT_APP_API_URL;
  const baseURL = process.env.REACT_APP_BASE_URL;

  //handleSubmit method
  const handleSubmit = async (e) => {

    e.preventDefault();
    // console.log(date,sourceCurrency,targetCurrency,amountInSourceCurrency);

    try {
      const response = await axios.get(`https://openexchangerates.org/api/historical/${date}.json?app_id=${appId}`);
      const rates = response.data.rates;
      const sourceRate = rates[sourceCurrency];
      const targetRate = rates[targetCurrency];

      const targetValue = (targetRate / sourceRate) * amountInSourceCurrency;


      setAmountInTargetCurrency(targetValue.toFixed(2));
      setLoad(true);

    }
    catch (err) {
      console.log(err);
    }

  };



  //get all currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      // console.log(appId);
      // console.log ("Hutts"+ baseURL);
      try {
        const response = await axios.get(

          `https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=${appId}`

        );
        const nameData = response.data;
        setCurrencyNames(nameData);

      }
      catch (err) {
        console.log(err);
      }
    };

    getCurrencyNames();
  }, []);






  return (
    <div>

      <Nav3 />

      <h1 className='p-5 text-3xl text-center text-gradient-to-r from-green-300 to-blue-700'>Convert Your Currency</h1>
      <div className='flex flex-col items-center justify-center py-6'>
        <section className='w-full lg:w-1/2'>
          <form onSubmit={handleSubmit}>

            <div className="mb-5">
              <label htmlFor='date' className="block mb-2 text-sm font-medium text-gradient-to-r from-green-300 to-blue-700 dark:text-white">Date</label>
              <input onChange={(e) => setDate(e.target.value)} type="date" name='date' id='date' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
            </div>

            <div className="mb-5">
              <label htmlFor='sourceCurrency' className="block mb-2 text-sm font-medium text-gradient-to-r from-green-300 to-blue-700 dark:text-white">Source Currency</label>
              <select onChange={(e) => setSourceCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name='sourceCurrency' id='sourceCurrency' value={sourceCurrency} >
                <option value=''>Select the source currency</option>

                {
                  Object.keys(currencyNames).map((currency) => (

                    <option className='p-1' key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>

                  ))
                }


              </select>
            </div>


            <div className="mb-5">
              <label htmlFor='targetCurrency' className="block mb-2 text-sm font-medium text-gradient-to-r from-green-300 to-blue-700 dark:text-white">Target Currency</label>
              <select onChange={(e) => setTargetCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name='targetCurrency' id='targetCurrency' value={targetCurrency} >
                <option value=''>Select the target currency</option>

                {
                  Object.keys(currencyNames).map((currency) => (

                    <option className='p-1' key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>

                  ))
                }
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor='amountInSourceCurrency' className="block mb-2 text-sm font-mediumtext-gradient-to-r from-green-300 to-blue-700 dark:text-white">Amount in source currency</label>
              <input onChange={(e) => { setAmountInSourceCurrency(e.target.value) }} type="number" id='amountInSourceCurrency' name='amountInSourceCurrency' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder='Amount in source currency' required />
            </div>
            <button className='px-4 py-2 font-bold rounded text-gradient-to-r from-green-300 to-blue-700 bg-gradient-to-r hover:bg-gray-200 hover:text-black'>Generate</button>


          </form>
        </section>
      </div>
      {load ? (
        <section className="flex-col justify-center w-full max-w-md p-6 m-10 mx-auto bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
          <h2 className="mb-4 text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Currency Exchange Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span className="font-medium">Source Currency:</span>
              <span className="font-bold text-gray-800 dark:text-white">{currencyNames[sourceCurrency]}</span>
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span className="font-medium">Target Currency:</span>
              <span className="font-bold text-gray-800 dark:text-white">{currencyNames[targetCurrency]}</span>
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span className="font-medium">Amount in Source:</span>
              <span className="font-bold text-blue-500">{amountInSourceCurrency} {sourceCurrency}</span>
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span className="font-medium">Converted Amount:</span>
              <span className="font-bold text-green-600">{amountInTargetCurrency} {targetCurrency}</span>
            </div>
          </div>
        </section>

      ) : null}

    </div>
  )
}
