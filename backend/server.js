const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execPromise = promisify(exec);
const writeFilePromise = promisify(fs.writeFile);
const unlinkPromise = promisify(fs.unlink);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ruby Learning Platform API is running' });
});

// Execute Ruby code
app.post('/api/execute', async (req, res) => {
  const { code, testCode } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  // Create a temporary file for the Ruby code
  const tempFileName = `temp_${Date.now()}_${Math.random().toString(36).substring(7)}.rb`;
  const tempFilePath = path.join(__dirname, tempFileName);

  try {
    // Combine user code with test code if provided
    const fullCode = testCode ? `${code}\n\n${testCode}` : code;

    // Write code to temporary file
    await writeFilePromise(tempFilePath, fullCode);

    // Execute the Ruby code with a timeout
    const timeout = 5000; // 5 seconds timeout
    const { stdout, stderr } = await execPromise(
      `timeout 5 ruby ${tempFileName}`,
      {
        cwd: __dirname,
        maxBuffer: 1024 * 1024 // 1MB buffer
      }
    );

    // Clean up the temporary file
    await unlinkPromise(tempFilePath);

    // Return the result
    res.json({
      success: true,
      output: stdout || '',
      error: stderr || '',
      executedAt: new Date().toISOString()
    });

  } catch (error) {
    // Clean up the temporary file in case of error
    try {
      if (fs.existsSync(tempFilePath)) {
        await unlinkPromise(tempFilePath);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up temp file:', cleanupError);
    }

    // Handle execution errors
    let errorMessage = error.message;
    let output = '';

    if (error.killed) {
      errorMessage = 'Code execution timeout (exceeded 5 seconds)';
    } else if (error.stdout) {
      output = error.stdout;
    }

    res.json({
      success: false,
      output: output,
      error: error.stderr || errorMessage,
      executedAt: new Date().toISOString()
    });
  }
});

// Validate exercise solution
app.post('/api/validate', async (req, res) => {
  const { code, tests } = req.body;

  if (!code || !tests) {
    return res.status(400).json({ error: 'Code and tests are required' });
  }

  const tempFileName = `test_${Date.now()}_${Math.random().toString(36).substring(7)}.rb`;
  const tempFilePath = path.join(__dirname, tempFileName);

  try {
    // Combine user code with test assertions
    const fullCode = `${code}\n\n# Tests\n${tests}`;

    await writeFilePromise(tempFilePath, fullCode);

    const { stdout, stderr } = await execPromise(
      `timeout 5 ruby ${tempFileName}`,
      {
        cwd: __dirname,
        maxBuffer: 1024 * 1024
      }
    );

    await unlinkPromise(tempFilePath);

    // If tests run without errors, solution is correct
    const passed = !stderr || stderr.trim() === '';

    res.json({
      passed,
      output: stdout || '',
      error: stderr || '',
      message: passed ? 'All tests passed!' : 'Some tests failed. Please check your code.',
      executedAt: new Date().toISOString()
    });

  } catch (error) {
    try {
      if (fs.existsSync(tempFilePath)) {
        await unlinkPromise(tempFilePath);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up temp file:', cleanupError);
    }

    res.json({
      passed: false,
      output: error.stdout || '',
      error: error.stderr || error.message,
      message: 'Test execution failed',
      executedAt: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Ruby Learning Platform API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
