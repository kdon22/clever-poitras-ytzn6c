import React from "react";
import { Circle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

interface SubtaskCreatorProps {
  onCancel: () => void;
  onCreate: (title: string) => void;
}

const SubtaskCreator = ({ onCancel, onCreate }: SubtaskCreatorProps) => {
  return (
    <div className="px-4 py-2 bg-gray-50 border rounded-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Circle className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Subtask title"
          className="flex-1 bg-transparent border-0 text-sm focus:ring-0 px-0"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              onCreate(e.currentTarget.value.trim());
            }
          }}
        />
      </div>
      <div className="flex items-center space-x-2 justify-end">
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => {
            const input = document.querySelector("input");
            if (input && input.value.trim()) {
              onCreate(input.value.trim());
            }
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default SubtaskCreator;
