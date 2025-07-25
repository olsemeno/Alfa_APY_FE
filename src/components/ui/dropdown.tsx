import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "pixel-retroui";
import colors from "tailwindcss/colors";
import { useState, useMemo } from "react";
import { Input } from "./input";
import { useTheme } from "../../contexts/ThemeContext";
import clsx from "clsx";

function Item({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center">
      <img className="rounded-[50%] mr-[8px] h-[25px] w-[25px]" src={icon} />
      {label}
    </div>
  );
}

export function Dropdown({
  values,
  value,
  onChange,
}: {
  values: Array<{ icon: string; label: string; value: string }>;
  value: string;
  onChange: (value: string) => unknown;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  const currentItem = values.find((v) => v.value === value);

  const filteredValues = useMemo(() => {
    if (!searchQuery) return values;
    const query = searchQuery.toLowerCase();
    return values.filter(
      (item) => item.label.toLowerCase().includes(query)
    );
  }, [values, searchQuery]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger bg={theme === 'dark' ? '#232136' : colors.amber[50]}>
        <span className={theme === 'dark' ? 'text-green-400' : 'text-black'}>
          <Item icon={currentItem!.icon} label={currentItem!.label} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent bg={theme === 'dark' ? '#232136' : colors.amber[50]} className={`max-h-[300px] overflow-y-scroll ${theme === 'dark' ? 'text-green-400' : ''}`}>
        <div className="p-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tokens..."
            className="w-full"
          />
        </div>
        {filteredValues.map(({ value, label, icon }) => (
          <DropdownMenuItem className={clsx("px-[5px] py-[2.5px]", theme === 'dark' ? 'hover:bg-purple-900' : 'hover:bg-amber-100')} key={value}>
            <div onClick={() => onChange(value)}>
              <Item icon={icon} label={label} />
            </div>
          </DropdownMenuItem>
        ))}
        {filteredValues.length === 0 && (
          <div className="px-4 py-2 text-sm text-gray-500">
            No tokens found
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
