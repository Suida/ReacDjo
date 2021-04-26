import { useEffect, useState } from 'react';
import { Fade, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectPercentage,
  selectShowProgress,
  updatePercentage,
  toggleProgress,
} from '@/api/slice';

const barHeight = {
  desktop: '3px',
  mobile: '2px',
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    zIndex: 5000,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: barHeight.desktop,
    backgroundColor: 'transparent',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: barHeight.mobile,
    },
  },
  bar: {
    height: '100%',
    backgroundColor: theme.palette.primary.contrastText,
    transition: 'width .6s ease-in-out',
  }
}));

export default () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const percentage = useAppSelector(selectPercentage); // Unit: %
  const showProgress = useAppSelector(selectShowProgress);

  const [width, setWidth] = useState<number>(Math.round(percentage * 100));

  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (!showProgress) return;

    if (percentage === 1) {
      clearTimeout(timer);
      setWidth(100);
      return ;
    }

    let dstWidth = (percentage < 0.2)? 20: Math.round(percentage * 100);

    timer = setTimeout(() => {
      setWidth((dstWidth - width) * 0.7 + width);
    }, 600);
  }, [percentage, showProgress, width]);

  useEffect(() => {
    if (width === 100) {
      // Progress bar will reach to 100% within .5s as set in `classes`.
      // Another 0.25s (0.75s - 0.5s) after that, progress bar is toggle to hide.
      setTimeout(() => dispatch(toggleProgress(false)), 1000);
    }
  }, [width]);

  useEffect(() => {
    if (!showProgress) {
      dispatch(updatePercentage(0));
      setWidth(0);
    }
  }, [showProgress])

  return (
    <Fade in={showProgress}>
      <div className={classes.root}>
        <div className={classes.bar} style={{ width: (width? width.toString(): '0') + '%' }}/>
      </div>
    </Fade>
  )
}
