const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// TShis is similar to a Sequelize model
const Score = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  score: { type: Number, required: true },
}, { _id: false });

// This creates our model from the above schema, using mongoose's model method
const score = mongoose.model("score", score);

// Export the Article model
module.exports = score;
