'use client';

import { useState } from 'react';
import { generateDestinationData, enhanceText, generateImageUrl } from '@/app/actions/gemini';
import { addDestination } from '@/app/actions/destinations';
import { toast } from 'sonner';
import { Loader2, Wand2, Plus, Trash2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

export default function NewDestinationAdmin() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [aiImageUrl, setAiImageUrl] = useState<string | null>(null);
  
  // Track individual enhancing state
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    bestTime: '',
    details: '',
    type: 'International' as 'Domestic' | 'International',
  });
  
  const [image, setImage] = useState<File | null>(null);
  
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
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      toast.success('Successfully generated majestic cover image!');
    } else if (!result.success) {
      toast.error('Failed to generate image: ' + result.error);
    } else {
      toast.error('Failed to generate image.');
    }
  };
  
  const [lists, setLists] = useState({
    highlights: [''],
    inclusions: [''],
    exclusions: [''],
    availableDates: [] as Date[],
    blackoutDates: [] as Date[],
  });
  
  const [itinerary, setItinerary] = useState([{ day: '1', title: '', description: '' }]);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error('Please enter a prompt for Gemini AI');
      return;
    }
    
    setIsGenerating(true);
    const result = await generateDestinationData(prompt);
    setIsGenerating(false);
    
    if (result.success && result.data) {
      setFormData({
        ...formData,
        name: formData.name || prompt,
        description: result.data.description || '',
        duration: result.data.duration || '',
        bestTime: result.data.bestTime || '',
        details: result.data.details || '',
        type: result.data.type || 'International',
      });
      setLists({
        highlights: result.data.highlights || [''],
        inclusions: result.data.inclusions || [''],
        exclusions: result.data.exclusions || [''],
      });
      setItinerary(result.data.itinerary || [{ day: '1', title: '', description: '' }]);
      toast.success('Generated data with Gemini AI!');
    } else {
      toast.error(result.error || 'Failed to generate data');
    }
  };

  const handleEnhance = async (field: 'description' | 'details') => {
    const textToEnhance = formData[field];
    if (!textToEnhance.trim()) {
      toast.error('Nothing to enhance. Please write something first.');
      return;
    }

    setIsEnhancing(field);
    const result = await enhanceText(textToEnhance);
    setIsEnhancing(null);

    if (result.success) {
      setFormData(prev => ({ ...prev, [field]: result.text }));
      toast.success('Text enhanced successfully!');
    } else {
      toast.error('Failed to enhance: ' + result.error);
    }
  };

  const handleListChange = (type: 'highlights' | 'inclusions' | 'exclusions', index: number, value: string) => {
    const newLists = { ...lists };
    newLists[type][index] = value;
    setLists(newLists);
  };
  
  const addListItem = (type: 'highlights' | 'inclusions' | 'exclusions') => {
    const newLists = { ...lists };
    newLists[type].push('');
    setLists(newLists);
  };
  
  const removeListItem = (type: 'highlights' | 'inclusions' | 'exclusions', index: number) => {
    const newLists = { ...lists };
    newLists[type] = newLists[type].filter((_, i) => i !== index);
    setLists(newLists);
  };

  const handleSave = async () => {
    if (!formData.name) return toast.error('Destination Name is required');
    if (!formData.description) return toast.error('Description is required');
    if (!formData.duration) return toast.error('Duration is required');
    if (!formData.bestTime) return toast.error('Best Time is required');
    if (!formData.details) return toast.error('Details is required');
    if (!image && !aiImageUrl) return toast.error('Image is required (Upload or Generate one)');
    
    setIsSaving(true);
    try {
      const fd = new FormData();
      if (image) {
        fd.append('image', image);
      }
      
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
      
      const result = await addDestination(fd);
      
      if (result.success) {
        toast.success('Destination saved successfully! ID: ' + result.id);
        
        setFormData({ name: '', description: '', duration: '', bestTime: '', details: '' });
        setPrompt('');
        setImage(null);
        setAiImageUrl(null);
        setLists({ 
            highlights: [''], 
            inclusions: [''], 
            exclusions: [''],
            availableDates: [],
            blackoutDates: []
        });
        setItinerary([{ day: '1', title: '', description: '' }]);
        
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        toast.error(result.error || 'Failed to save');
      }
    } catch (e: any) {
      toast.error('Error saving: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:my-10 bg-white rounded-xl shadow-lg border border-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Destination</h1>
      
      <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <Wand2 className="w-5 h-5 mr-2 text-blue-600" />
          Auto-Generate with Gemini AI
        </h2>
        <div className="flex gap-4 flex-col sm:flex-row">
          <input 
            type="text" 
            placeholder="e.g. A 5-day romantic trip to Paris" 
            className="flex-1 px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors disabled:opacity-70 shadow-sm"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Wand2 className="w-5 h-5 mr-2" />}
            {isGenerating ? 'Generating...' : 'Generate Magic'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Paris - City of Love"
            />
          </div>
          <div className="relative">
            <div className="flex justify-between items-center mb-1.5">
               <label className="block text-sm font-semibold text-gray-700">Short Description <span className="text-red-500">*</span></label>
               <button type="button" onClick={() => handleEnhance('description')} className="text-xs text-blue-600 font-bold flex items-center hover:text-blue-800 transition-colors">
                 {isEnhancing === 'description' ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />} 
                 Enhance
               </button>
            </div>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow pr-20"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="e.g. A romantic getaway"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="e.g. 5N/6D"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Best Time <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Oct-Mar"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                value={formData.bestTime}
                onChange={(e) => setFormData({...formData, bestTime: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type <span className="text-red-500">*</span></label>
              <select 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-white font-medium"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              >
                <option value="International">International</option>
                <option value="Domestic">Domestic</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
               <label className="block text-sm font-semibold text-gray-700">Cover Image <span className="text-red-500">*</span></label>
               <button type="button" onClick={handleGenerateImage} disabled={isGeneratingImage} className="text-xs text-blue-600 font-bold flex items-center hover:text-blue-800 transition-colors disabled:opacity-50">
                 {isGeneratingImage ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                 {isGeneratingImage ? 'Generating AI Image...' : 'Generate 4K AI Image'}
               </button>
            </div>
            
            {aiImageUrl ? (
               <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-300 group shadow-sm">
                 <img src={aiImageUrl} alt="Generated Cover" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button type="button" onClick={() => setAiImageUrl(null)} className="text-white text-sm font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm hover:bg-black/80 transition-colors">Discard Image</button>
                 </div>
               </div>
            ) : (
              <input 
                id="image-upload"
                type="file" 
                accept="image/*"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                onChange={(e) => { 
                  setImage(e.target.files ? e.target.files[0] : null); 
                  setAiImageUrl(null); 
                }}
              />
            )}
            <p className="text-xs text-gray-500 mt-2 font-medium">Upload a file from your computer OR let AI generate one instantly!</p>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1.5">
             <label className="block text-sm font-semibold text-gray-700">Detailed Description (Rich Text) <span className="text-red-500">*</span></label>
             <button type="button" onClick={() => handleEnhance('details')} className="text-xs text-blue-600 font-bold flex items-center hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1 rounded-full">
               {isEnhancing === 'details' ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
               Enhance Magic
             </button>
          </div>
          <TiptapEditor 
            content={formData.details} 
            onChange={(val) => setFormData({...formData, details: val})}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {(['highlights', 'inclusions', 'exclusions'] as const).map(type => (
          <div key={type} className="border border-gray-200 p-5 rounded-xl bg-gray-50/50">
            <h3 className="font-bold text-gray-800 capitalize mb-4 pb-2 border-b border-gray-200">{type}</h3>
            <div className="space-y-3">
              {lists[type].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                    placeholder={`Add ${type.slice(0, -1)}`}
                    value={item}
                    onChange={(e) => handleListChange(type, idx, e.target.value)}
                  />
                  <button 
                    onClick={() => removeListItem(type, idx)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => addListItem(type)}
              className="mt-4 text-sm text-blue-600 font-semibold flex items-center hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-md"
            >
              <Plus className="w-4 h-4 mr-1" /> Add {type.slice(0, -1)}
            </button>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-green-50/30 p-6 rounded-xl border border-green-100 flex flex-col items-center">
          <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Set Available Tour Dates
          </h3>
          <DayPicker
            mode="multiple"
            selected={lists.availableDates}
            disabled={{ before: new Date() }}
            onSelect={(days) => setLists({ ...lists, availableDates: days || [] })}
            className="bg-white rounded-lg p-2 shadow-sm border border-green-100"
          />
          <p className="text-[10px] text-green-600 mt-2 font-bold uppercase tracking-widest">
            {lists.availableDates.length} Dates Selected
          </p>
        </div>

        <div className="bg-red-50/30 p-6 rounded-xl border border-red-100 flex flex-col items-center">
          <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            Set Blackout Dates
          </h3>
          <DayPicker
            mode="multiple"
            selected={lists.blackoutDates}
            disabled={{ before: new Date() }}
            onSelect={(days) => setLists({ ...lists, blackoutDates: days || [] })}
            className="bg-white rounded-lg p-2 shadow-sm border border-red-100"
          />
          <p className="text-[10px] text-red-600 mt-2 font-bold uppercase tracking-widest">
            {lists.blackoutDates.length} Blackout Dates
          </p>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between border-b border-gray-200 mb-6 pb-2">
          <h3 className="text-xl font-bold text-gray-800">Trip Itinerary</h3>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{itinerary.length} Days</span>
        </div>
        
        <div className="space-y-5">
          {itinerary.map((day, idx) => (
            <div key={idx} className="p-5 border border-gray-200 rounded-xl relative bg-white shadow-sm hover:shadow-md transition-shadow">
              <button 
                onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-red-50 rounded-full p-2 transition-colors"
                title="Remove Day"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4 md:pr-12">
                <div className="w-full sm:w-24">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Day</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    value={day.day}
                    onChange={(e) => {
                      const newItin = [...itinerary];
                      newItin[idx].day = e.target.value;
                      setItinerary(newItin);
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Activity Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Arrival & City Tour"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    value={day.title}
                    onChange={(e) => {
                      const newItin = [...itinerary];
                      newItin[idx].title = e.target.value;
                      setItinerary(newItin);
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Detailed Description</label>
                <textarea 
                  placeholder="Describe the day's activities in detail..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 h-28 focus:ring-2 focus:ring-blue-500 outline-none resize-y text-gray-700"
                  value={day.description}
                  onChange={(e) => {
                    const newItin = [...itinerary];
                    newItin[idx].description = e.target.value;
                    setItinerary(newItin);
                  }}
                />
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => setItinerary([...itinerary, { day: String(itinerary.length + 1), title: '', description: '' }])}
            className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl font-semibold text-gray-500 hover:text-blue-600 flex items-center justify-center transition-colors bg-gray-50 hover:bg-blue-50"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Next Day
          </button>
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t font-sans border-gray-200">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-lg font-bold flex items-center text-lg transition-all shadow-md hover:shadow-xl disabled:opacity-70 disabled:hover:shadow-md transform hover:-translate-y-0.5"
        >
          {isSaving ? <Loader2 className="w-6 h-6 mr-2 animate-spin" /> : null}
          {isSaving ? 'Saving Destination...' : 'Save & Publish Destination'}
        </button>
      </div>
    </div>
  );
}
