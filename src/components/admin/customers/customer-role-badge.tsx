import { Badge } from "@/components/ui/badge";
import { UserRole } from "@prisma/client";

interface CustomerRoleBadgeProps {
  role: UserRole | null | string;
}

export function CustomerRoleBadge({ role = "USER" }: CustomerRoleBadgeProps) {
  const roleConfig = {
    admin: {
      label: "Admin",
      variant: "destructive" as const,
    },
    editor: {
      label: "Editor",
      variant: "default" as const,
    },
    user: {
      label: "User",
      variant: "secondary" as const,
    },
  };

  const config =
    roleConfig[role?.toLocaleLowerCase() as keyof typeof roleConfig] ||
    roleConfig.user;

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
