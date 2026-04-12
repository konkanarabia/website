'use client'

import { useState, useEffect, use } from 'react';
import { enhanceText, generateImageUrl } from '@/app/actions/gemini';
import { updateDestination } from '@/app/actions/destinations';
import { toast } from 'sonner';
import { Loader2, Wand2, Plus, Trash2, Sparkles, ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import Link from 'next/link';

export default function EditDestinationAdmin({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [aiImageUrl, setAiImageUrl] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    bestTime: '',
    details: '',
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  
  const [lists, setLists] = useState({
    highlights: [''],
    inclusions: [''],
    exclusions: [''],
    availableDates: [] as Date[],
    blackoutDates: [] as Date[],
  });
  
  const [itinerary, setItinerary] = useState([{ day: '1', title: '', description: '' }]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/destinations/${id}`);
        const data = await response.json();
        
        if (data.success && data.destination) {
          const d = data.destination;
          setFormData({
            name: d.name || '',
            description: d.description || '',
            duration: d.duration || '',
            bestTime: d.bestTime || '',
            details: d.details || '',
          });
          setLists({
            highlights: d.highlights?.length ? d.highlights : [''],
            inclusions: d.inclusions?.length ? d.inclusions : [''],
            exclusions: d.exclusions?.length ? d.exclusions : [''],
            availableDates: d.availableDates ? d.availableDates.map((d: string) => new Date(d)) : [],
            blackoutDates: d.blackoutDates ? d.blackoutDates.map((d: string) => new Date(d)) : [],
          });
          setItinerary(d.itinerary?.length ? d.itinerary : [{ day: '1', title: '', description: '' }]);
          setCurrentImageUrl(d.image);
        } else {
          toast.error('Destination not found');
          router.push('/admin');
        }
      } catch (error) {
        toast.error('Failed to load destination data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id, router]);

  const handleGenerateImage = async () => {
    if (!formData.name) {
      toast.error('Please enter a destination name first');
      return;
    }
    setIsGeneratingImage(true);
    const result = await generateImageUrl(formData.name, formData.description);
    setIsGeneratingImage(false);
    
    if (result.success && result.url) {
      setAiImageUrl(result.url);
      setImage(null);
      toast.success('Generated new AI cover image!');
    } else {
      toast.error('Failed to generate image');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const fd = new FormData();
      if (image) fd.append('image', image);
      
      const payload = {
        ...formData,
        highlights: lists.highlights.filter(Boolean),
        inclusions: lists.inclusions.filter(Boolean),
        exclusions: lists.exclusions.filter(Boolean),
        itinerary: itinerary.filter(i => i.title && i.description),
        availableDates: lists.availableDates,
        blackoutDates: lists.blackoutDates,
        aiImageUrl: aiImageUrl
      };
      
      fd.append('payload', JSON.stringify(payload));
      const result = await updateDestination(id, fd);
      
      if (result.success) {
        toast.success('Destination updated successfully!');
        router.push('/admin');
      } else {
        toast.error('Failed to update');
      }
    } catch (e: any) {
      toast.error('Error: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:my-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin" className="text-gray-500 hover:text-gray-800 flex items-center gap-2 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Destination</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Description</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration</label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Best Time</label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.bestTime}
                onChange={(e) => setFormData({...formData, bestTime: e.target.value})}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
               <label className="block text-sm font-semibold text-gray-700">Image</label>
               <button type="button" onClick={handleGenerateImage} disabled={isGeneratingImage} className="text-xs text-blue-600 font-bold flex items-center gap-1">
                 {isGeneratingImage ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                 Regenerate AI Image
               </button>
            </div>
            {(aiImageUrl || currentImageUrl) && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 mb-3 shadow-sm">
                <img src={aiImageUrl || currentImageUrl || ''} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              className="w-full text-sm"
              onChange={(e) => { setImage(e.target.files ? e.target.files[0] : null); setAiImageUrl(null); }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Detailed Description</label>
          <TiptapEditor 
            content={formData.details} 
            onChange={(val) => setFormData({...formData, details: val})}
          />
        </div>
      </div>

      {/* Date Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-green-50/30 p-6 rounded-xl border border-green-100 flex flex-col items-center">
          <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">Available Dates</h3>
          <DayPicker
            mode="multiple"
            selected={lists.availableDates}
            disabled={{ before: new Date() }}
            onSelect={(days) => setLists({ ...lists, availableDates: days || [] })}
            className="bg-white rounded-lg p-2 shadow-sm"
          />
        </div>
        <div className="bg-red-50/30 p-6 rounded-xl border border-red-100 flex flex-col items-center">
          <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">Blackout Dates</h3>
          <DayPicker
            mode="multiple"
            selected={lists.blackoutDates}
            disabled={{ before: new Date() }}
            onSelect={(days) => setLists({ ...lists, blackoutDates: days || [] })}
            className="bg-white rounded-lg p-2 shadow-sm"
          />
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold flex items-center shadow-lg transition-all"
        >
          {isSaving && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
          Update Destination
        </button>
      </div>
    </div>
  );
}
