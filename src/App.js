import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Grid, Divider, Image } from 'semantic-ui-react';
import './index.css';
import geomatesLogo from './images/geomates.png';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Menu stackable>
          <Menu.Item as={Link} to="/">Ana Sayfa</Menu.Item>
          <Menu.Item as='a' href="https://github.com/Geomates/geomatikuygulamalar/blob/master/src/applications/UygulamaEkleme.md" target="_blank">Uygulama Ekle</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item as={Link} to="/contact">İletişim</Menu.Item>
          </Menu.Menu>
        </Menu>
        {this.props.children}
        <Divider />
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={6}>Copyright © 2007 - {new Date().getFullYear()} Geomatik Uygulamalar</Grid.Column>      
            <Grid.Column width={4} textAlign="center"><Image src={geomatesLogo} centered /></Grid.Column>    
            <Grid.Column width={6} textAlign="right">
              <a href="https://github.com/Geomates/" target="_blank" rel="noopener noreferrer">Github</a>&nbsp;-&nbsp;
              <a href="http://twitter.com/geomatik" target="_blank" rel="noopener noreferrer">Twitter</a>&nbsp;-&nbsp;
              <a href="http://www.facebook.com/geomatikuygulamalar" target="_blank" rel="noopener noreferrer">Facebook</a>
            </Grid.Column>   
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
