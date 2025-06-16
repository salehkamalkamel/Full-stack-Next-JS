import { Prisma } from "@prisma/client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderActions } from "./order-actions";
import { formatCurrency } from "@/lib/utils";

type OrdersTableRowProps = {
  order: Prisma.OrderGetPayload<{
    include: {
      user: {
        select: {
          name: true;
        };
      };
    };
  }>;
  toggleSelectOrder: (orderId: string) => void;
  selectedOrders: string[];
};
export default function OrdersTableRow({
  order,
  selectedOrders,
  toggleSelectOrder,
}: OrdersTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={selectedOrders.includes(order.id)}
          onCheckedChange={() => toggleSelectOrder(order.id)}
          aria-label={`Select order ${order.id}`}
        />
      </TableCell>
      <TableCell>
        <Link
          href={`/admin/orders/${order.id}`}
          className="font-medium text-primary hover:underline"
        >
          #{order.id}
        </Link>
      </TableCell>
      <TableCell>{order.user.name}</TableCell>
      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>
      <TableCell className="text-right font-medium">
        {formatCurrency(order.totalPrice)}
      </TableCell>
      <TableCell>
        <OrderActions order={order} compact />
      </TableCell>
    </TableRow>
  );
}
