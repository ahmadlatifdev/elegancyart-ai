// components/BuilderViews/LuxuryDashboard.tsx
'use client';

import { useState } from 'react';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import AIRecommendationPanel from './AIRecommendationPanel';
import ProductPreviewPanel from './ProductPreviewPanel';
import DesignThemeSelector from './DesignThemeSelector';

const LuxuryDashboard = () => {
  const [activePanel, setActivePanel] = useState<'recommendation' | 'preview' | 'themes'>('recommendation');

  const renderPanel = () => {
    switch (activePanel) {
      case 'recommendation':
        return <AIRecommendationPanel />;
      case 'preview':
        return <ProductPreviewPanel />;
      case 'themes':
        return <DesignThemeSelector />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <Sidebar setActivePanel={setActivePanel} />
      <div className="flex flex-col flex-grow">
        <Topbar />
        <div className="p-6 overflow-auto">{renderPanel()}</div>
      </div>
    </div>
  );
};

export default LuxuryDashboard;

