import express from 'express'
import {registerUser, loginUser, userBalance, careActivities, availableRewards, fetchActivity, fetchRewardsRedeem} from "../controllers/userController.js"
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/balance', userAuth, userBalance)
userRouter.post('/care-activity/:id', userAuth, careActivities)
userRouter.post('/rewards-redeem/:id', userAuth, availableRewards)
userRouter.get('/fetch-activity', userAuth, fetchActivity)
userRouter.get('/fetch-redeem', userAuth, fetchRewardsRedeem)


export default userRouter