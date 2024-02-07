import React from 'react'

const CheckBox = ({continents, checkedContinents, onFilters}) => {

  const handleToggle = (continentId) => {
    const currentIdx = checkedContinents.indexOf(continentId);
    const newChecked = [...checkedContinents];

    if(currentIdx === -1) {
      newChecked.push(continentId);
    } else {
      newChecked.splice(currentIdx, 1);
    }

    onFilters(newChecked);
  };

  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {continents?.map(continent => (
        <div key={continent._id}>
          <input type='checkbox' onChange={() => handleToggle(continent._id)} />
          <label>{continent.name}</label>
        </div>
      ))}
    </div>
  )
}

export default CheckBox
