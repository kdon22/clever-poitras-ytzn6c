import React, { useState } from "react";
import {
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  Users,
  MoreHorizontal,
  Check,
  Circle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Subtask } from "./types";

interface SubtaskSectionProps {
  subtasks: Subtask[];
  onToggle: (id: string) => void;
  onAdd: () => void;
}

const SubtaskSection = ({ subtasks, onToggle, onAdd }: SubtaskSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showDone, setShowDone] = useState(true);

  const completedCount = subtasks.filter((task) => task.isDone).length;
  const percentDone =
    subtasks.length > 0
      ? Math.round((completedCount / subtasks.length) * 100)
      : 0;
  const visibleTasks = showDone
    ? subtasks
    : subtasks.filter((task) => !task.isDone);

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
            <span className="font-medium">Subtasks</span>
          </button>

          <div className="ml-2 flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {completedCount}/{subtasks.length}
            </span>
            {subtasks.length > 0 && (
              <span className="text-xs text-gray-500">{percentDone}%</span>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {subtasks.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDone(!showDone)}
                className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
              >
                {showDone ? (
                  <>
                    <EyeOff className="w-3 h-3 mr-1" /> Hide done
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3 mr-1" /> Show done
                  </>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdd}
              className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add subtask
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-1">
          {visibleTasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-2 py-1.5 pl-6 pr-4 hover:bg-gray-50"
            >
              <button
                onClick={() => onToggle(task.id)}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${
                    task.isDone
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {task.isDone && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
              <span
                className={`flex-1 text-sm ${
                  task.isDone ? "line-through text-gray-400" : "text-gray-700"
                }`}
              >
                {task.title}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                <Button variant="ghost" size="sm" className="h-6 w-6">
                  <Users className="w-3.5 h-3.5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6">
                  <MoreHorizontal className="w-3.5 h-3.5 text-gray-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubtaskSection;
