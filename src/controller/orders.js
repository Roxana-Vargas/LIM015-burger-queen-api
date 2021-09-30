const Order = require('../models/Orders');
const Product = require('../models/Products');
const { verifyId } = require('../utils/utils');

const createOrder = async (req, resp) => {
  const {
    userId, client, status, products,
  } = req.body;
  if (!products || products.length === 0) {
    resp.status(400).json({ message: 'You don´t enter products' });
  } else {
    const newOrder = new Order({
      userId, client, status, products,
    });
    products.map(async (el) => {
      const foundProduct = await Product.find({ _id: { $in: el.product } });
      if (foundProduct.length === 0) {
        resp.status(404).json({ message: 'The product doesn´t exists' });
      } else {
        const savedOrder = await newOrder.save();
        const populatedOrder = await Order.findOne({ _id: savedOrder._id }).populate('products.product');
        resp.status(200).json(populatedOrder);
      }
    });
  }
};

const getOrders = async (req, resp) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const populate = 'products.product';
  const allOrders = await Order.paginate({}, { limit, page, populate });
  const linkHeader = {
    first: `http://localhost:8080/products?limit=${limit}&page=1`,
    prev: allOrders.hasPrevPage ? `http://localhost:8080/products?limit=${limit}&page=${page - 1}` : false,
    next: allOrders.hasNextPage ? `http://localhost:8080/products?limit=${limit}&page=${page + 1}` : false,
    last: allOrders.totalPages ? `http://localhost:8080/products?limit=${limit}&page=${allOrders.totalPages}` : false,
  };
  //   console.log(linkHeader);
  resp.links(linkHeader);
  resp.status(200).json(allOrders);
};

const getOrderById = async (req, resp) => {
  const validation = verifyId(req.params.orderId);
  if (validation === true) {
    const order = await Order.findById(req.params.orderId).populate('products.product');
    if (order === null) {
      resp.status(404).json({ message: 'The order doesn´t exist' });
    } else {
      resp.status(200).json(order);
    }
  } else {
    resp.status(404).json('Id format is invalid');
  }
};

const uptadeOrderById = async (req, resp) => {
  const validation = verifyId(req.params.orderId);
  if (validation === true) {
    if ((Object.keys(req.body).length === 0) || req.body.userId === '' || req.body.client === '' || req.body.status === '' || req.body.products === '') {
      resp.status(400).json({ message: 'You didn´t enter property to modify' });
    } else {
      const status = ['pending', 'canceled', 'delivering', 'delivered'];
      if (req.body.status && (!status.includes(req.body.status))) {
        resp.status(400).json({ message: 'The status property is invalid' });
      } else {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
          new: true,
        }).populate('products.product');
        if (updatedOrder === null) {
          resp.status(404).json({ message: 'The order doesn´t exist' });
        }
        resp.status(200).json(updatedOrder);
      }
    }
  } else {
    resp.status(404).json({ message: 'Id format is invalid' });
  }
};

const deleteOrderById = async (req, resp) => {
  const validation = verifyId(req.params.orderId);
  if (validation === true) {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId).populate('products.product');
    if (deletedOrder === null) {
      resp.status(404).json({ message: 'The order doesn´t exist' });
    } else {
      resp.status(200).json(deletedOrder);
    }
  } else {
    resp.status(404).json({ message: 'Id format is invalid' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  uptadeOrderById,
  deleteOrderById,
};
