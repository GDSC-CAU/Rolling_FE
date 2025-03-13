import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./View.css";

const View = () => {
  const { userId, memberId } = useParams(); 
  const [memberData, setMemberData] = useState(null); // ✅ useState 추가
  console.log("Clicked Member ID:", memberId);
  console.log("Current User ID:", userId);
  
  useEffect(() => {
    if (!userId || !memberId) return;

    const fetchMemberData = async () => {
      try {
        const response = await fetch(`http://13.124.189.66:8080/api/papers/${userId}/members/${memberId}`);
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setMemberData(data); // ✅ 상태 업데이트
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [userId, memberId]);

  if (!userId || !memberId) {
    return <p>잘못된 접근입니다.</p>;
  }

  if (!memberData) {
    return <p>데이터 로딩 중...</p>;
  }

  return (
    <div className="view-container">
      {/* 비디오 섹션 */}
      <div className="video-section">
        {memberData.video ? (
          <video className="video-player" controls>
            <source src={memberData.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>등록된 비디오 없음</p>
        )}
      </div>

      {/* 정보 섹션 */}
      <div className="info-section">
        <div className="user-info">
          <div className="info-item">
            <label>Emoji:</label>
            <span>{memberData.emoji}</span>
          </div>
          <div className="info-item">
            <label>Name:</label>
            <span>{memberData.name}</span>
          </div>
          <div className="info-item">
            <label>Phone:</label>
            <span>{memberData.phone}</span>
          </div>
          <div className="info-item">
            <label>Instagram:</label>
            <span>{memberData.instagram ? memberData.instagram : "없음"}</span>
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
