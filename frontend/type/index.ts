import * as z from "zod"

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface User {
    _id?: string;
  name?: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  phone?: string ;
  collegeName?: string ;
  collegeAddress?: Address;
  address?: Address;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ApiResponse {
    users: Array<Omit<User, keyof Document>>; 
    totalPages: number;
    currentPage: number;
    totalUsers: number;
}

export interface DataTableProps {
  data: any[];
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    total: number;
    onPageChange: (page: number) => void;
    manualPagination?: boolean;
  };
  isLoading?: boolean;
}
export  const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
})

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  collegeName: z.string().optional(),
  isActive: z.boolean(),
  isAdmin: z.boolean(),
  address: addressSchema.optional(),
  collegeAddress: addressSchema.optional(),
})
export type UserFormValues = z.infer<typeof formSchema>

export interface UserFormProps {
  user?: Partial<UserFormValues>;
  onSubmit: (data: UserFormValues) => Promise<void>;
  onCancel?: () => void;
}
export interface AddressFieldsProps {
    prefix: string;
    address: Address;
    onChange: (prefix: string, field: string, value: string) => void;
}

export interface FormFieldInputProps {
  name: keyof UserFormValues | `address.${keyof z.infer<typeof addressSchema>}` | `collegeAddress.${keyof z.infer<typeof addressSchema>}`
  label: string
  placeholder?: string
  type?: string
}

export interface FormFieldCheckboxProps {
  name: "isActive" | "isAdmin"
  label: string
}