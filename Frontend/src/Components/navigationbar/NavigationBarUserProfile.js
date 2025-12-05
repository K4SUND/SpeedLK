
export default function NavigationBarUserProfile
  () {

  const homeURL = process.env.REACT_APP_HOME_URL;


  return (
    <div>


      <nav className="border-gray-200 bg-gradient-to-r from-green-300 to-blue-700 dark:bg-gray-900 ">

        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">

          {/* 1 */}
          <a href={homeURL} className="flex items-center space-x-3 no-underline rtl:space-x-reverse hover:underline">
            <svg class="w-10 h-10 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01" />
            </svg>
            <span className="self-center text-2xl font-semibold text-gray-800 whitespace-nowrap">SpeedLK</span>
          </a>




        </div>
      </nav>

    </div>
  )
}
