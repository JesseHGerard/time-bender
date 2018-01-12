const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const User = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { _id: false });

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", User);

// Export the Article model
module.exports = User;