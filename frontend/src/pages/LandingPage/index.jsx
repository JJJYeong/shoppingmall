import React, { useEffect, useState } from 'react'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchInput from './Sections/SearchInput'
import CardItem from './Sections/CardItem'
import axiosInstance from '../../utils/axios'
import { continents, price } from '../../utils/filterData'

const LandingPage = () => {

  const limit = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    price: []
  });

  useEffect(() => {
    fetchProducts({skip, limit});
  }, []);

  const fetchProducts = async({ skip, limit, loadMore = false, filters = {}, searchTerm = "" }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm
    };

    try {
      const res = await axiosInstance.get('/products', {params});

      if(loadMore) {
        setProducts([...products, ...res.data.products]);
      } else {
        setProducts(res.data.products);
      }
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
      searchTerm
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = {...filters};

    if(category === 'continents') {
      newFilters[category] = newFilteredData;
    } else {
      newFilters[category] = handlePrice(newFilteredData);
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const handlePrice = (value) => {
    let array = [];

    for(let key in price) {
      if(price[key]._id === parseInt(value, 10)) {
        array = price[key].array;
      }
    }
    return array;
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit: 4,
      filters,
      searchTerm
    };

    fetchProducts(body);
    setSkip(0);
  };

  const handleSearchTerm = (e) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: e.target.value
    };

    setSkip(0);
    setSearchTerm(e.target.value);
    fetchProducts(body);
  };

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>여행 상품 사이트</h2>
      </div>
      
      {/* Filter */}
      <div className='flex gap-3'>
        <div className='w-1/2'>
          <CheckBox continents={continents} checkedContinents={filters.continents}
              onFilters={filters => handleFilters(filters, 'continents')} />
        </div>
        <div className='w-1/2'>
          <RadioBox price={price} checkedPrice={filters.price}
              onFilters={filters => handleFilters(filters, 'price')} />
        </div>
      </div>

      {/* Search */}
      <div className='flex justify-end mb-3'>
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>

      {/* Card */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {products.map(product =>
          <CardItem product={product} key={product._id} />
        )}
      </div>

      {/* LoadMore */}
      {hasMore &&
        <div className='flex justify-center mt-5'>
          <button className='px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500'
                  onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      }
    </section>
  )
}

export default LandingPage
