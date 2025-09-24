import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-card"
import { ProjectsOverview } from "@/components/project-overview"
import { RecentActivity } from "@/components/recent-activity"
import { EarningsChart } from "@/components/earning-chart"
import { ClientsTable } from "@/components/client-table"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <EarningsChart />
              <ClientsTable />
            </div>
            <div className="space-y-6">
              <ProjectsOverview />
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
