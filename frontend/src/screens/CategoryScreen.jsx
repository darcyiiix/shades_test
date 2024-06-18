import { useEffect, useState } from 'react';
import Products from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';

const CategoryScreen = () => {
    const { keyword, category } = useParams(); // Get category from URL parameters
    const { data: productsData, isLoading, error } = useGetProductsQuery({ keyword });
    const [products, setProducts] = useState([]);
    const [sortType, setSortType] = useState('recent');
    const [visible, setVisible] = useState(4);
    const [btnDisabled, setBtnDisabled] = useState(false);

    let numItems = Math.min(visible + 4, products.length);

    useEffect(() => {
        if (productsData) {
            const filteredProducts = category
                ? productsData.products.filter(product => product.category.toLowerCase() === category.toLowerCase())
                : productsData.products;
            setProducts(filteredProducts);
        }
    }, [productsData, category]); // Add category as a dependency

    useEffect(() => {
        if (products.length > 0) {
            sortProducts(sortType);
        }
    }, [sortType, products]);

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const sortProducts = (type) => {
        const sortedProducts = [...products];
        if (type === 'lowToHigh') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (type === 'highToLow') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (type === 'recent') {
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        setProducts(sortedProducts);
    };

    const showMoreItems = () => {
        setVisible(numItems);
        setBtnDisabled(numItems === products.length);
        numItems = Math.min(numItems + 4, products.length);
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
                        <h2 className="text-3xl font-light">{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'}</h2>
                        <div className="flex justify-end mb-4">
                            <label htmlFor="sortBy" className="mr-2 font-semibold">Sort:</label>
                            <select id="sortBy" className='bg-transparent border-none cursor-pointer focus:ring-transparent p-0' onChange={handleSortChange} value={sortType}>
                                <option value="recent">Most Recent</option>
                                <option value="lowToHigh">Lowest Price</option>
                                <option value="highToLow">Highest Price</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2">
                            {products.slice(0, visible).map((product) => (
                                <div key={product._id}>
                                    <Products product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='text-center'>
                        <p className='my-4'>You've seen {numItems} out of {products.length} products</p>
                        <button onClick={showMoreItems} disabled={btnDisabled} className={`text-white py-2 px-8 ${btnDisabled ? 'bg-gray-300' :'bg-primary'}`}>
                            Load more
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default CategoryScreen;
