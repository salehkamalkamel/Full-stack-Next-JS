export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
}

export interface Payment {
  method: "card" | "paypal";
  transaction_id: string;
  card_brand?: string;
  last4?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  status: OrderStatus;
  orderDate: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shipping_address: Address;
  billing_address: Address;
  payment: Payment;
}

// Mock data for orders
const orders: Order[] = Array.from({ length: 50 }).map((_, index) => {
  const id = `order-${index + 1}`;
  const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const orderDate = new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  const statuses: OrderStatus[] = ["PENDING", "COMPLETED", "CANCELLED"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  const itemCount = Math.floor(1 + Math.random() * 4);
  const items: OrderItem[] = Array.from({ length: itemCount }).map(
    (_, itemIndex) => {
      const gameNames = [
        "Cyberpunk 2077",
        "The Witcher 3",
        "Red Dead Redemption 2",
        "Elden Ring",
        "God of War",
        "Horizon Zero Dawn",
        "Ghost of Tsushima",
        "Hades",
        "Doom Eternal",
        "Control",
      ];

      return {
        id: `item-${index}-${itemIndex}`,
        name: gameNames[Math.floor(Math.random() * gameNames.length)],
        price: Math.floor(20 + Math.random() * 40) + 0.99,
        quantity: Math.floor(1 + Math.random() * 2),
        image: `/placeholder.svg?height=64&width=64`,
      };
    }
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = 5.99;
  const total = subtotal + tax + shipping;

  const customerNames = [
    "John Doe",
    "Jane Smith",
    "Robert Johnson",
    "Emily Davis",
    "Michael Wilson",
    "Sarah Brown",
    "David Miller",
    "Lisa Garcia",
    "James Martinez",
    "Jennifer Robinson",
  ];

  const customerName =
    customerNames[Math.floor(Math.random() * customerNames.length)];
  const customerEmail =
    customerName.toLowerCase().replace(" ", ".") + "@example.com";

  const address: Address = {
    name: customerName,
    line1: `${Math.floor(100 + Math.random() * 9900)} Main St`,
    line2:
      Math.random() > 0.7
        ? `Apt ${Math.floor(1 + Math.random() * 100)}`
        : undefined,
    city: "San Francisco",
    state: "CA",
    postal_code: `9${Math.floor(1000 + Math.random() * 9000)}`,
    country: "United States",
    phone: `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(
      100 + Math.random() * 900
    )}-${Math.floor(1000 + Math.random() * 9000)}`,
  };

  const payment: Payment =
    Math.random() > 0.3
      ? {
          method: "card",
          transaction_id: `txn_${Math.random().toString(36).substring(2, 10)}`,
          card_brand: ["Visa", "Mastercard", "Amex"][
            Math.floor(Math.random() * 3)
          ],
          last4: `${Math.floor(1000 + Math.random() * 9000)}`.substring(0, 4),
        }
      : {
          method: "paypal",
          transaction_id: `paypal_${Math.random()
            .toString(36)
            .substring(2, 10)}`,
        };

  return {
    id,
    orderNumber,
    customer: {
      id: `user-${index + 1}`,
      name: customerName,
      email: customerEmail,
    },
    items,
    status,
    orderDate,
    subtotal,
    tax,
    shipping,
    total,
    shipping_address: address,
    billing_address: { ...address },
    payment,
  };
});

export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id);
}
