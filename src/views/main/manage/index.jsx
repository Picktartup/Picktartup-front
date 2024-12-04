import React, { useEffect, useState } from "react";
import axios from "axios";
import SmallButton from "components/Button/SmallButton"; // SmallButton 컴포넌트
import InputForm from "components/InputForms/InputFormA"; // InputForm 컴포넌트

const StartupInvestment = () => {
  const [startups, setStartups] = useState([]); // 스타트업 데이터
  const [selectedIds, setSelectedIds] = useState([]); // 선택된 항목의 ID
  const [keyword, setKeyword] = useState(""); // 검색 키워드
  const [isFormVisible, setIsFormVisible] = useState(false); // 입력 폼 표시 상태

  // 데이터 가져오기
  useEffect(() => {
    fetchStartups();
  }, [keyword]);

  const fetchStartups = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/startups`, {
        params: { keyword: keyword },
      });
      setStartups(response.data.data);
    } catch (error) {
      console.error("Error fetching startups:", error);
    }
  };
  

  // 입력 폼 열기
  const showForm = () => {
    setIsFormVisible(true);
  };

  // 입력 폼 닫기
  const hideForm = () => {
    setIsFormVisible(false);
  };

  // 입력 폼 제출 처리
  const handleFormSubmit = async (formData) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/startups`, formData);
      fetchStartups(); // 데이터 갱신
      hideForm(); // 입력 폼 숨기기
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id) // 선택 해제
        : [...prevSelectedIds, id] // 선택 추가
    );
  };

  // 선택된 항목 삭제
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one item to delete.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete the selected items?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8999/api/v1/startups`, {
        data: { ids: selectedIds },
      });
      setStartups((prevStartups) =>
        prevStartups.filter((startup) => !selectedIds.includes(startup.id))
      ); // UI 업데이트
      setSelectedIds([]); // 선택 초기화
      alert("Selected items deleted successfully!");
    } catch (error) {
      console.error("Error deleting startups:", error);
      alert("Failed to delete items. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-4">Startup List</h2>

      {/* 검색창 */}
      <div className="flex w-full justify-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-grow p-3 max-w-2xl border border-gray-300 rounded-md mr-2"
        />
        <button onClick={fetchStartups} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          검색
        </button>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex justify-end space-x-2 mb-6">
        <SmallButton label="Create" onClick={showForm} color="bg-green-500" />
        <SmallButton
          label="Delete"
          onClick={handleDelete}
          color={selectedIds.length > 0 ? "bg-red-500" : "bg-gray-300"}
        />
      </div>

      {/* 입력 폼 */}
      {isFormVisible && (
        <div className="p-4 border border-gray-300 rounded-md mb-6">
          <h3 className="text-xl font-bold mb-4">Create New Startup</h3>
          <InputForm onSubmit={handleFormSubmit} onCancel={hideForm} />
        </div>
      )}

      {/* 스타트업 목록 */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {startups.map((startup) => (
          <div key={startup.id} className="p-4 border rounded flex items-center">
            <input
              type="checkbox"
              checked={selectedIds.includes(startup.id)}
              onChange={() => handleCheckboxChange(startup.id)}
              className="mr-4"
            />
            <div>
              <h3 className="text-xl font-bold">{startup.name}</h3>
              <p>Category: {startup.category}</p>
              <p>Start Date: {startup.contractStartDate}</p>
              <p>Deadline: {startup.contractTargetDeadline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupInvestment;
