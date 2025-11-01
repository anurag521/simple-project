
"use client"
import { UserForm } from "@/components/add-user/add-user-from";
import { UserFormValues } from "@/type";

export default function AddUser() {
    const onSubmit = async (data: UserFormValues) => {
        console.log(data)
    }
    return (
        <UserForm onSubmit={onSubmit} />
    )
}
