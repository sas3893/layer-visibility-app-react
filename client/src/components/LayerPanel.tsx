// src/components/LayerPanel.tsx
import React, { useEffect, useState } from 'react';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  color?: string;
  lastModified?: string;
}

interface Props {
  layers: Layer[];
}

const LayerPanel: React.FC<Props> = ({ layers }) => {
  const [localLayers, setLocalLayers] = useState<Layer[]>([]);

  // Initialize local state when layers prop changes
  useEffect(() => {
    setLocalLayers(layers);
  }, [layers]);

  const handleShowAll = () => {
    setLocalLayers(prev => prev.map(l => ({ ...l, visible: true })));
  };

  const handleHideAll = () => {
    setLocalLayers(prev => prev.map(l => ({ ...l, visible: false })));
  };

  const handleToggle = (id: string) => {
    setLocalLayers(prev =>
      prev.map(l => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Layer Visibility Panel</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleShowAll}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Show All
        </button>
        <button
          onClick={handleHideAll}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Hide All
        </button>
      </div>

      <ul>
        {localLayers.map(layer => (
          <li
            key={layer.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div>
              <div>{layer.name}</div>
              {layer.lastModified && (
                <div className="text-sm text-gray-500">
                  {new Intl.DateTimeFormat('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(layer.lastModified))}
                </div>
              )}
            </div>
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => handleToggle(layer.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerPanel;
