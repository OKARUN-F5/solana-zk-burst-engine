
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLink?: string;
  actionText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLink,
  actionText
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6 animate-float">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">{description}</p>
      
      {actionLink && actionText && (
        <Button asChild>
          <Link to={actionLink}>{actionText}</Link>
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
