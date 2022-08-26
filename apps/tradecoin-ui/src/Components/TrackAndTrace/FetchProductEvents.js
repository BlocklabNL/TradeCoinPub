import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Form from 'react-bootstrap/Form';
import { Spinner, Button, Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const config = require("../../config.js");
const {
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI
} = config.default;

function FetchProductEvents() {
  const [tokenId, setTokenId] = useState(0);

  const [items, setItems] = useState([]);

  const [allEvents, setAllEvents] = useState(false);
  const [initialTokenEvents, setInitialTokenEvents] = useState(false);
  const [ownershipTransferEvents, setOwnershipTransferEvents] = useState(false);
  const [productTransformationEvents, setProductTransformationEvents] = useState(false);
  const [handerStateChangeEvents, setHanderStateChangeEvents] = useState(false);
  const [spilitEvents, setSpilitEvents] = useState(false);
  const [batchEvents, setBatchEvents] = useState(false);

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
    console.log(events)
    if (allEvents) {
      const test = []
      events.map(e => {
        if (e.args.tokenId) {
          if (ethers.utils.formatUnits(e.args.tokenId) * 1e18 == tokenId) {
            test.push(e);
          }
          console.log(test);
        }
      })
      for (let x = 0; x < test.length; x++) {
        var creator = "_";
        if (test[x].args.functionCaller != undefined) {
          creator = test[x].args.functionCaller;
        }

        const res = "Token Id: " + tokenId + ", Creator: " + creator + ", Created:  "
          + new Date((await provider.getBlock(test[x].blockNumber)).timestamp * 1000);
        setItems((prevItems) => [
          ...prevItems,
          {
            event: test[x].event,
            res: res,
          },
        ]);
      }

    }
    if (initialTokenEvents) {
      const test = []
      events.map(async e => {
        if (e.args.tokenId) {
          if (ethers.utils.formatUnits(e.args.tokenId) * 1e18 == tokenId) {
            if (e.event === "InitialTokenizationEvent") {
              test.push(e);
            }
            if (e.event === "ApproveTokenizationEvent") {
              test.push(e);
            }
          }
        }
      })

      if (test[0] != undefined) {
        const res = 
          "Token Id: " + tokenId + 
          ", Creator: " + test[0].args.functionCaller + 
          ", Created:  " + new Date((await provider.getBlock(test[0].blockNumber)).timestamp * 1000) + 
          " Geo Location: " + test[0].args.geoLocation +
          " Document Type: " + test[0].args.docType +
          ", Document Hash: " + test[0].args.docHash +
          ", Root Hash: " + test[0].args.rootHash;
          
        setItems((prevItems) => [
          ...prevItems,
          {
            event: test[0].event,
            res: res,
          },
        ]);
      }

      if (test[1] != undefined) {
        const res1 = "Token Id: " + tokenId + ", Creator: " + test[1].args.functionCaller
          + ", Created:  " + new Date((await provider.getBlock(test[1].blockNumber)).timestamp * 1000)
          + ", Seller:  " + test[1].args.seller
          + ", Receiver:  " + test[1].args.functionCaller
          + " Document Type: " + test[1].args.docType + ", Document Hash: " + test[1].args.docHash + ", Root Hash: " + test[1].args.rootHash;
        setItems((prevItems) => [
          ...prevItems,
          {
            event: test[1].event,
            res: res1,
          },
        ]);
      }
    }
    if (ownershipTransferEvents) {
      const test = []
      events.map(async e => {
        if (e.args.tokenId) {
          if (ethers.utils.formatUnits(e.args.tokenId) * 1e18 == tokenId) {
            if (e.event === "Transfer") {
              test.push(e);
            }
          }
        }
      })

      for (let x = 0; x < test.length; x++) {
        const res = "Token Id: " + tokenId + ", Creator: " + test[x].args.functionCaller
          + ", From :  " + test[x].args.from
          + ", To:  " + test[x].args.to
          + ", Created:  " + new Date((await provider.getBlock(test[x].blockNumber)).timestamp * 1000) + " Document Type: "
          + test[x].args.docType + ", Document Hash: " + test[x].args.docHash + ", Root Hash: " + test[x].args.rootHash;
        setItems((prevItems) => [
          ...prevItems,
          {
            event: test[x].event,
            res: res,
          },
        ]);
      }

    }
    if (productTransformationEvents) {
      const test = []
      events.map(async e => {
        if (e.args.tokenId) {
          if (ethers.utils.formatUnits(e.args.tokenId) * 1e18 == tokenId) {
            if (e.event === "AddTransformationEvent") {
              test.push(e);
            }
          }
        }
      })
      for (let x = 0; x < test.length; x++) {
        const res = "Token Id: " + tokenId + ", Creator: " + test[x].args.functionCaller
          + ", Created:  " + new Date((await provider.getBlock(test[x].blockNumber)).timestamp * 1000)
          + ", WeightLoss :  " + (ethers.utils.formatUnits(test[x].args.weightLoss) * 1e18).toFixed(0)
          + ", Transformation Code:  " + test[x].args.transformationCode
          + " Document Type: " + test[x].args.docType + ", Document Hash: " + test[x].args.docHash + ", Root Hash: " + test[x].args.rootHash;
        setItems((prevItems) => [
          ...prevItems,
          {
            event: test[x].event,
            res: res,
          },
        ]);
      }
    }
    if (handerStateChangeEvents) {
      const test = []
      events.map(async e => {
        if (e.args.tokenId) {
          if (ethers.utils.formatUnits(e.args.tokenId) * 1e18 == tokenId) {
            if (e.event === "ChangeStateAndHandlerEvent") {
              test.push(e);
            }
          }
        }
      })
      for (let x = 0; x < test.length; x++) {
        const res = "Token Id: " + tokenId + ", Creator: " + test[x].args.functionCaller
          + ", Created:  " + new Date((await provider.getBlock(test[x].blockNumber)).timestamp * 1000)
          + ", New State :  " + test[x].args.newState
          + ", New Handler:  " + test[x].args.newCurrentHandler
          + " Document Type: " + test[x].args.docType + ", Document Hash: " + test[x].args.docHash + ", Root Hash: " + test[x].args.rootHash;
        setItems((prevItems) => [
          ...prevItems,
          {
            event: test[x].event,
            res: res,
          },
        ]);
      }
    }
    if (batchEvents) {
      const tokens = [];
      events.map(async e => {
        if (e.event === "BatchProductEvent") {
          console.log("Batcher Address: ", e.args[1])
          for (let x = 0; x < e.args[2].length; x++) {
            tokens.push(ethers.utils.formatUnits(e.args[2][x]) * 1e18)
          }
          console.log("BatchedTokens: ", tokens);
          console.log("Date of Batched process: ", new Date((await provider.getBlock(e.blockNumber)).timestamp * 1000));
          console.log("===================================");

          const res = ", Batcher Address: " + e.args[1]
            + ", BatchedTokens: " + tokens
            + ", Date of Batched process: " + new Date((await provider.getBlock(e.blockNumber)).timestamp * 1000);

          setItems((prevItems) => [
            ...prevItems,
            {
              event: "BatchProductEvent",
              res: res,
            },
          ]);
        }
      })
    }
    if (spilitEvents) {
      const tokens = [];
      events.map(async e => {
        if (e.event === "SplitProductEvent") {
          const tokenId = ethers.utils.formatUnits(e.args[0]) * 1e18;
          console.log("TokenId: ", tokenId);
          console.log("Splitter Address: ", e.args[2]);
          for (let x = 1; x < e.args[3].length; x++) {
            tokens.push(ethers.utils.formatUnits(e.args[3][x]) * 1e18);
          }
          console.log(`Splitted tokenId ${tokenId} into: `, tokens);
          console.log("Date of Splitting Product: ", new Date((await provider.getBlock(e.blockNumber)).timestamp * 1000));
          console.log("===================================");

          const res = "Token Id: " + tokenId
            + ", Splitter Address: " + e.args[2]
            + ", Splitted tokens: " + tokens
            + ", Date of Splitting Product: " + new Date((await provider.getBlock(e.blockNumber)).timestamp * 1000);
          setItems((prevItems) => [
            ...prevItems,
            {
              event: "SplitProductEvent",
              res: res,
            },
          ]);
        }
      })
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
          <Breadcrumb.Item active>Product Events</Breadcrumb.Item>
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
            <Form.Group className="mb-3" value={allEvents} onChange={(e) => setAllEvents(e.target.checked)} controlId="allEvents">
              <Form.Check type="checkbox" label="All Events" />
            </Form.Group>
            <Form.Group className="mb-3" value={initialTokenEvents} onChange={(e) => setInitialTokenEvents(e.target.checked)} controlId="initialTokenEvents">
              <Form.Check type="checkbox" label="Initial Tokenization Event" />
            </Form.Group>
            <Form.Group className="mb-3" value={ownershipTransferEvents} onChange={(e) => setOwnershipTransferEvents(e.target.checked)} controlId="ownershipTransferEvents">
              <Form.Check type="checkbox" label="Ownership Transfer Event" />
            </Form.Group>
            <Form.Group className="mb-3" value={productTransformationEvents} onChange={(e) => setProductTransformationEvents(e.target.checked)} controlId="productTransformationEvents">
              <Form.Check type="checkbox" label="Product Transformaiton Event" />
            </Form.Group>
            <Form.Group className="mb-3" value={handerStateChangeEvents} onChange={(e) => setHanderStateChangeEvents(e.target.checked)} controlId="handerStateChangeEvents">
              <Form.Check type="checkbox" label="Product Handler/State Event" />
            </Form.Group>
            <Form.Group className="mb-3" value={spilitEvents} onChange={(e) => setSpilitEvents(e.target.checked)} controlId="spilitEvents">
              <Form.Check type="checkbox" label="Product Split Event" />
            </Form.Group>
            <Form.Group className="mb-3" value={batchEvents} onChange={(e) => setBatchEvents(e.target.checked)} controlId="batchEvents">
              <Form.Check type="checkbox" label="Product Batch Event" />
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
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
          </Col></Row></Container>
    </div>
  );
}

export default FetchProductEvents;
