"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, FileText, ChevronLeft, ChevronRight } from "lucide-react";

const certificates = [
  {
    title: "NIDHI Pledge Certificate",
    issuer: "Ministry of Tourism, Government of India",
    pages: ["/certificates/nidhi-pledge.jpg"],
    description: "National Integrated Database of Hospitality Industry commitment towards safe and sustainable tourism.",
  },
  {
    title: "Primary Registration Certificate",
    issuer: "Directorate of Tourism, Government of Maharashtra",
    pages: [
      "/certificates/maharashtra-tourism-registration.jpg",
      "/certificates/disclaimer.jpg",
    ],
    description: "Official registration as a tourism unit under the Maharashtra Tourism Policy for KonkanArabia Hospitality.",
  },
];

export default function CertificateShowcase() {
  return (
    <section className="py-16 md:py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Official Credentials
          </h2>
          <div className="w-20 md:w-24 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            We are fully registered and recognized by national and state tourism authorities, 
            underscoring our commitment to professionalism and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {certificates.map((cert, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="cursor-pointer group flex flex-col">
                  <Card className="flex-1 overflow-hidden border-none shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 rounded-xl md:rounded-2xl">
                    <CardContent className="p-0 relative aspect-[3/4]">
                      <Image
                        src={cert.pages[0]}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                      
                      {cert.pages.length > 1 && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge variant="secondary" className="bg-white/90 text-primary font-bold shadow-sm flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {cert.pages.length} Pages
                          </Badge>
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 text-white">
                          <span className="font-semibold text-base md:text-lg">Click to View Certificate</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-6 md:mt-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-primary font-bold uppercase tracking-wider text-xs md:text-sm mb-3">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] md:max-w-4xl h-[85vh] md:h-auto p-0 bg-transparent border-none">
                <DialogTitle className="sr-only">{cert.title}</DialogTitle>
                <DialogDescription className="sr-only">{cert.description}</DialogDescription>
                <div className="flex flex-col h-full bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden p-2 md:p-6">
                  <div className="flex-1 flex items-center justify-center relative bg-white/5 rounded-xl overflow-hidden">
                    {cert.pages.length > 1 ? (
                      <Carousel className="w-full h-full max-w-2xl flex flex-col items-center justify-center px-8 md:px-12">
                        <CarouselContent>
                          {cert.pages.map((page, pIdx) => (
                            <CarouselItem key={pIdx}>
                              <div className="flex items-center justify-center h-[60vh] md:h-[75vh]">
                                <Image
                                  src={page}
                                  alt={`${cert.title} - Page ${pIdx + 1}`}
                                  width={1000}
                                  height={1400}
                                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                  priority
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-1 md:-left-4 bg-white/10 hover:bg-white/25 text-white border-white/20" />
                        <CarouselNext className="right-1 md:-right-4 bg-white/10 hover:bg-white/25 text-white border-white/20" />
                      </Carousel>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <Image
                          src={cert.pages[0]}
                          alt={cert.title}
                          width={1000}
                          height={1400}
                          className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                          priority
                        />
                      </div>
                    )}
                  </div>
                  <div className="py-4 text-center text-white">
                    <h4 className="text-lg md:text-xl font-bold px-4">{cert.title}</h4>
                    <p className="text-white/70 text-sm">{cert.issuer}</p>
                    {cert.pages.length > 1 && (
                      <p className="mt-2 text-[10px] md:text-xs bg-white/10 inline-block px-3 py-1 rounded-full text-white/60 uppercase tracking-widest font-semibold">
                        Swipe or use arrows to see next page
                      </p>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
