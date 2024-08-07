import { useEffect, useState, useCallback } from 'react';
import Products from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';

const ViewAllProductsScreen = () => {
    const { keyword } = useParams();
    const { data: productsData, isLoading, error } = useGetProductsQuery({ keyword });
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortType, setSortType] = useState('recent');
    const [visible, setVisible] = useState(4);
    const [btnDisabled, setBtnDisabled] = useState(false);

    useEffect(() => {
        if (productsData) {
            setProducts(productsData.products);
        }
    }, [productsData]);

    const sortProducts = useCallback((products, type) => {
        const sorted = [...products];
        if (type === 'lowToHigh') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (type === 'highToLow') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (type === 'recent') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return sorted;
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const sorted = sortProducts(products, sortType);
            setSortedProducts(sorted);
        }
    }, [products, sortType, sortProducts]);

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const showMoreItems = () => {
        const numItems = Math.min(visible + 4, sortedProducts.length);
        setVisible(numItems);
        if (numItems === sortedProducts.length) {
            setBtnDisabled(true);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <div className='p-8 border-b'>
                        <h2 className="text-3xl font-light">Lampshades</h2>
                        <div className="flex justify-end mb-4">
                            <label htmlFor="sortBy" className="mr-2 font-semibold">Sort:</label>
                            <select id="sortBy" className='bg-transparent border-none cursor-pointer focus:ring-transparent p-0' onChange={handleSortChange} value={sortType}>
                                <option value="recent">Most Recent</option>
                                <option value="lowToHigh">Lowest Price</option>
                                <option value="highToLow">Highest Price</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2">
                            {sortedProducts.slice(0, visible).map((product) => (
                                <div key={product._id}>
                                    <Products product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='text-center'>
                        <p className='my-4'>You've seen {visible} out of {sortedProducts.length} products</p>
                        <button onClick={showMoreItems} disabled={btnDisabled} className={`text-white py-2 px-8 ${btnDisabled ? 'bg-gray-300' :'bg-primary'}`}>
                            Load more
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default ViewAllProductsScreen;
