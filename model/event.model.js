const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let eventSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    location:{
      type:String,
    },
    number: {
      type:Number,
    },
    event:{
        type:String,
    },
    budget:{
       type:Number,
    },
    description:{
        type:String,
    }
  },
  {
    collection: "EventDB",
  },
);
module.exports = mongoose.model("EventSchema", eventSchema);
