import { JobApplication } from '../App';
import { Button } from './ui/button';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ExportDataProps {
  applications: JobApplication[];
}

export function ExportData({ applications }: ExportDataProps) {
  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(applications, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const exportToCSV = () => {
    try {
      // Create CSV headers
      const headers = [
        'Company',
        'Position',
        'Status',
        'Location',
        'Salary',
        'Job Type',
        'Application Date',
        'Interview Date',
        'Priority',
        'Contact Person',
        'Contact Email',
        'Job URL',
      ];

      // Create CSV rows
      const rows = applications.map(app => [
        app.company,
        app.position,
        app.status,
        app.location,
        app.salary || '',
        app.jobType,
        app.applicationDate,
        app.interviewDate || '',
        app.priority,
        app.contactPerson || '',
        app.contactEmail || '',
        app.jobUrl || '',
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `job-applications-${new Date().toISOString().split('T')[0]}.csv`);
      link.click();
      
      toast.success('Data exported to CSV successfully');
    } catch (error) {
      toast.error('Failed to export to CSV');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <FileJson className="w-4 h-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
