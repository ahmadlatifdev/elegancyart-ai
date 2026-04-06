import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';

export default function BuilderProjectsPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    builder.get('page', { url: '/admin/builder-projects' }).promise().then(setContent);
  }, []);

  return <BuilderComponent model="page" content={content} />;
}
