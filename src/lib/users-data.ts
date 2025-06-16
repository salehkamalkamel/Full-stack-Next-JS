export type UserRole = "admin" | "editor" | "user" | "moderator";
export type UserStatus = "active" | "inactive" | "suspended" | "banned";

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface PaymentMethod {
  type: "card" | "paypal";
  brand?: string;
  last4?: string;
  expiryMonth?: string;
  expiryYear?: string;
  email?: string;
}

export interface UserActivity {
  id: string;
  type: "login" | "order" | "cart" | "payment" | "other";
  description: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  date: Date;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: Date;
  lastLogin?: Date;
  avatar?: string;
  phone?: string;
  address?: Address;
  paymentMethods?: PaymentMethod[];
  emailVerified: boolean;
  twoFactorEnabled: boolean;
}

// Mock data for users
const users: User[] = Array.from({ length: 50 }).map((_, index) => {
  const id = `user-${index + 1}`;

  const firstNames = [
    "John",
    "Jane",
    "Robert",
    "Emily",
    "Michael",
    "Sarah",
    "David",
    "Lisa",
    "James",
    "Jennifer",
    "William",
    "Elizabeth",
    "Richard",
    "Susan",
    "Joseph",
    "Jessica",
    "Thomas",
    "Karen",
    "Charles",
    "Nancy",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;

  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  const roles: UserRole[] = ["admin", "editor", "user", "moderator"];
  const roleDistribution = [0.1, 0.15, 0.7, 0.05]; // 10% admin, 15% editor, 70% user, 5% moderator
  let role: UserRole;

  const random = Math.random();
  if (random < roleDistribution[0]) {
    role = roles[0];
  } else if (random < roleDistribution[0] + roleDistribution[1]) {
    role = roles[1];
  } else if (
    random <
    roleDistribution[0] + roleDistribution[1] + roleDistribution[2]
  ) {
    role = roles[2];
  } else {
    role = roles[3];
  }

  const statuses: UserStatus[] = ["active", "inactive", "suspended", "banned"];
  const statusDistribution = [0.8, 0.1, 0.05, 0.05]; // 80% active, 10% inactive, 5% suspended, 5% banned
  let status: UserStatus;

  const statusRandom = Math.random();
  if (statusRandom < statusDistribution[0]) {
    status = statuses[0];
  } else if (statusRandom < statusDistribution[0] + statusDistribution[1]) {
    status = statuses[1];
  } else if (
    statusRandom <
    statusDistribution[0] + statusDistribution[1] + statusDistribution[2]
  ) {
    status = statuses[2];
  } else {
    status = statuses[3];
  }

  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );
  const joinedAt = new Date(
    oneYearAgo.getTime() +
      Math.random() * (now.getTime() - oneYearAgo.getTime())
  );

  const lastLogin =
    Math.random() > 0.2
      ? new Date(
          joinedAt.getTime() +
            Math.random() * (now.getTime() - joinedAt.getTime())
        )
      : undefined;

  const hasAddress = Math.random() > 0.3;
  const address = hasAddress
    ? {
        line1: `${Math.floor(100 + Math.random() * 9900)} Main St`,
        line2:
          Math.random() > 0.7
            ? `Apt ${Math.floor(1 + Math.random() * 100)}`
            : undefined,
        city: "San Francisco",
        state: "CA",
        postal_code: `9${Math.floor(1000 + Math.random() * 9000)}`,
        country: "United States",
      }
    : undefined;

  const hasPaymentMethods = Math.random() > 0.4;
  const paymentMethods = hasPaymentMethods
    ? Array.from({ length: Math.floor(1 + Math.random() * 2) }).map(() => {
        const isCard = Math.random() > 0.3;
        if (isCard) {
          const brands = ["Visa", "Mastercard", "Amex"];
          return {
            type: "card" as const,
            brand: brands[Math.floor(Math.random() * brands.length)],
            last4: `${Math.floor(1000 + Math.random() * 9000)}`.substring(0, 4),
            expiryMonth: `${Math.floor(1 + Math.random() * 12)}`.padStart(
              2,
              "0"
            ),
            expiryYear: `${
              new Date().getFullYear() + Math.floor(1 + Math.random() * 5)
            }`,
          };
        } else {
          return {
            type: "paypal" as const,
            email: email,
          };
        }
      })
    : undefined;

  return {
    id,
    name,
    email,
    role,
    status,
    joinedAt,
    lastLogin,
    avatar: `/placeholder.svg?height=40&width=40`,
    phone:
      Math.random() > 0.3
        ? `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(
            100 + Math.random() * 900
          )}-${Math.floor(1000 + Math.random() * 9000)}`
        : undefined,
    address,
    paymentMethods,
    emailVerified: Math.random() > 0.1,
    twoFactorEnabled: Math.random() > 0.7,
  };
});

