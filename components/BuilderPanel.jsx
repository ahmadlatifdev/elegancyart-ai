'use client';

import React, { useState } from 'react';
import LuxuryDashboard from './BuilderViews/LuxuryDashboard';
import AIRecommendationPanel from './BuilderViews/AIRecommendationPanel';
import DesignThemeSelector from './BuilderViews/DesignThemeSelector';
import ProductPreviewPanel from './BuilderViews/ProductPreviewPanel';
import ProductSearchWizard from './ProductSearchWizard';

const BuilderPanel: React.FC = () => {
  const [activePanel, setActivePanel] = useState('dashboard');

  const renderPanel = () => {
    switch (activePanel) {
      case 'dashboard':
        return <LuxuryDashboard />;
      case 'recommendations':
        return <AIRecommendationPanel />;
      case 'themes':
        return <DesignThemeSelector />;
      case 'preview':
        return <ProductPreviewPanel />;
      case 'search':
        return <ProductSearchWizard />;
      default:
        return <LuxuryDashboard />;
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex gap-4 p-4 bg-gray-900 text-white justify-start">
        <button onClick={() => setActivePanel('dashboard')}>Dashboard</button>
        <button onClick={() => setActivePanel('recommendations')}>AI Recommendations</button>
        <button onClick={() => setActivePanel('themes')}>Theme Selector</button>
        <button onClick={() => setActivePanel('preview')}>Product Preview</button>
        <button onClick={() => setActivePanel('search')}>Product Search</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-[#101010]">
        {renderPanel()}
      </div>
    </div>
  );
};

export default BuilderPanel;
