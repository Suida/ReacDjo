import { useState, useCallback, lazy, Suspense } from 'react';
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
  makeStyles,
  createStyles,
} from '@material-ui/core';
import cls from 'classnames';
import ProgressBar from '@/components/ProgressBar';
import styles from './App.module.scss';

const HomePage = lazy(() => import('@/pages/home'));
const ArticlePage = lazy(() => import('@/pages/article'));
const LabPage = lazy(() => import('@/pages/lab'));

const useStyles = makeStyles((theme) => createStyles({
  navDrawer: {
    '& .MuiList-root': {
      width: '280px',
    },
  },
  main: {
    [theme.breakpoints.down('xs')]: {
      marginTop: "48px",
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: "64px",
    },
  }
}))

export default () => {
  const classes = useStyles();
  const location = useLocation();
  const [drawerState, setDrawerState] = useState<{
    open: boolean,
  }>({
    open: false,
  });

  const toggleDrawer = useCallback((open?: boolean) => setDrawerState({
    ...drawerState,
    open: open === undefined? !open: open,
  }), [drawerState])

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
      <ProgressBar />
      <AppBar>
        <Toolbar className={styles.toolbar}>
          <Button
            className={styles.logo}
            size="large"
            component={Link}
            to="/"
          >
            <i>ReacDjo</i>
          </Button>
          <Hidden smDown>
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
          <Hidden mdUp>
            <IconButton className={styles.menuIcon} onClick={() => toggleDrawer()}>
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

        </Toolbar>
      </AppBar>
      <nav
        className={styles.navbar}
      >
        <SwipeableDrawer
          anchor={"right"}
          open={drawerState.open}
          onClose={() => toggleDrawer(false)}
          onOpen={(e) => console.log(e)}
          className={classes.navDrawer}
        >
          <List>
            {routes.map(({to, text, icon}, idx) => (
              <ListItem
                button
                component={Link}
                to={to}
                key={to}
                divider={idx !== routes.length - 1}
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </nav>
      <main className={classes.main}>
        <Switch>
          <Suspense fallback={null}>
            <Route path="/article" component={ArticlePage } />
            <Route path="/lab" component={LabPage} />
            <Route exact path="/" component={HomePage} />
          </Suspense>
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}
