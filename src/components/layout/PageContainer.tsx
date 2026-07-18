import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padded?: boolean;
}

const maxWidthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export function PageContainer({
  children,
  className,
  maxWidth = '2xl',
  padded = true,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'flex-1 overflow-y-auto',
        padded && 'p-4 md:p-6',
        className
      )}
    >
      <div className={cn('mx-auto w-full', maxWidthMap[maxWidth])}>
        {children}
      </div>
    </main>
  );
}
