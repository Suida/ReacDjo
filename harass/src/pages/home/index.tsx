import { useEffect, } from 'react';
import {
  Grid,
  Paper,
  Button,
  Divider,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ArticleCard, Article } from '@/components/Article';
import { selectArticles, updateArticles } from './slice';
import { fetchArticles, } from './saga';

const spacingFactor = 2;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: `${theme.spacing(spacingFactor) / 2}px`,
  },
  main: {
    maxWidth: "1200px",
  },
  aside: {
    maxWidth: "600px",
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectArticles);

  useEffect(() => {
      if (articles.length === 0) dispatch(fetchArticles());
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={spacingFactor} justify={"center"}>
        <Grid className={classes.main} item xs={12} sm={9} lg={6}>
          {articles && articles.map((article: Article, idx) => (
            <ArticleCard
              article={article}
              key={idx}
            />
          ))}
        </Grid>
        <Grid className={classes.aside} item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(updateArticles([...articles, ...articles]))}
            >Clone Articles</Button>
            <Divider />
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(fetchArticles())}
            >Fetch Articles</Button>
        </Grid>
      </Grid>
    </div>
  )
}
