"use client";
// Update the import path if AuthPortal is located elsewhere, for example:
import AuthPortal from "../AuthPortal";
// Or create the AuthPortal.tsx file in the correct directory if it does not exist.

export default function StudentLogin() {
  return (
    <AuthPortal
      role="student"
      accent="#3BF5FF"
      dashboardPath="/student/dashboard"
    />
  );
}
