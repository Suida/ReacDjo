import { HTMLProps, FC } from 'react';
import dayjs from 'dayjs';
import { Card } from '@material-ui/core';

export interface Article {
  id: number,
  title: string,
  rawContent: string,
  author: number,
  createAt: dayjs.Dayjs,
  modifiedAt: dayjs.Dayjs,
};

export interface ArticleCardProps extends HTMLProps<any> {
  article: Article;
}

export const ArticleCard: FC<ArticleCardProps> = (props) => {
  return (
    <Card>
    </Card>
  )
}

export default () => {

}
