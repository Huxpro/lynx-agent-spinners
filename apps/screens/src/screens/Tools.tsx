import type * as data from '../../../../src/data';

interface Props {
  theme: 'light' | 'dark';
  accent: string;
  Spinner: any;
  data: typeof data;
}

export function ToolsScreen({ theme, accent, Spinner, data }: Props) {
  const inkColor = theme === 'dark' ? '#f0ebe2' : '#1a1614';
  const muted    = theme === 'dark' ? 'rgba(240,235,226,0.35)' : 'rgba(26,22,20,0.35)';
  return (
    <view className={`root theme-${theme}`} style={{ '--accent': accent } as Record<string, string>}>
      <view className="chrome">
        <view className="chrome-dot" style={{ backgroundColor: accent, opacity: '0.65' }} />
        <text className="chrome-title">tool-use · 5 calls in flight</text>
      </view>

      <view className="body">
        <text className="tools-h">Working on your PR</text>
        <text className="tools-sub">12 steps · 5 active · 4 done</text>

        <view className="tools-row">
          <view className="tools-spinner-box"><Spinner definition={data.sparkle} size={20} color={accent} /></view>
          <view className="tools-row-text">
            <text className="tools-row-name">web.search</text>
            <text className="tools-row-state">querying "react server components 19"</text>
          </view>
        </view>

        <view className="tools-row">
          <view className="tools-spinner-box"><Spinner definition={data.helix} size={20} color={inkColor} /></view>
          <view className="tools-row-text">
            <text className="tools-row-name">code.run_tests</text>
            <text className="tools-row-state">jest src/auth · 38/64 passed</text>
          </view>
        </view>

        <view className="tools-row">
          <view className="tools-spinner-box"><Spinner definition={data.fillsweep} size={20} color={inkColor} /></view>
          <view className="tools-row-text">
            <text className="tools-row-name">repo.read_files</text>
            <text className="tools-row-state">streaming 4 files · 2.1 KB / 8.7 KB</text>
          </view>
        </view>

        <view className="tools-row">
          <view className="tools-spinner-box"><Spinner definition={data.scan} size={20} color={inkColor} /></view>
          <view className="tools-row-text">
            <text className="tools-row-name">db.query</text>
            <text className="tools-row-state">SELECT users WHERE …  ⏱ 412ms</text>
          </view>
        </view>

        <view className="tools-row">
          <view className="tools-spinner-box">
            <text style={{ fontSize: '15px', color: muted }}>✓</text>
          </view>
          <view className="tools-row-text">
            <text className="tools-row-name">code.format</text>
            <text className="tools-row-state">prettier applied · 14 files</text>
          </view>
          <text className="tools-row-done">DONE</text>
        </view>

        <text className="tools-footnote">
          Each step has its own spinner glyph, so the user can tell at a glance whether the agent is searching, reading, computing, or testing.
        </text>
      </view>
    </view>
  );
}
