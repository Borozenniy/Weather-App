import type { StaticImageData } from 'next/image';

type ButtonProps = {
  mode?: 'primary' | 'danger';
  label?: string;
  icon?: ButtonImageProps;
  isActive?: boolean;
  isRounded?: boolean;
  isTransparent?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (e: any) => void;
  disabled?: boolean;
};

type ButtonImageProps = {
  src: StaticImageData;
  alt: string;
};

export type { ButtonProps };
