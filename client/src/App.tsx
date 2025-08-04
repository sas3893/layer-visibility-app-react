import { gql, useQuery } from '@apollo/client';

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

const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));

function App() {
  const { data, loading } = useQuery(GET_LAYERS, {
    variables: { visible: true, search: 'Layer' },
  });
  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {data.layers.map((layer: any) => (
        <li key={layer.id}>
          {layer.name} - {layer.visible ? 'Visible' : 'Hidden'}
          <br></br>
          <span>{formatDate(layer.lastModified)}</span>
        </li>
      ))}
    </ul>
  );
}

export default App;
