import React from "react";
import ProfilePage from "./ProfilePage";

// Simple test component to verify ProfilePage works independently
export default function TestProfilePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <ProfilePage />
    </div>
  );
}