import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { format, differenceInDays, addDays } from "date-fns";

const gradients = [
  "linear-gradient(to right, #3b82f6, #10b981)",
  "linear-gradient(to right, #ec4899, #8b5cf6)",
  "linear-gradient(to right, #f97316, #22d3ee)",
  "linear-gradient(to right, #ef4444, #facc15)",
];

export default function ProjectProgressApp() {
  const [projects, setProjects] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("projects");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showMilestones, setShowMilestones] = useState(false);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (!name || !startDate || !endDate) return;
    const gradient = gradients[projects.length % gradients.length];
    const newProject = { name, startDate, endDate, gradient };
    setProjects([...projects, newProject]);
    setName("");
    setStartDate("");
    setEndDate("");
  };

  const getProgress = (start, end) => {
    const today = new Date();
    const startD = new Date(start);
    const endD = new Date(end);
    const total = differenceInDays(endD, startD);
    const elapsed = differenceInDays(today, startD);
    const percent = Math.min(Math.max((elapsed / total) * 100, 0), 100);
    return Math.round(percent);
  };

  const getMilestones = (start, end) => {
    const startD = new Date(start);
    const endD = new Date(end);
    const total = differenceInDays(endD, startD);
    return [0, 0.25, 0.5, 0.75, 1].map((fraction) =>
      format(addDays(startD, total * fraction), "dd MMM yyyy")
    );
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Project Progress Tracker</h1>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <Input
                className="text-xl py-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="University Degree"
              />
              <p className="text-gray-500 text-xs uppercase mt-1">Project Name</p>
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <Input
                  className="text-xl py-3"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <p className="text-gray-500 text-xs uppercase mt-1">Start Date</p>
              </div>
              <div className="flex-1">
                <Input
                  className="text-xl py-3"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <p className="text-gray-500 text-xs uppercase mt-1">End Date</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={showMilestones} onChange={() => setShowMilestones(!showMilestones)} />
              <span className="text-sm text-gray-700">Turn on milestones</span>
            </div>
            <Button onClick={addProject}>Add Project</Button>
          </CardContent>
        </Card>

        <hr className="border-t border-gray-300" />

        <div className="space-y-8">
          {projects.map((project, index) => {
            const percent = getProgress(project.startDate, project.endDate);
            const milestones = getMilestones(project.startDate, project.endDate);

            return (
              <Card key={index} className="bg-white shadow">
                <CardContent className="p-6 flex flex-col items-center">
                  <h2 className="text-lg font-medium mb-2">{project.name}</h2>
                  <div className="relative w-4/5 h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: percent + "%",
                        background: project.gradient,
                      }}
                    />
                    {showMilestones &&
                      [0, 25, 50, 75, 100].map((p, i) => (
                        <div
                          key={i}
                          className="absolute top-0 h-full border-l border-black"
                          style={{ left: p + "%" }}
                        >
                          <div
                            className="absolute -top-6 text-xs text-center w-24 -ml-12 text-gray-600"
                            style={{ left: "50%" }}
                          >
                            {milestones[i]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {format(new Date(project.startDate), "dd MMM yyyy")} →{" "}
                    {format(new Date(project.endDate), "dd MMM yyyy")} ({percent}%)
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
