import axios from 'axios';
import store from '@/store';
import {
  showProgress,
  updatePercentage,
} from '@/api/slice';

const instance = axios.create({
  onUploadProgress: (e) => {
    store.dispatch(updatePercentage(e.loaded / e.total));
  },
  onDownloadProgress: (e) => {
    store.dispatch(updatePercentage(e.loaded / e.total));
  },
});

instance.interceptors.request.use(
  (conf) => {
    store.dispatch(updatePercentage(0));
    store.dispatch(showProgress());
    return conf;
  },
  (err) => {
    store.dispatch(updatePercentage(1));
    Promise.reject(err)
  },
)

instance.interceptors.response.use(
  // If successfully resp is received, `onDownloadProgress` will automatically set
  // `percentage` to 1 and the `ProgressBar` component will decide when the to 
  // `hideProgress` by **itself**.
  (resp) => resp,
  (err) => {
    store.dispatch(updatePercentage(1));
    Promise.reject(err)
  },
)

export default instance;
