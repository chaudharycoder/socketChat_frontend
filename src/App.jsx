import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import {login} from './store/slice/user/userSlice';
import { Toaster } from 'react-hot-toast'
import { getUserProfileThunk } from './store/slice/user/userThunk';
const App = () => {
  // const { isAuthenticated } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());



    })();
  }, [dispatch]);
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App


