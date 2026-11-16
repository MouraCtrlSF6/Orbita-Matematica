import { type ChangeEventHandler } from 'react';

export interface SettingRowProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function SettingRow({ title, description, checked, onChange }: SettingRowProps) {
  return (
    <label className="setting-row flex items-center justify-between py-[1.0625rem] px-0 [border-top:1px_solid_#eee9f2] gap-5 [&_strong]:text-body [&_strong]:block [&_small]:text-small [&_small]:block [&_small]:text-[#6a5b74] [&_small]:mt-1 [&_input]:w-[1.4375rem] [&_input]:h-[1.4375rem] [&_input]:[accent-color:#8c6db4] [&_input]:shrink-0 [.large-text_&_small]:text-root">
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
}
