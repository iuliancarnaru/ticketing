import Router from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

const SignOut = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return 'Signin you out ....';
};

export default SignOut;
