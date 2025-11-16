import { JobApplication } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Building2, MapPin, Clock } from 'lucide-react';

interface TimelineProps {
  applications: JobApplication[];
}

export function Timeline({ applications }: TimelineProps) {
  // Sort applications by date
  const sortedApplications = [...applications].sort((a, b) => {
    return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
  });

  // Group by month
  const groupedByMonth = sortedApplications.reduce((acc, app) => {
    const date = new Date(app.applicationDate);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(app);
    return acc;
  }, {} as Record<string, JobApplication[]>);

  const statusColors = {
    applied: 'bg-blue-500',
    interview: 'bg-purple-500',
    offer: 'bg-green-500',
    rejected: 'bg-red-500',
    accepted: 'bg-emerald-500',
    withdrawn: 'bg-gray-500',
  };

  if (applications.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
        <CardContent className="py-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No applications to display in timeline</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedByMonth).map(([month, apps]) => (
        <Card key={month} className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {month}
              <Badge variant="outline" className="ml-2">
                {apps.length} application{apps.length > 1 ? 's' : ''}
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Timeline items */}
            <div className="space-y-6">
              {apps.map((app, index) => (
                <div key={app.id} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-2.5 w-3 h-3 rounded-full ${statusColors[app.status]} ring-4 ring-white`}></div>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-gray-900 mb-1">{app.position}</h3>
                          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                            <Building2 className="w-4 h-4" />
                            <span>{app.company}</span>
                            <span className="text-gray-400">•</span>
                            <MapPin className="w-4 h-4" />
                            <span>{app.location}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${statusColors[app.status]} text-white border-0`}>
                          {app.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Applied on {new Date(app.applicationDate).toLocaleDateString('en-US', { 
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</span>
                      </div>

                      {app.interviewDate && (
                        <div className="mt-2 text-sm text-purple-600 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Interview scheduled: {new Date(app.interviewDate).toLocaleDateString('en-US', { 
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      )}

                      {/* Activity log */}
                      {app.activities && app.activities.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-xs text-gray-500 mb-2">Activity Log</p>
                          <div className="space-y-1">
                            {app.activities.slice(0, 3).map(activity => (
                              <div key={activity.id} className="text-xs text-gray-600 flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span>{activity.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}