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
        <label htmlFor={id} className="text-sm font-medium text-[#EEEEF0]">
          {label} {isMandatory && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className="w-full border-1 border-[#3C393F] rounded-sm h-11 px-2 bg-[#1A191B] text-[#EEEEF0] placeholder:text-[#F1E6FD30] focus:outline-none focus:border-[#8E4EC6] transition-all duration-200"
        {...props}
      />
      {icon && <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
        <img src={icon} alt="icon" className="w-6 h-6" />
      </span>}
      {error && <p className="text-red-500 font-light">{error}</p>}
    </div>
  )
}

export const Input = forwardRef(ForwardedInput)
