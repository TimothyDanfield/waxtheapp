const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const verifyToken = require("../middleware/auth");
const verifyRole = require("../middleware/role");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, verifyRole(["admin"]), async (req, res) => {
    const orderList = await Order.find();
    res.status(200).send(orderList);
  })
  .post(async (req, res) => {
    // const user = await User.findById({ _id: req.user.user_id });

    const { streetAddress, city, zip, apt, state, order } = req.body;
    if (!(streetAddress || city || zip || state)) {
      return res
        .status(400)
        .send({ error: "Please provide all required information" });
    }
    if (!order) {
      return res.status(400).send({ error: "Your cart is empty" });
    }
    try {
      const newOrder = await Order.create({
        address: {
          streetAddress,
          city,
          zip,
          apt: apt ? apt : null,
          state,
        },
        order: {
          item: order.item,
          price: order.price
        },
        orderOwner: "65fcc782f5bb8586fbe46388"
      });

    //   order.items.forEach(async (item) => {
    //     await Product.findByIdAndUpdate(item._id, {
    //       quantity: item.quantity - item.shopped,
    //     });
    //   });

      return res.status(200).send(newOrder);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });

router.route("/:userId").get(verifyToken, async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user.user_id;

  if (userId.toString() !== currentUser.toString()) {
    return res.status(401).json({
      error: "Not authorized: You can only view your own orders.",
    });
  }

  const userOrders = await Order.find({
    orderOwner: userId,
  })

    .populate({ path: "orderOwner", select: "name" })
    .sort({ created: 1 });

  res.status(200).send(userOrders);
});

module.exports = router;