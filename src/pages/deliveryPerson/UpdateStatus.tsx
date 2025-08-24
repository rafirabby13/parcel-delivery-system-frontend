/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCollectCODAMountMutation, useGetAllParcelByIdQuery, useUpdateParcelStatusMutation } from "@/redux/feature/parcel/parcel.api"
import { useGetMeQuery } from "@/redux/feature/user/user.api"
import { CheckCheckIcon, Loader2Icon, SquarePenIcon } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ConfirmDialogue } from "@/utils/ConfirmDialogue"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"

const statusFlow = ["PICKED_UP", "IN_TRANSIT", "DELIVERED"]

const UpdateStatus = () => {
    const [statusMap, setStatusMap] = useState<Record<string, string>>({})
    const { data: user, isLoading } = useGetMeQuery(undefined)
    const { data: parcels } = useGetAllParcelByIdQuery(user?.data?.user?._id)

    const [updateParcelStatus] = useUpdateParcelStatusMutation(undefined)
    const [collectCODAMount] = useCollectCODAMountMutation(undefined)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2Icon className="animate-spin w-6 h-6 text-purple-500" />
            </div>
        )
    }
    // console.log(parcels?.data)
    const handleConfirm = async (id: string) => {
        const newStatus = statusMap[id]
        if (!newStatus) {
            return toast.error("Please select a status first")
        }
        // console.log(`Update parcel ${id} to status: ${newStatus}`)
        try {

            const parcelId = id
            const data = {
                updaterId: user?.data?.user?._id,
                status: statusMap[id]
            }
            // console.log(data)
            const res = await updateParcelStatus({ parcelId, data }).unwrap()
            if (res?.success) {
                toast.success(res.message)
            }
            // console.log(res)
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
        // TODO: call backend mutation API here
    }

    const handleConfirmPayment = async (id: string) => {
        try {
            // console.log(id)

            const data = {
                deliveryPersonId: user?.data?.user?._id,
                trackingId: id
            }
            const res = await collectCODAMount(data).unwrap()
            if (res?.success) {
                toast.success(res?.data?.message)
            }
            console.log(res)
            // console.log(data)
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
    }

    return (
        <div className="border border-muted rounded-lg">
            <Table className="px-10">
                <TableHeader className="bg-purple-100">
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Tracking Id</TableHead>
                        <TableHead>Parcel Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Receiver</TableHead>
                        <TableHead>Update Status</TableHead>
                        <TableHead>Confirm Payment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {parcels?.data?.map((item: any, i: number) => (
                        <TableRow key={item._id}>
                            <TableCell className="border-2 bg-gray-50">{i + 1}</TableCell>
                            <TableCell className="border-2 bg-blue-50">{item.trackingId}</TableCell>
                            <TableCell className="border-2 bg-gray-50">{item.parcelType}</TableCell>
                            <TableCell className="border-2 bg-orange-50">{item.status}</TableCell>
                            <TableCell className="border-2 bg-orange-50">{item.paymentMethod}</TableCell>
                            <TableCell className="border-2 bg-orange-50">{item.paymentStatus === "PAID" ? <p className="flex items-center gap-1">{item.paymentStatus}<CheckCheckIcon /> </p> : item.paymentStatus}</TableCell>
                            <TableCell className="border-2 bg-pink-50">{item.receiverInfo?.name}</TableCell>
                            <TableCell className="flex items-center gap-2 bg-emerald-50 border">
                                <Select
                                    value={statusMap[item._id] || ""}
                                    onValueChange={(newStatus: string) =>
                                        setStatusMap((prev) => ({ ...prev, [item._id]: newStatus }))
                                    }
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusFlow.map((status, i) => (
                                            <SelectItem key={i} value={status}>
                                                {status.replace("_", " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <ConfirmDialogue onConfirm={() => handleConfirm(item._id)}>
                                    <Button className="w-fit">
                                        <SquarePenIcon />
                                    </Button>
                                </ConfirmDialogue>
                            </TableCell>
                            <TableCell className="border-2 bg-pink-50">
                                <ConfirmDialogue onConfirm={() => handleConfirmPayment(item.trackingId)}>
                                    <Button className="w-fit">
                                        <CheckCheckIcon />
                                    </Button>
                                </ConfirmDialogue>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default UpdateStatus
