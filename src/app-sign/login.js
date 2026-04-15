import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

export function SignIn() {
  // State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError('');

    // --- THIS IS WHERE YOU CALL YOUR BACKEND API ---
    // In a real application, you would use 'fetch' or 'axios' here
    // to send the email and password to your server for verification.

    try {
      // Use the actual backend URL (assuming proxy or CORS setup, typically localhost:5000)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: email, password, role: 'student' }), // Assuming email input is used for userId
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      // On success: save the token and user details
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Store full user object

      // Redirect to Application Form
      // window.location.href = '/tc'; // Force reload/redirect
      // Or use React Router if available in this scope (but we need to import useNavigate)
      window.location.href = '/tc';

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    // For this example, we'll just log to the console
    console.log('Attempting login with:');
    console.log('Email:', email);
    console.log('Password:', password);
    setLoading(false);

    // You can uncomment this to test the error display
    // setError('Invalid Email or Password.');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">SV University Portal</h2>
            <h3 className="text-center text-muted mb-4">Sign In</h3>

            {/* Show error message if 'error' state is not empty */}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Form>

            <div className="w-100 text-center mt-3">
              <a href="/forgot-password">Forgot Password?</a>
            </div>

          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default SignIn;