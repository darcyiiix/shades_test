import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [dimension, setDimension] = useState([]);
  const [diameter, setDiameter] = useState('');
  const [height, setHeight] = useState('');
  const [dimPrice, setDimPrice] = useState('');
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState('');
  const [finishes, setFinishes] = useState([]);
  const [finish, setFinish] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  console.log(product)

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setDimension(product.dimension || []);
      setColors(product.colors || []);
      setFinishes(product.finishes || []);
    }
  }, [product]);

  const handleAddDimension = () => {
    if (diameter.trim() !== '' && height.trim() !== '' && dimPrice.trim() !== '') {
      const newDimension = {
        diameter: parseInt(diameter.trim(), 10),
        height: parseInt(height.trim(), 10),
        price: parseInt(dimPrice.trim(), 10),
      };

      setDimension([...dimension, newDimension]);
      setDiameter('');
      setHeight('');
      setDimPrice('');
    }
  };

  const handleRemoveDimension = (index) => {
    const newDimensions = [...dimension];
    newDimensions.splice(index, 1);
    setDimension(newDimensions);
  };

  const handleAddColor = () => {
    if (color.trim() !== '') {
      setColors([...colors, color.trim()]);
      setColor('');
    }
  };

  const handleRemoveColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const handleAddFinish = () => {
    if (finish.trim() !== '') {
      setFinishes([...finishes, finish.trim()]);
      setFinish('');
    }
  };

  const handleRemoveFinish = (index) => {
    const newFinishes = [...finishes];
    newFinishes.splice(index, 1);
    setFinishes(newFinishes);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      dimension,
      colors,
      finishes,
    };

    const result = await updateProduct(updatedProduct);

    if (result.error) {
      toast.error(result.error.message || 'Failed to update product');
    } else {
      toast.success('Product updated');
      navigate('/admin/productlist');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Images uploaded successfully');
      setImage(res.data.images); // Update the image state with the uploaded image URLs
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload images');
    }
  };

  return (
    <div>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.message}</Message>
      ) : (
        <form className="max-w-sm mx-auto" autoComplete="off" onSubmit={submitHandler}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="price" className="block mb-2 text-sm text-gray-900">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="productImages">Product Images</label>
            <input
              type="file"
              name='images'
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
              id="productImages"
              onChange={uploadFileHandler}
              multiple
            />
            
          </div>

          <div className="mb-5">
            <label htmlFor="brand" className="block mb-2 text-sm text-gray-900">Brand</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="CinS" className="block mb-2 text-sm text-gray-900">Count In Stock</label>
            <input
              type="number"
              id="CinS"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="cat" className="block mb-2 text-sm text-gray-900">Category</label>
            <input
              type="text"
              id="cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="desc" className="block mb-2 text-sm text-gray-900">Description</label>
            <input
              type="text"
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label className='block mb-2 text-sm text-gray-900' htmlFor="diameter">Diameter:</label>
            <input
              type="number"
              id="diameter"
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className='block mb-2 text-sm text-gray-900' htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className='block mb-2 text-sm text-gray-900' htmlFor="dimPrice">Price:</label>
            <input
              type="number"
              id="dimPrice"
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              value={dimPrice}
              onChange={(e) => setDimPrice(e.target.value)}
            />
          </div>

          <button type="button" className='mt-4 bg-primary text-white px-2 py-1' onClick={handleAddDimension}>Add Dimension</button>

          <div className="mb-5">
            <ul>
              {dimension.map((dim, index) => (
                <li key={index} className='mt-4'>
                  Diameter: {dim.diameter}, Height: {dim.height}, Price: {dim.price}
                  <button type="button" className='ml-2 bg-black text-white px-2 py-1' onClick={() => handleRemoveDimension(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div> 

          {/* Colors */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-gray-900" htmlFor="color">Color:</label>
            <input
              type="text"
              id="color"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <button type="button" className="mt-4 bg-primary text-white px-2 py-1" onClick={handleAddColor}>Add Color</button>
            <ul>
              {colors.map((col, index) => (
                <li key={index} className="mt-4">
                  {col}
                  <button type="button" className="ml-2 bg-black text-white px-2 py-1" onClick={() => handleRemoveColor(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Finishes */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-gray-900" htmlFor="finish">Finish:</label>
            <input
              type="text"
              id="finish"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
            />
            <button type="button" className="mt-4 bg-primary text-white px-2 py-1" onClick={handleAddFinish}>Add Finish</button>
            <ul>
              {finishes.map((fin, index) => (
                <li key={index} className="mt-4">
                  {fin}
                  <button type="button" className="ml-2 bg-black text-white px-2 py-1" onClick={() => handleRemoveFinish(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <button type="submit" className="text-white bg-black focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
