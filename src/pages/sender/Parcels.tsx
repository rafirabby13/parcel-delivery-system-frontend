import { CreateParcel } from "@/components/modules/parcel/CreateParcel"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCancelParcelMutation, useGetAllParcelByIdQuery } from "@/redux/feature/parcel/parcel.api"
import { useGetMeQuery } from "@/redux/feature/user/user.api"
import { ConfirmDialogue } from "@/utils/ConfirmDialogue"
import { CircleXIcon } from "lucide-react"
import { toast } from "sonner"

const Parcels = () => {
    const { data } = useGetMeQuery(undefined)
    const [cancelParcel] = useCancelParcelMutation(undefined)
    const { data: parcels } = useGetAllParcelByIdQuery(data?.data?.user?._id)
    // console.log(parcels?.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDelete = async (item: { _id: any; trackingId?: string; status?: string; receiverInfo?: { name: string }; parcelType?: string }) => {
        try {
            // console.log(item)
            const cancelData = {
                parcelId: item._id,
                updaterId: data?.data?.user?._id
            }
            // console.log(cancelData)
            const res = await cancelParcel(cancelData).unwrap()
            console.log(res)
            if (res?.success) {
                toast.success("Parcel Cancelled Successfully")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // console.log(error)
            toast.error(error?.data?.message)
        }

    }
    return (
        <div className="w-full max-w-7xl mx-auto px-5 space-y-5">
            <div className="flex justify-between items-center ">
                <h1 className="font-bold text-2xl underline">Your Booking's</h1>
                <CreateParcel />
            </div>
            <div className="border border-muted rounded-lg">
                <Table className="px-10">
                    <TableHeader className="bg-purple-100">
                        <TableRow>
                            <TableHead>Tracking Id</TableHead>
                            <TableHead>Parcel Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Receiver</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {
                            parcels?.data?.map((item: { _id: string, trackingId: string, status: string, receiverInfo: { name: string }, parcelType: string }) => (
                                <TableRow>
                                    <TableCell className="border-2 bg-blue-50">{item.trackingId}</TableCell>
                                    <TableCell className="border-2 bg-gray-50">{item.parcelType}</TableCell>
                                    <TableCell className="border-2 bg-orange-50">{item.status}</TableCell>
                                    <TableCell className="border-2 bg-pink-50">{item.receiverInfo.name}</TableCell>
                                    <TableCell><ConfirmDialogue onConfirm={() => handleDelete(item)}><Button className="w-fit" disabled={item.status !== "REQUESTED" && item.status !== "APPROVED"} ><CircleXIcon /></Button></ConfirmDialogue></TableCell>

                                </TableRow>)
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Parcels
