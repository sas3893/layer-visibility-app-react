import { gql, useQuery } from '@apollo/client';
import LayerPanel from './components/LayerPanel';

const GET_LAYERS = gql`
  query GetLayers($visible: Boolean, $search: String) {
    layers(visible: $visible, search: $search) {
      id
      name
      visible
      color
      lastModified
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_LAYERS, {
    variables: { visible: true, search: 'Layer' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading layers</p>;

  return <LayerPanel layers={data.layers} />;
}

export default App;
