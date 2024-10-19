import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product, toggleWishlist, addToCart }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            <FaHeart className={wishlist.includes(product.id) ? 'text-red-500' : ''} />
          </button>
        </div>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-500 mb-2 capitalize">{product.category} • {product.type}</p>
        <div className="flex items-center mb-2">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
        </div>
        <p className="text-gray-600 mb-4">In stock: {product.stock}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded font-semibold transition-colors duration-200 ${
            product.stock > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);
