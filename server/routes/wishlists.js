import express from "express";
import { auth } from "../middleware/auth.js";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// Get user's wishlist
router.get("/", auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.userId }).populate(
      "products"
    );
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.userId, products: [] });
      await wishlist.save();
    }
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add product to wishlist
router.post("/:productId", auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.userId, products: [] });
    }

    if (!wishlist.products.includes(req.params.productId)) {
      wishlist.products.push(req.params.productId);
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove product from wishlist
router.delete("/:productId", auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== req.params.productId
    );
    await wishlist.save();

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
