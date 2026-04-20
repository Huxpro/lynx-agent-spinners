import { useCallback, useState } from '@lynx-js/react';
import { CATEGORIES, ALL_SPINNERS, type SpinnerDefinition } from '../../../src/data';
import { Spinner } from '../../../src/lynx/Spinner';

import './App.css';

const TABS = [
  { key: 'all' as const, label: 'All' },
  { key: 'braille' as const, label: 'Braille' },
  { key: 'ascii' as const, label: 'ASCII' },
  { key: 'arrows' as const, label: 'Arrows' },
  { key: 'emoji' as const, label: 'Emoji' },
];

type CategoryKey = 'all' | 'braille' | 'ascii' | 'arrows' | 'emoji';

function SpinnerCell({ definition }: { definition: SpinnerDefinition }) {
  return (
    <view className="cell">
      <text className="cellName">{definition.name}</text>
      <view className="spinnerArea">
        <Spinner definition={definition} size={32} color="#D3D3D3" />
      </view>
    </view>
  );
}

function CategorySection({ entries }: { entries: readonly SpinnerDefinition[] }) {
  return (
    <view className="section">
      <view className="grid">
        {entries.map((def) => (
          <SpinnerCell key={def.name} definition={def} />
        ))}
      </view>
    </view>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('all');

  const handleTabPress = useCallback((key: CategoryKey) => {
    'background only';
    setActiveTab(key);
  }, []);

  const visibleCategories =
    activeTab === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.key === activeTab);

  return (
    <page>
      <view className="container">
        <view className="header">
          <text className="headerSubtitle">
            Agent Spinners - {ALL_SPINNERS.length} spinners
          </text>
        </view>

        <scroll-view
          className="tabBarContainer"
          scroll-orientation="horizontal"
          scrollbar-enable={false}
        >
          <view className="tabBar">
            {TABS.map((tab) => (
              <view
                key={tab.key}
                className={`tab ${activeTab === tab.key ? 'tabActive' : ''}`}
                bindtap={() => handleTabPress(tab.key)}
              >
                <text className={`tabText ${activeTab === tab.key ? 'tabTextActive' : ''}`}>
                  {tab.label}
                </text>
              </view>
            ))}
          </view>
        </scroll-view>

        <scroll-view
          className="content"
          scroll-orientation="vertical"
          scrollbar-enable={false}
        >
          <view className="contentInner">
            {visibleCategories.map((cat) => (
              <CategorySection key={cat.key} entries={cat.entries} />
            ))}
            <view style={{ height: '40px' }} />
          </view>
        </scroll-view>
      </view>
    </page>
  );
}
