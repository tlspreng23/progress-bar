
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { format, differenceInDays } from "date-fns";

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

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (!name || !startDate || !endDate) return;
    const newProject = { name, startDate, endDate };
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Progress Tracker</h1>
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <div>
            <Label>Project Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. University Degree"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={addProject}>Add Project</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {projects.map((project, index) => {
          const percent = getProgress(project.startDate, project.endDate);
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between mb-1">
                  <h2 className="font-medium">{project.name}</h2>
                  <span className="text-sm text-gray-500">{percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {format(new Date(project.startDate), "dd MMM yyyy")} →{" "}
                  {format(new Date(project.endDate), "dd MMM yyyy")}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
