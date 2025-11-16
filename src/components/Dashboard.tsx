import { JobApplication } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Briefcase, Calendar, CheckCircle, XCircle, TrendingUp, Clock } from 'lucide-react';

interface DashboardProps {
  applications: JobApplication[];
}

export function Dashboard({ applications }: DashboardProps) {
  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    interviews: applications.filter(app => app.status === 'interview').length,
    offers: applications.filter(app => app.status === 'offer' || app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  // Calculate upcoming interviews
  const upcomingInterviews = applications.filter(app => {
    if (!app.interviewDate) return false;
    const interviewDate = new Date(app.interviewDate);
    const today = new Date();
    return interviewDate >= today;
  }).length;

  // Response rate
  const responseRate = stats.total > 0 
    ? (((stats.interviews + stats.offers) / stats.total) * 100).toFixed(1)
    : '0';

  // Success rate
  const successRate = stats.total > 0
    ? ((stats.offers / stats.total) * 100).toFixed(1)
    : '0';

  const statCards = [
    {
      title: 'Total Applications',
      value: stats.total,
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'All time',
    },
    {
      title: 'Active Applications',
      value: stats.applied,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Awaiting response',
    },
    {
      title: 'Interviews',
      value: stats.interviews,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: `${upcomingInterviews} upcoming`,
    },
    {
      title: 'Offers Received',
      value: stats.offers,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Success!',
    },
    {
      title: 'Response Rate',
      value: `${responseRate}%`,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Interview + Offer rate',
    },
    {
      title: 'Success Rate',
      value: `${successRate}%`,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Offer rate',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-gray-600">{stat.title}</CardTitle>
              <div className={`p-3 rounded-xl ${stat.bgColor} shadow-sm`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}