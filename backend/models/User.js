import mongoose from "mongoose";
import Counter from "./Counter.js";


// user schema and model
const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Add email field
  password: { type: String, required: true },
});

// Pre Save Hook to Generate Numeric ID
userSchema.pre("save", async function (next) {
  const doc = this;

  if (!doc.isNew) return next(); // Use `isNew` to check if the document is new

  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "userId" }, // Counter name
      { $inc: { seq: 1 } }, // Increment the sequence value
      { new: true, upsert: true } // Create the counter if it doesn't exist
    );

    doc.id = counter.seq; // Assign the incremented value to the user document
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;