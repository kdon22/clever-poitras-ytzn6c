import React, { useState } from "react";
import { ChevronDown, Plus, Circle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { LinkedItem } from "./types";

interface LinkedSectionProps {
  type: "link" | "blocker";
  visible?: boolean;
}

const LinkedSection = ({ type, visible = false }: LinkedSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showCreator, setShowCreator] = useState(false);
  const [items, setItems] = useState<LinkedItem[]>([]);

  if (!visible) return null;

  const title = type === "link" ? "Linked issues" : "Blocker issues";

  return (
    <div className="space-y-1 border rounded-lg">
      <div className="text-sm border-b">
        <div className="flex items-center px-4 py-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
            <span className="font-medium">{title}</span>
          </button>

          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCreator(true)}
              className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add {type}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && showCreator && (
        <div className="px-4 py-2 bg-gray-50 border-b">
          <Input
            placeholder="Paste link or search..."
            className="w-full"
            autoFocus
          />
        </div>
      )}

      {isOpen && items.length > 0 && (
        <div className="py-2">
          {items.map((item) => (
            <div key={item.id} className="px-4 py-2 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedSection;
