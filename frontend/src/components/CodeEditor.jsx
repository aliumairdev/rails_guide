import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor = ({ initialCode, onSubmit, type, tests }) => {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    setIsSuccess(false);

    try {
      const response = await axios.post(`${API_URL}/api/execute`, {
        code: code,
        testCode: tests || ''
      });

      if (response.data.success) {
        setOutput(response.data.output || 'Code executed successfully!');
        setIsSuccess(true);
      } else {
        setOutput(`Error:\n${response.data.error}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}\n\nMake sure the backend server is running on port 3001`);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = async () => {
    if (!tests) {
      setOutput('No tests available for this lesson');
      return;
    }

    setIsLoading(true);
    setOutput('');
    setIsSuccess(false);

    try {
      const response = await axios.post(`${API_URL}/api/validate`, {
        code: code,
        tests: tests
      });

      if (response.data.passed) {
        setOutput(`✓ ${response.data.message}\n\n${response.data.output}`);
        setIsSuccess(true);
        if (onSubmit) {
          onSubmit(true);
        }
      } else {
        setOutput(`✗ ${response.data.message}\n\n${response.data.error || response.data.output}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}\n\nMake sure the backend server is running on port 3001`);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode || '');
    setOutput('');
    setIsSuccess(false);
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <h3>Code Editor</h3>
        <div className="editor-actions">
          <button
            onClick={handleRunCode}
            disabled={isLoading}
            className="btn btn-run"
          >
            {isLoading ? 'Running...' : 'Run Code'}
          </button>
          {type === 'exercise' && tests && (
            <button
              onClick={handleValidate}
              disabled={isLoading}
              className="btn btn-validate"
            >
              {isLoading ? 'Validating...' : 'Submit Solution'}
            </button>
          )}
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="btn btn-reset"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="editor-container">
        <Editor
          height="400px"
          defaultLanguage="ruby"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>

      {output && (
        <div className={`output ${isSuccess ? 'output-success' : 'output-error'}`}>
          <div className="output-header">
            <strong>Output:</strong>
          </div>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
