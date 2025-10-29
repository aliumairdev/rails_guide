import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor = ({ initialCode, onSubmit, type, tests, expectedOutput }) => {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const normalizeOutput = (str) => {
    // Normalize line endings and trim whitespace
    return str.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
  };

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
        const actualOutput = response.data.output || '';
        setOutput(actualOutput || 'Code executed successfully!');
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
    if (!tests && !expectedOutput) {
      setOutput('No tests or expected output available for this lesson');
      return;
    }

    setIsLoading(true);
    setOutput('');
    setIsSuccess(false);

    try {
      const response = await axios.post(`${API_URL}/api/validate`, {
        code: code,
        tests: tests,
        expectedOutput: expectedOutput
      });

      if (response.data.passed) {
        let message = `✓ ${response.data.message}`;

        if (response.data.output) {
          message += `\n\nYour Output:\n${response.data.output}`;
        }

        if (expectedOutput && response.data.outputMatched !== undefined) {
          if (response.data.outputMatched) {
            message += `\n\n✓ Output matches expected output!`;
          }
        }

        setOutput(message);
        setIsSuccess(true);
        if (onSubmit) {
          onSubmit(true);
        }
      } else {
        let errorMessage = `✗ ${response.data.message}`;

        if (response.data.output) {
          errorMessage += `\n\nYour Output:\n${response.data.output}`;
        }

        if (expectedOutput && response.data.outputMatched === false) {
          errorMessage += `\n\nExpected Output:\n${expectedOutput}`;
          errorMessage += `\n\n✗ Output does not match expected output`;
        }

        if (response.data.error) {
          errorMessage += `\n\nError:\n${response.data.error}`;
        }

        setOutput(errorMessage);
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
          {type === 'exercise' && (tests || expectedOutput) && (
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
