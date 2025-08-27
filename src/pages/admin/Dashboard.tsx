import React, { Suspense } from 'react';

const ParcelStats = React.lazy(() => import('@/components/modules/admin/ParcelStats'));
const PaymentStats = React.lazy(() => import('@/components/modules/admin/PaymentStats'));
const UserStats = React.lazy(() => import('@/components/modules/admin/UserStats'));
import { useGetParcelStatsQuery, useGetPaymentStatsQuery, useGetUsersStatsQuery } from '@/redux/feature/stats/stats.api'

import { Skeleton } from '@/utils/Skeleton';


const Dashboard = () => {
    const { data: userStats, isLoading: userLoading } = useGetUsersStatsQuery(undefined)
    const { data: paymentStats, isLoading: paymentLoading } = useGetPaymentStatsQuery(undefined)
    const { data: parcelStats, isLoading: parcelLoading } = useGetParcelStatsQuery(undefined)
    // if (isLoading) {
    //     return <Loader2 />
    // }
    // console.log(paymentStats?.data)


    return (
        <div>
            {/* <UserStats userStats={userStats?.data} /> */}
            <Suspense
                fallback={<Skeleton className="h-12 w-full mb-4" />}
            // fallback={
            //     <div className="flex justify-center py-10">
            //         <Loader />
            //     </div>
            // }
            >
                {!userLoading && <UserStats userStats={userStats?.data} />}
            </Suspense>
            {/* <ParcelStats parcelStats={parcelStats?.data} /> */}
            <Suspense
                fallback={
                    <div className="flex justify-center py-10">
                        <Skeleton className="h-12 w-full mb-4" />
                    </div>
                }
            >
                {!parcelLoading && <ParcelStats parcelStats={parcelStats?.data} />}
            </Suspense>
            {/* <PaymentStats paymentStats={paymentStats?.data} /> */}
            <Suspense
                fallback={
                    <div className="flex justify-center py-10">
                        <Skeleton className="h-12 w-full mb-4" />
                    </div>
                }
            >
                {!paymentLoading && <PaymentStats paymentStats={paymentStats?.data} />}
            </Suspense>
        </div>
    )
}

export default Dashboard
