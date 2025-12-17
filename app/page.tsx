"use client";

import React from "react";
import Sidebar from "@/components/LuxuryLayout/Sidebar";
import Topbar from "@/components/LuxuryLayout/Topbar";
import AIRenderPanel from "@/components/BuilderViews/AIRenderPanel";
import DesignThemeSelector from "@/components/BuilderViews/DesignThemeSelector";
import ProductPreviewPanel from "@/components/BuilderViews/ProductPreviewPanel";
import AIRecommendationPanel from "@/components/BuilderViews/AIRecommendationPanel";

const LuxuryPage = () => {
  const [activePanel, setActivePanel] = React.useState("preview");

  const renderPanel = () => {
    switch (activePanel) {
      case "render":
        return <AIRenderPanel />;
      case "themes":
        return <DesignThemeSelector />;
      case "recommend":
        return <AIRecommendationPanel />;
      case "preview":
      default:
        return <ProductPreviewPanel />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar setActivePanel={setActivePanel} />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">{renderPanel()}</main>
      </div>
    </div>
  );
};

export default LuxuryPage;
