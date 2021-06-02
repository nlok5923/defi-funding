//show details about campaign
import React, { Component } from "react"
import { Card } from "semantic-ui-react";
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
// we will use getINitialProps so that it load all data before react render jsx 

class CampaignShow extends Component {
    // this props diff from our react props it has a property called query 
    static async getInitialProps(props) {
        // now we will show info about very particular component
        // address of campaign we will get as props.query.address 
        console.log(props.query.address);
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
        // now we need to create new instance of contract 
    }

    renderCards() {

        const { balance, manager, minimumContribution, requestsCount, approversCount } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'manager created this campaign and can create request to withdraw money',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: minimumContribution,
                meta: 'Min contribution (wei)',
                description: 'you musst contribute this much wei to became an approvers',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: requestsCount,
                meta:'no of request',
                description: 'Deccription of request which try to withdraw money from contract',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: approversCount,
                meta: 'No of approvers',
                description: 'No of peope who have already donated to this campaign',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (ether)',
                description: 'Balance is how much money this campaign has left to spent',
                style: {
                    overflowWrap: 'break-word'
                }
            }
        ]

        return <Card.Group items={items} />
    }

    render() {
        return(
            <Layout>
                <h1> campaign show </h1>
                {this.renderCards()}
            </Layout>
        )
    }
}

export default CampaignShow;
