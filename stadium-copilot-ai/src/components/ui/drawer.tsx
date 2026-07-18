import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Drawer = DialogPrimitive.Root;
const DrawerTrigger = DialogPrimitive.Trigger;
const DrawerClose = DialogPrimitive.Close;
const DrawerPortal = DialogPrimitive.Portal;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = 'DrawerOverlay';

interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, side = 'right', size = 'md', ...props }, ref) => {
  const sizeMap = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };
  const sideStyles = {
    right: 'right-0 h-full data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
    left: 'left-0 h-full data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  };
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed top-0 z-50 flex h-full flex-col bg-[rgb(var(--card))] border-[rgb(var(--border))] shadow-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out',
          sideStyles[side],
          sizeMap[size],
          side === 'right' ? 'border-l' : 'border-r',
          'w-full',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-[rgb(var(--border))] px-5 py-4">
          <div className="flex-1" />
          <DrawerClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </DialogPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = 'DrawerContent';

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent };
