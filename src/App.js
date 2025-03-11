import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main/Main";
import Person from "./Person/Person";
import Make from "./Make/Make";
import View from "./View/View";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (userName) => {
    setSelectedUser(userName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main onUserSelect={handleUserSelect} />} />
        <Route path="/person/:userName" element={<Person />} /> {/* userName을 URL에서 가져옴 */}
        <Route path="/make/:userName" element={<Make />} />
        <Route path="/view/:userName" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
