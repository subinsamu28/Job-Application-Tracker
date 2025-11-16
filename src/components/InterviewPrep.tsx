import { useState } from 'react';
import { JobApplication } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, X, Lightbulb } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface InterviewPrepProps {
  application: JobApplication;
  onUpdate: (updates: Partial<JobApplication>) => void;
}

export function InterviewPrep({ application, onUpdate }: InterviewPrepProps) {
  const [newQuestion, setNewQuestion] = useState('');

  const addQuestion = () => {
    if (!newQuestion.trim()) {
      toast.error('Please enter a question');
      return;
    }

    const questions = [...(application.interviewQuestions || []), newQuestion];
    onUpdate({ interviewQuestions: questions });
    setNewQuestion('');
    toast.success('Question added');
  };

  const removeQuestion = (index: number) => {
    const questions = application.interviewQuestions?.filter((_, i) => i !== index) || [];
    onUpdate({ interviewQuestions: questions });
    toast.success('Question removed');
  };

  const commonQuestions = [
    'Tell me about yourself',
    'Why do you want to work here?',
    'What are your strengths and weaknesses?',
    'Where do you see yourself in 5 years?',
    'Why should we hire you?',
  ];

  const addCommonQuestion = (question: string) => {
    const questions = [...(application.interviewQuestions || []), question];
    onUpdate({ interviewQuestions: questions });
    toast.success('Question added');
  };

  return (
    <div className="pt-4 border-t space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-yellow-600" />
        <h4 className="text-sm text-gray-900">Interview Preparation</h4>
      </div>

      {/* Add custom question */}
      <div className="flex gap-2">
        <Input
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Add a question to prepare..."
          onKeyDown={(e) => e.key === 'Enter' && addQuestion()}
        />
        <Button size="sm" onClick={addQuestion}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Common questions */}
      {(!application.interviewQuestions || application.interviewQuestions.length === 0) && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Quick add common questions:</p>
          <div className="flex flex-wrap gap-2">
            {commonQuestions.map(q => (
              <Button
                key={q}
                variant="outline"
                size="sm"
                onClick={() => addCommonQuestion(q)}
                className="text-xs"
              >
                + {q}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Questions list */}
      {application.interviewQuestions && application.interviewQuestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">{application.interviewQuestions.length} questions to prepare</p>
          {application.interviewQuestions.map((question, index) => (
            <div key={index} className="flex items-start gap-2 p-2 bg-yellow-50 rounded border border-yellow-200">
              <span className="text-sm text-gray-900 flex-1">{question}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
