import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(
  (
    {
      label,
      error,
      hint,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = '',
      containerClassName = '',
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || `input-${generatedId}`

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="label-field">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none">
              <LeftIcon className="w-5 h-5" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input-field',
              LeftIcon && 'pl-11',
              RightIcon && 'pr-11',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-200',
              className
            )}
            {...props}
          />

          {RightIcon && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textMuted">
              <RightIcon className="w-5 h-5" />
            </div>
          )}
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

Input.displayName = 'Input'

export default Input