'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function KidDashboard() {
  const [userData, setUserData] = useState({
    screenTime: 0,
    dailyGoal: 120,
    xp: 0,
    level: 1,
  })
  const [quests, setQuests] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const userDataResponse = await fetch('/api/user-data')
      const userData = await userDataResponse.json()
      setUserData(userData)

      const questsResponse = await fetch('/api/quests')
      const questsData = await questsResponse.json()
      setQuests(questsData)
    }

    fetchData()
  }, [])

  const handleQuestCompletion = async (questId) => {
    const response = await fetch('/api/complete-quest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questId }),
    })
    if (response.ok) {
      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === questId ? { ...quest, completed: true } : quest
        )
      )
      const { xpGained } = await response.json()
      setUserData((prevData) => ({
        ...prevData,
        xp: prevData.xp + xpGained,
      }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-4xl font-bold text-green-600 mb-8">Kid Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Your Screen Time Adventure</h2>
          <div className="text-5xl font-bold text-green-500 mb-4">
            {userData.screenTime} minutes
          </div>
          <motion.div
            className="w-full bg-gray-200 rounded-full h-4"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div
              className="bg-green-600 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(userData.screenTime / userData.dailyGoal) * 100}%`,
              }}
              transition={{ delay: 1, duration: 1 }}
            ></motion.div>
          </motion.div>
          <p className="mt-2 text-sm text-gray-600">
            Daily Goal: {userData.dailyGoal} minutes
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            Level {userData.level}
          </div>
          <div className="text-xl text-purple-500 mb-4">{userData.xp} XP</div>
          <motion.div
            className="w-full bg-gray-200 rounded-full h-4"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <motion.div
              className="bg-purple-600 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((userData.xp % (userData.level * 100)) /
                    (userData.level * 100)) *
                  100
                }%`,
              }}
              transition={{ delay: 1.2, duration: 1 }}
            ></motion.div>
          </motion.div>
          <p className="mt-2 text-sm text-gray-600">
            Next level:{' '}
            {userData.level * 100 - (userData.xp % (userData.level * 100))} XP
            to go!
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Today's Quests</h2>
        <ul className="space-y-4">
          {quests.map((quest, index) => (
            <motion.li
              key={quest.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center"
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 rounded"
                checked={quest.completed}
                onChange={() => handleQuestCompletion(quest.id)}
              />
              <span className="ml-3 text-lg">{quest.description}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}