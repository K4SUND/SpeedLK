import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer class="bg-white dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            </div>
          </div>
          <hr class="my-2 border-gray-600 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" class="hover:underline">SpeedLK™</a>. All Rights Reserved.
            </span>
            <div class="flex flex-row">
              <svg class="w-10 h-10  text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01" />
              </svg>
              <span className="self-center text-2xl font-semibold text-gray-800 whitespace-nowrap">SpeedLK</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
