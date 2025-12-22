import React, { Suspense } from 'react';

const ParcelStats = React.lazy(() => import('@/features/parcel/components/ParcelStats'));
const PaymentStats = React.lazy(() => import('@/features/payment/components/PaymentStats'));
const UserStats = React.lazy(() => import('@/features/stats/components/UserStats'));
import { useGetParcelStatsQuery, useGetPaymentStatsQuery, useGetUsersStatsQuery } from '@/features/stats/api/stats.api'

import { Skeleton } from '@/components/shared/feedback/Skeleton';


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
