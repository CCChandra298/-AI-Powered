import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Eye, Download, Calendar, Activity, FileText, Code } from "lucide-react";

interface AnalyticsData {
  userActivity: Array<{ date: string; users: number; sessions: number }>;
  toolUsage: Array<{ tool: string; usage: number; color: string }>;
  trafficSources: Array<{ source: string; visitors: number; percentage: number }>;
  downloadStats: Array<{ type: string; downloads: number }>;
  realTimeStats: {
    activeUsers: number;
    totalSessions: number;
    totalPageViews: number;
    avgSessionDuration: string;
  };
}

const AnalyticsDashboardTool = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = () => {
      setIsLoading(true);
      setTimeout(() => {
        // Generate mock analytics data
        const mockData: AnalyticsData = {
          userActivity: [
            { date: "2024-01-01", users: 245, sessions: 320 },
            { date: "2024-01-02", users: 289, sessions: 387 },
            { date: "2024-01-03", users: 178, sessions: 234 },
            { date: "2024-01-04", users: 356, sessions: 445 },
            { date: "2024-01-05", users: 298, sessions: 378 },
            { date: "2024-01-06", users: 412, sessions: 523 },
            { date: "2024-01-07", users: 467, sessions: 598 }
          ],
          toolUsage: [
            { tool: "AI Writing", usage: 35, color: "#3B82F6" },
            { tool: "Code Generator", usage: 25, color: "#10B981" },
            { tool: "Logo Generator", usage: 15, color: "#F59E0B" },
            { tool: "Resume Builder", usage: 12, color: "#EF4444" },
            { tool: "Video Creator", usage: 8, color: "#8B5CF6" },
            { tool: "SEO Optimizer", usage: 5, color: "#06B6D4" }
          ],
          trafficSources: [
            { source: "Direct", visitors: 1250, percentage: 45 },
            { source: "Google Search", visitors: 890, percentage: 32 },
            { source: "Social Media", visitors: 420, percentage: 15 },
            { source: "Referrals", visitors: 220, percentage: 8 }
          ],
          downloadStats: [
            { type: "PDF Downloads", downloads: 156 },
            { type: "Logo Downloads", downloads: 89 },
            { type: "Video Downloads", downloads: 45 },
            { type: "Code Exports", downloads: 234 }
          ],
          realTimeStats: {
            activeUsers: 23,
            totalSessions: 2847,
            totalPageViews: 8934,
            avgSessionDuration: "4m 32s"
          }
        };

        setAnalyticsData(mockData);
        setIsLoading(false);
      }, 1500);
    };

    loadAnalytics();
  }, [timeRange]);

  const exportData = (format: string) => {
    if (!analyticsData) return;

    let dataToExport = "";
    let filename = "";
    let mimeType = "";

    if (format === "csv") {
      // Export user activity as CSV
      dataToExport = "Date,Users,Sessions\n" + 
        analyticsData.userActivity.map(item => 
          `${item.date},${item.users},${item.sessions}`
        ).join("\n");
      filename = "analytics_data.csv";
      mimeType = "text/csv";
    } else if (format === "json") {
      dataToExport = JSON.stringify(analyticsData, null, 2);
      filename = "analytics_data.json";
      mimeType = "application/json";
    }

    const blob = new Blob([dataToExport], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Activity className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => exportData("csv")}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData("json")}>
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{analyticsData.realTimeStats.activeUsers}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{analyticsData.realTimeStats.totalSessions.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{analyticsData.realTimeStats.totalPageViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Page Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{analyticsData.realTimeStats.avgSessionDuration}</p>
                <p className="text-sm text-muted-foreground">Avg. Session</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Tool Usage</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>User Activity Over Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.userActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Users"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sessions" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Sessions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tool Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.toolUsage}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="usage"
                      label={({ name, usage }) => `${name}: ${usage}%`}
                    >
                      {analyticsData.toolUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tool Usage Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.toolUsage.map((tool, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: tool.color }}
                        />
                        <span className="text-sm font-medium">{tool.tool}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{tool.usage}%</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round(analyticsData.realTimeStats.totalSessions * tool.usage / 100)} uses
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.trafficSources}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {analyticsData.trafficSources.map((source, index) => (
                  <div key={index} className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{source.visitors}</div>
                    <div className="text-sm text-muted-foreground">{source.source}</div>
                    <div className="text-xs text-primary">{source.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Download Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.downloadStats} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="type" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="downloads" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {analyticsData.downloadStats.reduce((sum, item) => sum + item.downloads, 0)}
                  </div>
                  <div className="text-muted-foreground">Total Downloads</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboardTool;