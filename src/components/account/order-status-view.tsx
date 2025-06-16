import { OrderStatus } from "@prisma/client";

export default function OrderStatusView({ state }: { state: OrderStatus }) {
  if (state === "PENDING") {
    return (
      <div className="p-2 rounded-full   uppercase text-xs font-semibold">
        {state}
      </div>
    );
  }

  if (state === "COMPLETED") {
    return (
      <div className="p-2 rounded-full   uppercase text-xs font-semibold">
        {state}
      </div>
    );
  }
  if (state === "CANCELLED") {
    return (
      <div className="p-2 rounded-full   text-xs font-semibold">{state}</div>
    );
  }
}
