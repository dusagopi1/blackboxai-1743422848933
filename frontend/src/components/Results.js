import { useState } from 'react';

export default function Results({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Transcript</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="whitespace-pre-line">{data.transcript}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Questions & Answers</h2>
        <div className="space-y-4">
          {data.qa_pairs.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <button
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="font-medium text-indigo-600">{item.question}</span>
                <svg
                  className={`h-5 w-5 text-gray-500 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="mt-2 text-gray-600 pl-2 border-l-2 border-indigo-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}