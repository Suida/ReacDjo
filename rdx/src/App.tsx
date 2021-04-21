import { useState, Fragment } from 'react';
import {
  Link,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Icon,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  SwipeableDrawer,
} from '@material-ui/core';
import cls from 'classnames';
import Home from '@/pages/home/index';
import styles from './App.module.scss';

export default () => {
  const location = useLocation();
  const [drawerState, setDrawerState] = useState<{
    open: boolean,
  }>({
    open: false,
  });

  const routes = [
    {
      to: "/",
      text: "主页",
      icon: "home",
    },
    {
      to: "/article",
      text: "文章",
      icon: "article",
    },
    {
      to: "/lab",
      text: "实验室",
      icon: "gavel",
    },
  ]

  return (
    <div className={styles.app}>
      <AppBar>
        <Toolbar className={styles.toolbar}>
          <Button
            className={styles.logo}
            size="large"
            component={Link}
            to="/"
          >
            <Icon>star</Icon>
          </Button>
          <Hidden xsDown>
            <nav
              className={styles.navbar}
            >
              {routes.map(({to, text}) => (
                <Button
                  size="large"
                  to={to}
                  component={Link}
                  className={cls({
                    activated: to === '/'
                      ? location.pathname === to
                      : location.pathname.startsWith(to)
                  })}
                  key={to}
                >
                  {text}
                </Button>
              ))}
            </nav>
          </Hidden>
          <Hidden smUp>
            <IconButton className={styles.menuIcon} onClick={() => setDrawerState({...drawerState, open: true})}>
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

        </Toolbar>
      </AppBar>
      <nav
        className={styles.navbar}
      >
        <SwipeableDrawer
          anchor={"top"}
          open={drawerState.open}
          onClose={() => setDrawerState({...drawerState, open: false})}
          onOpen={(e) => console.log(e)}
        >
          <List>
            {routes.map(({to, text, icon}, idx) => (
              <ListItem button component={Link} to={to} key={to} divider={idx !== routes.length - 1}>
                <ListItemIcon>
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </nav>
      <main style={{minHeight: '2000px'}}>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}
