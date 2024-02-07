import React from 'react'

const RadioBox = ({price, checkedPrice, onFilters}) => {
  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {price?.map(price => (
        <div key={price._id}>
          <input type='radio' onChange={e => onFilters(e.target.value)} id={price._id} value={price._id}
              checked={checkedPrice === price.array} />
          {" "}
          <label htmlFor={price._id}>{price.name}</label>
        </div>
      ))}
    </div>
  )
}

export default RadioBox
