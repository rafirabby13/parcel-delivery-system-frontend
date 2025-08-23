

import { CircleOff, LoaderIcon, SquareCheckBigIcon } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ConfirmDialogue } from "@/utils/ConfirmDialogue"
import { toast } from "sonner"
import { useBlockUnbloParcelMutation, useGetAllParcelsQuery } from "@/redux/feature/parcel/parcel.api"
import type { Parcel } from "@/types/parcel.types"

const ManagParcels = () => {
    const [blockUnbloParcel] = useBlockUnbloParcelMutation(undefined)
    const { data: parcel, isLoading } = useGetAllParcelsQuery(undefined)
    if (isLoading) {
        return <LoaderIcon />
    }
    console.log(parcel?.data?.parcels)

    const handleBlockUnblock = async (parcel: Parcel) => {
        // console.log(user)
        try {
            const res = await blockUnbloParcel(parcel._id).unwrap()
            // console.log(res)
            if (res?.success) {
                toast.success(res.message)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error(error?.data?.message)
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-5 space-y-5">
            <div className="flex justify-between items-center ">
                <h1 className="font-bold text-2xl underline">Manage Parcels..</h1>

            </div>
            <div className="border border-muted rounded-lg">
                <Table className="px-10">
                    <TableHeader className="bg-purple-100">
                        <TableRow>
                            <TableHead>trackingId</TableHead>
                            <TableHead>parcelType</TableHead>
                            <TableHead>Sender__Phone</TableHead>
                            <TableHead>Receiver__Phone</TableHead>
                            <TableHead>dDelivery Partner</TableHead>
                            <TableHead>Parcel Status</TableHead>
                            <TableHead>paymentStatus</TableHead>
                            <TableHead>Block/Unblock User</TableHead>
                            <TableHead>Assign Delivery Partner</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {
                            parcel?.data?.parcels?.map((parcel: Parcel) => (
                                <TableRow>
                                    <TableCell className="border-2 bg-blue-50">{parcel.trackingId}</TableCell>
                                    <TableCell className="border-2 bg-gray-50">{parcel.parcelType}</TableCell>
                                    <TableCell className="border-2 bg-pink-50">{parcel.senderInfo.name}__{parcel.senderInfo.phone}</TableCell>
                                    <TableCell className="border-2 bg-yellow-50">{parcel.receiverInfo
                                        .name}__{parcel.receiverInfo
                                            .phone}</TableCell>
                                    <TableCell className="border-2 bg-green-50">{parcel.assignedDeliveryPartner ? parcel.assignedDeliveryPartner : "NOT ASSIGNED"}</TableCell>
                                    <TableCell className="border-2 bg-orange-50">{parcel.status}</TableCell>
                                    <TableCell className="border-2 bg-purple-50">{parcel.paymentStatus}</TableCell>
                                    {/* <TableCell className="border-2 bg-red-50">{parcel.isActive}</TableCell> */}
                                    <TableCell className="border-2 bg-ocean-50"><ConfirmDialogue
                                        onConfirm={() => handleBlockUnblock(parcel)}>{
                                            parcel.status === "BLOCKED" ? <CircleOff /> : <SquareCheckBigIcon />
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

export default ManagParcels
