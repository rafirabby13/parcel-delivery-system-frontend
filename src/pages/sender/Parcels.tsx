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
import { useInitPaymentMutation } from "@/redux/feature/payment/payment.api"
import { useGetMeQuery } from "@/redux/feature/user/user.api"
import { ConfirmDialogue } from "@/utils/ConfirmDialogue"
import { CircleXIcon, WalletCardsIcon } from "lucide-react"
import { toast } from "sonner"

const Parcels = () => {
    const { data } = useGetMeQuery(undefined)
    const [cancelParcel] = useCancelParcelMutation(undefined)
    const [initPayment] = useInitPaymentMutation(undefined)
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
            // console.log(res)
            if (res?.success) {
                toast.success("Parcel Cancelled Successfully")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // console.log(error)
            toast.error(error?.data?.message)
        }

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMakePayment = async (item: { _id: any; trackingId?: string; status?: string; receiverInfo?: { name: string }; parcelType?: string }) => {
        try {
            // console.log(item._id)
            // const cancelData = {
            //     parcelId: item._id,
            //     updaterId: data?.data?.user?._id
            // }
            // // console.log(cancelData)
            const parcelId = item._id
            // console.log(parcelId)
            const res = await initPayment(parcelId).unwrap()
            // console.log(res)
            if (res?.success) {
                window.open(res?.data?.paymentUrl)
                toast.success("Now You Can Make a payment Successfully")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
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
                    <TableHeader className="bg-purple-100 dark:bg-background">
                        <TableRow>
                            <TableHead>Tracking Id</TableHead>
                            <TableHead>Parcel Type</TableHead>
                            <TableHead>Parcel Image</TableHead>
                            <TableHead>Delivery Status</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Receiver</TableHead>
                            <TableHead>Cencel Parcel</TableHead>
                            <TableHead>Make Payment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {
                            parcels?.data?.map((item: { _id: string, trackingId: string, status: string, receiverInfo: { name: string }, parcelType: string, image: string[], paymentStatus: string, paymentMethod: string }) => (
                                <TableRow>
                                    <TableCell className="border-2 dark:bg-background bg-blue-50">{item.trackingId}</TableCell>
                                    <TableCell className="border-2 dark:bg-background bg-gray-50">{item.parcelType}</TableCell>
                                    <TableCell className="border-2 dark:bg-background bg-blue-50"><img className="h-20 w-full" src={item.image && item.image[0]} alt="__No_parcel_image_Available" /></TableCell>
                                    <TableCell className="border-2 dark:bg-background bg-orange-50">{item.status}</TableCell>
                                    <TableCell className="border-2 dark:bg-background bg-orange-50">{item.paymentMethod}</TableCell>
                                    <TableCell className="border-2 dark:bg-background bg-red-100">{item.paymentStatus}</TableCell>
                                    <TableCell className="border-2 dark:bg-background bg-pink-50">{item.receiverInfo.name}</TableCell>
                                    <TableCell><ConfirmDialogue title="Cancel Parcel"
                                        description="Are you sure you want to cancel this parcel? This action cannot be undone and the parcel will be marked as cancelled." onConfirm={() => handleDelete(item)}><Button className="w-fit" disabled={item.status !== "REQUESTED" && item.status !== "APPROVED"} ><CircleXIcon /></Button></ConfirmDialogue></TableCell>
                                    <TableCell><ConfirmDialogue title="Confirm Payment"
                                        description="Are you sure you want to confirm this payment? Once confirmed, the payment status will be updated." onConfirm={() => handleMakePayment(item)}><Button className="w-fit"  ><WalletCardsIcon /></Button></ConfirmDialogue></TableCell>

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
