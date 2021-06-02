import React, { Component } from "react"
import factory from '../ethereum/factory'
import 'semantic-ui-css/semantic.min.css'
import { Card, Button } from "semantic-ui-react";
//here we will display a list of all active campaigns
import Layout from "../components/Layout"
import { Link } from '../routes'

class CampaignIndex extends Component {
    // this function used to data loading without rendering components
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
        // console.log(campaigns);
    }

    renderCampaigns() {
        const items = this.props.campaigns.map((address) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>
                            View Campaign
                        </a>
                    </Link>),
                //to stretch over to full width
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }

    //the below function won' wok i server side
    /*async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
    }*/
    //for that case of data loading we will be ssing getiNitial props function 

    render() {
        return(
            <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <Link route="campaigns/new">
                    <a>
                        <Button 
                        content="Create Campaign"
                        icon="add circle"
                        floated="right"
                        primary
                        // primary ={true} both are same 
                        />
                    </a>
                </Link>
                 {this.renderCampaigns()}
            </div>
            </Layout>
        )
    }
};
// file should export a react component
export default CampaignIndex;

// index.js will be used as root route 
