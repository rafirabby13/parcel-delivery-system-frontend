export interface UsersStats {
    newUsersInLast7Days: number;
    newUsersInLast30Days: number;
    totalActiveUsers: number;
    totalBlockedUsers: number;
    totalInActiveUsers: number;
    totalUsers: number;
    usersByRole: Array<{
        _id: string;
        count: number;
    }>;
}