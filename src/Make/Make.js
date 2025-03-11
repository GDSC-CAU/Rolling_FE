import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Make.css";

const BASE_URL = "http://localhost:8080/api"; // 백엔드 주소

const Make = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, coordinate, userName } = location.state || {}; // paperId → userId 유지, userName 추가

  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const [video, setVideo] = useState(null);
  const [phone, setPhone] = useState("");
  const [insta, setInsta] = useState("");
  const [ps, setPs] = useState("");

  // 비디오 파일 핸들러
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // 데이터 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("🚨 userId가 없습니다!");
      return;
    }

    // JSON 데이터 생성
    const memberData = {
      emoji,
      name,
      phone,
      instagram: insta,
      ps,
      x: Number(coordinate?.x),
      y: Number(coordinate?.y),
    };

    // FormData 생성
    const formData = new FormData();
    formData.append("member", new Blob([JSON.stringify(memberData)], { type: "application/json" }));
    if (video) {
      formData.append("video", video);
    }

    console.log("📌 요청 데이터 확인:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios.post(`${BASE_URL}/papers/${userId}/members`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("📌 롤링페이퍼 저장 성공:", response.data);
      navigate(`/person/${userId}`, { state: { userId, userName, x: coordinate?.x, y: coordinate?.y } });
    } catch (error) {
      console.error("🚨 롤링페이퍼 저장 실패:", error);
    }
  };

  return (
    <div className="make-container">
      <h2>To. {userName || "알 수 없음"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Emoji:</label>
          <input type="text" placeholder="이모지 입력" value={emoji} onChange={(e) => setEmoji(e.target.value)} />
        </div>

        <div className="input-container">
          <label>Name:</label>
          <input type="text" placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="input-container">
          <label>Video:</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </div>

        <div className="input-container">
          <label>Phone:</label>
          <input type="text" placeholder="전화번호 입력" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="input-container">
          <label>Instagram:</label>
          <input type="text" placeholder="optional" value={insta} onChange={(e) => setInsta(e.target.value)} />
        </div>

        <div className="input-container">
          <label>P.S.:</label>
          <textarea placeholder="P.S." value={ps} onChange={(e) => setPs(e.target.value)} />
        </div>

        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default Make;
