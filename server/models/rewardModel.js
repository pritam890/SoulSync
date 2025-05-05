import mongoose from "mongoose";

const rewardTypeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  cost: Number,
  completedAt: { type: Date, default: Date.now }
}, { _id: false });

const rewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  rewards: [rewardTypeSchema]
});

const rewardsGet = mongoose.models.Rewards || mongoose.model("Rewards", rewardSchema);

export default rewardsGet;