import {
    CreditCard,
    DollarSign,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    XCircle,
    BarChart3,
    PieChart as PieChartIcon
} from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, PieChart, Pie, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PaymentStatss } from "@/types/stats.types";

interface PaymentStatsProps {
    paymentStats: PaymentStatss;
}

const PaymentStats: React.FC<PaymentStatsProps> = ({ paymentStats }) => {

    const successRate = paymentStats?.totalPayment > 0
        ? Math.round((paymentStats?.totalPaymentByStatus?.find(s => s._id === 'PAID')?.count || 0) / paymentStats?.totalPayment * 100)
        : 0

    const pendingPayments = paymentStats?.totalPaymentByStatus?.find(s => s._id === 'PENDING')?.count || 0
    const failedPayments = paymentStats?.totalPaymentByStatus?.find(s => s._id === 'FAILED')?.count || 0
    const cancelledPayments = paymentStats?.totalPaymentByStatus?.find(s => s._id === 'CANCELLED')?.count || 0
    
    const avgPayment = paymentStats?.avgPaymentAmount?.[0]?.avgPaymentAMount || 0


    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'PAID': 'bg-green-100 text-green-800',
            'PENDING': 'bg-yellow-100 text-yellow-800',
            'FAILED': 'bg-red-100 text-red-800',
            'CANCELLED': 'bg-gray-100 text-gray-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const getStatusIcon = (status: string) => {
        const icons: Record<string, React.ReactNode> = {
            'PAID': <CheckCircle size={16} className="text-green-600" />,
            'PENDING': <Clock size={16} className="text-yellow-600" />,
            'FAILED': <XCircle size={16} className="text-red-600" />,
            'CANCELLED': <XCircle size={16} className="text-gray-600" />
        }
        return icons[status] || <AlertCircle size={16} />
    }

    const formatCurrency = (amount: number) => {
        return `৳${amount.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Total Payments */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Payments</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{paymentStats?.totalPayment}</p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                                            <TrendingUp size={12} />
                                            <span className="ml-1">All transactions</span>
                                        </Badge>
                                    </div>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <CreditCard size={24} className="text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Successful Payments */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Successful</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {paymentStats?.totalPaymentByStatus?.find(s => s._id === 'PAID')?.count || 0}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-green-100 text-green-800 text-xs">
                                            {successRate}% success rate
                                        </Badge>
                                    </div>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <CheckCircle size={24} className="text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Payments */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                                    <p className="text-3xl font-bold text-yellow-600">{pendingPayments}</p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                            <Clock size={12} />
                                            <span className="ml-1">Awaiting</span>
                                        </Badge>
                                    </div>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <Clock size={24} className="text-yellow-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Average Payment */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Amount</p>
                                    <p className="text-3xl font-bold text-purple-600">
                                        {formatCurrency(avgPayment)}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                                            Per transaction
                                        </Badge>
                                    </div>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <DollarSign size={24} className="text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Payment Status - Bar Chart */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 size={20} className="text-indigo-600" />
                                Payment Status Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart
                                    data={paymentStats?.totalPaymentByStatus}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="_id"
                                        tick={{ fontSize: 12 }}
                                        textAnchor="middle"
                                    />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [value, 'Payments']}
                                        labelFormatter={(label) => `Status: ${label}`}
                                    />
                                    <Bar
                                        dataKey="count"
                                        fill="#8884d8"
                                        radius={[4, 4, 0, 0]}
                                        name="Payment Count"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Payment Status - Pie Chart */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChartIcon size={20} className="text-green-600" />
                                Payment Status Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <Pie
                                        data={paymentStats?.totalPaymentByStatus}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="count"
                                        label={({ _id, count }) => `${_id}: ${count}`}
                                        labelLine={false}
                                    >
                                        {paymentStats?.totalPaymentByStatus?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill='#8884d8' />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [value, 'Payments']}
                                        labelFormatter={(label) => `Status: ${label}`}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Gateway Information */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard size={20} className="text-blue-600" />
                            Payment Gateway Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paymentStats?.paymentGatewayData?.map((gateway, index) => (
                                <div key={gateway._id || index} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <CreditCard size={16} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {gateway._id || 'Unknown Gateway'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Payment Gateway
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-blue-600">
                                            {gateway.count}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {paymentStats?.totalPayment > 0
                                                ? Math.round((gateway.count / paymentStats?.totalPayment) * 100)
                                                : 0}% of total
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Detailed Status Grid */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle size={20} className="text-orange-600" />
                            Payment Status Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {paymentStats?.totalPaymentByStatus?.map((status) => (
                                <div key={status._id} className="text-center p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-lg">
                                    <div className="flex justify-center mb-2">
                                        {getStatusIcon(status._id)}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {status.count}
                                    </div>
                                    <Badge className={`${getStatusColor(status._id)} text-xs px-2 py-1 mb-2`}>
                                        {status._id}
                                    </Badge>
                                    <div className="text-xs text-gray-500">
                                        {paymentStats?.totalPayment > 0
                                            ? Math.round((status.count / paymentStats?.totalPayment) * 100)
                                            : 0}% of total
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</span>
                                    <CheckCircle size={16} className="text-green-500" />
                                </div>
                                <div className="text-lg font-semibold text-green-600">{successRate}%</div>
                                <div className="text-xs text-gray-500">Payment success</div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Issues</span>
                                    <Clock size={16} className="text-yellow-500" />
                                </div>
                                <div className="text-lg font-semibold text-yellow-600">{pendingPayments}</div>
                                <div className="text-xs text-gray-500">Need attention</div>
                            </div>

                            <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed Payments</span>
                                    <XCircle size={16} className="text-red-500" />
                                </div>
                                <div className="text-lg font-semibold text-red-600">{failedPayments + cancelledPayments}</div>
                                <div className="text-xs text-gray-500">Total failures</div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Transaction</span>
                                    <DollarSign size={16} className="text-purple-500" />
                                </div>
                                <div className="text-lg font-semibold text-purple-600">{formatCurrency(avgPayment)}</div>
                                <div className="text-xs text-gray-500">Per payment</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Revenue Section - Empty State */}
                {(!paymentStats?.totalRevenue || paymentStats?.totalRevenue.length === 0) && (
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                        <CardContent className="p-12 text-center">
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <DollarSign size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Revenue Data Coming Soon</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Revenue tracking and analytics will be available once payment processing is fully configured.
                            </p>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    )
}

export default PaymentStats