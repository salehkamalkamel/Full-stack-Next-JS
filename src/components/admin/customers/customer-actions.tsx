"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { MoreHorizontal, Trash, User, UserCog } from "lucide-react";
import { type User as UserType } from "@prisma/client";
import { deleteUser, updateUserInfo } from "@/actions/users-actions";

interface CustomerActionsProps {
  user: UserType;
  compact?: boolean;
}

export function CustomerActions({
  user,
  compact = false,
}: CustomerActionsProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);

  const handleDeleteUser = async () => {
    // In a real app, this would call an API to delete the user

    await deleteUser(user.id)
      .then(() => {
        toast.success("User deleted", {
          description: `User ${user.name} has been deleted.`,
        });
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`, {
          description: `Failed to delete user ${user.name}`,
        });
      });
    setShowDeleteDialog(false);
    router.refresh();
  };

  // const handleResetPassword = () => {
  //   // In a real app, this would call an API to reset the user's password
  //   toast("Password reset email sent", {
  //     description: `A password reset email has been sent to ${user.email}.`,
  //   });
  //   setShowResetPasswordDialog(false);
  // };

  const handleToggleStatus = async () => {
    // In a real app, this would call an API to activate/deactivate the user
    const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    await updateUserInfo(user.id, {
      status: newStatus,
    })
      .then(() => {
        toast.success(
          `User ${newStatus === "ACTIVE" ? "activated" : "deactivated"}`,
          {
            description: `User ${user.name} has been ${
              newStatus === "ACTIVE" ? "activated" : "deactivated"
            }.`,
          }
        );
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`, {
          description: `Failed to update user status.`,
        });
      });
    setShowDeactivateDialog(false);
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={compact ? "icon" : "default"}>
            {!compact && "Actions"}
            <MoreHorizontal className={compact ? "h-4 w-4" : "ml-2 h-4 w-4"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>User Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/customers/${user.id}`)}
          >
            <User className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          {/* <DropdownMenuItem
            onClick={() => router.push(`/admin/customers/${user.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit User
          </DropdownMenuItem> */}

          <DropdownMenuSeparator />

          {/* <DropdownMenuItem onClick={() => setShowResetPasswordDialog(true)}>
            <Key className="mr-2 h-4 w-4" />
            Reset Password
          </DropdownMenuItem> */}

          {/* <DropdownMenuItem
            onClick={() =>
              router.push(`/admin/customers/${user.id}/permissions`)
            }
          >
            <ShieldAlert className="mr-2 h-4 w-4" />
            Manage Permissions
          </DropdownMenuItem> */}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setShowDeactivateDialog(true)}>
            <UserCog className="mr-2 h-4 w-4" />
            {user.status === "ACTIVE" ? "Deactivate" : "Activate"} User
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete User Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {user.name}? This action cannot be
              undone and will permanently delete the user account and all
              associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Password Dialog */}
      {/* <AlertDialog
        open={showResetPasswordDialog}
        onOpenChange={setShowResetPasswordDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Password</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send a password reset email to{" "}
              {user.email}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetPassword}>
              Send Reset Email
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* Deactivate User Dialog */}
      <AlertDialog
        open={showDeactivateDialog}
        onOpenChange={setShowDeactivateDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user.status === "ACTIVE" ? "Deactivate" : "Activate"} User
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to{" "}
              {user.status === "ACTIVE" ? "deactivate" : "activate"} {user.name}
              ?
              {user.status === "ACTIVE"
                ? " This will prevent the user from logging in or accessing their account."
                : " This will restore the user's access to their account."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggleStatus}>
              {user.status === "ACTIVE" ? "Deactivate" : "Activate"} User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
