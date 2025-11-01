
"use client"
import { useState } from 'react';
import { MoreVertical, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetAllUsers } from '@/hooks/get-all-user';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Pagination from './pagination';

export default function DataTable() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Replace this with your actual hook
  const { data, currentPage, setCurrentPage, isLoading, error } = useGetAllUsers(1, 10);

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
    setOpenDropdown(null);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
    setOpenDropdown(null);
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
   // Add this to your table container
<div className="w-full max-w-7xl mx-auto p-6 space-y-4">
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-muted-foreground">Name</TableHead>
            <TableHead className="text-muted-foreground">Email</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Role</TableHead>
            <TableHead className="text-muted-foreground">Phone</TableHead>
            <TableHead className="text-muted-foreground">Created At</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && data.users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            data.users.map((user) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  </div>

  {/* Pagination with dark mode support */}
  {data.totalPages > 1 && (
    <Pagination data={data} setCurrentPage={setCurrentPage} currentPage={currentPage} />
  )}
</div>
  );
}