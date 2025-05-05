import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  cost: Number,
  completedAt: { type: Date, default: Date.now }
}, { _id: false });

const careSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  activities: [activitySchema]
});

const CareActivity = mongoose.models.CareActivity || mongoose.model("CareActivity", careSchema);

export default CareActivity;