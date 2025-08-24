import { useConfirmDeliveryMutation, useIncomingParcelQuery } from "@/redux/feature/parcel/parcel.api"
import { useGetMeQuery } from "@/redux/feature/user/user.api"
import { Loader2Icon } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ConfirmDialogue } from "@/utils/ConfirmDialogue"
import { toast } from "sonner"
const IncomingParcels = () => {
    const { data: user, isLoading } = useGetMeQuery(undefined)
    const { data: parcels } = useIncomingParcelQuery(user?.data?.user?.phone)
    const [confirmDelivery] = useConfirmDeliveryMutation(undefined)
    if (isLoading) {
        return <Loader2Icon />
    }

    const notConfirmed = parcels?.data?.filter((parcel: { status: string }) => parcel.status !== "CONFIRMED")
    console.log(parcels.data, notConfirmed)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleConfirm = async (item: { _id?: string; trackingId: any; status?: string; senderInfo?: { name: string; detailAddress: string }; parcelType?: string }) => {
        // console.log(item.trackingId)

        try {
            const phone = user?.data?.user?.phone
            const data = {
                trackingId: item.trackingId,
                phone
            }

            const res = await confirmDelivery(data).unwrap()
            // console.log(res.data)
            if (res?.data?.success) {
                toast.success("Parcel Confirmed")
            }

            // console.log(data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // console.log(error)
            toast.error(error?.data?.message)

        }
    }
    return (
        <div>
            <div className="border border-muted rounded-lg">
                <Table className="px-10">
                    <TableHeader className="bg-purple-100">
                        <TableRow className="border-2">
                            <TableHead>#</TableHead>
                            <TableHead>Tracking Id</TableHead>
                            <TableHead>Parcel Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Sender__Address</TableHead>
                            <TableHead>Confirm Delivery</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {
                            notConfirmed?.map((item: { _id: string, trackingId: string, status: string, senderInfo: { name: string, detailAddress: string }, parcelType: string }, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="border-2 bg-orange-50">{index + 1}</TableCell>
                                    <TableCell className="border-2 bg-blue-50">{item.trackingId}</TableCell>
                                    <TableCell className="border-2 bg-gray-50">{item.parcelType}</TableCell>
                                    <TableCell className="border-2 bg-orange-50">{item.status}</TableCell>
                                    <TableCell className="border-2 bg-pink-50">{item.senderInfo.name}__{item.senderInfo.detailAddress}</TableCell>
                                    <TableCell><ConfirmDialogue onConfirm={() => handleConfirm(item)}><Button className="w-fit" >Confirm</Button></ConfirmDialogue></TableCell>

                                </TableRow>)
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default IncomingParcels
