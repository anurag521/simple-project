import apiClient from '@/lib/axios.config'
import { UserFormValues } from '@/type'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function AddUser() {
    const queryClient = useQueryClient();
    const createUser = async (data: UserFormValues) => {
        const response = await apiClient.post('/user/create', data);
        return response.data;
    };

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("User created successfully");
            // Invalidate users query to refetch the list
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.log(error);
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                toast.error(error.response?.data?.message);
            }
        }
    });


}
