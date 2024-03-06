import React, { CSSProperties, useState } from 'react';
import { CircleLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#ffffff');
  return (
    <div className='sweet-loading'>
      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input
        value={color}
        onChange={(input) => setColor(input.target.value)}
        placeholder='Color of the loader'
      />

      <CircleLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}
