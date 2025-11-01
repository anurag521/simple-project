"use client"
import { User } from "@/type";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { formatDate } from "@/hooks/date";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DataTableRow({user}: {user: User}) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
     const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
    setOpenDropdown(null);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
    setOpenDropdown(null);
  };
  return (
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
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 p-0 hover:bg-muted"
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background">
                      <DropdownMenuItem
                        onClick={() => handleEdit(user._id!)}
                        className="flex items-center gap-2 hover:bg-muted"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(user._id!)}
                        className="text-destructive focus:text-destructive flex items-center gap-2 hover:bg-muted"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
  )
}
