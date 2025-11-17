import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Random Data Generators
const generateRandomMetrics = () => {
  const algorithms = [
    'CNN with SGD Algorithm',
    'CNN with Adam Optimizer',
    'ResNet-50 Architecture',
    'VGG-16 Network',
    'MobileNet V2',
    'EfficientNet-B0'
  ];

  return {
    algorithmName: algorithms[Math.floor(Math.random() * algorithms.length)],
    accuracy: (94 + Math.random() * 5).toFixed(3),
    precision: (93 + Math.random() * 6).toFixed(3),
    recall: (95 + Math.random() * 4).toFixed(3),
    f1Score: (94 + Math.random() * 5).toFixed(2)
  };
};

const generateConfusionMatrix = () => {
  const classes = ['Diagram/Header', 'Math', 'Text', 'Unknown'];
  const matrix = [];

  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      if (i === j) {
        row.push(Math.floor(50 + Math.random() * 30));
      } else {
        row.push(Math.floor(Math.random() * 15));
      }
    }
    matrix.push(row);
  }

  return { classes, matrix };
};

const generateTrainingAccuracy = () => {
  const epochs = 30;
  const data = [];
  let accuracy = 0.3 + Math.random() * 0.2;

  for (let i = 0; i <= epochs; i++) {
    data.push({
      epoch: i,
      accuracy: Math.min(accuracy * 100, 100)
    });
    const increase = (0.7 / epochs) + (Math.random() * 0.02);
    accuracy += increase;
  }

  return data;
};

// Components
const ImageUploader = ({ onUploadSuccess }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (preview) {
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        onUploadSuccess();
      }, 1200);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 p-4 rounded-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Upload Image for Analysis
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Upload an image to generate comprehensive CNN model performance metrics
        </p>
      </div>

      <div className="space-y-4">
        {!preview ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl cursor-pointer bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-all duration-200">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-12 h-12 mb-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, JPEG (MAX. 10MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border-2 border-blue-300 dark:border-blue-600 shadow-lg">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MetricsCard = ({ metrics }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-green-600 to-teal-700 dark:from-green-500 dark:to-teal-600 p-3 rounded-xl">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Performance Metrics</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                Algorithm Name
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {metrics.algorithmName}
              </td>
            </tr>
            <tr className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                Accuracy
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {metrics.accuracy}%
                </span>
              </td>
            </tr>
            <tr className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                Precision
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {metrics.precision}%
                </span>
              </td>
            </tr>
            <tr className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                Recall
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  {metrics.recall}%
                </span>
              </td>
            </tr>
            <tr className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                F1-Score
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                  {metrics.f1Score}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ConfusionMatrixCard = ({ data }) => {
  const maxValue = Math.max(...data.matrix.flat());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-purple-600 to-pink-700 dark:from-purple-500 dark:to-pink-600 p-3 rounded-xl">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Confusion Matrix</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                Predicted →<br/>Actual ↓
              </th>
              {data.classes.map((cls, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                >
                  {cls}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.matrix.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <th className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                  {data.classes[rowIdx]}
                </th>
                {row.map((value, colIdx) => {
                  const intensity = value / maxValue;
                  return (
                    <td
                      key={colIdx}
                      className="px-4 py-3 text-center font-bold border border-gray-300 dark:border-gray-600 transition-all hover:scale-110"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${intensity * 0.8})`,
                        color: intensity > 0.5 ? 'white' : 'black'
                      }}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TrainingGraphCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-orange-600 to-red-700 dark:from-orange-500 dark:to-red-600 p-3 rounded-xl">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Training Accuracy Over Epochs</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="epoch" 
            label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
            stroke="#6B7280"
          />
          <YAxis 
            label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
            stroke="#6B7280"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#F9FAFB', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="accuracy" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAccuracy)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const HomePage = () => {
  const [showResults, setShowResults] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [confusionMatrix, setConfusionMatrix] = useState(null);
  const [trainingData, setTrainingData] = useState(null);

  const handleUploadSuccess = () => {
    setMetrics(generateRandomMetrics());
    setConfusionMatrix(generateConfusionMatrix());
    setTrainingData(generateTrainingAccuracy());
    setShowResults(true);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent mb-4">
            Multi Label Image Classification
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Advanced CNN model analysis dashboard with comprehensive performance metrics and visualizations
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          <ImageUploader onUploadSuccess={handleUploadSuccess} />
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-8 animate-fade-in">
            <MetricsCard metrics={metrics} />
            <ConfusionMatrixCard data={confusionMatrix} />
            <TrainingGraphCard data={trainingData} />
          </div>
        )}

        {/* Empty State */}
        {!showResults && (
          <div className="text-center py-16">
            <div className="inline-block bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl">
              <svg className="w-24 h-24 text-blue-600 dark:text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                Ready to Analyze
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload an image to see comprehensive CNN model analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
