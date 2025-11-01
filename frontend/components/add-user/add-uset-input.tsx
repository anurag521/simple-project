import { FormFieldInputProps, UserFormValues } from "@/type"
import { Controller, useFormContext } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

export const FormFieldInput = ({ 
  name, 
  label, 
  placeholder = "", 
  type = "text" 
}: FormFieldInputProps) => {
  const { control } = useFormContext<UserFormValues>()
  
  return (
    <Controller
      control={control}
      name={name as keyof UserFormValues}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              type={type} 
              {...field} 
              value={(field.value as string) ?? ""}
            />
          </FormControl>
          {error?.message && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  )
}