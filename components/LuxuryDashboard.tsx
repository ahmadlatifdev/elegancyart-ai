'use client';

import AuthWrapper from './AuthWrapper';
import BuilderPanel from './BuilderPanel';

export default function LuxuryDashboard() {
  return (
    <AuthWrapper>
      <BuilderPanel />
    </AuthWrapper>
  );
}
