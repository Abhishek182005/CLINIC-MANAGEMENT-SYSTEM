import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestForm from "./RequestForm.jsx";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import "./style/RequestList.css";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/requests/${id}/like`);
      fetchRequests();
    } catch (error) {
      console.error("Error liking request:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/requests/${id}/status`,
        { status: newStatus }
      );
      setRequests(
        requests.map((req) => (req._id === id ? response.data : req))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Requests</Card.Title>
              <RequestForm
                onAddRequest={(newRequest) =>
                  setRequests([newRequest, ...requests])
                }
              />
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Resident Name</th>
                    <th>Address</th>
                    <th>Content</th>
                    <th>Likes</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id}>
                      <td>{request.residentName}</td>
                      <td>{request.address}</td>
                      <td>{request.content}</td>
                      <td>{request.likes}</td>
                      <td>
                        <Form.Control
                          as="select"
                          value={request.status}
                          onChange={(e) =>
                            handleStatusUpdate(request._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="seen">Seen</option>
                          <option value="action taken">Action Taken</option>
                          <option value="no response">No Response</option>
                        </Form.Control>
                      </td>
                      <td>{new Date(request.createdAt).toLocaleString()}</td>
                      <td>{new Date(request.updatedAt).toLocaleString()}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleLike(request._id)}
                        >
                          Like
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestList;
