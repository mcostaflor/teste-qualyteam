import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import NonConformities from './views/NonConformities';
import NonConformitiesCreate from './views/NonConformitiesCreate';
import NonConformitiesDetail from './views/NonConformitiesDetail';

import { Toolbar, AppBar, Typography, Hidden, Drawer, List, ListItem, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

function App() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ h: window.innerHeight, w: window.innerWidth });

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize({ h: window.innerHeight, w: window.innerWidth });
    });
  }, []);

  const handleDrawerButton = state => {
    setDrawerOpen(state || !drawerOpen);
  }

  return (
    <>
      <div style={{ display: 'flex', flex: 1 }}>
        <Drawer
          open={drawerOpen || windowSize.w > 600}
          variant={windowSize.w > 600 ? 'permanent' : 'temporary'}
          style={{
            zIndex: 1000, width: 200
          }}
          onClose={() => handleDrawerButton(false)}
        >
          <Toolbar />
          <List style={{
            width: 200
          }}>
            <ListItem button component={Link} to={'/nonconformities'}>
              Não conformidades
            </ListItem>
          </List>
        </Drawer>
        <div style={{ padding: 20, flex: 1, height: '100%', boxSizing: 'border-box' }}>
          <AppBar style={{ zIndex: 1000 }}>
            <Toolbar>
              <Hidden smUp>
                <IconButton color="inherit" onClick={() => handleDrawerButton()} >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Typography variant="h5">
                Qualyteam
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Switch style={{}}>
            <Route exact path='/nonconformities/new' component={NonConformitiesCreate} />
            <Route path='/nonconformities/:id' component={NonConformitiesDetail} />
            <Route path='/nonconformities' component={NonConformities} />
            <Redirect to='/nonconformities' />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
