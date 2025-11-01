import { FormFieldCheckboxProps } from "@/type";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormItem, FormControl, FormLabel } from "../ui/form";
import { UserFormValues } from "@/type";

export const FormFieldCheckbox = ({ 
  name, 
  label 
}: FormFieldCheckboxProps) => {
  const { control } = useFormContext<UserFormValues>()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="!mt-0">{label}</FormLabel>
        </FormItem>
      )}
    />
  )
}