import { forwardRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

const Select = forwardRef(
  (
    {
      label,
      error,
      hint,
      options = [],
      placeholder = 'Select an option',
      className = '',
      containerClassName = '',
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const selectId = id || `select-${generatedId}`

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label htmlFor={selectId} className="label-field">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'input-field appearance-none pr-10 cursor-pointer',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-200',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
        )}

        {hint && !error && (
          <p className="mt-1.5 text-sm text-textMuted">{hint}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select