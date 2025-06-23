import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/Login';
import NewIssue from './pages/newIssue';
import AllIssues from './pages/allIssues';
import NewDiscussion from './pages/newDiscussion';
import AllDiscussions from './pages/allDiscussion';
import Home from "./pages/home";
import CommunityPage from './pages/community';
import NewProposal from './pages/newProposal';
import UserProfile from './pages/profile';
import ImprovementsList from './pages/improvementList';
import DiscussionDetail from './pages/discussionDetail';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/issues" element={<AllIssues />} />
        <Route path="/report" element={<NewIssue />} />
        <Route path="/newdiscussion" element={<NewDiscussion />} />
        <Route path="/discussion" element={<AllDiscussions />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/newproposal" element={<NewProposal />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/improvements" element={<ImprovementsList />} />
        <Route path="/discussion/:id" element={<DiscussionDetail />} />


        {/* Add more routes here later */}
      </Routes>
    </Router>
  );
}

export default App;
