'use client';

import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaDog,
  FaCat,
  FaSearch,
  FaShoppingCart,
  FaPaw,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaBox,
  FaGift,
  FaUserShield,
  FaCheck,
  FaTimes,
  FaStore,
} from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

const PawsomePetsEnhanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState([
    'Food',
    'Toys',
    'Accessories',
    'Health',
  ]);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Cat Food',
      price: 29.99,
      category: 'Food',
      type: 'cat',
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 120,
      stock: 50,
      sellerId: 1,
    },
    {
      id: 2,
      name: 'Durable Dog Toy',
      price: 14.99,
      category: 'Toys',
      type: 'dog',
      image: '/placeholder.svg',
      rating: 4.2,
      reviews: 85,
      stock: 100,
      sellerId: 2,
    },
    {
      id: 3,
      name: 'Cat Scratching Post',
      price: 39.99,
      category: 'Accessories',
      type: 'cat',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 200,
      stock: 30,
      sellerId: 1,
    },
    {
      id: 4,
      name: 'Dog Dental Chews',
      price: 19.99,
      category: 'Health',
      type: 'dog',
      image: '/placeholder.svg',
      rating: 4.4,
      reviews: 150,
      stock: 75,
      sellerId: 2,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Food',
    type: 'cat',
    image: '',
    stock: 0,
  });
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: 'Pet Paradise',
      email: 'petparadise@example.com',
      status: 'approved',
    },
    {
      id: 2,
      name: 'Furry Friends Co.',
      email: 'furryfriends@example.com',
      status: 'approved',
    },
    {
      id: 3,
      name: 'Paw Prints',
      email: 'pawprints@example.com',
      status: 'pending',
    },
  ]);
  const [showSellerApplication, setShowSellerApplication] = useState(false);
  const [newSeller, setNewSeller] = useState({
    name: '',
    email: '',
    description: '',
  });

  const addToCart = useCallback((product) => {
    if (product.stock > 0) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === productId);
      if (removedItem) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId
              ? { ...p, stock: p.stock + removedItem.quantity }
              : p
          )
        );
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  }, []);

  const updateCartItemQuantity = useCallback((productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const quantityDiff = newQuantity - item.quantity;
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === productId ? { ...p, stock: p.stock - quantityDiff } : p
            )
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }, []);

  const addProduct = useCallback(() => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          ...newProduct,
          id: prevProducts.length + 1,
          price: parseFloat(newProduct.price),
          rating: 0,
          reviews: 0,
          stock: parseInt(newProduct.stock),
          sellerId: user.id,
        },
      ]);
      setNewProduct({
        name: '',
        price: '',
        category: 'Food',
        type: 'cat',
        image: '',
        stock: 0,
      });
    }
  }, [newProduct, user]);

  const deleteProduct = useCallback((id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  }, []);

  const addCategory = useCallback(() => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setNewCategory('');
    }
  }, [newCategory, categories]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const login = useCallback(() => {
    // Simulated login logic
    if (loginEmail === 'admin@example.com' && loginPassword === 'admin') {
      setUser({
        id: 0,
        name: 'Admin',
        email: loginEmail,
        role: 'admin',
        loyaltyPoints: 0,
      });
    } else {
      const seller = sellers.find(
        (s) => s.email === loginEmail && s.status === 'approved'
      );
      if (seller) {
        setUser({
          id: seller.id,
          name: seller.name,
          email: seller.email,
          role: 'seller',
          loyaltyPoints: 0,
        });
      } else {
        setUser({
          id: 1000,
          name: 'John Doe',
          email: loginEmail,
          role: 'customer',
          loyaltyPoints: 100,
        });
      }
    }
    setLoyaltyPoints(100);
    setShowLogin(false);
  }, [loginEmail, loginPassword, sellers]);

  const register = useCallback(() => {
    // Simulated register logic
    setUser({
      id: 1001,
      name: registerName,
      email: registerEmail,
      role: 'customer',
      loyaltyPoints: 0,
    });
    setLoyaltyPoints(0);
    setShowRegister(false);
  }, [registerName, registerEmail]);

  const logout = useCallback(() => {
    setUser(null);
    setLoyaltyPoints(0);
    setActiveTab('shop');
  }, []);

  const submitReview = useCallback(() => {
    if (reviewProduct && reviewComment) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === reviewProduct.id
            ? {
                ...p,
                rating: (p.rating * p.reviews + reviewRating) / (p.reviews + 1),
                reviews: p.reviews + 1,
              }
            : p
        )
      );
      setShowReview(false);
      setReviewProduct(null);
      setReviewRating(5);
      setReviewComment('');
    }
  }, [reviewProduct, reviewRating, reviewComment]);

  const checkout = useCallback(() => {
    const pointsEarned = Math.floor(totalPrice);
    setLoyaltyPoints((prevPoints) => prevPoints + pointsEarned);
    setCartItems([]);
    setShowLoyaltyModal(true);
  }, [totalPrice]);

  const submitSellerApplication = useCallback(() => {
    if (newSeller.name && newSeller.email && newSeller.description) {
      setSellers((prevSellers) => [
        ...prevSellers,
        { ...newSeller, id: prevSellers.length + 1, status: 'pending' },
      ]);
      setNewSeller({ name: '', email: '', description: '' });
      setShowSellerApplication(false);
    }
  }, [newSeller]);

  const updateSellerStatus = useCallback((sellerId, newStatus) => {
    setSellers((prevSellers) =>
      prevSellers.map((seller) =>
        seller.id === sellerId ? { ...seller, status: newStatus } : seller
      )
    );
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex items-center space-x-2 text-2xl font-bold text-gray-800"
          >
            <FaPaw className="text-3xl text-blue-600" />
            <span>Pawsome Pets</span>
          </motion.div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-3 py-2 rounded ${
                activeTab === 'shop'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Shop
            </button>
            {user && user.role === 'seller' && (
              <button
                onClick={() => setActiveTab('seller')}
                className={`px-3 py-2 rounded ${
                  activeTab === 'seller'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Seller Dashboard
              </button>
            )}
            {user && user.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 rounded ${
                  activeTab === 'admin'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Admin Dashboard
              </button>
            )}
            {activeTab === 'shop' && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative cursor-pointer"
                onClick={() => setShowCart(true)}
              >
                <FaShoppingCart className="text-2xl text-gray-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </motion.div>
            )}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <FaUser />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <div className="py-1">
                    <button
                      onClick={() => setShowLoyaltyModal(true)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Loyalty Points: {loyaltyPoints}
                    </button>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-gray-600 hover:text-gray-800"
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'shop' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Find the Perfect Products for Your Pets
            </h1>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="relative max-w-md w-full mb-4 sm:mb-0">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1 rounded-full ${
                    selectedCategory === 'All'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                      >
                        <FaHeart
                          className={
                            wishlist.includes(product.id) ? 'text-red-500' : ''
                          }
                        />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-500 mb-2 capitalize">
                      {product.category} • {product.type}
                    </p>
                    <div className="flex items-center mb-2">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{product.rating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-2">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      In stock: {product.stock}
                    </p>
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
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded font-semibold hover:bg-gray-300 transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {activeTab === 'seller' && user && user.role === 'seller' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              Seller Dashboard
            </h1>
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={newProduct.type}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, type: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                >
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
              </div>
              <button
                onClick={addProduct}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                <FaPlus className="inline mr-2" />
                Add Product
              </button>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Manage Your Products
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Stock</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter((product) => product.sellerId === user.id)
                      .map((product) => (
                        <tr key={product.id} className="border-t">
                          <td className="px-4 py-2">{product.name}</td>
                          <td className="px-4 py-2">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-2">{product.category}</td>
                          <td className="px-4 py-2 capitalize">
                            {product.type}
                          </td>
                          <td className="px-4 py-2">{product.stock}</td>
                          <td className="px-4 py-2">
                            <button className="text-blue-500 hover:text-blue-700 mr-2">
                              <FaEdit />
                              <span className="sr-only">Edit</span>
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                              <span className="sr-only">Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && user && user.role === 'admin' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              Admin Dashboard
            </h1>
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Manage Sellers</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller) => (
                      <tr key={seller.id} className="border-t">
                        <td className="px-4 py-2">{seller.name}</td>
                        <td className="px-4 py-2">{seller.email}</td>
                        <td className="px-4 py-2 capitalize">
                          {seller.status}
                        </td>
                        <td className="px-4 py-2">
                          {seller.status === 'pending' && (
                            <>
                              <button
                                onClick={() =>
                                  updateSellerStatus(seller.id, 'approved')
                                }
                                className="text-green-500 hover:text-green-700 mr-2"
                              >
                                <FaCheck />
                                <span className="sr-only">Approve</span>
                              </button>
                              <button
                                onClick={() =>
                                  updateSellerStatus(seller.id, 'rejected')
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaTimes />
                                <span className="sr-only">Reject</span>
                              </button>
                            </>
                          )}
                          {seller.status === 'approved' && (
                            <button
                              onClick={() =>
                                updateSellerStatus(seller.id, 'suspended')
                              }
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <FaUserShield />
                              <span className="sr-only">Suspend</span>
                            </button>
                          )}
                          {seller.status === 'suspended' && (
                            <button
                              onClick={() =>
                                updateSellerStatus(seller.id, 'approved')
                              }
                              className="text-green-500 hover:text-green-700"
                            >
                              <FaUserShield />
                              <span className="sr-only">Reinstate</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="New Category Name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="border rounded px-3 py-2 flex-grow mr-2"
                />
                <button
                  onClick={addCategory}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Category
                </button>
              </div>
              <ul>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    {category}
                    <button
                      onClick={() =>
                        setCategories(categories.filter((c) => c !== category))
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                      <span className="sr-only">Delete</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4"
                    >
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="bg-gray-200 px-2 py-1 rounded-l"
                        >
                          -
                        </button>
                        <span className="bg-gray-100 px-4 py-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item.id, item.quantity + 1)
                          }
                          className="bg-gray-200 px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={checkout}
                      className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FaCreditCard className="inline mr-2" />
                      Checkout
                    </button>
                  </div>
                </>
              )}
              <button
                onClick={() => setShowCart(false)}
                className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      >
        <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            {selectedProduct && (
              <>
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-2">
                  {selectedProduct.name}
                </Dialog.Title>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <p className="text-sm text-gray-500 mb-2">
                  {selectedProduct.category} • {selectedProduct.type}
                </p>
                <p className="text-lg font-bold mb-2">
                  ${selectedProduct.price.toFixed(2)}
                </p>
                <div className="flex items-center mb-4">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{selectedProduct.rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-2">
                    ({selectedProduct.reviews} reviews)
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      setReviewProduct(selectedProduct);
                      setShowReview(true);
                      setSelectedProduct(null);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition-colors duration-200"
                  >
                    Write a Review
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog open={showLogin} onClose={() => setShowLogin(false)}>
        <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Login
            </Dialog.Title>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <button
              onClick={login}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200 mb-2"
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Register
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog open={showRegister} onClose={() => setShowRegister(false)}>
        <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Register
            </Dialog.Title>
            <input
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <button
              onClick={register}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Register
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog open={showReview} onClose={() => setShowReview(false)}>
        <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Write a Review
            </Dialog.Title>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
                    star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setReviewRating(star)}
                />
              ))}
            </div>
            <textarea
              placeholder="Write your review here..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 h-32"
            />
            <button
              onClick={submitReview}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Submit Review
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={showLoyaltyModal}
        onClose={() => setShowLoyaltyModal(false)}
      >
        <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Loyalty Program
            </Dialog.Title>
            <p className="mb-4">
              Congratulations! You've earned loyalty points on your purchase.
            </p>
            <p className="text-2xl font-bold mb-4">
              Current Points: {loyaltyPoints}
            </p>
            <button
              onClick={() => setShowLoyaltyModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={showSellerApplication}
        onClose={() => setShowSellerApplication(false)}
      >
        <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Become a Seller
            </Dialog.Title>
            <input
              type="text"
              placeholder="Business Name"
              value={newSeller.name}
              onChange={(e) =>
                setNewSeller({ ...newSeller, name: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              type="email"
              placeholder="Business Email"
              value={newSeller.email}
              onChange={(e) =>
                setNewSeller({ ...newSeller, email: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <textarea
              placeholder="Business Description"
              value={newSeller.description}
              onChange={(e) =>
                setNewSeller({ ...newSeller, description: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-4 h-32"
            />
            <button
              onClick={submitSellerApplication}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Submit Application
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-600">
                Pawsome Pets is your one-stop shop for all your pet needs. We
                offer a wide range of high-quality products for cats and dogs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="text-gray-600">
                <li className="flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  123 Pet Street, Animalville, PA 12345
                </li>
                <li className="flex items-center mb-2">
                  <FaPhone className="mr-2" />
                  (555) 123-4567
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  info@pawsomepets.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Join Us</h3>
              <p className="text-gray-600 mb-2">
                Interested in selling on Pawsome Pets?
              </p>
              <button
                onClick={() => setShowSellerApplication(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                <FaStore className="inline mr-2" />
                Become a Seller
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© 2023 Pawsome Pets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PawsomePetsEnhanced;
