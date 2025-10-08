import mongoose from "mongoose";

// Counter Schema and Model
const CounterSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", CounterSchema);

export default Counter;