// MainContent.tsx
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BaseContainerProps {
  children: ReactNode;
  title?: string;
  description?: string | null;
}

const BaseContainer: React.FC<BaseContainerProps> = ({
  children,
  title = 'Your Title',
  description = null,
}) => {
  return (
    <main className="flex-1 bg-gray-100 text-gray-800 p-6 rounded-lg">
      <h1
        className="text-3xl font-bold mb-4 text-center"

      >
        {title}
      </h1>
      {description && <p className="text-gray-800 mb-6">{description}</p>}

      {children}
    </main>
  );
};

export default BaseContainer;
