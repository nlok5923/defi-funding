//navigation comes built into next
// /campaigns/news
// this route is achieved using the campaigns folder
//next can't be used for dynamic routing 
import React, { Component } from 'react';
import Layout from "../../components/Layout"
import { Form, Button, Input, Message } from "semantic-ui-react"
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'
//Link and Router are react components 

class CampaignNew extends Component {
    //defining state
    state = {
        minimumContribuition: '',
        errMessage: '',
        loading: false
    };

    onSubmit = async (e) => {
        //this is not set correctly we need to do some function binfing
        // top browser to attempt to submit form
        e.preventDefault();
        this.setState({loading: true, errMessage: ''});
       try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods.
        createCampaign(this.state.minimumContribuition)
        .send({ 
            //user has atleast one account
            from: accounts[0]
         });
         //metamask auto matically find the amount of gas needed to run transaction
         // here we need to redirect user after campaign creation
         Router.pushRoute('/'); 
       } catch (err) {
           // if we get here then we set the error as
           this.setState({ errMessage: err.message })
       }
       this.setState({loading: false})
    };

    render() {
        return (
            <Layout>
                <h3> Create a campaign  </h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input 
                        labelPosition="right" 
                        label="wei"
                        value={this.state.minimumContribuition}
                        onChange={event => this.setState({ 
                            minimumContribuition: event.target.value 
                        })} 
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errMessage} />
                    <Button loading={this.state.loading} primary> Create </Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew