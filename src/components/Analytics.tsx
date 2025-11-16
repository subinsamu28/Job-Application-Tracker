import { JobApplication } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AnalyticsProps {
  applications: JobApplication[];
}

const STATUS_COLORS = {
  applied: '#3b82f6',
  interview: '#a855f7',
  offer: '#22c55e',
  rejected: '#ef4444',
  accepted: '#10b981',
  withdrawn: '#6b7280',
};

export function Analytics({ applications }: AnalyticsProps) {
  // Status distribution
  const statusData = [
    { name: 'Applied', value: applications.filter(app => app.status === 'applied').length, color: STATUS_COLORS.applied },
    { name: 'Interview', value: applications.filter(app => app.status === 'interview').length, color: STATUS_COLORS.interview },
    { name: 'Offer', value: applications.filter(app => app.status === 'offer').length, color: STATUS_COLORS.offer },
    { name: 'Accepted', value: applications.filter(app => app.status === 'accepted').length, color: STATUS_COLORS.accepted },
    { name: 'Rejected', value: applications.filter(app => app.status === 'rejected').length, color: STATUS_COLORS.rejected },
    { name: 'Withdrawn', value: applications.filter(app => app.status === 'withdrawn').length, color: STATUS_COLORS.withdrawn },
  ].filter(item => item.value > 0);

  // Applications over time (last 6 months)
  const getMonthlyData = () => {
    const monthlyData: { [key: string]: number } = {};
    const now = new Date();
    
    applications.forEach(app => {
      const date = new Date(app.applicationDate);
      const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1;
    });

    return Object.entries(monthlyData)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6);
  };

  const monthlyData = getMonthlyData();

  // Job type distribution
  const jobTypeData = [
    { name: 'Full-Time', value: applications.filter(app => app.jobType === 'full-time').length },
    { name: 'Part-Time', value: applications.filter(app => app.jobType === 'part-time').length },
    { name: 'Contract', value: applications.filter(app => app.jobType === 'contract').length },
    { name: 'Internship', value: applications.filter(app => app.jobType === 'internship').length },
  ].filter(item => item.value > 0);

  // Success metrics
  const totalApplications = applications.length;
  const interviews = applications.filter(app => app.status === 'interview').length;
  const offers = applications.filter(app => app.status === 'offer' || app.status === 'accepted').length;
  const interviewRate = totalApplications > 0 ? ((interviews / totalApplications) * 100).toFixed(1) : '0';
  const offerRate = totalApplications > 0 ? ((offers / totalApplications) * 100).toFixed(1) : '0';

  if (applications.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">No data to display. Start adding applications to see analytics.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Interview Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">{interviewRate}%</div>
            <p className="text-xs text-gray-500 mt-1">{interviews} interviews from {totalApplications} applications</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Offer Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-600">{offerRate}%</div>
            <p className="text-xs text-gray-500 mt-1">{offers} offers from {totalApplications} applications</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-purple-600">
              {applications.filter(app => app.status === 'applied' || app.status === 'interview').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Currently in progress</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Average Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-indigo-600">
              {applications.length > 0 ? Math.floor(
                applications.reduce((acc, app) => {
                  const days = Math.floor((new Date().getTime() - new Date(app.applicationDate).getTime()) / (1000 * 60 * 60 * 24));
                  return acc + days;
                }, 0) / applications.length
              ) : 0} days
            </div>
            <p className="text-xs text-gray-500 mt-1">Since application</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
          <CardHeader>
            <CardTitle>Application Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Applications Over Time */}
        {monthlyData.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
            <CardHeader>
              <CardTitle>Applications Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Job Type Distribution */}
      {jobTypeData.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
          <CardHeader>
            <CardTitle>Job Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#a855f7" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}