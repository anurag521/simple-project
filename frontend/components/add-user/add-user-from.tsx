"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formSchema, UserFormProps, UserFormValues } from "@/type"
import { FormFieldInput } from "./add-uset-input"
import { FormFieldCheckbox } from "./add-user-checkbox"





export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      collegeName: user?.collegeName ?? "",
      isActive: user?.isActive ?? false,
      isAdmin: user?.isAdmin ?? false,
      address: {
        street: user?.address?.street ?? "",
        city: user?.address?.city ?? "",
        state: user?.address?.state ?? "",
        country: user?.address?.country ?? "",
        zipCode: user?.address?.zipCode ?? ""
      },
      collegeAddress: {
        street: user?.collegeAddress?.street ?? "",
        city: user?.collegeAddress?.city ?? "",
        state: user?.collegeAddress?.state ?? "",
        country: user?.collegeAddress?.country ?? "",
        zipCode: user?.collegeAddress?.zipCode ?? ""
      }
    }
  })
const handleSubmit = async (values: UserFormValues) => {
  try {
    setIsSubmitting(true);
    await onSubmit(values);
    // Reset form only if it's not an edit (no user prop)
    if (!user) {
      form.reset();
    }
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Card className="w-full max-w-4xl mx-auto ">
      <CardHeader>
        <CardTitle>{user ? 'Edit User' : 'Create New User'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormFieldInput name="name" label="Name" placeholder="John Doe" />
              <FormFieldInput name="email" label="Email" type="email" placeholder="john@example.com" />
              <FormFieldInput name="phone" label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
              <FormFieldInput name="collegeName" label="College Name" placeholder="University of..." />
            </div>

            <div className="flex items-center space-x-6">
              <FormFieldCheckbox name="isActive" label="Active" />
              <FormFieldCheckbox name="isAdmin" label="Admin" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormFieldInput name="address.street" label="Street" placeholder="123 Main St" />
                <FormFieldInput name="address.city" label="City" placeholder="New York" />
                <FormFieldInput name="address.state" label="State/Province" placeholder="NY" />
                <FormFieldInput name="address.country" label="Country" placeholder="United States" />
                <FormFieldInput name="address.zipCode" label="ZIP/Postal Code" placeholder="10001" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">College Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormFieldInput name="collegeAddress.street" label="Street" placeholder="456 College Ave" />
                <FormFieldInput name="collegeAddress.city" label="City" placeholder="Boston" />
                <FormFieldInput name="collegeAddress.state" label="State/Province" placeholder="MA" />
                <FormFieldInput name="collegeAddress.country" label="Country" placeholder="United States" />
                <FormFieldInput name="collegeAddress.zipCode" label="ZIP/Postal Code" placeholder="02115" />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {user ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}