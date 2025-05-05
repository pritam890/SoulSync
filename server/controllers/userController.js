import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import CareActivity from "../models/careModel.js";
import { careActivity, rewardsAvailable } from "../assets/assets.js";
import rewardsGet from "../models/rewardModel.js";

const registerUser = async (req,res)=>{
    try{
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.json({success: false, message:"Missing Details"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name, email, password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user:{name: user.name}})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const loginUser = async (req,res)=>{
    try{

        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message: "User doesn't exist"})
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if(isMatched){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token, user: {name: user.name}})
        }else{
            return res.json({success:false, message: "Invalid credentials"})
        }

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
const userBalance = async (req,res)=>{
    try{
        const {userId} = req.body
        const user = await userModel.findById(userId)
        res.json({success:true, balance: user.rewardBalance, user: {
            name: user.name
        }})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const careActivities = async (req, res) => {
    try {
      const { userId } = req.body;
      const activityId = parseInt(req.params.id);
  
      const selectedActivity = careActivity.find(
        (activity) => activity.activityId === activityId
      );
  
      if (!selectedActivity) {
        return res.status(400).json({ success: false, message: "Invalid activity ID" });
      }
  
      const { title, description, cost } = selectedActivity;
  
      const newActivity = {
        title,
        description,
        cost,
        completedAt: new Date()
      };
  
      let record = await CareActivity.findOne({ userId });
  
      if (record) {
        record.activities.push(newActivity);
        await record.save();
      } else {
        record = await CareActivity.create({
          userId,
          activities: [newActivity]
        });
      }
        const user = await userModel.findById(userId);
        if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
        }

        user.rewardBalance += cost;
        await user.save();

      res.json({success: true, message: "Activity completed successfully"});
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  const availableRewards = async (req, res) => {
    try {
      const { userId } = req.body;
      const rewardId = parseInt(req.params.id);
  
      const selectedReward = rewardsAvailable.find(
        (reward) => reward.rewardId === rewardId
      );
  
      if (!selectedReward) {
        return res.json({ success: false, message: "Invalid reward ID" });
      }
  
      const { title, description, cost } = selectedReward;
  
      const newReward = {
        title,
        description,
        cost,
        completedAt: new Date()
      };
  
      let record = await rewardsGet.findOne({ userId });
  
      if (record) {
        record.rewards.push(newReward);
        await record.save();
      } else {
        record = await rewardsGet.create({
          userId,
          rewards: [newReward]
        });
      }
        const user = await userModel.findById(userId);
        if (!user) {
        return res.json({ success: false, message: "User not found" });
        }

        user.rewardBalance -= cost;
        await user.save();

      res.json({success: true, message: "Reward redeemed successfully"});
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };

  const fetchActivity = async(req,res)=>{
    try{
      const {userId} = req.body
      let record = await CareActivity.findOne({ userId });
      res.json({success:true, activities:record.activities})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
  }
  const fetchRewardsRedeem = async(req,res)=>{
    try{
      const {userId} = req.body
      let record = await rewardsGet.findOne({ userId });
      res.json({success:true, rewardsRedeem:record.rewards})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
  }

export { registerUser, loginUser, userBalance , careActivities, availableRewards, fetchActivity, fetchRewardsRedeem}