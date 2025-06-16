import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@prisma/client";
import Link from "next/link";
import { CustomerRoleBadge } from "./customer-role-badge";
import { CustomerActions } from "./customer-actions";
import { formatDate } from "@/lib/utils";

type CustomerTableRowProps = {
  user: User;
  selectedUsers: string[];
  toggleSelectUser: (userId: string) => void;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export default function CustomersTableRow({
  user,
  selectedUsers,
  toggleSelectUser,
}: CustomerTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={selectedUsers.includes(user.id)}
          onCheckedChange={() => toggleSelectUser(user.id)}
          aria-label={`Select user ${user.name}`}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link
              href={`/admin/customers/${user.id}`}
              className="font-medium text-primary hover:underline"
            >
              {user.name}
            </Link>
            <span className="text-xs text-muted-foreground">
              ID: {user.id.substring(0, 8)}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <CustomerRoleBadge role={user?.role} />
      </TableCell>
      <TableCell>
        <span
          className={`flex h-2 w-2 rounded-full ${
            user.status === "ACTIVE" ? "bg-green-500" : "bg-gray-300"
          }`}
        />
        <span className="ml-2 capitalize">{user.status}</span>
      </TableCell>
      <TableCell>{formatDate(user.createdAt)}</TableCell>
      <TableCell>
        <CustomerActions user={user} compact />
      </TableCell>
    </TableRow>
  );
}
