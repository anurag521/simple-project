"use client"
import { UserForm } from "@/components/add-user/add-user-from";
import { UserFormValues } from "@/type";
import useAddUser from "@/hooks/add-user";

export default function AddUser() {
    const createUserMutation = useAddUser();

    const onSubmit = async (data: UserFormValues) => {
        await createUserMutation.mutateAsync(data);
    };

    return (
        <div className="px-4 py-6">
            <UserForm onSubmit={onSubmit} />
        </div>
    );
}