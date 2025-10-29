import { useState } from 'react';

const Sidebar = ({ sections, currentLesson, onSelectLesson, completedLessons = [] }) => {
  const [expandedSections, setExpandedSections] = useState(() => {
    // Expand all sections by default
    return sections.reduce((acc, section) => {
      acc[section.id] = true;
      return acc;
    }, {});
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const isLessonActive = (lesson) => {
    return currentLesson && currentLesson.id === lesson.id;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Ruby & Rails Guide</h2>
        <p className="sidebar-subtitle">Interactive Learning Platform</p>
      </div>

      <div className="sidebar-content">
        {sections.map((section) => (
          <div key={section.id} className="section">
            <div
              className="section-header"
              onClick={() => toggleSection(section.id)}
            >
              <span className="section-toggle">
                {expandedSections[section.id] ? '▼' : '▶'}
              </span>
              <div className="section-info">
                <h3>{section.title}</h3>
                <p className="section-description">{section.description}</p>
              </div>
            </div>

            {expandedSections[section.id] && (
              <div className="section-lessons">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`lesson-item ${isLessonActive(lesson) ? 'active' : ''} ${
                      isLessonCompleted(lesson.id) ? 'completed' : ''
                    }`}
                    onClick={() => onSelectLesson(section.id, lesson)}
                  >
                    <span className="lesson-status">
                      {isLessonCompleted(lesson.id) ? '✓' : '○'}
                    </span>
                    <span className="lesson-title">{lesson.title}</span>
                    {lesson.type === 'exercise' && (
                      <span className="lesson-type-badge">📝</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
