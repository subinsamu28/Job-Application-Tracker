import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ApplicationsList } from './components/ApplicationsList';
import { AddApplicationDialog } from './components/AddApplicationDialog';
import { ApplicationDetail } from './components/ApplicationDetail';
import { Analytics } from './components/Analytics';
import { Timeline } from './components/Timeline';
import { ExportData } from './components/ExportData';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Plus, Briefcase } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted' | 'withdrawn';
  location: string;
  salary?: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'working-student';
  applicationDate: string;
  interviewDate?: string;
  notes?: string;
  contactPerson?: string;
  contactEmail?: string;
  jobUrl?: string;
  priority: 'low' | 'medium' | 'high';
  cv?: {
    name: string;
    data: string;
    type: string;
  };
  coverLetter?: {
    name: string;
    data: string;
    type: string;
  };
  activities?: Activity[];
  interviewQuestions?: string[];
  followUpDate?: string;
  offerDeadline?: string;
}

export interface Activity {
  id: string;
  type: 'status_change' | 'note' | 'email' | 'interview' | 'follow_up';
  description: string;
  date: string;
}

const STORAGE_KEY = 'job-applications';

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load applications from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setApplications(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading applications:', error);
      }
    }
  }, []);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const addApplication = (application: Omit<JobApplication, 'id'>) => {
    const newApplication: JobApplication = {
      ...application,
      id: Date.now().toString(),
    };
    setApplications([newApplication, ...applications]);
    setIsAddDialogOpen(false);
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    setApplications(applications.map(app => {
      if (app.id === id) {
        const updatedApp = { ...app, ...updates };
        
        // Add activity log for status changes
        if (updates.status && updates.status !== app.status) {
          const activity: Activity = {
            id: Date.now().toString(),
            type: 'status_change',
            description: `Status changed from ${app.status} to ${updates.status}`,
            date: new Date().toISOString(),
          };
          updatedApp.activities = [...(updatedApp.activities || []), activity];
        }
        
        return updatedApp;
      }
      return app;
    }));
    if (selectedApplication?.id === id) {
      setSelectedApplication(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
    if (selectedApplication?.id === id) {
      setSelectedApplication(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg shadow-blue-500/25">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Job Application Tracker</h1>
                <p className="text-sm text-gray-600">Organize and track your career journey</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ExportData applications={applications} />
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30">
                <Plus className="w-4 h-4 mr-2" />
                Add Application
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-md p-1.5">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md">Dashboard</TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md">Applications</TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md">Timeline</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard applications={applications} />
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-gray-900 mb-4">Recent Applications</h2>
              <ApplicationsList
                applications={applications.slice(0, 5)}
                onSelectApplication={(app) => {
                  setSelectedApplication(app);
                  setActiveTab('applications');
                }}
                onUpdateApplication={updateApplication}
                onDeleteApplication={deleteApplication}
              />
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ApplicationsList
                  applications={applications}
                  onSelectApplication={setSelectedApplication}
                  onUpdateApplication={updateApplication}
                  onDeleteApplication={deleteApplication}
                />
              </div>
              {selectedApplication && (
                <div className="lg:col-span-1">
                  <ApplicationDetail
                    application={selectedApplication}
                    onUpdate={(updates) => updateApplication(selectedApplication.id, updates)}
                    onDelete={() => deleteApplication(selectedApplication.id)}
                    onClose={() => setSelectedApplication(null)}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <Timeline applications={applications} />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics applications={applications} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Application Dialog */}
      <AddApplicationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={addApplication}
      />

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;