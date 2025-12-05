import React from 'react'

import NavigationBarUserProfile from '../Components/navigationbar/NavigationBarUserProfile'

export default function About() {


  return (
    <div>
      <NavigationBarUserProfile />

      <div style={
        {
          fontFamily: 'Poppins, sans-serif',
          color: '#333',
          backgroundColor: '#f5f5f5',
          padding: '20px'
        }
      }>




        <div className='p-4 mb-24'
          style={{
            // maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }} >
          <h1 class="text-4xl mt-6 font-medium dark:text-white"
            style={
              {
                fontSize: '2.5rem',
                marginTop: '20px',
                color: '#143D60'
              }
            }>About SpeedLK, The Largest Marketplace in Sri Lanka!</h1>
          <p class="my-5 text-lg text-gray-500"
            style={{
              marginTop: '15px',
              fontSize: '1.1rem',
              lineHeight: '1.5',
              color: '#4DA1A9'

            }}>
            Sri Lanka’s household name for buying and selling technology products online.
            Do you want to buy a mobile phone? Check SpeedLk! Do you want to sell a laptop? Check SpeedLK.
          </p>
          <p class="my-5 text-lg text-gray-500"
            style={{
              marginTop: '15px',
              fontSize: '1.1rem',
              lineHeight: '1.5',
              color: '#4DA1A9'

            }}>
            SpeedLK has the widest selection of technology items across Sri Lanka and different categories.
            Whether you're looking for a mobile phone, computer, laptop, play stations, sound accessories, etc. you will find the best deal on SpeedLK.
          </p>

          <p class="my-5 text-lg text-gray-500"
            style={{
              marginTop: '15px',
              fontSize: '1.1rem',
              lineHeight: '1.5',
              color: '#2E5077'

            }}>
            SpeedLK allows you to search by location, making it easy to find what's available near you.
            Whether you're upgrading your gadgets or looking to sell, SpeedLK offers a seamless experience tailored to your needs.

          </p>

        </div>





      </div>
    </div>
  )
}
