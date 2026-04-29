import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function MemoriesSearch({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="mt-8 max-w-md mx-auto relative">
      
      {/* icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* input */}
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          pl-12 pr-4 py-6 text-base rounded-full
          bg-background/80 backdrop-blur-sm
          border border-border
          focus:border-primary transition
        "
      />
      
    </div>
  )
}
