import React, { useState } from "react";
import axios from "axios";

const StartupForm = ({ onCancel }) => { // onCancel prop 추가
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    contractStartDate: "",
    contractTargetDeadline: "",
    progress: 0,
    currentCoin: 0,
    goalCoin: 0,
    walletId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8999/api/startups/create", formData);
      console.log("Data submitted successfully:", response.data);
      alert("Startup created successfully!");
      setFormData({
        name: "",
        category: "",
        contractStartDate: "",
        contractTargetDeadline: "",
        progress: 0,
        currentCoin: 0,
        goalCoin: 0,
        walletId: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to create startup. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter startup name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Contract Start Date */}
      <div>
        <label className="block text-gray-700">Contract Start Date</label>
        <input
          type="date"
          name="contractStartDate"
          value={formData.contractStartDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Contract Target Deadline */}
      <div>
        <label className="block text-gray-700">Contract Target Deadline</label>
        <input
          type="date"
          name="contractTargetDeadline"
          value={formData.contractTargetDeadline}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Progress */}
      <div>
        <label className="block text-gray-700">Progress</label>
        <input
          type="number"
          name="progress"
          value={formData.progress}
          onChange={handleChange}
          placeholder="Enter progress percentage"
          className="w-full p-2 border border-gray-300 rounded"
          min="0"
          max="100"
          required
        />
      </div>

      {/* Current Coin */}
      <div>
        <label className="block text-gray-700">Current Coin</label>
        <input
          type="number"
          name="currentCoin"
          value={formData.currentCoin}
          onChange={handleChange}
          placeholder="Enter current coin amount"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Goal Coin */}
      <div>
        <label className="block text-gray-700">Goal Coin</label>
        <input
          type="number"
          name="goalCoin"
          value={formData.goalCoin}
          onChange={handleChange}
          placeholder="Enter goal coin amount"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* WalletId */}
      <div>
        <label className="block text-gray-700">WalletId</label>
        <input
          type="text"
          name="walletId"
          value={formData.walletId}
          onChange={handleChange}
          placeholder="Enter wallet address"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel} // 취소 버튼 클릭 시 onCancel 호출
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StartupForm;
