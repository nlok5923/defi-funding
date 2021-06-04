import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

class ContributeForm extends Component {
    state = {
        value: '',
        errMessage: '',
        loading: false
    };

    onSubmit = async e => {
        e.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({loading: true, errMessage: ''})
        // now we will call a contribute function 
        try {
            const accounts = await web3.eth.getAccounts();
            //value in ether but we need to send it i wei
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            // to reload same page
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch(err) {
            this.setState({ errMessage: err.message })
        }

        this.setState({ loading: false, value: '' });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
                <Form.Field>
                    <label>Amount to contribute </label>
                    <Input 
                       label="ether"
                       labelPosition="right"
                       value={this.state.value}
                       onChange={e => this.setState({value:e.target.value})} 
                     />

                     <Message error header="Oops!" content={this.state.errMessage} />
                     <Button primary loading={this.state.loading} style={{marginTop: "10px"}} > 
                         Contribute!
                     </Button>
                </Form.Field>
            </Form>
        );   
    }
}

export default ContributeForm;