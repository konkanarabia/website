"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteVisa } from "@/app/actions/visas";
import { toast } from "sonner";

export default function VisaDeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this visa?")) return;
    
    setIsDeleting(true);
    const result = await deleteVisa(id);
    
    if (result.success) {
      toast("Visa deleted successfully");
    } else {
      toast("Failed to delete visa", { description: result.error });
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
      title="Delete visa"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
