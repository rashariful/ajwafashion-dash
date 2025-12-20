import { FolderKanban, Users, TrendingUp, Calendar } from "lucide-react";
// import { StatsCard } from "@/components/StatsCard";
import { StatsCard } from "@/components/dashboardComponent/StatsCard";
import { ProjectCard } from "@/components/dashboardComponent/ProjectCard";
import { RevenueChart } from "@/components/dashboardComponent/RevenueChart";
import { ProjectStatusChart } from "@/components/dashboardComponent/ProjectStatusChart";
import { ActivityFeed } from "@/components/dashboardComponent/ActivityFeed";
import { TaskCompletion } from "@/components/dashboardComponent/TaskCompletion";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";

const Dashboard = () => {
  const stats = [
    { title: "Active Projects", value: "12", icon: FolderKanban, trend: "+2 this month" },
    { title: "Total Clients", value: "38", icon: Users, trend: "+5 this month" },
    { title: "Revenue", value: "$124K", icon: TrendingUp, trend: "+18% from last month" },
    { title: "Upcoming Meetings", value: "7", icon: Calendar, trend: "This week" },
  ];

  const recentProjects = [
    {
      image: project1,
      title: "Modern Living Space",
      client: "The Anderson Family",
      status: "In Progress" as const,
      category: "Residential",
    },
    {
      image: project2,
      title: "Scandinavian Bedroom",
      client: "Emma Williams",
      status: "Completed" as const,
      category: "Residential",
    },
    {
      image: project3,
      title: "Contemporary Kitchen",
      client: "Brooklyn Heights Residence",
      status: "In Progress" as const,
      category: "Residential",
    },
    {
      image: project4,
      title: "Home Office Design",
      client: "Tech Startup Inc",
      status: "Planning" as const,
      category: "Commercial",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your Order today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={stat.title} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <RevenueChart />
          <ProjectStatusChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <ActivityFeed />
          <TaskCompletion />
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Projects</h2>
            <button className="text-accent hover:text-accent/80 transition-colors font-medium">
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProjects.map((project, index) => (
              <div key={project.title} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
