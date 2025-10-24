"use client";
import AuthPortal from "../AuthPortal";

export default function TeacherLogin() {
  return (
    <AuthPortal
      role="teacher"
      accent="#00C8FF"
      dashboardPath="/teacher/dashboard"
    />
  );
}
