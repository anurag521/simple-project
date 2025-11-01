"use client"
import { User } from "@/type";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { formatDate } from "@/hooks/date";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import EditForm from "./edit-form";
import deleteUser from "@/hooks/delete-user";

export default function DataTableRow({ user }: { user: User }) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const deleteUserMutation = deleteUser();
    const dropdownRef = useRef<HTMLButtonElement>(null);
     const handleDelete = (userId: string) => {
        deleteUserMutation.mutate(userId, {
            onSuccess: () => {
                // Close the dropdown after successful deletion
                if (dropdownRef.current) {
                    dropdownRef.current.click();
                }
            }
        });
    };

    return (
        <>
            <TableRow key={user._id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                    {user.name || <span className="text-muted-foreground">N/A</span>}
                </TableCell>
                <TableCell className="text-foreground">{user.email}</TableCell>
                <TableCell>
                    <Badge
                        variant={user.isActive ? "default" : "secondary"}
                        className={!user.isActive ? "bg-muted text-muted-foreground" : ""}
                    >
                        {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                </TableCell>
                <TableCell>
                    <Badge
                        variant={user.isAdmin ? "default" : "outline"}
                        className={!user.isAdmin ? "text-muted-foreground" : ""}
                    >
                        {user.isAdmin ? "Admin" : "User"}
                    </Badge>
                </TableCell>
                <TableCell className="text-foreground">
                    {user.phone || <span className="text-muted-foreground">N/A</span>}
                </TableCell>
                <TableCell className="text-foreground">
                    {formatDate(user.createdAt)}
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            ref={dropdownRef}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-muted"
                                disabled={deleteUserMutation.isPending}
                            >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                            align="end" 
                            className="w-40 bg-background border rounded-md shadow-lg z-50"
                        >
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setIsEditDialogOpen(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                            >
                                <Edit className="h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    handleDelete(user._id!);
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted cursor-pointer"
                                disabled={deleteUserMutation.isPending}
                            >
                                <Trash2 className="h-4 w-4" />
                                {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>

            <EditForm
                user={user}
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />
        </>
    );
}