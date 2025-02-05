import React, { useState, useEffect, useRef, useCallback } from 'react';
import { languages } from '../languages';

const TranslationForm: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('mr');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const simulateStreamingTranslation = async (text: string) => {
    const sampleTranslation = 'the translated response in streaming way will appear here';
    const chunks = sampleTranslation.split('');
    
    for (const chunk of chunks) {
      if (abortControllerRef.current?.signal.aborted) break;
      await new Promise(resolve => setTimeout(resolve, 25));
      setTranslatedText(prev => prev + chunk);
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    abortControllerRef.current?.abort();  // Cancel any ongoing translation
    abortControllerRef.current = new AbortController();

    setIsTranslating(true);
    setTranslatedText('');

    try {
      await simulateStreamingTranslation(inputText);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Translation cancelled');
      } else {
        console.error('Translation error:', error);
        setTranslatedText('An error occurred during translation. Please try again.');
      }
    } finally {
      setIsTranslating(false);
    }
  }, [inputText]);

  const handleReset = useCallback(() => {
    abortControllerRef.current?.abort();
    setInputText('');
    setTranslatedText('');
    setIsTranslating(false);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="border border-gray-200 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-2 gap-10">
            
            {/* Input Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Input</h2>
              <label className="block text-sm font-semibold text-gray-700">Source Language</label>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-blue-500 focus:ring-1"
                aria-label="Source Language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-semibold text-gray-700">Text to Translate</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
                className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-blue-500 focus:ring-1"
                placeholder="Enter your text here..."
              />
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Output</h2>
              <label className="block text-sm font-semibold text-gray-700">Target Language</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-blue-500 focus:ring-1"
                aria-label="Target Language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <div className="w-full h-[258px] rounded-lg border-2 border-gray-200 bg-gray-50 p-4 text-gray-700 overflow-auto">
                {translatedText || <span className="text-gray-400">Translation will appear here</span>}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex justify-center space-x-4">
            <button
              type="submit"
              disabled={isTranslating || !inputText.trim()}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                isTranslating || !inputText.trim()
                  ? 'bg-blue-900 cursor-not-allowed'
                  : 'bg-blue-900 hover:bg-blue-700'
              }`}
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isTranslating || (!inputText && !translatedText)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                isTranslating || (!inputText && !translatedText)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {isTranslating ? 'Cancel' : 'Reset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TranslationForm;