// Mock user activity data
const userActivities: Record<string, UserActivity[]> = {};

users.forEach((user) => {
  const activityCount = Math.floor(Math.random() * 10);
  const activities: UserActivity[] = [];

  for (let i = 0; i < activityCount; i++) {
    const types: UserActivity["type"][] = [
      "login",
      "order",
      "cart",
      "payment",
      "other",
    ];
    const type = types[Math.floor(Math.random() * types.length)];

    let description = "";
    switch (type) {
      case "login":
        description = "Logged in to account";
        break;
      case "order":
        description = `Placed order #ORD-${Math.floor(
          10000 + Math.random() * 90000
        )}`;
        break;
      case "cart":
        description = "Added item to cart";
        break;
      case "payment":
        description = `Made payment of ${(
          Math.floor(1000 + Math.random() * 9000) / 100
        ).toFixed(2)}`;
        break;
      case "other":
        description = "Updated account information";
        break;
    }

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const timestamp = new Date(
      oneMonthAgo.getTime() +
        Math.random() * (now.getTime() - oneMonthAgo.getTime())
    );

    activities.push({
      id: `activity-${user.id}-${i}`,
      type,
      description,
      timestamp,
    });
  }

  // Sort activities by timestamp (newest first)
  activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  userActivities[user.id] = activities;
});

// Mock user orders data
const userOrders: Record<string, Order[]> = {};

users.forEach((user) => {
  const orderCount = Math.floor(Math.random() * 5);
  const orders: Order[] = [];

  for (let i = 0; i < orderCount; i++) {
    const now = new Date();
    const sixMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 6,
      now.getDate()
    );
    const date = new Date(
      sixMonthsAgo.getTime() +
        Math.random() * (now.getTime() - sixMonthsAgo.getTime())
    );

    const statuses: Order["status"][] = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ];
    const statusDistribution = [0.1, 0.15, 0.15, 0.5, 0.05, 0.05];
    let status: Order["status"];

    const statusRandom = Math.random();
    if (statusRandom < statusDistribution[0]) {
      status = statuses[0];
    } else if (statusRandom < statusDistribution[0] + statusDistribution[1]) {
      status = statuses[1];
    } else if (
      statusRandom <
      statusDistribution[0] + statusDistribution[1] + statusDistribution[2]
    ) {
      status = statuses[2];
    } else if (
      statusRandom <
      statusDistribution[0] +
        statusDistribution[1] +
        statusDistribution[2] +
        statusDistribution[3]
    ) {
      status = statuses[3];
    } else if (
      statusRandom <
      statusDistribution[0] +
        statusDistribution[1] +
        statusDistribution[2] +
        statusDistribution[3] +
        statusDistribution[4]
    ) {
      status = statuses[4];
    } else {
      status = statuses[5];
    }

    const itemCount = Math.floor(1 + Math.random() * 3);
    const items = Array.from({ length: itemCount }).map((_, itemIndex) => {
      const productNames = [
        "Stellar Odyssey",
        "Mystic Realms",
        "Velocity Rush",
        "Tactical Force",
        "Neon Shadows",
        "Ancient Legacy",
        "Galactic Conquest",
        "Phantom Protocol",
        "Dragon's Keep",
        "Urban Legends",
      ];

      return {
        id: `item-${i}-${itemIndex}`,
        name: productNames[Math.floor(Math.random() * productNames.length)],
        quantity: Math.floor(1 + Math.random() * 2),
        price: Math.floor(1999 + Math.random() * 4000) / 100,
      };
    });

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    orders.push({
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date,
      status,
      total,
      items,
    });
  }

  // Sort orders by date (newest first)
  orders.sort((a, b) => b.date.getTime() - a.date.getTime());

  userOrders[user.id] = orders;
});

export function getUsers(): User[] {
  return users;
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function getUserActivity(userId: string): UserActivity[] {
  return userActivities[userId] || [];
}

export function getUserOrders(userId: string): Order[] {
  return userOrders[userId] || [];
}

export function formatDate(date?: Date): string {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
