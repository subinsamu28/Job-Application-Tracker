import { JobApplication } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Copy, Mail } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface EmailTemplatesProps {
  application: JobApplication;
}

export function EmailTemplates({ application }: EmailTemplatesProps) {
  const templates = {
    followUp: {
      subject: `Following up on ${application.position} application`,
      body: `Dear ${application.contactPerson || 'Hiring Manager'},

I hope this email finds you well. I wanted to follow up on my application for the ${application.position} position at ${application.company}, which I submitted on ${new Date(application.applicationDate).toLocaleDateString()}.

I remain very interested in this opportunity and believe my skills and experience would make me a strong addition to your team. I would welcome the chance to discuss how I can contribute to ${application.company}'s success.

Would it be possible to schedule a brief call to discuss my application further?

Thank you for your time and consideration.

Best regards,
[Your Name]`,
    },
    thankYou: {
      subject: `Thank you for the ${application.position} interview`,
      body: `Dear ${application.contactPerson || 'Hiring Manager'},

Thank you for taking the time to meet with me ${application.interviewDate ? `on ${new Date(application.interviewDate).toLocaleDateString()}` : 'recently'} to discuss the ${application.position} position at ${application.company}.

I enjoyed learning more about the role and the team, and I'm even more excited about the opportunity to contribute to ${application.company}. Our conversation reinforced my belief that my skills and experience align well with what you're looking for.

Please don't hesitate to reach out if you need any additional information from me. I look forward to hearing from you about the next steps.

Thank you again for your time and consideration.

Best regards,
[Your Name]`,
    },
    acceptance: {
      subject: `Acceptance of ${application.position} offer`,
      body: `Dear ${application.contactPerson || 'Hiring Manager'},

I am delighted to formally accept the offer for the ${application.position} position at ${application.company}. Thank you for this wonderful opportunity.

I am excited to join the team and contribute to ${application.company}'s success. Please let me know if there are any additional forms or information you need from me before my start date.

I look forward to working with you and the team.

Best regards,
[Your Name]`,
    },
    withdrawal: {
      subject: `Withdrawing application for ${application.position}`,
      body: `Dear ${application.contactPerson || 'Hiring Manager'},

I hope this email finds you well. I am writing to formally withdraw my application for the ${application.position} position at ${application.company}.

After careful consideration, I have decided to pursue a different opportunity that aligns more closely with my current career goals. I truly appreciate the time you and your team invested in considering my application.

I have great respect for ${application.company} and hope our paths may cross again in the future.

Thank you for your understanding.

Best regards,
[Your Name]`,
    },
  };

  const copyTemplate = (template: { subject: string; body: string }) => {
    const fullText = `Subject: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(fullText);
    toast.success('Email template copied to clipboard');
  };

  const openEmail = (template: { subject: string; body: string }) => {
    const mailtoLink = `mailto:${application.contactEmail || ''}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Mail className="w-4 h-4 mr-2" />
          Email Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Email Templates</DialogTitle>
          <DialogDescription>
            Quick email templates for common job application scenarios
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Follow-up Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Subject:</p>
                <p className="text-gray-900">{templates.followUp.subject}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Body:</p>
                <pre className="text-xs text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                  {templates.followUp.body}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => copyTemplate(templates.followUp)}>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                {application.contactEmail && (
                  <Button size="sm" onClick={() => openEmail(templates.followUp)}>
                    <Mail className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Thank You Email (After Interview)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Subject:</p>
                <p className="text-gray-900">{templates.thankYou.subject}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Body:</p>
                <pre className="text-xs text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                  {templates.thankYou.body}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => copyTemplate(templates.thankYou)}>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                {application.contactEmail && (
                  <Button size="sm" onClick={() => openEmail(templates.thankYou)}>
                    <Mail className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Offer Acceptance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Subject:</p>
                <p className="text-gray-900">{templates.acceptance.subject}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Body:</p>
                <pre className="text-xs text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                  {templates.acceptance.body}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => copyTemplate(templates.acceptance)}>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                {application.contactEmail && (
                  <Button size="sm" onClick={() => openEmail(templates.acceptance)}>
                    <Mail className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Application Withdrawal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Subject:</p>
                <p className="text-gray-900">{templates.withdrawal.subject}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Body:</p>
                <pre className="text-xs text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                  {templates.withdrawal.body}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => copyTemplate(templates.withdrawal)}>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                {application.contactEmail && (
                  <Button size="sm" onClick={() => openEmail(templates.withdrawal)}>
                    <Mail className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
