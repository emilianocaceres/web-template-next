import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconLoader2 } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline:
                    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

interface ButtonPropsBase
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

type ButtonProps = ButtonPropsBase &
    (
        | { asChild: true }
        | {
              asChild?: false;
              loading?: boolean;
              leftSection?: JSX.Element;
              rightSection?: JSX.Element;
          }
    );

const CButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        if (props.asChild) {
            return (
                <Slot
                    ref={ref}
                    className={cn(buttonVariants({ variant, size, className }))}
                    {...props}
                >
                    {children}
                </Slot>
            );
        }

        const { loading = false, leftSection, rightSection, disabled, ...otherProps } = props;

        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={loading || disabled}
                type={'button'}
                {...otherProps}
            >
                {(leftSection && loading) || (!leftSection && !rightSection && loading) ? (
                    <IconLoader2 className={'mr-2 h-4 w-4 animate-spin'} />
                ) : null}
                {!loading && leftSection ? <div className={'mr-2'}>{leftSection}</div> : null}
                {children}
                {!loading && rightSection ? <div className={'ml-2'}>{rightSection}</div> : null}
                {rightSection && loading ? (
                    <IconLoader2 className={'ml-2 h-4 w-4 animate-spin'} />
                ) : null}
            </button>
        );
    },
);

CButton.displayName = 'Button';

export { CButton, buttonVariants };
