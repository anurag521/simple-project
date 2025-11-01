import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, UserFormValues } from "@/type"
import { UserForm } from "../add-user/add-user-from"
import apiClient from "@/lib/axios.config"
import { AxiosError } from "axios"
import { toast } from "sonner"

export default function EditForm({user}: {user: User}) {
       const onSubmit = async (data: UserFormValues) => {
       try {
        const response = await apiClient.put(`/user/${user._id}`, data)
        if(response.status === 201){
            toast.success("User updated successfully")
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
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="">
            <UserForm onSubmit={onSubmit} user={user} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
