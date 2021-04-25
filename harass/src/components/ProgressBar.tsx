import { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectPercentage,
  selectShowProgress,
  updatePercentage,
  toggleProgress,
} from '@/api/slice';

const barHeight = '4px';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    zIndex: 5000,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: barHeight,
    backgroundColor: 'transparent',
  },
  bar: {
    height: barHeight,
    backgroundColor: theme.palette.primary.contrastText,
    transition: 'width .5s ease',
  }
}));

export default () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const width = Math.round(useAppSelector(selectPercentage) * 100); // Unit: %
  const showProgress = useAppSelector(selectShowProgress);

  useEffect(() => {
    console.log("width:", width);
    if (99 < width && width < 100) {
      dispatch(updatePercentage(1));
    }
    if (width === 100) {
      // Progress bar will reach to 100% within .5s as set in `classes`.
      // After a .25s (1s - .5s) delay, progress bar is toggle to hide.
      setTimeout(() => dispatch(toggleProgress(false)), 750);
    }
  }, [width]);

  useEffect(() => {
    if (!showProgress) dispatch(updatePercentage(0));
  }, [showProgress])

  return (
    <div className={classes.root} hidden={!showProgress}>
      <div className={classes.bar} style={{ width: width.toString() + '%' }}/>
    </div>
  )
}
