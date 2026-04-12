'use client';
import { useState } from 'react';
import { deleteDestination } from '@/app/actions/destinations';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function DeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    
    setIsDeleting(true);
    const result = await deleteDestination(id);
    setIsDeleting(false);
    
    if (result.success) {
      toast.success('Destination deleted');
    } else {
      toast.error(result.error || 'Failed to delete');
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Destination"
    >
      {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
    </button>
  );
}
