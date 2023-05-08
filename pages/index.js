import React, { Component } from "react";
import { Card, Button, Image, Header } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";
import Campaign from "../ethereum/campaign";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    const data = [];
    for (let address of campaigns) {
      const campaign = Campaign(address);
      const summary = await campaign.methods.getSummary().call();
      Object.assign(summary, { 7: address });
      // console.log(summary);
      data.push(summary);
    }
    return { data };
  }
  renderCampaigns() {
    const items = this.props.data.map((data) => {
      if (data[6].length < 1) {
        data[6] =
          "https://pixelplex.io/wp-content/uploads/auto-resized/30541-1000x510.jpg";
      }
      return {
        header: data[5],
        meta: (
          <div>
            <div class="right floated ui blue image label large">
              <i class="money icon"></i>
              {data[1] / 1000000000000000000}
              <div class="detail">Eth</div>
            </div>
          </div>
        ),
        extra: (
          <div class="ui grid">
            <div class="eight wide column">
              <Header as="h5" color="red">
                Minimum Contribution: {data[0]} Wei
              </Header>
            </div>
            <div class="eight wide column">
              <div class="right floated">
                <Header as="p" size="tiny" color="grey">
                  <i class="tag icon"></i> {data[7]}
                </Header>
                <Header as="p" size="tiny" color="grey">
                  <i class="address book icon"></i> {data[4]}
                </Header>
              </div>
            </div>
          </div>
        ),
        image: (
          <img class="ui centered rounded large fluid image" src={data[6]} />
        ),
        description: (
          <Link route={`/campaigns/${data[7]}`}>
            <a>
              <Button content="View Campaign" icon="eye" primary />
            </a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <div>
          <Header as="h3" color="green">
            An Ethereum blockchain based platform
          </Header>
          <h2>Open Campaigns</h2>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
