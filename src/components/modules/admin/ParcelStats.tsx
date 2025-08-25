import {
    Package,
    PackageCheck,
    TruckIcon,
    Calendar,
    Weight,
    Users,
    TrendingUp,
    BarChart3
} from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, PieChart, Pie, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ParcelStatss } from "@/types/stats.types";

interface ParcelStatsProps {
    parcelStats: ParcelStatss;
}

const ParcelStats: React.FC<ParcelStatsProps> = ({ parcelStats }) => {

    const deliveredPercentage = parcelStats?.totalParcels > 0
        ? Math.round((parcelStats?.parcelsByStatus?.find(s => s._id === 'DELIVERED')?.count || 0) / parcelStats?.totalParcels * 100)
        : 0

    const growthRate = parcelStats?.parcelsLast30Days > 0
        ? Math.round(((parcelStats?.parcelsLast7Days * 4) / parcelStats?.parcelsLast30Days) * 100)
        : 0

   

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'DELIVERED': 'bg-green-100 text-green-800',
            'IN_TRANSIT': 'bg-yellow-100 text-yellow-800',
            'APPROVED': 'bg-blue-100 text-blue-800',
            'REQUESTED': 'bg-purple-100 text-purple-800',
            'CONFIRMED': 'bg-cyan-100 text-cyan-800',
            'CANCELLED': 'bg-red-100 text-red-800',
            'RETURNED': 'bg-gray-100 text-gray-800',
            'BLOCKED': 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const formatStatusName = (status: string) => {
        return status.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Total Parcels */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Parcels</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{parcelStats?.totalParcels}</p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                                            <TrendingUp size={12} />
                                            <span className="ml-1">+{parcelStats?.parcelsLast30Days} this month</span>
                                        </Badge>
                                    </div>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Package size={24} className="text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivered Parcels */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivered</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {parcelStats?.parcelsByStatus?.find(s => s._id === 'DELIVERED')?.count || 0}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-green-100 text-green-800 text-xs">
                                            {deliveredPercentage}% success rate
                                        </Badge>
                                    </div>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <PackageCheck size={24} className="text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* New Parcels (7 Days) */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Parcels (7d)</p>
                                    <p className="text-3xl font-bold text-purple-600">{parcelStats?.parcelsLast7Days}</p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                                            <Calendar size={12} />
                                            <span className="ml-1">This week</span>
                                        </Badge>
                                    </div>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <Calendar size={24} className="text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Average Weight */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Weight</p>
                                    <p className="text-3xl font-bold text-orange-600">
                                        {parcelStats?.avgWeight?.toFixed(1)} kg
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                                            Per parcel
                                        </Badge>
                                    </div>
                                </div>
                                <div className="bg-orange-100 p-3 rounded-full">
                                    <Weight size={24} className="text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Parcels by Status - Bar Chart */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 size={20} className="text-indigo-600" />
                                Parcels by Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart
                                    data={parcelStats?.parcelsByStatus}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="_id"
                                        tick={{ fontSize: 10 }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [value, 'Parcels']}
                                        labelFormatter={(label) => `Status: ${formatStatusName(label)}`}
                                    />
                                    <Bar
                                        dataKey="count"
                                        fill="#8884d8"
                                        radius={[4, 4, 0, 0]}
                                        name="Parcel Count"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Status Distribution - Pie Chart */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TruckIcon size={20} className="text-green-600" />
                                Status Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <Pie
                                        data={parcelStats?.parcelsByStatus}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="count"
                                        label={({ _id, count }) => `${formatStatusName(_id)}: ${count}`}
                                        labelLine={false}
                                    >
                                        {parcelStats?.parcelsByStatus?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill= '#8884d8' />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [value, 'Parcels']}
                                        labelFormatter={(label) => `Status: ${formatStatusName(label)}`}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Senders */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users size={20} className="text-purple-600" />
                            Top Senders ({parcelStats?.uniqueSenders} unique)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {parcelStats?.parcelsPerSender?.map((sender, index) => (
                                <div key={sender._id} className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-purple-100 p-2 rounded-full">
                                                <Users size={16} className="text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {sender.sender?.name || 'Unknown'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {sender.sender?.email || 'No email'}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge className="bg-purple-100 text-purple-800">
                                            #{index + 1}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-purple-600">
                                            {sender.parcelCount}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {parcelStats?.totalParcels > 0 
                                                ? Math.round((sender.parcelCount / parcelStats?.totalParcels) * 100)
                                                : 0}% of total
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Status Overview Grid */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package size={20} className="text-blue-600" />
                            Status Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            {parcelStats?.parcelsByStatus?.map((status) => (
                                <div key={status._id} className="text-center p-3 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-lg">
                                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                        {status.count}
                                    </div>
                                    <Badge className={`${getStatusColor(status._id)} text-xs px-2 py-1 mb-2`}>
                                        {formatStatusName(status._id)}
                                    </Badge>
                                    <div className="text-xs text-gray-500">
                                        {parcelStats?.totalParcels > 0
                                            ? Math.round((status.count / parcelStats?.totalParcels) * 100)
                                            : 0}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Growth Summary */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Growth</span>
                                    <TrendingUp size={16} className="text-blue-500" />
                                </div>
                                <div className="text-lg font-semibold text-blue-600">+{growthRate}%</div>
                                <div className="text-xs text-gray-500">Projected weekly</div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Rate</span>
                                    <PackageCheck size={16} className="text-green-500" />
                                </div>
                                <div className="text-lg font-semibold text-green-600">{deliveredPercentage}%</div>
                                <div className="text-xs text-gray-500">Successfully delivered</div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Senders</span>
                                    <Users size={16} className="text-purple-500" />
                                </div>
                                <div className="text-lg font-semibold text-purple-600">{parcelStats?.uniqueSenders}</div>
                                <div className="text-xs text-gray-500">Unique senders</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default ParcelStats