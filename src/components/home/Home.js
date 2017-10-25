import React, { Component } from 'react';
import { Divider, Header, Item } from 'semantic-ui-react'
import applications from '../../applications/applications.json';


class Home extends Component {

  render() {

    return (
      <div>
        <Header as='h3'>Uygulamalar</Header>
        <Divider />
        <Item.Group link>
          {applications.map((app) =>
              <Item key={app.Name}>
                <Item.Image size='tiny' src={require('../../applications/images/' + app.Icon)} />
                <Item.Content>
                  <Item.Header as="a" href={app.Url} target="_blank">{app.Name}</Item.Header>
                  <Item.Description>{app.Description}</Item.Description>
                </Item.Content>
              </Item>          
          )}
        </Item.Group>
      </div>

    );
  }
}

export default Home;