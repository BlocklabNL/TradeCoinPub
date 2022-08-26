import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Form from 'react-bootstrap/Form';
import { Spinner, Badge, Table, Button, Container, Row, Col, Breadcrumb } from 'react-bootstrap';

const config = require("../../config.js");
const {
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI
} = config.default;

const stateList = [
  "PendingCreation",
  "Created",
  "RoadTransport",
  "SeaTransport",
  "RailTransport",
  "AirTransport",
  "Storage",
  "Inspection",
  "Processing",
  "Locked",
  "Burned",
  "EOL"
];

function FetchCompProductComponent() {
  const [tokenId, setTokenId] = useState('');

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [state, setState] = useState('');
  const [transList, setTransList] = useState([]);
  const [owner, setOwner] = useState('');
  const [currentHandler, setCurrentHandler] = useState('');
  const [rootHash, setRootHash] = useState('');
  const [tokenURI, setTokenURI] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  async function fetchCompProduct() {
    if (!tokenId) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI, provider);

      try {
        const tradeCoinComposition = await contract.tradeCoinComposition(tokenId);
        console.log(tradeCoinComposition)
        const tokenURI = await contract.tokenURI(tokenId);
        const dataAmount = tradeCoinComposition.cumulativeAmount.toNumber() * 1e-3;
        const dataUnit = ethers.utils.parseBytes32String(tradeCoinComposition.unit);
        const product = tradeCoinComposition.compositionName;
        const dataState = tradeCoinComposition.state;
        const ownerOfToken = await contract.ownerOf(tokenId);
        const dataTransformationsLength = await contract.getTransformationsLength(tokenId);
        const currentHandler = tradeCoinComposition.currentHandler;
        const rootHash = tradeCoinComposition.rootHash;

        let dataTransformations = [];
        if (dataTransformationsLength) {
          for (var i = 0; i < dataTransformationsLength.toNumber(); i++) {
            var data = await contract.getTransformationsbyIndex(tokenId, i);
            dataTransformations.push(data);
          }
        }

        console.log("Product: ", product);
        setProduct(product);
        setAmount(dataAmount);
        setUnit(dataUnit);
        setState(stateList[dataState]);
        setTransList(dataTransformations);
        setOwner(ownerOfToken);
        setCurrentHandler(currentHandler);
        setRootHash(rootHash);
        setTokenURI(tokenURI);

        setIsLoading(false);



        console.log("Amount: ", dataAmount);
        console.log("Unit: ", dataUnit);
        console.log("State: ", stateList[dataState]);
        console.log("Transformations list: ", dataTransformations);
        console.log("Owner: ", ownerOfToken);
        console.log("Current Handler: ", currentHandler);
        console.log("Roothash: ", rootHash);
        console.log("TokenURI: ", tokenURI);

        console.log("\n");
      } catch (err) {
        console.log("Error: ", err);
        // window.alert(err.data.message);
      }
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setProduct('');
    setAmount('');
    setUnit('');
    setState('');
    setTransList([]);
    setOwner('');
    setCurrentHandler('');
    setRootHash('');
    setTokenURI('');

    setIsLoading(true);
    fetchCompProduct();
  };

  const tokenIdChangeHandler = (event) => {
    setTokenId(event.target.value);
  };

  return (
    <div>

      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            Track & Trace
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Product NFT</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container fluid>
        <Row>
          <Col><Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formTokenId">
              <Form.Label>Token Id</Form.Label>
              <Form.Control type="text" value={tokenId} onChange={tokenIdChangeHandler} required />
              <Form.Text className="text-muted">
                Enter the Token Id of the ProductNFT
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoading && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
              Submit
            </Button>
          </Form></Col>
        </Row>
        <br></br>
        <hr style={{
          color: '#000000',
          backgroundColor: '#000000',
          height: .5,
          borderColor: '#000000'
        }} />
        <br></br>
        <Row>
          <Col>

            <Table size="small" striped bordered hover>
              <tbody>
                <tr>
                  <td>Product</td>
                  <td>{product}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{amount}</td>
                </tr>
                <tr>
                  <td>Unit</td>
                  <td>{unit}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>{state}</td>
                </tr>
                <tr>
                  <td>Transformation List</td>
                  <td><table><tr>{transList.map((e, index) =>
                    <td key={index}><Badge bg="secondary">{e}</Badge></td>
                  )}</tr></table></td>
                </tr>
                <tr>
                  <td>Owner</td>
                  <td>{owner}</td>
                </tr>
                <tr>
                  <td>Current Handler</td>
                  <td>{currentHandler}</td>
                </tr>
                <tr>
                  <td>Root Hash</td>
                  <td>{rootHash}</td>
                </tr>
                <tr>
                  <td>Token URI</td>
                  <td>{tokenURI}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FetchCompProductComponent;
