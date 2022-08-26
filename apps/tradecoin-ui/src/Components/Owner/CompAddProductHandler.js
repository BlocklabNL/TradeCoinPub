import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Form from 'react-bootstrap/Form';
import { Button, Container, Row, Col, Breadcrumb, Alert, Spinner } from 'react-bootstrap';

const config = require("../../config.js");
const {
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI
} = config.default;

function CompAddProductHandler() {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function compAddProductHandler() {
    if (!address) return;
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsLoading(true);
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI, signer);
        const transaction = await contract.addProductHandler(address);
        await transaction.wait();

        setIsLoading(false);
        setShowSuccess(true);

      } catch (err) {
        console.log("Error: ", err);
        window.alert(err);
      }
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    compAddProductHandler();
  };

  return (
    <div>

      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            Authorization
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Add Product Handler</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container fluid>
        <Row>
          <Col><Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formTokenId">
              <Form.Label>Product Handler</Form.Label>
              <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              <Form.Text className="text-muted">
                Enter the address of product handler
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">{isLoading && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}Submit</Button>
          </Form></Col>
        </Row>
      </Container>

      <br></br>

      {showSuccess && <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
        <Alert.Heading>Success!</Alert.Heading>
        <p>The transaction is processed successfully!</p>
      </Alert>}
    </div>
  );
}

export default CompAddProductHandler;
