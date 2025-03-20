"use client";

import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import BeExpo from "../app/assets/BeExpo.png";
import Hero from "../app/assets/Hero.png";
import logo from "../app/assets/logo.png";
import whats1 from './assets/whats1.png';
import whats2 from './assets/whats2.png';
import whats3 from './assets/whats3.png';
import whats4 from './assets/whats4.png';

interface Exposant {
  name: string;
  role: string;
  image: string;
  instagram?: string;
}

export default function Home() {
  const exposants: Exposant[] = [
    {
      name: "Atelier Lumière d'Art",
      role: "Artisan Luminaire",
      image:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400",
      instagram: "@atelier.lumiere",
    },
    {
      name: "Impressions Dorées",
      role: "Artisan Imprimeur",
      image:
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=400",
      instagram: "@imp.dorees",
    },
    {
      name: "Atelier de Pierre",
      role: "Sculpteur",
      image:
        "https://images.unsplash.com/photo-1520263115673-610416f52ab6?auto=format&fit=crop&q=80&w=400",
      instagram: "@pierre.sculpt",
    },
    {
      name: "Studio Textile",
      role: "Créateur Textile",
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=400",
      instagram: "@studio.textile",
    },
    {
      name: "L'Atelier du Bois",
      role: "Ébéniste",
      image:
        "https://images.unsplash.com/photo-1611046243477-d95c8d8b1f1e?auto=format&fit=crop&q=80&w=400",
      instagram: "@atelier.bois",
    },
  ];

  return (
      <div className="min-h-screen bg-slate-50">
          
      <div className="relative h-[500px] bg-cover bg-center">
        <Image
          src={Hero}
          alt="Neuilly-sur-Seine Logo"
          className="w-full h-full object-cover " 
        />
        <div className="absolute top-15 left-45 bg-white w-36 h-36 flex items-center justify-center">
          <span className="text-sm text-slate-200">logo</span>
        </div>

        <div className="absolute top-0 left-0 right-0 flex justify-center pt-6">
          <nav className="flex space-x-8">
            <a href="#" className="text-white px-4 py-2">
              Accueil
            </a>
            <a href="#" className="text-white px-4 py-2">
              Exposant
            </a>
            <a href="#" className="text-white px-4 py-2">
              Visiteur
            </a>
          </nav>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-6xl font-bold text-center mb-12">
            Salon de créateurs Neuilly
          </h1>
          <p className="text-4xl font-bold text-center mb-8">
            Vous souhaitez exposer vos projets ?
          </p>
          <p className="max-w-2xl text-center text-sm opacity-80 mt-10">
            Le salon des créateurs et artisans de Neuilly-sur-Seine est un événement incontournable qui met en lumière le savoir-faire et la créativité des artisans locaux.
          </p>
        </div>
      </div>

      <div className="bg-[#3e4b86] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white mb-3">
                  Dates et horaires
                </h3>
                <p className="text-white">Du 15 novembre 2025</p>
                <p className="text-white">De 10h00 à 19h00</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-20 bg-slate-300 mx-8"></div>
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white mb-3">
                  Adresse
                </h3>
                <p className="text-white">
                  168 Avenue Charles de Gaulle
                </p>
                <p className="text-white">92200 Neuilly-sur-Seine</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mb-8 mt-15"> 
          <div className="w-full absolute right-10 flex justify-center">
            <div className="w-56 h-56">
              <Image
                src={logo}
                alt="Neuilly-sur-Seine Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="space-y-4 w-full md:w-1/2 mt-15"> 
              <h2 className="text-2xl font-bold text-white mb-6">
                Qu'est ce que cela représente ?
              </h2>
              <p className="text-white leading-relaxed">
                Être exposant au Salon des Créateurs et Objets d'Art de Neuilly-sur-Seine, c'est bien plus qu'une simple participation : c'est incarner l'excellence artisanale, le savoir-faire et la passion pour la création.
              </p>
              <p className="text-white leading-relaxed">
                Ce salon valorise l'authenticité, l'innovation et le partage, offrant aux artistes et artisans un espace où leur talent est reconnu et mis en lumière.
              </p>
              <p className="text-white leading-relaxed">
                C'est une opportunité unique de rencontrer un public sensible à l'art, d'échanger avec d'autres créateurs et de faire rayonner son univers dans un cadre prestigieux et inspirant.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 grid-rows-2 gap-4 mt-15">
              <div className="h-48 overflow-hidden rounded-lg">
                <Image
                  src={whats1}
                  alt="Artisan 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 overflow-hidden rounded-lg">
                <Image
                  src={whats2}
                  alt="Artisan 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 overflow-hidden rounded-lg">
                <Image
                  src={whats3}
                  alt="Artisan 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 overflow-hidden rounded-lg">
                <Image
                  src={whats4}
                  alt="Artisan 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 h-[500px] relative overflow-hidden">
        <div className="absolute inset-0 ">
          <Image
            src={BeExpo}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 mt-20">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-6xl font-bold text-white mb-12 uppercase tracking-wider">
              Je deviens exposant
            </h2>
            <button className="bg-amber-100 h-[50px] hover:bg-amber-200 text-slate-900 px-8 py-2 rounded-md text-sm font-medium transition-all border border-amber-200 shadow-sm">
              <p className="font-bold">Je m'inscris</p>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#3e4b86] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-medium text-white mb-12 text-center">
            Nos exposants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {exposants.map((exposant, index) => (
              <div key={index} className="rounded-lg overflow-hidden h-full">
                <div className="relative h-48">
                  <img
                    src={exposant.image}
                    alt={exposant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-slate-800">
                  <h3 className="text-sm font-medium text-white mb-1">
                    {exposant.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-2">
                    {exposant.role}
                  </p>
                  {exposant.instagram && (
                    <p className="text-xs text-slate-500">
                      {exposant.instagram}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
