import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LoadingSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="animate-pulse h-10 w-10 rounded-md bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-4 w-32 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-4 w-24 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-4 w-20 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-5 w-20 bg-gray-200 rounded-full" />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full" />
                <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
