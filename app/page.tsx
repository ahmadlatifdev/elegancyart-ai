// app/page.tsx
'use client';
import { useState } from 'react';
import { BuilderPanel } from '../components/BuilderPanel';
import { AuthWrapper } from '../components/AuthWrapper';

export default function HomePage() {
  const [active, setActive] = useState(true);

  return (
    <AuthWrapper>
      <BuilderPanel active={active} onToggle={() => setActive(!active)} />
    </AuthWrapper>
  );
}
