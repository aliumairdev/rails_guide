import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LessonViewer from './components/LessonViewer';
import { rubyLessons } from './data/rubyLessons';
import { railsLessons } from './data/railsLessons';
import './App.css';

function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(() => {
    // Load completed lessons from localStorage
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  // Combine all lessons
  const allSections = [...rubyLessons, ...railsLessons];

  // Save completed lessons to localStorage
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const handleSelectLesson = (sectionId, lesson) => {
    setCurrentLesson(lesson);
    setCurrentSectionId(sectionId);
  };

  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleNextLesson = () => {
    if (!currentLesson || !currentSectionId) return;

    const currentSection = allSections.find(s => s.id === currentSectionId);
    if (!currentSection) return;

    const currentIndex = currentSection.lessons.findIndex(l => l.id === currentLesson.id);

    if (currentIndex < currentSection.lessons.length - 1) {
      // Next lesson in same section
      const nextLesson = currentSection.lessons[currentIndex + 1];
      handleSelectLesson(currentSectionId, nextLesson);
    } else {
      // Move to next section
      const sectionIndex = allSections.findIndex(s => s.id === currentSectionId);
      if (sectionIndex < allSections.length - 1) {
        const nextSection = allSections[sectionIndex + 1];
        if (nextSection.lessons.length > 0) {
          handleSelectLesson(nextSection.id, nextSection.lessons[0]);
        }
      }
    }
  };

  const handlePreviousLesson = () => {
    if (!currentLesson || !currentSectionId) return;

    const currentSection = allSections.find(s => s.id === currentSectionId);
    if (!currentSection) return;

    const currentIndex = currentSection.lessons.findIndex(l => l.id === currentLesson.id);

    if (currentIndex > 0) {
      // Previous lesson in same section
      const prevLesson = currentSection.lessons[currentIndex - 1];
      handleSelectLesson(currentSectionId, prevLesson);
    } else {
      // Move to previous section
      const sectionIndex = allSections.findIndex(s => s.id === currentSectionId);
      if (sectionIndex > 0) {
        const prevSection = allSections[sectionIndex - 1];
        if (prevSection.lessons.length > 0) {
          const lastLesson = prevSection.lessons[prevSection.lessons.length - 1];
          handleSelectLesson(prevSection.id, lastLesson);
        }
      }
    }
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setCompletedLessons([]);
      localStorage.removeItem('completedLessons');
    }
  };

  const calculateProgress = () => {
    const totalLessons = allSections.reduce((sum, section) => sum + section.lessons.length, 0);
    const completed = completedLessons.length;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  };

  return (
    <div className="app">
      <Sidebar
        sections={allSections}
        currentLesson={currentLesson}
        onSelectLesson={handleSelectLesson}
        completedLessons={completedLessons}
      />

      <div className="main-content">
        <div className="top-bar">
          <div className="progress-container">
            <span className="progress-label">
              Progress: {completedLessons.length} / {allSections.reduce((sum, s) => sum + s.lessons.length, 0)} lessons
            </span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <span className="progress-percentage">{calculateProgress()}%</span>
          </div>
          <button onClick={resetProgress} className="btn btn-reset-progress">
            Reset Progress
          </button>
        </div>

        <LessonViewer
          lesson={currentLesson}
          onComplete={handleCompleteLesson}
        />

        {currentLesson && (
          <div className="navigation-buttons">
            <button
              onClick={handlePreviousLesson}
              className="btn btn-nav"
              disabled={!currentLesson}
            >
              ← Previous
            </button>
            <button
              onClick={handleNextLesson}
              className="btn btn-nav"
              disabled={!currentLesson}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
