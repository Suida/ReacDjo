import { useEffect, } from 'react';
import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ArticleCard, Article } from '@/components/Article';
import { selectArticles, } from './slice';
import { fetchArticles, } from './saga';

const spacingFactor = 2;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: `${theme.spacing(spacingFactor) / 2}px`,
  },
  main: {
    backgroundColor: "#888888",
    minHeight: "2000px"
  },
  aside: {
    backgroundColor: "#288888",
    minHeight: "2000px"
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectArticles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  console.log(articles);

  return (
    <div className={classes.root}>
      <Grid container spacing={spacingFactor} alignItems={"center"} justify={"center"}>
        <Grid className={classes.main} item xs={12} md={9} lg={6}>
          {articles && articles.map((article: Article) => {
            <ArticleCard article={article} />
          })}
        </Grid>
        <Grid className={classes.aside} item xs={12} md={3}>

        </Grid>
      </Grid>
    </div>
  )
}
