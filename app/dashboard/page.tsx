import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Users,
  FileText,
  Clock,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, Sarah!</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link href="/dashboard/forms/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Form
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/workflows/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Workflow
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Clients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Forms Submitted
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8</span> this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3m</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-45s</span> improvement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Client Activity</CardTitle>
                <CardDescription>
                  Latest form submissions and workflow triggers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        John Smith submitted "Web Design Intake"
                      </p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Contract sent to Maria Garcia
                      </p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                    <Badge variant="outline">Automated</Badge>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Payment received from David Chen
                      </p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                    <Badge variant="secondary">$2,500</Badge>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Calendar booking from Lisa Wong
                      </p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/dashboard/forms/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Form
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/dashboard/workflows">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Workflows
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/dashboard/clients">
                    <Users className="h-4 w-4 mr-2" />
                    View All Clients
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/dashboard/settings">
                    <Calendar className="h-4 w-4 mr-2" />
                    Integration Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Workflows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Web Design Onboarding
                    </span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-500">12 clients processed</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Consulting Intake
                    </span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-gray-500">8 clients processed</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Content Strategy
                    </span>
                    <Badge variant="outline">Draft</Badge>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-gray-500">Setup in progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
