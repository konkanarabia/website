'use client';

import { useState, useEffect, use } from 'react';
import { updateVehicle } from '@/app/actions/vehicles';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TiptapEditor from '@/components/TiptapEditor';

export default function EditVehicleAdmin({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    details: '',
    availabilityNotes: '',
    enquiryLink: '/enquiry/vehicle',
    listIcon: 'Globe',
    listColor: 'bg-blue-50 text-blue-600',
    isCustomLink: false,
    customLinkUrl: ''
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  
  const [lists, setLists] = useState({
    features: ['']
  });
  
  const [whyChooseUs, setWhyChooseUs] = useState([{ iconType: 'Sparkles', title: '', description: '' }]);
  const [pricing, setPricing] = useState([{ type: '', price: '' }]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/vehicles/${id}`);
        const data = await response.json();
        
        if (data.success && data.vehicle) {
          const s = data.vehicle;
          setFormData({
            name: s.name || '',
            description: s.description || '',
            details: s.details || '',
            availabilityNotes: s.availabilityNotes || '',
            enquiryLink: s.enquiryLink || '/enquiry/vehicle',
            listIcon: s.listIcon || 'Globe',
            listColor: s.listColor || 'bg-blue-50 text-blue-600',
            isCustomLink: s.isCustomLink || false,
            customLinkUrl: s.customLinkUrl || ''
          });
          setLists({
            features: s.features?.length ? s.features : [''],
          });
          setWhyChooseUs(s.whyChooseUs?.length ? s.whyChooseUs : [{ iconType: 'Sparkles', title: '', description: '' }]);
          setPricing(s.pricing?.length ? s.pricing : [{ type: '', price: '' }]);
          setCurrentImageUrl(s.image);
        } else {
          toast.error('Vehicle not found');
          router.push('/admin?tab=vehicles');
        }
      } catch (error) {
        toast.error('Failed to load vehicle data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id, router]);

  const handleListChange = (type: 'features', index: number, value: string) => {
    const newLists = { ...lists };
    newLists[type][index] = value;
    setLists(newLists);
  };
  
  const addListItem = (type: 'features') => {
    const newLists = { ...lists };
    newLists[type].push('');
    setLists(newLists);
  };
  
  const removeListItem = (type: 'features', index: number) => {
    const newLists = { ...lists };
    newLists[type] = newLists[type].filter((_, i) => i !== index);
    setLists(newLists);
  };

  const handleSave = async () => {
    if (!formData.name) return toast.error('Vehicle Name is required');
    if (!formData.description) return toast.error('Description is required');
    if (!formData.isCustomLink && !formData.details) return toast.error('Details is required for non-custom links');
    
    setIsSaving(true);
    try {
      const fd = new FormData();
      if (image && !formData.isCustomLink) {
        fd.append('image', image);
      }
      
      const payload = {
        ...formData,
        features: lists.features.filter(Boolean),
        whyChooseUs: whyChooseUs.filter(w => w.title && w.description),
        pricing: pricing.filter(p => p.type && p.price),
      };
      
      fd.append('payload', JSON.stringify(payload));
      
      const result = await updateVehicle(id, fd);
      
      if (result.success) {
        toast.success('Vehicle updated successfully!');
        router.push('/admin?tab=vehicles');
      } else {
        toast.error(result.error || 'Failed to update');
      }
    } catch (e: any) {
      toast.error('Error updating: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:my-10 bg-white rounded-xl shadow-lg border border-gray-100 font-sans">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin?tab=vehicles" className="text-gray-500 hover:text-gray-800 flex items-center gap-2 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Vehicles
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Vehicle</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Description <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">List Icon</label>
              <select 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.listIcon}
                onChange={(e) => setFormData({...formData, listIcon: e.target.value})}
              >
                <option value="Globe">Globe</option>
                <option value="Car">Car</option>
                <option value="Plane">Plane</option>
                <option value="HeartHandshake">Handshake</option>
                <option value="Utensils">Utensils</option>
                <option value="Sparkles">Sparkles</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">List Color (Tailwind classes)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.listColor}
                onChange={(e) => setFormData({...formData, listColor: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <input 
              type="checkbox" 
              id="isCustomLink" 
              className="w-5 h-5"
              checked={formData.isCustomLink}
              onChange={(e) => setFormData({...formData, isCustomLink: e.target.checked})}
            />
            <label htmlFor="isCustomLink" className="font-semibold text-gray-700">Is this a Custom External Link?</label>
          </div>

          {formData.isCustomLink && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom Link URL <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.customLinkUrl}
                onChange={(e) => setFormData({...formData, customLinkUrl: e.target.value})}
              />
            </div>
          )}

          {!formData.isCustomLink && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cover Image</label>
              {currentImageUrl && currentImageUrl !== '/placeholder.svg' && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 mb-3 shadow-sm">
                  <img src={currentImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input 
                id="image-upload"
                type="file" 
                accept="image/*"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>
          )}
        </div>
        
        {!formData.isCustomLink && (
          <div className="flex flex-col">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Detailed Description (Rich Text) <span className="text-red-500">*</span></label>
            <TiptapEditor 
              content={formData.details} 
              onChange={(val) => setFormData({...formData, details: val})}
            />
          </div>
        )}
      </div>
      
      {!formData.isCustomLink && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="border border-gray-200 p-5 rounded-xl bg-gray-50/50">
              <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Features</h3>
              <div className="space-y-3">
                {lists.features.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                      placeholder="Add Feature"
                      value={item}
                      onChange={(e) => handleListChange('features', idx, e.target.value)}
                    />
                    <button 
                      onClick={() => removeListItem('features', idx)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => addListItem('features')}
                className="mt-4 text-sm text-blue-600 font-semibold flex items-center hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-md"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Feature
              </button>
            </div>

            <div className="border border-gray-200 p-5 rounded-xl bg-gray-50/50">
              <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Pricing Packages</h3>
              <div className="space-y-3">
                {pricing.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-white p-2 rounded border border-gray-200 shadow-sm">
                    <input 
                      type="text" 
                      className="w-1/2 px-3 py-2 rounded border border-gray-300 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="Type (e.g. Economy)"
                      value={item.type}
                      onChange={(e) => {
                        const newPricing = [...pricing];
                        newPricing[idx].type = e.target.value;
                        setPricing(newPricing);
                      }}
                    />
                    <input 
                      type="text" 
                      className="w-1/2 px-3 py-2 rounded border border-gray-300 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="Price (e.g. ₹5,000/day)"
                      value={item.price}
                      onChange={(e) => {
                        const newPricing = [...pricing];
                        newPricing[idx].price = e.target.value;
                        setPricing(newPricing);
                      }}
                    />
                    <button 
                      onClick={() => setPricing(pricing.filter((_, i) => i !== idx))}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setPricing([...pricing, { type: '', price: '' }])}
                className="mt-4 text-sm text-blue-600 font-semibold flex items-center hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-md"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Pricing
              </button>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Why Choose Us</h3>
            <div className="space-y-4">
              {whyChooseUs.map((item, idx) => (
                <div key={idx} className="border border-gray-200 p-4 rounded bg-gray-5 flex flex-col md:flex-row gap-4 shadow-sm relative">
                  <button 
                    onClick={() => setWhyChooseUs(whyChooseUs.filter((_, i) => i !== idx))}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="w-full md:w-1/4">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Icon Type</label>
                    <select 
                      className="w-full px-3 py-2 rounded border border-gray-300 text-sm outline-none bg-white"
                      value={item.iconType}
                      onChange={(e) => {
                        const newWhy = [...whyChooseUs];
                        newWhy[idx].iconType = e.target.value;
                        setWhyChooseUs(newWhy);
                      }}
                    >
                      <option value="ShieldCheck">Shield Check</option>
                      <option value="Clock">Clock</option>
                      <option value="Sparkles">Sparkles</option>
                      <option value="Shield">Shield</option>
                    </select>
                  </div>
                  <div className="w-full md:w-1/4">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Title</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 rounded border border-gray-300 text-sm outline-none bg-white"
                      placeholder="e.g. 24/7 Support"
                      value={item.title}
                      onChange={(e) => {
                        const newWhy = [...whyChooseUs];
                        newWhy[idx].title = e.target.value;
                        setWhyChooseUs(newWhy);
                      }}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Description</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 rounded border border-gray-300 text-sm outline-none bg-white"
                      placeholder="Detailed explanation..."
                      value={item.description}
                      onChange={(e) => {
                        const newWhy = [...whyChooseUs];
                        newWhy[idx].description = e.target.value;
                        setWhyChooseUs(newWhy);
                      }}
                    />
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setWhyChooseUs([...whyChooseUs, { iconType: 'Shield', title: '', description: '' }])}
                className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl font-semibold text-gray-500 hover:text-blue-600 flex items-center justify-center transition-colors bg-gray-50 hover:bg-blue-50"
              >
                <Plus className="w-5 h-5 mr-2" /> Add Reason
              </button>
            </div>
          </div>
        </>
      )}
      
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold flex items-center shadow-lg transition-all"
        >
          {isSaving && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
          Update Vehicle
        </button>
      </div>
    </div>
  );
}
