import { CheckboxProp } from "@/type";

export const CheckboxForm = ({ label, checked, onChange }: CheckboxProp) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </label>
);