import React, { useState } from 'react';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'Bengali' },
  { code: 'hi', name: 'Hindi' },
  { code: 'kn', name: 'Kannada' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
];

const TranslationForm: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string>('en');
  const [targetLanguage, setTargetLanguage] = useState<string>('mr');
  const [inputText, setInputText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      return;
    }
    
    setIsTranslating(true);
    try {
      const response = await simulateTranslation(inputText);
      setTranslatedText(response);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('An error occurred during translation. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setTranslatedText('');
  };

  const simulateTranslation = async (text: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Translated text will appear here`);
      }, 1000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="border border-gray-200 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-2 gap-10">

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Input</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    {inputText.length} characters
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Source Language
                </label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  aria-label="Source Language"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Text to Translate
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Enter your text here..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Output</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    {translatedText.length} characters
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Target Language
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  aria-label="Target Language"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <div className="w-full h-[258px] rounded-lg border-2 border-gray-200 bg-gray-50 p-4 text-gray-700 overflow-auto">
                  {translatedText || (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-gray-400">Translation will appear here</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center space-x-4">
            <button
              type="submit"
              disabled={isTranslating || !inputText.trim()}
              className={`
                px-8 py-3 rounded-lg font-semibold text-white
                transition-all duration-200
                ${isTranslating || !inputText.trim()
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }
              `}
            >
              {isTranslating ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Translating...</span>
                </span>
              ) : (
                'Translate'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              disabled={isTranslating || (!inputText && !translatedText)}
              className={`
                px-8 py-3 rounded-lg font-semibold
                transition-all duration-200
                ${isTranslating || (!inputText && !translatedText)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }
              `}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TranslationForm;