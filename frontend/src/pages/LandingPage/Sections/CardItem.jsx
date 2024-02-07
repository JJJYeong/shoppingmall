import React from 'react'
import { Link } from 'react-router-dom'
import ImageSlider from '../../../components/ImageSlider'

const continents = [
    {key: 1, value: 'Africa'},
    {key: 2, value: 'Europe'},
    {key: 3, value: 'Asia'},
    {key: 4, value: 'North America'},
    {key: 5, value: 'South America'},
    {key: 6, value: 'Australia'},
    {key: 7, value: 'Antarctica'},
  ];

const CardItem = ({product}) => {
    return (
    <div className='border-[1px] border-gray-300'>
        <ImageSlider images={product.images} />
      <Link to={`/product/${product._id}`}>
        <p className='p-1'>{product.title}</p>
        <p className='p-1'>{continents[product.continents - 1].value}</p>
        <p className='p-1 text-xs text-gray-500'>{product.price}원</p>
      </Link>
    </div>
  )
}

export default CardItem
