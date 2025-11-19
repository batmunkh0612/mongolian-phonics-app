"use client";

import { Play } from "lucide-react";
import { ReactNode } from "react";

interface MenuButtonProps {
  icon: ReactNode;
  title: string;
  sub: string;
  color: string;
  onClick: () => void;
}

export default function MenuButton({ icon, title, sub, color, onClick }: MenuButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-4 p-5 w-full rounded-3xl text-left transition-all duration-200
        hover:scale-[1.02] active:scale-95 border border-transparent hover:border-gray-100 hover:shadow-md
        ${color}
      `}
    >
      <div className="bg-white p-3 rounded-2xl shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-800 leading-tight">{title}</h3>
        <p className="text-gray-500 text-sm font-medium">{sub}</p>
      </div>
      <div className="bg-white/50 p-2 rounded-full text-gray-400">
        <Play size={16} fill="currentColor" />
      </div>
    </button>
  );
}

