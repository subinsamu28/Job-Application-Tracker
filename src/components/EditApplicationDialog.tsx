import { useState, useEffect } from 'react';
import { JobApplication } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, X, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updates: Partial<JobApplication>) => void;
  application: JobApplication;
}

export function EditApplicationDialog({ open, onOpenChange, onUpdate, application }: EditApplicationDialogProps) {
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    company: application.company,
    position: application.position,
    status: application.status,
    location: application.location,
    salary: application.salary,
    jobType: application.jobType,
    applicationDate: application.applicationDate,
    interviewDate: application.interviewDate,
    notes: application.notes,
    contactPerson: application.contactPerson,
    contactEmail: application.contactEmail,
    jobUrl: application.jobUrl,
    priority: application.priority,
    cv: application.cv,
    coverLetter: application.coverLetter,
    followUpDate: application.followUpDate,
    offerDeadline: application.offerDeadline,
  });

  // Update form when application changes
  useEffect(() => {
    setFormData({
      company: application.company,
      position: application.position,
      status: application.status,
      location: application.location,
      salary: application.salary,
      jobType: application.jobType,
      applicationDate: application.applicationDate,
      interviewDate: application.interviewDate,
      notes: application.notes,
      contactPerson: application.contactPerson,
      contactEmail: application.contactEmail,
      jobUrl: application.jobUrl,
      priority: application.priority,
      cv: application.cv,
      coverLetter: application.coverLetter,
      followUpDate: application.followUpDate,
      offerDeadline: application.offerDeadline,
    });
  }, [application]);

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
        setFormData({
          ...formData,
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
    setFormData({
      ...formData,
      [type]: undefined,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onOpenChange(false);
    toast.success('Application updated successfully');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update the details of your job application. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g., Google"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  value={formData.salary || ''}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="e.g., $80k - $120k"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: JobApplication['status']) => 
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
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
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value: JobApplication['jobType']) => 
                    setFormData({ ...formData, jobType: value })
                  }
                >
                  <SelectTrigger id="jobType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="working-student">Working Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: JobApplication['priority']) => 
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicationDate">Application Date</Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewDate">Interview Date</Label>
                <Input
                  id="interviewDate"
                  type="date"
                  value={formData.interviewDate || ''}
                  onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input
                  id="followUpDate"
                  type="date"
                  value={formData.followUpDate || ''}
                  onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offerDeadline">Offer Deadline</Label>
                <Input
                  id="offerDeadline"
                  type="date"
                  value={formData.offerDeadline || ''}
                  onChange={(e) => setFormData({ ...formData, offerDeadline: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson || ''}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="e.g., John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="e.g., john@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobUrl">Job Posting URL</Label>
              <Input
                id="jobUrl"
                type="url"
                value={formData.jobUrl || ''}
                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional notes about this application..."
                rows={4}
              />
            </div>

            {/* File Uploads */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm text-gray-900">Documents</h3>
              
              {/* CV Upload */}
              <div className="space-y-2">
                <Label htmlFor="cv">CV / Resume</Label>
                {formData.cv ? (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-900 flex-1 truncate">{formData.cv.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile('cv')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'cv')}
                      className="hidden"
                    />
                    <label
                      htmlFor="cv"
                      className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Upload CV (PDF or Word)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Cover Letter Upload */}
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                {formData.coverLetter ? (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-900 flex-1 truncate">{formData.coverLetter.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile('coverLetter')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <Input
                      id="coverLetter"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'coverLetter')}
                      className="hidden"
                    />
                    <label
                      htmlFor="coverLetter"
                      className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Upload Cover Letter (PDF or Word)</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}