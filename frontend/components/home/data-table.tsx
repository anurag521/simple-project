
"use client"
import { useState } from 'react';
import { MoreVertical, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetAllUsers } from '@/hooks/get-all-user';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Pagination from './pagination';
import DataTableRow from './data-table-row';

export default function DataTable() {
  
  // Replace this with your actual hook
  const { data, currentPage, setCurrentPage, isLoading, error } = useGetAllUsers(1, 10);

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
              <DataTableRow key={user._id} user={user} />
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