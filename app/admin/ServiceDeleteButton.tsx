"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteService } from "@/app/actions/services";
import { toast } from "sonner";

export default function ServiceDeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    setIsDeleting(true);
    const result = await deleteService(id);
    
    if (result.success) {
      toast("Service deleted successfully");
    } else {
      toast("Failed to delete service", { description: result.error });
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 rounded-lg transition-colors ${
        isDeleting 
          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
          : "bg-red-100 text-red-600 hover:bg-red-200"
      }`}
      title="Delete service"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
