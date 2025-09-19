'use client';
import React from "react";
import { AuthProvider } from "../../hooks/useAuth";
import LoginPage from "./LoginPage";

export default function LoginWrapper() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
