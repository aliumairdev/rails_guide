import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeEditor from './CodeEditor';

const LessonViewer = ({ lesson, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Reset completion status when lesson changes
    setIsCompleted(false);
  }, [lesson]);

  const handleSubmit = (success) => {
    if (success) {
      setIsCompleted(true);
      if (onComplete) {
        onComplete(lesson.id);
      }
    }
  };

  if (!lesson) {
    return (
      <div className="lesson-viewer">
        <div className="no-lesson">
          <h2>Welcome to Ruby & Rails Learning Platform!</h2>
          <p>Select a lesson from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-viewer">
      <div className="lesson-header">
        <h1>{lesson.title}</h1>
        {lesson.type === 'exercise' && (
          <span className="lesson-badge badge-exercise">Exercise</span>
        )}
        {lesson.type === 'tutorial' && (
          <span className="lesson-badge badge-tutorial">Tutorial</span>
        )}
      </div>

      <div className="lesson-content">
        <div className="lesson-text">
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
        </div>

        {lesson.starterCode && (
          <div className="lesson-code">
            <CodeEditor
              initialCode={lesson.starterCode}
              type={lesson.type}
              tests={lesson.tests}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {isCompleted && (
          <div className="completion-message">
            <h3>🎉 Congratulations!</h3>
            <p>You've completed this lesson. Click "Next" to continue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonViewer;
