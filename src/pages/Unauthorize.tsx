import React from 'react';
import { AlertTriangle, ArrowLeft, Home, Shield } from 'lucide-react';

const Unauthorized = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-red-500 mb-2">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Access Denied
          </h2>
        </div>

        {/* Message */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-amber-600 font-medium">Unauthorized Access</span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Error Code: 403 • Forbidden Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;