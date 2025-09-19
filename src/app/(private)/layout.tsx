'use client';
import React from "react";
import { AuthProvider } from "../hooks/useAuth";
import ProtectedRoute from "../router/ProtectedRoute";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </AuthProvider>
  );
}
