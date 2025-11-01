import apiClient from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, User } from "@/type";
import { AxiosError } from "axios";

export default function useDeleteUser() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userId: string) => apiClient.delete(`/user/${userId}`),
        onMutate: async (userId) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });
            
            // Get all pages data
            const previousData = queryClient.getQueryData<ApiResponse>(['users', 1, 10]); // Adjust limit if needed
            
            if (previousData) {
                // Update the cache for the current page
                queryClient.setQueryData<ApiResponse>(['users', previousData.currentPage, 10], (old) => {
                    if (!old) return { users: [], totalUsers: 0, totalPages: 0, currentPage: 1 };
                    
                    return {
                        ...old,
                        users: old.users.filter(user => user._id !== userId),
                        totalUsers: Math.max(0, old.totalUsers - 1),
                        // Recalculate total pages if needed
                        totalPages: Math.ceil((old.totalUsers - 1) / 10) // Adjust limit if needed
                    };
                });

                // Invalidate all pages to ensure consistency
                queryClient.invalidateQueries({ queryKey: ['users'] });
            }

            return { previousData };
        },
        onError: (error: AxiosError<{ message?: string }>, userId, context) => {
            // On error, roll back to the previous data
            if (context?.previousData) {
                queryClient.setQueryData(
                    ['users', context.previousData.currentPage, 10], // Adjust limit if needed
                    context.previousData
                );
            }
            
            toast.error(
                error.response?.data?.message || "Failed to delete user",
                { description: "Please try again" }
            );
        },
        onSuccess: () => {
            toast.success("User deleted successfully");
            // Invalidate all user queries to refetch fresh data
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
}