import React from 'react'

const SearchInput = ({searchTerm, onSearch}) => {
  return (
    <input className='p-2 border border-gray-300 rounded-md'
        type='text' placeholder='검색어를 입력해주세요.' value={searchTerm} onChange={onSearch} />
  )
}

export default SearchInput
