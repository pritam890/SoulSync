import React, { useContext, useState } from 'react';
import { rewardsAvailable } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Reward = () => {
  const { loadBalanceData, token, balance, loadRedeems, completedRewards } = useContext(AppContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const userPoints = balance;
  const [loading, setLoading] = useState(false);

  const handleRedeem = async (reward) => {
    if (balance >= reward.cost) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${backendUrl}/api/user/rewards-redeem/${reward.rewardId}`,
          {},
          {
            headers: { token },
          }
        );
        if (data.success) {
          loadBalanceData();
          loadRedeems();
        } else {
          console.error('Failed to complete activity:', data.message);
        }
      } catch (error) {
        console.error('Error completing activity:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('rewards page has error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-white py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 drop-shadow-md mb-6">
        Redeem Your Rewards
      </h1>

      <div className="text-center text-lg mb-10 text-purple-800 font-medium">
        💎 Your Current Points: <span className="text-indigo-700 font-bold">{userPoints}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {rewardsAvailable.map((reward) => (
          <motion.div
            key={reward.rewardId}
            className="bg-white rounded-3xl shadow-lg p-6 border border-purple-200 hover:shadow-xl transform transition-all duration-300 flex flex-col justify-between"
            initial={{ opacity: 0, scale: 0.9 }}  // Initial state
            animate={{ opacity: 1, scale: 1 }}   // Animated state
            transition={{ duration: 0.3 }}  // Duration of the animation
          >
            <div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">{reward.title}</h2>
              <p className="text-gray-700 mb-4">{reward.description}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Cost: {reward.cost} pts
              </span>
              <motion.button
                onClick={() => handleRedeem(reward)}
                disabled={userPoints < reward.cost || completedRewards.has(reward.title)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-300 ${
                  userPoints >= reward.cost && !completedRewards.has(reward.title)
                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : completedRewards.has(reward.title) ? (
                  'Redeemed'
                ) : userPoints >= reward.cost ? (
                  'Redeem'
                ) : (
                  'Insufficient'
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reward;
