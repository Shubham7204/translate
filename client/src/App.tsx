import React from 'react';
import TranslationForm from './components/TranslationForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Indic Language Translator
          </h1>
        </div>
        <TranslationForm />
      </div>
    </div>
  );
};

export default App;