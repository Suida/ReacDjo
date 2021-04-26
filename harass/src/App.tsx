import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
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
  useTheme,
} from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import cls from 'classnames';
import ProgressBar from '@/components/ProgressBar';
import config from '@/config';

const HomePage = lazy(() => import('@/pages/home'));
const ArticlePage = lazy(() => import('@/pages/article'));
const LabPage = lazy(() => import('@/pages/lab'));

const useStyles = makeStyles((theme) => createStyles({
  toolbar: {
    '& .MuiButton-root': {
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.up('sm')]: {
        lineHeight: (theme.mixins.toolbar[theme.breakpoints.up('sm')] as any).minHeight + 'px',
      },
      paddingTop: 0,
      paddingBottom: 0,

      '& .MuiButton-label': {
        marginLeft: '10px',
        marginRight: '10px',
        paddingLeft: '5px',
        paddingRight: '5px',
      },

      '&.activated': {
        fontWeight: 'bolder',

        '& .MuiButton-label': {
          position: 'relative',

          '&::after': {
            content: '""',
            width: '100%',
            height: '2px',
            backgroundColor: theme.palette.primary.contrastText,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '25%',
          },
        },
      },
    },
  },
  nav: {
    [theme.breakpoints.up('sm')]: {
      height:  (theme.mixins.toolbar[theme.breakpoints.up('sm')] as any).minHeight + 'px',
    }
  },
  logo: {
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  iconBar: {
    marginRight: '36px',

    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
    },

    '& .MuiIconButton-root': {
      color: theme.palette.primary.contrastText,
    },
  },
  menuIcon: {
    color: theme.palette.primary.contrastText,
    marginLeft: 'auto',
    width: '48px',
  },
  navDrawer: {
    '& .MuiList-root': {
      width: '280px',
    },
  },
  offset: {
    marginBottom: theme.spacing(1),
    ...theme.mixins.toolbar,
  },
  main: {
  },
}))

export default () => {
  const classes = useStyles();
  const location = useLocation();
  const [drawerState, setDrawerState] = useState<{
    open: boolean,
  }>({
    open: false,
  });

  const theme = useTheme();

  useEffect(() => {
    console.log(theme);
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
    <div>
      <ProgressBar />
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Button
            className={classes.logo}
            size="large"
            component={Link}
            to="/"
          >
            <i>ReacDjo</i>
          </Button>
          <Hidden smDown>
            <nav className={classes.nav}>
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
          <nav className={classes.iconBar}>
            <IconButton component={'a'} href={config.githubRepoUrl}>
              <GitHub />
            </IconButton>
          </nav>
          <Hidden mdUp>
            <IconButton className={classes.menuIcon} onClick={() => toggleDrawer()}>
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <nav>
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
      <div className={classes.offset} />
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
