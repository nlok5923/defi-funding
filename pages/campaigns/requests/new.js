import React, { Component } from "react";
import web3 from "../../../ethereum/web3";
import { Button, Message, Form, Input, TableHeader } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

// we can't return array of struct in solidity as solidity do not hsa suppor for us

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    errMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errMessage: "" });
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
      Router.pushRoute(`campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ loading: false });
  };
  
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a request </h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
          <Form.Field>
            <label> description </label>
            <Input
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label> Value in ether </label>
            <Input
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
              label="ether"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label> Recipient </label>
            <Input
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops" content={this.state.errMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
