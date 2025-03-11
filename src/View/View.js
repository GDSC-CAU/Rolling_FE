import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";

const BASE_URL = "http://localhost:8080/api"; // 백엔드 주소

const View = () => {
  const { userId, memberId } = useParams();
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/papers/${userId}/members/${memberId}`)
      .then((response) => {
        console.log("멤버 데이터 불러오기 성공:", response.data);
        setMemberData(response.data);
      })
      .catch((error) => {
        console.error("멤버 데이터 불러오기 실패:", error);
      });
  }, [userId, memberId]);

  if (!memberData) return <div>Loading...</div>;

  return (
    <div className="view-container">
      {/* 비디오 섹션 */}
      <div className="video-section">
        {memberData.videoUrl ? (
          <video className="video-player" controls>
            <source src={memberData.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>등록된 비디오 없음</p>
        )}
      </div>

      {/* 정보 및 사진 섹션 */}
      <div className="info-section">
        <div className="user-info">
          <div className="info-item">
            <label>이모지:</label>
            <span>{memberData.emoji}</span>
          </div>
          <div className="info-item">
            <label>이름:</label>
            <span>{memberData.name}</span>
          </div>
          <div className="info-item">
            <label>전화번호:</label>
            <span>{memberData.phone}</span>
          </div>
          <div className="info-item">
            <label>인스타그램:</label>
            <span>{memberData.insta}</span>
          </div>
          <div className="info-item">
            <label>P.S.:</label>
            <span>{memberData.ps}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
