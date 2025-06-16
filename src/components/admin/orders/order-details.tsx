import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { OrderWithDetailsType } from "@/actions/order-actions";

interface OrderDetailsProps {
  order: OrderWithDetailsType;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Items purchased in this order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={
                      item.product.images[0].url ||
                      "/placeholder.svg?height=64&width=64"
                    }
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(item.price)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <Separator className="my-2" />

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatCurrency(14)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(10)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>
              Delivery address and contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <p className="font-medium">{order.id}</p>
              <p>{order.shippingAddress?.address1}</p>
              {order.shippingAddress?.address2 && (
                <p>{order.shippingAddress.address1}</p>
              )}
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p>{order.shippingAddress?.country}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Phone: {order.shippingAddress?.phone}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
              Payment method and billing details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <p className="font-medium">{"Credit Card"}</p>
              <p>Ending in 2027</p>
              <p className="text-sm text-muted-foreground">
                Transaction ID: 89dfhy67re673473843124
              </p>

              <Separator className="my-4" />

              <p className="font-medium">Billing Address</p>
              <p>{order.shippingAddress?.address1}</p>
              <p>{order.shippingAddress?.address2}</p>
              {order.shippingAddress?.address2 && (
                <p>{order.shippingAddress.address2}</p>
              )}
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
