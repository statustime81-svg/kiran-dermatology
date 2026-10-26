import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

const Textarea = forwardRef(
  (
    {
      label,
      error,
      hint,
      className = '',
      containerClassName = '',
      rows = 4,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const textareaId = id || `textarea-${generatedId}`

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label htmlFor={textareaId} className="label-field">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'input-field resize-y min-h-[100px]',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-200',
            className
          )}
          {...props}
        />

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

Textarea.displayName = 'Textarea'

export default Textarea