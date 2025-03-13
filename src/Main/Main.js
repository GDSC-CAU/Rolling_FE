import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Main.css";

const BASE_URL = "http://13.124.189.66:8080/api"; // 백엔드 주소


const Main = () => {
  const [users, setUsers] = useState([]); // 유저 목록
  const navigate = useNavigate();

  // 🟢 서버에서 롤링페이퍼 유저 목록 불러오기
  useEffect(() => {
    axios
      .get(`${BASE_URL}/papers`)
      .then((response) => {
        console.log("서버 응답:", response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data); // 받아온 데이터로 상태 업데이트
        } else {
          console.error("데이터 형식이 올바르지 않음:", response.data);
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []); // ⬅️ 빈 배열을 넣어 첫 렌더링 때만 실행!

  // 🟢 사용자 추가 함수
  const addUser = async () => {
    const name = prompt("사용자 이름을 입력하세요:");
    if (name) {
      try {
        const response = await axios.post(`${BASE_URL}/papers`, { name });
        console.log("새 유저 추가됨:", response.data);
  
        // 🔹 response.data 자체가 ID라면, 이를 사용
        if (typeof response.data === "number") {
          setUsers([...users, { id: response.data, name }]);
        } else {
          console.error("서버 응답 데이터 형식이 예상과 다름:", response.data);
        }
      } catch (error) {
        console.error("유저 추가 실패:", error);
      }
    }
  };
  

  // 🟢 사용자 클릭 시 'Person' 페이지로 이동
  const handleUserClick = (userId) => {
    const user = users.find((u) => u.id === userId);
    const userName = user?.name || "알 수 없음";

    console.log("🔹 선택한 userId:", userId);
    console.log("🔹 선택한 userName:", userName);

    navigate(`/person/${userId}`, { state: { userId, userName } });
};

  

  return (
    <div className="main-container">
      <h1 className="title">Video Rollingpaper</h1>
      <button className="add-user-btn" onClick={addUser}>+</button>
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-item">
              <button className="user-btn" onClick={() => handleUserClick(user.id)}></button>
              <p className="user-name">{user.name}</p>
            </div>
          ))
        ) : (
          <p className="no-users">유저 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
