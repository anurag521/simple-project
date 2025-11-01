
"use client"
import { Address, User, UserFormProps } from '@/type';
import { useState, FormEvent } from 'react';
import { InputForm } from './add-uset-input';
import { CheckboxForm } from './add-user-checkbox';
import { AddressFields } from './add-user-address';

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<User>(user || { email: '', isActive: true, isAdmin: false });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

  const handleAddressChange = (addressType: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [addressType]: { ...(prev[addressType as keyof User] as Address), [field]: value }
    }));
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!formData.email) newErrors.email = 'Email is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{user?._id ? 'Edit User' : 'Create User'}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <InputForm label="Name" value={formData.name || ''} onChange={(e: any) => handleChange('name', e.target.value)} />
        <InputForm label="Email*" type="email" value={formData.email} onChange={(e: any) => handleChange('email', e.target.value)} error={errors.email} />
        <InputForm label="Phone" type="tel" value={formData.phone || ''} onChange={(e: any) => handleChange('phone', e.target.value)} />
        <InputForm label="College Name" value={formData.collegeName || ''} onChange={(e: any) => handleChange('collegeName', e.target.value)} />
      </div>

      <div className="flex gap-6">
        <CheckboxForm label="Active" checked={formData.isActive} onChange={(e: any) => handleChange('isActive', e.target.checked)} />
        <CheckboxForm label="Admin" checked={formData.isAdmin} onChange={(e: any) => handleChange('isAdmin', e.target.checked)} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Address</h3>
        <AddressFields prefix="address" address={formData.address || {}} onChange={handleAddressChange} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">College Address</h3>
        <AddressFields prefix="collegeAddress" address={formData.collegeAddress || {}} onChange={handleAddressChange} />
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
          {isSubmitting ? 'Saving...' : user?._id ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}