
import {
    Users,
    UserPlus,
    UserCheck,
    UserX,
    TrendingUp,
    Calendar,
} from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart } from 'recharts';


import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UsersStats } from "@/types/stats.types";
interface UserStatsProps {
  userStats: UsersStats;
}

const UserStats: React.FC<UserStatsProps> = ({userStats}) => {
    
  

    const activeUserPercentage = userStats?.totalUsers > 0
        ? Math.round((userStats?.totalActiveUsers / userStats?.totalUsers) * 100)
        : 0

   
  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
                <div className="max-w-7xl mx-auto space-y-8">



                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Total Users */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{userStats?.totalUsers}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                                                <TrendingUp size={12} />
                                                <span className="ml-1">+{userStats?.newUsersInLast30Days} this month</span>
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Users size={24} className="text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Active Users */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                                        <p className="text-3xl font-bold text-green-600">{userStats?.totalActiveUsers}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-green-100 text-green-800 text-xs">
                                                {activeUserPercentage}% of total
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <UserCheck size={24} className="text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* New Users (7 Days) */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Users (7d)</p>
                                        <p className="text-3xl font-bold text-purple-600">{userStats?.newUsersInLast7Days}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-purple-100 text-purple-800 text-xs">
                                                <Calendar size={12} />
                                                <span className="ml-1">This week</span>
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <UserPlus size={24} className="text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Blocked Users */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Blocked Users</p>
                                        <p className="text-3xl font-bold text-red-600">{userStats?.totalBlockedUsers}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-red-100 text-red-800 text-xs">
                                                Requires attention
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <UserX size={24} className="text-red-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="w-full gap-6">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={userStats?.usersByRole}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="_id"
                                    tick={{ fontSize: 12 }}
                                    // angle={-45}
                                    textAnchor="end"
                                />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [value, 'Users']}
                                    labelFormatter={(label) => `Role: ${label}`}
                                />
                                {/* <Legend /> */}
                                <Bar
                                    dataKey="count"
                                    fill="#8884d8"
                                    radius={[4, 4, 0, 0]}
                                    name="User Count"
                                />
                            </BarChart>
                        </ResponsiveContainer>

                      
                    </div>

                   
                </div>
            </div>
  )
}

export default UserStats
