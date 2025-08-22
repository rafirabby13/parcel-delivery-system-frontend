import { useBlockUnblockUserMutation, useGetAllUsersQuery } from "@/redux/feature/user/user.api"
import {   CircleOff, LoaderIcon, ShieldCheckIcon } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { IUser } from "@/types/user.types"
import { ConfirmDialogue } from "@/utils/ConfirmDialogue"
import { toast } from "sonner"

const ManageUsers = () => {
    const { data, isLoading } = useGetAllUsersQuery(undefined)
    const [blockUnblockUser] = useBlockUnblockUserMutation()
    if (isLoading) {
        return <LoaderIcon />
    }
    // console.log(data?.data?.users)

    const handleBlockUnblock = async (user: IUser) => {
        console.log(user)
        try {
            const res = await blockUnblockUser(user._id).unwrap()
            console.log(res)
            if (res?.success) {
                toast.success("User Updated Successfully")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error(error?.data?.message)
        }
    }
    return (
        <div className="w-full max-w-7xl mx-auto px-5 space-y-5">
            <div className="flex justify-between items-center ">
                <h1 className="font-bold text-2xl underline">Manage Users..</h1>

            </div>
            <div className="border border-muted rounded-lg">
                <Table className="px-10">
                    <TableHeader className="bg-purple-100">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Block/Unblock User</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {
                            data?.data?.users?.map((user: IUser) => (
                                <TableRow>
                                    <TableCell className="border-2 bg-blue-50">{user.name}</TableCell>
                                    <TableCell className="border-2 bg-gray-50">{user.email}</TableCell>
                                    <TableCell className="border-2 bg-orange-50">{user.role}</TableCell>
                                    <TableCell className="border-2 bg-orange-50">{user.isActive}</TableCell>
                                    <TableCell className="border-2 bg-pink-50"><ConfirmDialogue
                                        onConfirm={() => handleBlockUnblock(user)}>{
                                            user.isActive=== "ACTIVE" ? <CircleOff /> : <ShieldCheckIcon />
                                        }</ConfirmDialogue></TableCell>


                                </TableRow>)
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ManageUsers
