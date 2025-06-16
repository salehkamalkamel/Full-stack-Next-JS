import { User } from "@prisma/client";

export type AccountSidebarPropsType = {
  userData: User;
  activeTab: string;
  handleActiveTab: (newTab: string) => void;
};
