import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, CogIcon, SaveIcon } from '@heroicons/react/outline';

const DEFAULT_PROJECTS = [
  'Resumora',
  'TikTok',
  'AI Video Generator',
  'Elegancystart',
  'Global stock trade',
];

export default function AdminProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [settings, setSettings] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.projects && data.projects.length) {
          setProjects(data.projects.map(p => p.name));
          const newSettings = {};
          data.projects.forEach(p => {
            newSettings[p.name] = {
              engine: p.engine || 'GPT (OpenAI)',
              temperature: p.temperature ?? 0.7,
              advanced: p.advanced || {},
              sessions: p.sessions || 28,
              tokens: p.tokens || 41170,
              cost: p.cost || 2.91,
              lastActive: p.lastActive || new Date().toLocaleDateString(),
            };
          });
          setSettings(newSettings);
        } else {
          const defaultSettings = {};
          DEFAULT_PROJECTS.forEach(proj => {
            defaultSettings[proj] = {
              engine: 'GPT (OpenAI)',
              temperature: 0.7,
              advanced: {},
              sessions: 28,
              tokens: 41170,
              cost: 2.91,
              lastActive: new Date().toLocaleDateString(),
            };
          });
          setSettings(defaultSettings);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load settings', err);
        const defaultSettings = {};
        DEFAULT_PROJECTS.forEach(proj => {
          defaultSettings[proj] = {
            engine: 'GPT (OpenAI)',
            temperature: 0.7,
            advanced: {},
            sessions: 28,
            tokens: 41170,
            cost: 2.91,
            lastActive: new Date().toLocaleDateString(),
          };
        });
        setSettings(defaultSettings);
        setLoading(false);
      });
  }, []);

  const saveSettings = () => {
    const payload = projects.map(name => ({
      name,
      ...settings[name],
    }));
    fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projects: payload }),
    })
      .then(res => res.json())
      .then(data => console.log('Saved', data))
      .catch(err => console.error('Save failed', err));
  };

  const handleProjectSelect = (project) => setSelectedProject(project);
  const handleSettingChange = (key, value) => {
    if (!selectedProject) return;
    setSettings(prev => ({
      ...prev,
      [selectedProject]: { ...prev[selectedProject], [key]: value },
    }));
  };
  const currentSettings = selectedProject ? settings[selectedProject] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-white text-xl">Loading luxury dashboard...</div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-500">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
              >
                BossMind Admin
              </motion.h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">AI Project Control Center</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:scale-105 transition-transform"
              >
                {darkMode ? (
                  <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left panel: Project list */}
            <div className="lg:w-1/3">
              <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Projects</h2>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <motion.button
                      key={project}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleProjectSelect(project)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedProject === project
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-white/20 dark:bg-gray-800/40 hover:bg-white/30 dark:hover:bg-gray-700/60 text-gray-800 dark:text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{project}</span>
                        <div className="flex items-center gap-2 text-sm">
                          <span>{settings[project]?.sessions || 0}</span>
                          <span>sessions</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel: Project details */}
            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div
                    key={selectedProject}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{selectedProject}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Last active: {currentSettings?.lastActive}</p>
                      </div>
                      <button
                        onClick={saveSettings}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <SaveIcon className="w-5 h-5" />
                        Save Changes
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-white/20 dark:bg-gray-700/40 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currentSettings?.sessions || 0}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">sessions</div>
                      </div>
                      <div className="bg-white/20 dark:bg-gray-700/40 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{(currentSettings?.tokens || 0).toLocaleString()}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">tokens</div>
                      </div>
                      <div className="bg-white/20 dark:bg-gray-700/40 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${currentSettings?.cost?.toFixed(2) || '0.00'}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">cost</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Engine</label>
                        <select
                          value={currentSettings?.engine || 'GPT (OpenAI)'}
                          onChange={(e) => handleSettingChange('engine', e.target.value)}
                          className="w-full p-3 bg-white/30 dark:bg-gray-700/50 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option>GPT (OpenAI)</option>
                          <option>Claude (Anthropic)</option>
                          <option>Gemini (Google)</option>
                          <option>Llama (Meta)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Temperature (0 = deterministic, 2 = creative)</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={currentSettings?.temperature ?? 0.7}
                            onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
                            className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                          />
                          <span className="text-gray-800 dark:text-white w-12">{currentSettings?.temperature?.toFixed(1) ?? 0.7}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        <CogIcon className="w-4 h-4" />
                        {showAdvanced ? 'Hide advanced settings' : 'Show advanced settings'}
                      </button>

                      {showAdvanced && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 overflow-hidden"
                        >
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Max Tokens</label>
                            <input
                              type="number"
                              value={currentSettings?.advanced?.maxTokens || 2048}
                              onChange={(e) =>
                                handleSettingChange('advanced', {
                                  ...currentSettings.advanced,
                                  maxTokens: parseInt(e.target.value),
                                })
                              }
                              className="w-full p-3 bg-white/30 dark:bg-gray-700/50 rounded-xl border border-gray-300 dark:border-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">System Prompt</label>
                            <textarea
                              rows={3}
                              value={currentSettings?.advanced?.systemPrompt || ''}
                              onChange={(e) =>
                                handleSettingChange('advanced', {
                                  ...currentSettings.advanced,
                                  systemPrompt: e.target.value,
                                })
                              }
                              className="w-full p-3 bg-white/30 dark:bg-gray-700/50 rounded-xl border border-gray-300 dark:border-gray-600"
                              placeholder="Optional system instructions..."
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Select a project from the left to edit its settings.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
