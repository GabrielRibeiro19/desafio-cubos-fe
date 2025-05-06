import { forwardRef, InputHTMLAttributes, Ref } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  isMandatory?: boolean
  icon?: string
  width?: 'full' | 'half'
}

function ForwardedInput(
  { label, id, error, isMandatory, width = 'full', icon, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className={`relative flex flex-col gap-2 w-full ${width === 'half' ? 'md:w-1/2' : ''}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-light-text2 dark:text-dark-text2 transition-theme">
          {label} {isMandatory && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className="w-full border-1 border-light-border dark:border-dark-border rounded-sm h-11 px-2 bg-light-input dark:bg-dark-input text-light-text2 dark:text-dark-text2 placeholder:text-light-muted dark:placeholder:text-dark-muted/50 focus:outline-none focus:border-light-primary dark:focus:border-dark-primary transition-theme"
        {...props}
      />
      {icon && <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
        <img src={icon} alt="icon" className="w-6 h-6 invert dark:invert-0" />
      </span>}
      {error && <p className="text-red-500 font-light">{error}</p>}
    </div>
  )
}

export const Input = forwardRef(ForwardedInput)
