import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Person.css";
import classroomBackground from "./clssroom.jpg";

const BASE_URL = "http://localhost:8080/api"; // 백엔드 주소

const Person = () => {
  const location = useLocation();
  const userId = location.state?.userId;  // 🔥 useParams() 대신 state에서 받기
  const userName = location.state?.userName || "알 수 없음";
  const { state } = useLocation();
  const navigate = useNavigate();

  //const [userName, setUserName] = useState(state?.userName || ""); // ✅ 네비게이션으로 받은 이름 사용
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState([]);
  const [coordinate, setCoordinate] = useState(null);

  useEffect(() => {
    console.log("🔹 person.js에서 받은 userId:", userId);
}, [userId]);

  // ✅ 페이지 진입 시 기존 멤버 조회
  useEffect(() => {
    axios
      .get(`${BASE_URL}/papers/${userId}/members`)
      .then((response) => {
        console.log("불러온 멤버 목록:", response.data);
        if (Array.isArray(response.data)) {
          setMembers(response.data);
        } else {
          console.error("데이터 형식 오류:", response.data);
        }
      })
      .catch((error) => {
        console.error("멤버 목록 불러오기 실패:", error);
      });
  }, [userId]);

  // ✅ 롤링페이퍼 생성 버튼 클릭 시
  const handleAddRollPaper = () => {
    setMessage("자리를 선택하세요😃");
  };

  // ✅ 화면 클릭 시 좌표 저장 후 Make 페이지로 이동
  const handleClick = (e) => {
    if (message === "자리를 선택하세요😃") {
      const { clientX, clientY } = e;
      setCoordinate({ x: clientX, y: clientY });
      setMessage("");

      navigate(`/make/${userId}`, {
        state: { userId, userName, coordinate: { x: clientX, y: clientY } }
      });
    }
  };

  // ✅ 멤버 클릭 시 View 페이지로 이동
  const handleMemberClick = (memberId) => {
    navigate(`/view/${userId}/${memberId}`);
  };

  return (
    <div
      className="person-container"
      style={{ backgroundImage: `url(${classroomBackground})` }}
      onClick={handleClick}
    >
      <h1 className="page-title">{userName ? `${userName}님의 공간` : "로딩 중..."}</h1>
      
      {/* 롤링페이퍼 생성 버튼 */}
      <button
        className="add-rollpaper-button"
        onClick={handleAddRollPaper}
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        롤링페이퍼 생성
      </button>

      {message && <div className="message-box">{message}</div>}

      {/* 기존 멤버 목록을 화면에 표시 */}
      {members.map((member) => (
        <div
          key={member.id}
          style={{
            position: "absolute",
            top: member.y - 30,
            left: member.x - 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          onClick={() => handleMemberClick(member.id)}
        >
          <span style={{ fontSize: "60px" }}>{member.emoji}</span>
          <span style={{ marginLeft: "7px", fontSize: "20px", fontWeight: "bold", color: "black" }}>
            {member.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Person;
