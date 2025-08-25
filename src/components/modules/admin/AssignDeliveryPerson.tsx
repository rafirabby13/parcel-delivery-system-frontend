import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Role } from "@/constants/role"
import { useAssignToDeliveryManMutation } from "@/redux/feature/parcel/parcel.api"
import { useGetAllUsersQuery, useGetMeQuery } from "@/redux/feature/user/user.api"
import type { IUser } from "@/types/user.types"
import { ConfirmDialogue } from "@/utils/ConfirmDialogue"
import { LoaderIcon, UserPlus2 } from "lucide-react"
import { toast } from "sonner"

interface AssignProps {
    children: React.ReactNode
    parcelId: string
}
export function AssignDeliveryPerson({ children, parcelId }: AssignProps) {




    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const { data: me } = useGetMeQuery(undefined)
    // console.log(me)
    const { data, isLoading } = useGetAllUsersQuery({page:1, limit :100})
    const [assignToDeliveryMan] = useAssignToDeliveryManMutation(undefined)
    if (isLoading) {
        return <LoaderIcon />
    }
    // console.log(data)
    const deliveryPersons = data?.data?.users?.filter((user: { role: string }) => user.role == Role.DELIVERY_PERSON)

    const handleParcelAssign = async (user: IUser) => {
        try {
            const deliveryPersonId = user?._id
            const updaterId = me?.data?.user?._id
            const data = {
                deliveryPersonId,
                updaterId,
                parcelId
            }
            const res = await assignToDeliveryMan(data).unwrap()
            // console.log(res)
            if (res?.success) {
                toast.success(res?.message)

            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // console.log(error)
            toast.error(error?.data?.message)
        }
    }

    // console.log(deliveryPersons)
    return (

        <Dialog >

            <DialogTrigger asChild>
                <Button><UserPlus2 />{children}</Button>
            </DialogTrigger>
            <DialogContent className="min-w-fit">

                <div className="border border-muted rounded-lg">
                    <Table className="px-10">
                        <TableHeader className="bg-purple-100">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assign Delivery</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="">
                            {
                                deliveryPersons?.map((user: IUser) => (
                                    <TableRow>
                                        <TableCell className="border-2 bg-blue-50">{user.name}</TableCell>
                                        <TableCell className="border-2 bg-gray-50">{user.email}</TableCell>
                                        <TableCell className="border-2 bg-orange-50">{user.phone}</TableCell>
                                        <TableCell className="border-2 bg-red-50">{user.isActive}</TableCell>
                                        <TableCell className="border-2 bg-pink-50"><ConfirmDialogue
                                            onConfirm={() => handleParcelAssign(user)}>{
                                                "assign"
                                            }</ConfirmDialogue></TableCell>


                                    </TableRow>)
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
                <DialogFooter className="w-fit ml-auto">
                    <DialogClose asChild>
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}