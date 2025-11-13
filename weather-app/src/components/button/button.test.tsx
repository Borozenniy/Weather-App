import { render, screen, fireEvent } from '@testing-library/react';
import { StaticImageData } from 'next/image';
import { Button } from './button';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));
const handleClick = jest.fn();

describe('Button component', () => {
  it('renders with label', () => {
    render(<Button label='Click me' onClick={handleClick} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<Button label='Click me' onClick={handleClick} />);
    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled if disabled prop is true', () => {
    render(<Button label='Click me' disabled={true} onClick={handleClick} />);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeDisabled();
  });

  it('renders icon if provided', () => {
    const icon = {
      src: { src: 'icon.png', width: 10, height: 10 } as StaticImageData,
      alt: 'icon',
    };
    render(<Button label='With icon' icon={icon} onClick={handleClick} />);
    expect(screen.getByAltText('icon')).toBeInTheDocument();
  });

  it('applies active, rounded, transparent, and danger classes correctly', () => {
    const { container } = render(
      <Button
        label='Styled'
        isActive
        isRounded
        isTransparent={false}
        mode='danger'
        onClick={() => console.log('111')}
      />
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-indigo-500');
    expect(button).toHaveClass('rounded-md');
    expect(button).toHaveClass('bg-green-600/60');
    expect(button).toHaveClass('hover:bg-red-400');
  });
});
