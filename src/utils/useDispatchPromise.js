import { useDispatch } from 'react-redux';

function useDispatchPromise() {
  const dispatch = useDispatch();
  const callDispatch = (props) => {
    return new Promise((resolve, reject) => {
      dispatch({ ...props, resolve, reject });
    });
  };

  return callDispatch;
}

export default useDispatchPromise;
