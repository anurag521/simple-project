"use client"
import { User } from "@/type";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { formatDate } from "@/hooks/date";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import EditForm from "./edit-form";
import deleteUser from "@/hooks/delete-user";

export default function DataTableRow({ user }: { user: User }) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const deleteUserMutation = deleteUser();

    const handleDelete = (userId: string) => {
        deleteUserMutation.mutate(userId, {
            onSuccess: () => {
                // Close the dropdown after successful deletion
                setIsDropdownOpen(false);
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
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-muted"
                                disabled={deleteUserMutation.isPending}
                            >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setIsEditDialogOpen(true);
                                    setIsDropdownOpen(false);
                                }}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <Edit className="h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    handleDelete(user._id!);
                                }}
                                className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
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