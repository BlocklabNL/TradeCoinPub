import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Form from 'react-bootstrap/Form';
import { Spinner, Button, Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import GoogleMaps from "./GoogleMap/GoogleMaps.js";

const config = require("../../config.js");
const {
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI
} = config.default;

function FetchGeoLocation() {
  const [tokenId, setTokenId] = useState(0);
  const [geoLocation, setGeoLocation] = useState("");
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, provider);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getEventsById() {
    if (!tokenId) return;
    await requestAccount();
    
    const events = await contract.queryFilter("*");
    const test = [];
    
    events.map(async e => {
      if (e.args.tokenId) {
        if (ethers.utils.formatUnits(e.args.tokenId) * 1e18 == tokenId) {
          if (e.event === "InitialTokenizationEvent") {
            test.push(e);
          }
        }
      }
    })

    if (test[0] != undefined) {
      setGeoLocation(test[0].args.geoLocation);
      const res = 
        "Token Id: " + tokenId + "\n" +
        ", Created:  " + new Date((await provider.getBlock(test[0].blockNumber)).timestamp * 1000) + "\n" +
        " Geo Location: " + test[0].args.geoLocation;

      setItems((prevItems) => [
        ...prevItems,
        {
          event: test[0].event,
          res: res,
        },
      ]);
    }

    setIsLoading(false);
  }
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setItems([]);


    setIsLoading(true);
    getEventsById();
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
          <Breadcrumb.Item active>Appoximate Geo Location</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container fluid>
        <Row>
          <Col><Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formTokenId">
              <Form.Label>Token Id</Form.Label>
              <Form.Control type="text" value={tokenId} onChange={tokenIdChangeHandler} placeholder="Token Id" required />
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
              Trace Events
            </Button>
          </Form></Col>
        </Row>
      </Container>
      
      <br></br>
        <hr style={{
          color: '#000000',
          backgroundColor: '#000000',
          height: .5,
          borderColor: '#000000'
        }} />
        <br></br>

      <Container>
        <Row>
          <Col><VerticalTimeline lineColor="grey" layout="1-column-left">
            {items.map(item => (
              <VerticalTimelineElement className="vertical-timeline-element--work" contentStyle={{ background: 'rgb(245, 245, 245)', color: '#383736' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(245, 245, 245)' }} iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} >
                <h4 className="vertical-timeline-element-title">{item.event}</h4>
                <p>{item.res}</p>
                <div>
                  <GoogleMaps lat={parseFloat(geoLocation.split(", ")[0])} lon={parseFloat(geoLocation.split(", ")[1])}></GoogleMaps>
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FetchGeoLocation;
