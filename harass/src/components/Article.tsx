import { FC } from 'react';
import dayjs from 'dayjs';
import cls from 'classnames';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardProps,
  Typography,
  IconButton,
  Icon,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { formatDateTime } from '@/utils';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      width: '100%',
      marginBottom: '10px',
    },
    content: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    actions: {
      paddingTop: '0px',
      '& .MuiIcon-root': {
        fontSize: '1.2rem',
      },
    },
    detailButton: {
      marginLeft: 'auto',
      '& .MuiIcon-root': {
        fontSize: '1.5rem',
      },
    },
  }),
);

export interface Article {
  id: number,
  title: string,
  rawContent: string,
  author: number,
  createdAt: dayjs.Dayjs,
  modifiedAt: dayjs.Dayjs,
};

export interface ArticleCardProps extends CardProps {
  article: Article;
}

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={cls(classes.root, className)} {...rest}>
      <CardHeader
        title={<Typography variant="h5">{article.title}</Typography>}
        subheader={<Typography variant="body2">落笔于 {formatDateTime(article.createdAt)}</Typography>}
      />
      <CardContent className={classes.content}>
        <Typography variant="body1" component="p">
          {article.rawContent.slice(0, 150)}
          <b> . . .</b>
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <IconButton>
          <Icon>thumb_up</Icon>
        </IconButton>
        <IconButton>
          <Icon>share</Icon>
        </IconButton>
        <IconButton className={classes.detailButton}>
          <Icon>east</Icon>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default () => {

}
