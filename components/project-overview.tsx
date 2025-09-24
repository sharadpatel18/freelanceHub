import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ProjectsOverview() {
  const projects = [
    {
      name: "E-commerce Website",
      client: "TechCorp",
      progress: 85,
      status: "In Progress",
      dueDate: "Dec 15",
    },
    {
      name: "Mobile App Design",
      client: "StartupXYZ",
      progress: 60,
      status: "In Progress",
      dueDate: "Dec 20",
    },
    {
      name: "Brand Identity",
      client: "Creative Agency",
      progress: 100,
      status: "Completed",
      dueDate: "Dec 10",
    },
    {
      name: "Dashboard UI",
      client: "DataFlow Inc",
      progress: 30,
      status: "In Progress",
      dueDate: "Jan 5",
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Active Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.client}</p>
              </div>
              <Badge variant={project.status === "Completed" ? "default" : "secondary"} className="text-xs">
                {project.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{project.progress}% complete</span>
                <span className="text-muted-foreground">Due {project.dueDate}</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
