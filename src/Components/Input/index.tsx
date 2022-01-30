import { Field } from "@shopify/react-form";

const Input: React.FC<{
  field: Field<string>;
  placeholder?: string;
  disabled?: boolean;
}> = ({ field, placeholder, disabled = false }) => (
  <>
    <input
      className={`w-full rounded-xl bg-slate-100 p-3 text-xl ${
        field.error && "bg-pink-200 text-pink-700 placeholder-pink-300"
      } ${disabled && "opacity-30"}`}
      disabled={disabled}
      placeholder={placeholder}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
    {field.error && (
      <div className="text-sm mt-2 text-red-500 inset-x-0">{field.error}</div>
    )}
  </>
);

export default Input;
