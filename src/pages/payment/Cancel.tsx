
import { XCircle,  Home,  Clock } from 'lucide-react';
import { Link } from 'react-router';

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Cancelled Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600">You have cancelled the payment process</p>
        </div>

        {/* Cancellation Info */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-orange-800">Payment Cancelled</span>
          </div>
          <p className="text-sm text-orange-700">
            No charges have been made to your account. Your parcel booking has not been confirmed.
          </p>
        </div>

        {/* Cancelled Transaction Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Session ID</span>
            <span className="text-sm font-mono text-gray-900">#SES456789123</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Amount</span>
            <span className="text-sm font-semibold text-gray-900">৳250.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <span className="text-sm text-orange-600 font-medium">Cancelled</span>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="text-sm font-medium text-blue-800 mb-2">What happens now?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• No payment has been processed</li>
            <li>• Your parcel booking is not confirmed</li>
            <li>• You can try again anytime</li>
            <li>• Your booking details are still saved</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          
          
          
          
          <Link to={"/"} className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Additional Options */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            Need a different payment method?
          </p>
          <div className="flex gap-2 justify-center">
            <button className="px-4 py-2 text-xs bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition duration-200">
              bKash
            </button>
            <button className="px-4 py-2 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition duration-200">
              Nagad
            </button>
            <button className="px-4 py-2 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition duration-200">
              Rocket
            </button>
            <button className="px-4 py-2 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition duration-200">
              Card
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            Questions? Contact us at{' '}
            <a href="tel:+8801234567890" className="text-orange-600 hover:underline">
              +880 1234-567890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cancel;