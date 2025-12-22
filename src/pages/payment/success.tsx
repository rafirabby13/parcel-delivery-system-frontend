
import { CheckCircle, Package, Home } from 'lucide-react';
import { Link } from 'react-router';

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your parcel booking has been confirmed</p>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Transaction ID</span>
            <span className="text-sm font-mono text-gray-900">#TXN123456789</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Amount Paid</span>
            <span className="text-sm font-semibold text-gray-900">৳250.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Payment Method</span>
            <span className="text-sm text-gray-900">bKash</span>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <Package className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">Your parcel is being processed</span>
          </div>
          <p className="text-sm text-green-700">
            You'll receive a confirmation SMS and email with tracking details shortly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
         
          
          <Link to={"/track-parcel"} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center">
            <Package className="w-5 h-5 mr-2" />
            Track My Parcel
          </Link>
          
          <Link to={'/'} className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact us at{' '}
            <a href="tel:+8801234567890" className="text-green-600 hover:underline">
              +880 1234-567890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;