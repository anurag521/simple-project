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
  phone?: string | null;
  collegeName?: string | null;
  collegeAddress?: Address | null;
  address?: Address | null;
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

export interface UserFormProps {
  user?: User;
  onSubmit: (data: User) => void;
  onCancel?: () => void;
}

export interface CheckboxProp {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputProps {
    label: string;
    error?: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

export interface AddressFieldsProps {
    prefix: string;
    address: Address;
    onChange: (prefix: string, field: string, value: string) => void;
}