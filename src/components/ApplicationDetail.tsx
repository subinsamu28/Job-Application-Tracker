import { JobApplication } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Briefcase,
  User,
  Mail,
  ExternalLink,
  X,
  Trash2,
  Flag,
  FileText,
  Download,
  Upload,
  Copy,
  Edit
} from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import { Input } from './ui/input';
import { InterviewPrep } from './InterviewPrep';
import { EmailTemplates } from './EmailTemplates';
import { EditApplicationDialog } from './EditApplicationDialog';
import { useState } from 'react';

interface ApplicationDetailProps {
  application: JobApplication;
  onUpdate: (updates: Partial<JobApplication>) => void;
  onDelete: () => void;
  onClose: () => void;
}

const statusColors = {
  applied: 'bg-blue-100 text-blue-800 border-blue-200',
  interview: 'bg-purple-100 text-purple-800 border-purple-200',
  offer: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  withdrawn: 'bg-gray-100 text-gray-800 border-gray-200',
};

export function ApplicationDetail({ application, onUpdate, onDelete, onClose }: ApplicationDetailProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const downloadFile = (file: { name: string; data: string; type: string }, fileName: string) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('File downloaded successfully');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF and Word documents are allowed');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as string;
        onUpdate({
          [type]: {
            name: file.name,
            data: data,
            type: file.type,
          },
        });
        toast.success(`${type === 'cv' ? 'CV' : 'Cover Letter'} uploaded successfully`);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload file');
    }
  };

  const removeFile = (type: 'cv' | 'coverLetter') => {
    onUpdate({ [type]: undefined });
    toast.success('File removed successfully');
  };

  return (
    <Card className="sticky top-24 bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 border-b">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CardTitle className="text-gray-900">{application.position}</CardTitle>
            <Badge variant="outline" className={statusColors[application.status]}>
              {application.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{application.company}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company & Position */}
        <div>
          <h3 className="text-gray-900 mb-1">{application.position}</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{application.company}</span>
          </div>
        </div>

        {/* Status Update */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Status</label>
          <Select
            value={application.status}
            onValueChange={(value: JobApplication['status']) => 
              onUpdate({ status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="withdrawn">Withdrawn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Priority</label>
          <Select
            value={application.priority}
            onValueChange={(value: JobApplication['priority']) => 
              onUpdate({ priority: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Details */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm text-gray-900">{application.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Job Type</p>
              <p className="text-sm text-gray-900">{application.jobType}</p>
            </div>
          </div>

          {application.salary && (
            <div className="flex items-start gap-3">
              <DollarSign className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Salary Range</p>
                <p className="text-sm text-gray-900">{application.salary}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Applied Date</p>
              <p className="text-sm text-gray-900">
                {new Date(application.applicationDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {application.interviewDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Interview Date</p>
                <p className="text-sm text-gray-900">
                  {new Date(application.interviewDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        {(application.contactPerson || application.contactEmail) && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-sm text-gray-900">Contact Information</h4>
            {application.contactPerson && (
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Contact Person</p>
                  <p className="text-sm text-gray-900">{application.contactPerson}</p>
                </div>
              </div>
            )}
            {application.contactEmail && (
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a 
                    href={`mailto:${application.contactEmail}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {application.contactEmail}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Job URL */}
        {application.jobUrl && (
          <div className="pt-4 border-t">
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              View Job Posting
            </a>
          </div>
        )}

        {/* Notes */}
        {application.notes && (
          <div className="pt-4 border-t">
            <h4 className="text-sm text-gray-900 mb-2">Notes</h4>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{application.notes}</p>
          </div>
        )}

        {/* Documents Section */}
        <div className="pt-4 border-t space-y-4">
          <h4 className="text-sm text-gray-900">Documents</h4>
          
          {/* CV */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500">CV / Resume</label>
            {application.cv ? (
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-900 flex-1 truncate">{application.cv.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadFile(application.cv!, application.cv!.name)}
                  title="Download CV"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile('cv')}
                  title="Remove CV"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'cv')}
                  className="hidden"
                />
                <label
                  htmlFor="cv-upload"
                  className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Upload CV</span>
                </label>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Cover Letter</label>
            {application.coverLetter ? (
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-900 flex-1 truncate">{application.coverLetter.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadFile(application.coverLetter!, application.coverLetter!.name)}
                  title="Download Cover Letter"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile('coverLetter')}
                  title="Remove Cover Letter"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  id="cover-letter-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'coverLetter')}
                  className="hidden"
                />
                <label
                  htmlFor="cover-letter-upload"
                  className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Upload Cover Letter</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Interview Preparation */}
        <InterviewPrep 
          application={application}
          onUpdate={onUpdate}
        />

        {/* Activity Log */}
        {application.activities && application.activities.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="text-sm text-gray-900 mb-3">Activity Log</h4>
            <div className="space-y-2">
              {application.activities.slice().reverse().map(activity => (
                <div key={activity.id} className="text-sm text-gray-600 flex items-start gap-2 p-2 bg-gray-50 rounded">
                  <span className="text-gray-400">•</span>
                  <div className="flex-1">
                    <p>{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Templates */}
        <div className="pt-4 border-t">
          <EmailTemplates application={application} />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Application
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Application</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this application? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <EditApplicationDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={onUpdate}
        application={application}
      />
    </Card>
  );
}