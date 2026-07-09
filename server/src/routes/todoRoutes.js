import express from "express";
import mongoose from "mongoose";
import Todo from "../models/Todo.js";

const router = express.Router();

const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid todo id" });
  }

  next();
};

router.get("/", async (_req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const title = req.body.title?.trim();

    if (!title) {
      return res.status(400).json({ message: "Todo title is required" });
    }

    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validateId, async (req, res, next) => {
  try {
    const updates = {};

    if (typeof req.body.title === "string") {
      const title = req.body.title.trim();

      if (!title) {
        return res.status(400).json({ message: "Todo title cannot be empty" });
      }

      updates.title = title;
    }

    if (typeof req.body.completed === "boolean") {
      updates.completed = req.body.completed;
    }

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
