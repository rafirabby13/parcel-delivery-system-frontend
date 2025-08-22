import { CreateParcel } from "@/components/modules/parcel/CreateParcel"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Parcels = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-5 space-y-5">
      <div className="flex justify-between items-center ">
        <h1 className="font-bold text-2xl underline">Tour Type</h1>
        <CreateParcel />
      </div>
      <div className="border border-muted rounded-lg">
        <Table className="px-10">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody className="">
            {
              data?.map((item: { name: string }) => (
                <TableRow>
                  <TableCell>{item.name}</TableCell>
                  <TableCell><DeleteConfirmtion onConfirm={() => handleDelete(item)}><Trash2 /></DeleteConfirmtion></TableCell>
            
                </TableRow>)
              )
            }
          </TableBody> */}
        </Table>
      </div>
    </div>
  )
}

export default Parcels
