
import { XCircle, RefreshCw, Home, HelpCircle, AlertTriangle } from 'lucide-react';

const Failed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Failed Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600">We couldn't process your payment</p>
        </div>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">Transaction Failed</span>
          </div>
          <p className="text-sm text-red-700">
            Your payment could not be processed. This may be due to insufficient balance, network issues, or payment gateway problems.
          </p>
        </div>

        {/* Failed Transaction Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Reference ID</span>
            <span className="text-sm font-mono text-gray-900">#REF987654321</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Attempted Amount</span>
            <span className="text-sm font-semibold text-gray-900">৳250.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <span className="text-sm text-red-600 font-medium">Failed</span>
          </div>
        </div>

        {/* Common Issues */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Common Issues:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Insufficient account balance</li>
            <li>• Network connectivity issues</li>
            <li>• Incorrect payment details</li>
            <li>• Payment gateway timeout</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Payment Again
          </button>
          
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Contact Support
          </button>
          
          <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Having trouble? Call us at{' '}
            <a href="tel:+8801234567890" className="text-red-600 hover:underline">
              +880 1234-567890
            </a>
            {' '}or email{' '}
            <a href="mailto:support@example.com" className="text-red-600 hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Failed;