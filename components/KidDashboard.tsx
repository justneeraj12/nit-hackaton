import React, { useState, useEffect } from 'react';

function KidDashboard() {
  const [screenTime, setScreenTime] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(120); // 2 hours daily goal
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    // Here you would typically fetch the screen time and other data from your API
    // For now, we're using static data and a simple XP system
    const interval = setInterval(() => {
      setScreenTime(prevTime => {
        const newTime = prevTime + 1;
        if (newTime <= dailyGoal) {
          setXp(prevXp => prevXp + 1);
          if (xp >= level * 100) {
            setLevel(prevLevel => prevLevel + 1);
          }
        }
        return newTime;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [dailyGoal, xp, level]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Kid Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Screen Time Adventure</h2>
          <div className="text-4xl font-bold text-green-500 mb-4">{screenTime} minutes</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(screenTime / dailyGoal) * 100}%` }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Daily Goal: {dailyGoal} minutes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="text-2xl font-bold text-purple-600 mb-2">Level {level}</div>
          <div className="text-lg text-purple-500 mb-4">{xp} XP</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(xp / (level * 100)) * 100}%` }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Next level: {level * 100 - xp} XP to go!</p>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Today's Quests</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Read a book for 30 minutes</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Do 20 minutes of physical exercise</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Help with a household chore</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default KidDashboard;