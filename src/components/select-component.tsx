'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';

type SelectComponentProps = {
  placeholder?: string;
  label: string;
  items: string[];
  registerName: string;
};

export function SelectComponent({ placeholder, label, items, registerName }: SelectComponentProps) {
  const methods = useFormContext();
  const { register } = methods;
  return (
    <Select>
      <SelectTrigger className='w-full'>
        <SelectValue
          placeholder={placeholder}
          {...register(registerName)}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item) => (
            <SelectItem
              key={item}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
