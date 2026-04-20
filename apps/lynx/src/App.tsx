import { DotsSpinner } from '../../../src/lynx';

import './App.css';

export function App() {
  return (
    <page>
      <view className="container">
        <text className="title">Pilot: DotsSpinner</text>
        <view className="spinnerArea">
          <DotsSpinner size={32} color="#D3D3D3" />
        </view>
      </view>
    </page>
  );
}
