import { Suspense } from 'react';
import Loader from './Loader';

const Loadable = (Component: React.ComponentType) => (props: any) => {
  return (
    <Suspense fallback={<Loader isPending={true} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
