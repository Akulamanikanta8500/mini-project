import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Table, Button, Badge, Alert } from 'react-bootstrap';
import { FaFilePdf, FaCheck, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';


// This function fetches data from the real backend
const fetchApplications = async () => {
  const response = await fetch('/api/applications');
  if (!response.ok) throw new Error('Failed to fetch applications');
  return await response.json();
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useEffect to fetch data when the component loads
  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await fetchApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Access Denied: Admins Only');
      navigate('/home');
      return;
    }
    loadApplications();
  }, []);

  // Update application status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        // Refresh the list
        loadApplications();
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleApprove = (id) => {
    updateStatus(id, 'approved');
  };

  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      updateStatus(id, 'rejected');
    }
  };

  const handleGenerateTC = (app) => {
    // Navigate to TC template with data
    navigate(`/generate-tc/${app._id}`, { state: app });
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Header as="h3" className="bg-dark text-white">
          Admin Dashboard - TC Applications
        </Card.Header>
        <Card.Body>
          {loading ? (
            <p>Loading applications...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>No Dues Cert</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.studentId}</td>
                    <td>{app.firstName} {app.lastName}</td>
                    <td>{app.department}</td>
                    <td>
                      <Badge bg={
                        app.status === 'pending' ? 'warning' :
                          app.status === 'approved' ? 'success' : 'danger'
                      }>
                        {app.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      {app.noDuesFile ? (
                        <a
                          href={`/uploads/${app.noDuesFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-info btn-sm"
                        >
                          <FaFilePdf /> View File
                        </a>
                      ) : (
                        <span className="text-muted small">No File</span>
                      )}
                    </td>
                    <td>
                      {app.status === 'pending' && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleApprove(app._id)}
                          >
                            <FaCheck /> Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleReject(app._id)}
                          >
                            <FaTimes /> Reject
                          </Button>
                        </div>
                      )}

                      {app.status === 'approved' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleGenerateTC(app)}
                        >
                          <FaFilePdf size={18} className="me-1" /> Generate TC
                        </Button>
                      )}

                      {app.status === 'rejected' && (
                        <span className="text-muted small">Application Rejected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminDashboard;