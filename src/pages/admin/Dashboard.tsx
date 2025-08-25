

import UserStats from '@/components/modules/admin/UserStats'
import { useGetParcelStatsQuery, useGetPaymentStatsQuery, useGetUsersStatsQuery } from '@/redux/feature/stats/stats.api'

import { Loader2 } from 'lucide-react'


const Dashboard = () => {
    const { data: userStats, isLoading } = useGetUsersStatsQuery(undefined) 
    const { data: paymentStats } = useGetPaymentStatsQuery(undefined)
    const { data: parcelStats } = useGetParcelStatsQuery(undefined)
    if (isLoading) {
        return <Loader2 />
    }
    console.log(userStats?.data?.usersByRole)


    return (
        <div>
            <UserStats userStats={userStats?.data} />
        </div>
    )
}

export default Dashboard
