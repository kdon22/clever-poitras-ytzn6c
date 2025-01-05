import React, { useState } from "react";
import { Bell, Circle, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import SubtaskCreator from "./SubtaskCreator";
import SubtaskSection from "./SubtaskSection";
import LinkedSection from "./LinkedSection";
import { Subtask } from "./types";

const IssueView = () => {
  const [activeTab, setActiveTab] = useState("comments");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [showSubtaskCreator, setShowSubtaskCreator] = useState(false);
  const [showLinkedSection, setShowLinkedSection] = useState(false);
  const [showBlockerSection, setShowBlockerSection] = useState(false);

  const handleAddSubtask = (title: string) => {
    const newTask = { id: `task-${Date.now()}`, title, isDone: false };
    setSubtasks((prev) => [...prev, newTask]);
    setShowSubtaskCreator(false);
  };

  const toggleSubtask = (id: string) => {
    setSubtasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Circle className="w-5 h-5 text-gray-400" />
          <h1 className="text-xl font-medium">Issue Title</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Subscribe
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <div className="flex-1 p-6 space-y-6 border-r">
          {/* Description */}
          <div className="text-gray-700 pb-4 border-b">
            This is the issue description...
          </div>

          {/* Initial Action Buttons */}
          {subtasks.length === 0 && !showSubtaskCreator && (
            <div className="flex gap-2 py-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSubtaskCreator(true)}
                className="text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Subtask
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLinkedSection(true)}
                className="text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Link
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBlockerSection(true)}
                className="text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Blocker
              </Button>
            </div>
          )}

          {/* Sections */}
          <div className="space-y-4">
            {showSubtaskCreator && subtasks.length === 0 ? (
              <SubtaskCreator
                onCancel={() => setShowSubtaskCreator(false)}
                onCreate={handleAddSubtask}
              />
            ) : (
              subtasks.length > 0 && (
                <SubtaskSection
                  subtasks={subtasks}
                  onToggle={toggleSubtask}
                  onAdd={() => setShowSubtaskCreator(true)}
                />
              )
            )}

            {subtasks.length > 0 && (
              <div className="flex gap-2 py-2">
                {!showLinkedSection && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLinkedSection(true)}
                    className="text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Link
                  </Button>
                )}
                {!showBlockerSection && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBlockerSection(true)}
                    className="text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Blocker
                  </Button>
                )}
              </div>
            )}

            <LinkedSection type="link" visible={showLinkedSection} />
            <LinkedSection type="blocker" visible={showBlockerSection} />
          </div>

          {/* Tabs */}
          <div className="border-b mt-8">
            <div className="flex space-x-4">
              {["All", "Comments", "Activity", "Time Tracking"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 text-sm ${
                    activeTab === tab.toLowerCase()
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="pt-4">
            {activeTab === "comments" && (
              <Input placeholder="Leave a comment..." className="w-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueView;
