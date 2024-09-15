import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// const buttonVariants = cva(
// 	'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
// 	{
// 		variants: {
// 			variant: {
// 				default: 'bg-sky-700 text-white hover:bg-sky-800',
// 				destructive: 'bg-red-500 text-black hover:bg-red-600',
// 				outline:
// 					'border border-gray-300 bg-white hover:bg-gray-200 hover:text-gray-900',
// 				secondary: 'bg-blue-500 text-white hover:bg-blue-400',
// 				ghost: 'hover:bg-gray-100 hover:text-gray-900',
// 				gradient:
// 					'bg-gradient-to-br from-sky-700 to-sky-800 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-2 px-4 rounded-full w-full',
// 				link: 'text-blue-500 underline-offset-4 hover:underline',
// 			},
// 			size: {
// 				default: 'h-12 px-4 rounded-full py-4',
// 				sm: 'px-5 py-3 rounded-lg w-40',
// 				lg: 'h-11 rounded-lg px-8',
// 				icon: 'h-10 w-10',
// 			},
// 		},
// 		defaultVariants: {
// 			variant: 'default',
// 			size: 'default',
// 		},
// 	}
// );

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:opacity-90',
				primary: 'bg-primary text-primary-foreground hover:opacity-90',
				destructive:
					'bg-destructive text-destructive-foreground hover:opacity-90',
				destructiiveOutline:
					'border-2 border-destructive bg-secondary text-destructive hover:opacity-90 dark:bg-secondary-foreground',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:opacity-80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				gradient:
					'bg-gradient-to-br from-sky-700 to-sky-800 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-full w-full',
			},
			size: {
				default: 'h-12 rounded-full px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
