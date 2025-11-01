import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { EditFormProps,UserFormValues } from "@/type"
import { UserForm } from "../add-user/add-user-from"
import apiClient from "@/lib/axios.config"
import { AxiosError } from "axios"
import { toast } from "sonner"

export default function EditForm({ user, isOpen, onOpenChange }: EditFormProps) {
    const onSubmit = async (data: UserFormValues) => {
        try {
            const response = await apiClient.put(`/user/${user._id}`, data);
            if (response.status === 200) {
                toast.success("User updated successfully");
                onOpenChange(false); // Close the dialog on success
            }
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Failed to update user");
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
           <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Update the user information below.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <UserForm onSubmit={onSubmit} user={user} />
                </div>
            </DialogContent>
        </Dialog>
    );
}