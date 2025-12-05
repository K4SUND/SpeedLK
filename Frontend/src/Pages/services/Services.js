import React from 'react'
import Nav3 from '../../Components/navigationbar/NavigationBarUserProfile'

export default function Services
  () {
  return (
    <div>
      <Nav3 />

      <div className='p-5'>
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Currency Exchange Service</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Instantly check and convert exchange rates for major currencies.</p>
          <a href="/exchange-service" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gradient-to-r from-green-300 to-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Go
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>



    </div>
  )
}
