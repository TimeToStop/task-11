import CytoscapeGraph from '../../components/graph/graph';
import { useAppSelector } from '../../store/store';
import { RootState } from '../../store/store';
import { fetchMindMap } from '../../store/thunk';
import { useAppDispatch  } from '../../store/store';
import { useEffect } from 'react';

const GraphPage = () => {
  const dispatch = useAppDispatch();
  const { mindmap, loading, error } = useAppSelector((state: RootState) => state.mindmap);

  useEffect(() => {
    dispatch(fetchMindMap());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Graph Page</h1>
      <CytoscapeGraph nodes={mindmap?.nodes || []} edges={mindmap?.edges || []} />
    </div>
  );
};

export default GraphPage;
