import { InputProps } from "@/type";

export const InputForm = ({ label, error, ...props }: InputProps) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);