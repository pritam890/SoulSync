import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { careActivity } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Care = () => {
  const activities = careActivity;
  const { loadBalanceData, token, loadActivity, completedTask } = useContext(AppContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleComplete = async (activityId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/care-activity/${activityId}`,
        {},
        { headers: { token } }
      );

      if (data.success) {
        loadBalanceData();
        loadActivity();
      } else {
        console.error("Failed to complete activity:", data.message);
      }
    } catch (error) {
      console.error("Error completing activity:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-indigo-100 via-purple-100 to-white">
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 drop-shadow-lg mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        Pick Your Self-Care Power-Up!
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {activities.map((activity, index) => {
          const isCompleted = completedTask.has(activity.title);
          return (
            <motion.div
              key={activity.activityId}
              className="bg-white rounded-3xl shadow-lg border border-purple-200 p-6 transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
            >
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{activity.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{activity.description}</p>

              <div className="flex justify-between items-center mt-6">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium shadow-inner">
                  🎯 Rewards: {activity.cost} pts
                </span>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleComplete(activity.activityId)}
                  disabled={isCompleted}
                  className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md
                    ${isCompleted
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                >
                  {isCompleted ? "Completed" : "Complete"}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Care;
