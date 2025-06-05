import React from 'react'

const SearchBar = () => {
  return (
    <form action="/products" method="get" className='w-[440px] h-[40px] rounded-full bg-gray-200 flex items-center relative'>
        <div className="relative w-full">
            <input 
                name='search'
                type="search" 
                placeholder='Ara' 
                className='w-full h-full pl-4 pr-10 rounded-full bg-transparent outline-none text-sm text-[#3A3A3A]' 
            />
            <button type='submit' className='absolute right-2 top-1/2 -translate-y-1/2 p-4 rounded-full'>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
        </div>
    </form>
  )
}

export default SearchBar