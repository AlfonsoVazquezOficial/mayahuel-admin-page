"use client";

import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import BaseContainer from "./BaseContainer";
interface BasePageProps {
  children: ReactNode;
  title?: string;
  description?: string | null;
}

const BasePage: React.FC<BasePageProps> = ({ children, title, description }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-a p-4 gap-4 overflow-hidden">
      <Sidebar />
      <BaseContainer title={title} description={description}>
        {children}
      </BaseContainer>
    </div>
  );
};

export default BasePage;
