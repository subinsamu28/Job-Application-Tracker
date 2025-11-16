import { useState } from 'react';
import { JobApplication } from '../App';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Building2, MapPin, Calendar, DollarSign, Search, Filter, Edit } from 'lucide-react';
import { EditApplicationDialog } from './EditApplicationDialog';

interface ApplicationsListProps {
  applications: JobApplication[];
  onSelectApplication: (application: JobApplication) => void;
  onUpdateApplication: (id: string, updates: Partial<JobApplication>) => void;
  onDeleteApplication: (id: string) => void;
}

const statusColors = {
  applied: 'bg-blue-100 text-blue-800 border-blue-200',
  interview: 'bg-purple-100 text-purple-800 border-purple-200',
  offer: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  withdrawn: 'bg-gray-100 text-gray-800 border-gray-200',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-700 border-gray-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

export function ApplicationsList({ 
  applications, 
  onSelectApplication,
  onUpdateApplication,
  onDeleteApplication 
}: ApplicationsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);

  // Filter applications
  let filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort applications
  filteredApplications.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
      case 'date-asc':
        return new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime();
      case 'company':
        return a.company.localeCompare(b.company);
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      default:
        return 0;
    }
  });

  if (applications.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
        <CardContent className="py-12 text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-500 mb-4">Start tracking your job applications by adding your first one</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search companies or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="company">Company Name</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredApplications.length} of {applications.length} applications
        </p>
      </div>

      {/* Applications list */}
      <div className="space-y-3">
        {filteredApplications.map(app => (
          <Card 
            key={app.id} 
            className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            onClick={() => onSelectApplication(app)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{app.position}</h3>
                    <Badge variant="outline" className={priorityColors[app.priority]}>
                      {app.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{app.company}</span>
                  </div>
                </div>
                <Badge variant="outline" className={statusColors[app.status]}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{app.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(app.applicationDate).toLocaleDateString()}</span>
                </div>
                {app.salary && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{app.salary}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Badge variant="outline" className="text-xs">
                    {app.jobType}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No applications match your filters</p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      {editingApp && (
        <EditApplicationDialog
          open={!!editingApp}
          onOpenChange={(open) => !open && setEditingApp(null)}
          onUpdate={(updates) => {
            onUpdateApplication(editingApp.id, updates);
            setEditingApp(null);
          }}
          application={editingApp}
        />
      )}
    </div>
  );
}