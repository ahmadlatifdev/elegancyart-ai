// pages/admin/projects.js
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  'Resumora',
  'TikTok',
  'AI video Generator',
  'Elegancyart',
  'Global stock trade'
];

// -------------------------------
// API calls (same as before, but can be replaced with real backend)
// -------------------------------
async function fetchAllSettings() {
  const res = await fetch('/api/admin/projects-settings');
  if (!res.ok) throw new Error('Failed to fetch settings');
  return res.json();
}

async function updateAllSettings(settings) {
  const res = await fetch('/api/admin/projects-settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error('Failed to update settings');
  return res.json();
}

// -------------------------------
// Helper: Simulated usage metrics (replace with real data from your backend)
// -------------------------------
async function fetchProjectMetrics(projectId) {
  // Replace this with a real API call to get token usage, session count, cost, etc.
  // For now, we return mock data that varies by project.
  const mock = {
    sessions: Math.floor(Math.random() * 100),
    tokensUsed: Math.floor(Math.random() * 50000),
    cost: (Math.random() * 5).toFixed(2),
    lastActive: new Date().toLocaleDateString()
  };
  return mock;
}

export default function AdminProjects() {
  const [activeTab, setActiveTab] = useState(PROJECTS[0]);
  const [settings, setSettings] = useState({});
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load settings on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllSettings();
        setSettings(data);
        // Preload metrics for active tab
        const m = await fetchProjectMetrics(activeTab);
        setMetrics(m);
      } catch (err) {
        setMessage({ text: `Error loading settings: ${err.message}`, type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Reload metrics when tab changes
  useEffect(() => {
    if (!loading && activeTab) {
      fetchProjectMetrics(activeTab).then(m => setMetrics(m));
    }
  }, [activeTab, loading]);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: value }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      await updateAllSettings(settings);
      setMessage({ text: `✅ ${activeTab} saved successfully!`, type: 'success' });
    } catch (err) {
      setMessage({ text: `❌ Error saving: ${err.message}`, type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  // Toggle dark mode (adds class to document)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header with dark mode toggle */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BossMind Admin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI Project Control Center</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation (luxury style) */}
          <aside className="lg:w-64 space-y-2">
            {PROJECTS.map(project => (
              <motion.button
                key={project}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(project)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeTab === project
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{project}</div>
                <div className="text-xs opacity-70">
                  {metrics?.sessions !== undefined && `${metrics.sessions} sessions`}
                </div>
              </motion.button>
            ))}
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
              >
                {/* Project header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {activeTab}
                    </h2>
                    {metrics.lastActive && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last active: {metrics.lastActive}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    <div>💬 {metrics.sessions || 0} sessions</div>
                    <div>📊 {metrics.tokensUsed?.toLocaleString() || 0} tokens</div>
                    <div>💰 ${metrics.cost || 0}</div>
                  </div>
                </div>

                {/* Settings form */}
                {!settings[activeTab] ? (
                  <div className="text-red-600">Settings not found.</div>
                ) : (
                  <>
                    <div className="space-y-6">
                      {/* Default Engine */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Default Engine
                        </label>
                        <select
                          value={settings[activeTab].defaultEngine || 'gpt'}
                          onChange={(e) => handleChange('defaultEngine', e.target.value)}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                        >
                          <option value="gpt">GPT (OpenAI) – High quality</option>
                          <option value="deepseek">DeepSeek – Cost efficient</option>
                        </select>
                      </div>

                      {/* Temperature with slider + numeric */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Temperature
                          </label>
                          <span className="text-xs text-gray-500">(0 = deterministic, 2 = creative)</span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.05"
                            value={settings[activeTab].temperature || 0.7}
                            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            step="0.05"
                            min="0"
                            max="2"
                            value={settings[activeTab].temperature || 0.7}
                            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                            className="w-20 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-center dark:bg-gray-700"
                          />
                        </div>
                      </div>

                      {/* Advanced toggle */}
                      <button
                        onClick={() => setAdvancedOpen(!advancedOpen)}
                        className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {advancedOpen ? '▼ Hide advanced settings' : '▶ Show advanced settings'}
                      </button>

                      <AnimatePresence>
                        {advancedOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden"
                          >
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Max Tokens
                              </label>
                              <input
                                type="number"
                                step="100"
                                min="100"
                                max="8000"
                                value={settings[activeTab].maxTokens || 2000}
                                onChange={(e) => handleChange('maxTokens', parseInt(e.target.value, 10))}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-gray-700"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                System Prompt
                              </label>
                              <textarea
                                rows="4"
                                value={settings[activeTab].systemPrompt || ''}
                                onChange={(e) => handleChange('systemPrompt', e.target.value)}
                                placeholder="Custom instructions for the AI"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-gray-700"
                              />
                            </div>
                            <div className="text-xs text-gray-400 border-t pt-2 mt-2">
                              Pro tip: Use system prompts to define persona, tone, or constraints.
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Save button and message */}
                    <div className="mt-8 flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg disabled:opacity-50 transition"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </motion.button>
                      {message.text && (
                        <div className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                          {message.text}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}