import { AddressFieldsProps } from "@/type";
import { InputForm } from "./add-uset-input";

export const AddressFields = ({ prefix, address, onChange }: AddressFieldsProps) => (
  <div className="grid grid-cols-2 gap-4">
    <InputForm label="Street" value={address?.street || ''} onChange={(e: any) => onChange(prefix, 'street', e.target.value)} />
    <InputForm label="City" value={address?.city || ''} onChange={(e: any) => onChange(prefix, 'city', e.target.value)} />
    <InputForm label="State" value={address?.state || ''} onChange={(e: any) => onChange(prefix, 'state', e.target.value)} />
    <InputForm label="Zip Code" value={address?.zipCode || ''} onChange={(e: any) => onChange(prefix, 'zipCode', e.target.value)} />
    <InputForm label="Country" value={address?.country || ''} onChange={(e: any) => onChange(prefix, 'country', e.target.value)} />
  </div>
);