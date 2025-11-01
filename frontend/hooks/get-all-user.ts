import { useState, useEffect } from "react";
import apiClient from "@/lib/axios.config";
import { ApiResponse, User } from "../type";

const fetchUsers = async (page: number, limit: number): Promise<ApiResponse> => {
  const response = await apiClient.get(`/user/get-all-users?page=${page}&limit=${limit}`);
  return response.data;
};

export const useGetAllUsers = (initialPage: number, limit: number) => {
  const [cachedPages, setCachedPages] = useState<Record<number, User[]>>({});
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: initialPage,
    totalUsers: 0,
  });
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!cachedPages[currentPage]) {
      setLoading(true);
      fetchUsers(currentPage, limit)
        .then((data) => {
          setCachedPages((prev) => ({ ...prev, [currentPage]: data.users }));
          setPagination({
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            totalUsers: data.totalUsers,
          });
          setLoading(false);
          setError(null);
          // Prefetch next page if any and not cached
          if (currentPage < data.totalPages && !cachedPages[currentPage + 1]) {
            fetchUsers(currentPage + 1, limit).then((nextData) => {
              setCachedPages((prev) => ({ ...prev, [currentPage + 1]: nextData.users }));
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    } else {
      // Update pagination currentPage if switching to cached page
      setPagination((prev) => ({ ...prev, currentPage }));
    }
  }, [currentPage, limit, cachedPages]);

  return {
    data: {
      users: cachedPages[currentPage] || [],
      ...pagination,
    },
    currentPage,
    setCurrentPage,
    isLoading: loading,
    error,
  };
};
