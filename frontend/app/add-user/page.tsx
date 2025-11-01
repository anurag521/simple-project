
"use client"
import { UserForm } from "@/components/add-user/add-user-from";
import apiClient from "@/lib/axios.config";
import { UserFormValues } from "@/type";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function AddUser() {
    const onSubmit = async (data: UserFormValues) => {
       try {
        const response = await apiClient.post('/user/create', data)
        if(response.status === 201){
            toast.success("User created successfully")
        }
       } catch (error) {
        console.log(error)
        if(error instanceof AxiosError){
            console.log(error.response?.data)
            toast.error(error.response?.data?.message)
        }
       }
    }
    return (
      <div className="px-4 py-6">
        <UserForm onSubmit={onSubmit} />
      </div>
    )
}
