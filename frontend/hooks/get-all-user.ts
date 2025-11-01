import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios.config";
import { ApiResponse, User } from "../type";

const fetchUsers = async (page: number, limit: number): Promise<ApiResponse> => {
  const response = await apiClient.get(`/user/get-all-users?page=${page}&limit=${limit}`);
  return response.data;
};

export const useGetAllUsers = (initialPage: number, limit: number) => {
  const queryClient = useQueryClient();
  const [cachedPages, setCachedPages] = useState<Record<number, User[]>>({});
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: initialPage,
    totalUsers: 0,
  });
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading: loading, error } = useQuery({
    queryKey: ["users", currentPage, limit],
    queryFn: () => fetchUsers(currentPage, limit),
    enabled: !cachedPages[currentPage],
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data && !cachedPages[currentPage]) {
      setCachedPages((prev) => ({ ...prev, [currentPage]: data.users }));
      setPagination({
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        totalUsers: data.totalUsers,
      });

      // Prefetch next page if any and not cached
      if (currentPage < data.totalPages && !cachedPages[currentPage + 1]) {
        queryClient.prefetchQuery({
          queryKey: ["users", currentPage + 1, limit],
          queryFn: () => fetchUsers(currentPage + 1, limit),
          staleTime: Infinity,
        }).then(() => {
          const nextData = queryClient.getQueryData<ApiResponse>(["users", currentPage + 1, limit]);
          if (nextData) {
            setCachedPages((prev) => ({ ...prev, [currentPage + 1]: nextData.users }));
          }
        });
      }
    } else if (cachedPages[currentPage]) {
      // Update pagination currentPage if switching to cached page
      setPagination((prev) => ({ ...prev, currentPage }));
    }
  }, [data, currentPage, cachedPages, queryClient, limit]);

  return {
    data: {
      users: cachedPages[currentPage] || [],
      ...pagination,
    },
    currentPage,
    setCurrentPage,
    isLoading: loading,
    error: error as Error | null,
  };
};