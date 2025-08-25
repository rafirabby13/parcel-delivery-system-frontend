


import ParcelStats from '@/components/modules/admin/ParcelStats'
import PaymentStats from '@/components/modules/admin/PaymentStats'
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
    console.log(paymentStats?.data)


    return (
        <div>
            <UserStats userStats={userStats?.data} />
            <ParcelStats parcelStats={parcelStats?.data}/>
            <PaymentStats paymentStats={paymentStats?.data}/>
        </div>
    )
}

export default Dashboard
