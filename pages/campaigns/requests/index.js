import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    //get total request using campaign instance
    const requestCount = await campaign.methods.getRequestCount().call();
    //we will issue all call in one go and wait them all to resolve using promise
    // what is does requests method return the request at a given index
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
      //! understand it
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    console.log(requests);
    return { address, requests, requestCount, approversCount };
  }

  renderRow() {
      return this.props.requests.map((request, index) => {
          return <RequestRow
          request={request}
          key={index}
          id={index}
          address={this.props.address}
          approversCount={this.props.approversCount} 
          />
      });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3> Requests </h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}> Add request </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>ApprovalCount</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
              {this.renderRow()}
          </Body>
        </Table>
        <div>
            Found {this.props.requestCount} requests.
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
