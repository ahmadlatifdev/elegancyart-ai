export async function injectMemory(project: string) {
  try {
    await fetch('http://localhost:3000/api/memory/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project,
        module: 'auto-injection',
        content: {
          timestamp: new Date().toISOString(),
          status: 'active',
        },
      }),
    })
  } catch (err) {
    console.error('Memory injection failed:', err)
  }
}