import Image from 'next/image';
import type { ButtonProps } from '@/shared/types/button';

function Button({
  mode = 'primary',
  label,
  icon,
  isActive = false,
  isRounded = false,
  isTransparent = false,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={[
        'cursor-pointer p-1 hover:bg-gray-400',
        'button',
        `${isActive ? 'bg-indigo-500' : ''}`,
        `${isRounded ? 'rounded-md' : ''}`,
        `${isTransparent ? '' : 'bg-green-600/60 hover:bg-green-600/80'}`,
        `${mode === 'danger' ? 'hover:bg-red-400' : ''}`,
      ].join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {label && <span>{label}</span>}
      {icon && <Image src={icon.src} alt={icon.alt} width={25} height={25} />}
    </button>
  );
}

export { Button };
