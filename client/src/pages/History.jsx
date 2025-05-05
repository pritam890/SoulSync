import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const History = () => {
  const { completedActivities, rewardsRedeem } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-white py-12 px-8">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-lg mb-12">
        Your Activity & Rewards History
      </h1>

      <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Completed Activities */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:border-indigo-500 transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
            ✅ Completed Activities
          </h2>
          <ul className="space-y-6">
            {completedActivities.map((activity, index) => (
              <li
                key={index}
                className="bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-200 hover:bg-indigo-200 transition-all"
              >
                <p className="text-lg font-semibold text-indigo-800">{activity.title}</p>
                <p className="text-sm text-gray-700 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  🕒 Completed on: {new Date(activity.completedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Redeemed Rewards */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-purple-300 hover:shadow-2xl transition-all duration-300 hover:border-purple-500 transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-purple-700 mb-6 flex items-center gap-2">
            🎁 Redeemed Rewards
          </h2>
          <ul className="space-y-6">
            {rewardsRedeem.map((reward, index) => (
              <li
                key={index}
                className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-200 hover:bg-purple-200 transition-all"
              >
                <p className="text-lg font-semibold text-purple-800">{reward.title}</p>
                <p className="text-sm text-gray-700 mt-1">{reward.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  🕒 Redeemed on: {new Date(reward.completedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default History;
