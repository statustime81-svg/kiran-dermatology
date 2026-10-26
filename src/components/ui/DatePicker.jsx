import { forwardRef, useId } from 'react'
import { Calendar } from 'lucide-react'
import { cn } from '../../utils/cn'

const DatePicker = forwardRef(
  (
    {
      label,
      error,
      hint,
      className = '',
      containerClassName = '',
      required = false,
      id,
      min,
      max,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || `date-${generatedId}`

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="label-field">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="date"
            min={min}
            max={max}
            className={cn(
              'input-field pr-11 cursor-pointer',
              '[&::-webkit-calendar-picker-indicator]:opacity-0',
              '[&::-webkit-calendar-picker-indicator]:absolute',
              '[&::-webkit-calendar-picker-indicator]:inset-0',
              '[&::-webkit-calendar-picker-indicator]:w-full',
              '[&::-webkit-calendar-picker-indicator]:h-full',
              '[&::-webkit-calendar-picker-indicator]:cursor-pointer',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-200',
              className
            )}
            {...props}
          />

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none">
            <Calendar className="w-5 h-5" />
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

DatePicker.displayName = 'DatePicker'

export default DatePicker