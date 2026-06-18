import type * as data from '../../../../src/data';

interface Props {
  accent: string;
  Spinner: any;
  data: typeof data;
}

export function TasksScreen({ accent, Spinner, data }: Props) {
  void accent;
  return (
    <view className="term-root">
      <view className="term-chrome">
        <view className="term-chrome-dot" style={{ backgroundColor: '#ff5f57' }} />
        <view className="term-chrome-dot" style={{ backgroundColor: '#febc2e' }} />
        <view className="term-chrome-dot" style={{ backgroundColor: '#28c840' }} />
        <text className="term-chrome-title">~/projects/orbit · agent run</text>
      </view>

      <view className="term-body">
        <text className="term-prompt">
          <text>$ </text>
          <text className="term-prompt-cmd">agent run --plan ship-auth.md</text>
        </text>

        <view className="term-line">
          <text style={{ color: '#7ed4a6', fontSize: '13px' }}>✓</text>
          <text className="term-label term-label-done">parse plan (12 steps)</text>
          <text className="term-tail">2.1s</text>
        </view>

        <view className="term-line">
          <text style={{ color: '#7ed4a6', fontSize: '13px' }}>✓</text>
          <text className="term-label term-label-done">checkout feature/auth-rework</text>
          <text className="term-tail">0.3s</text>
        </view>

        <view className="term-line">
          <view className="term-status-icon">
            <Spinner definition={data.dots11} size={13} color="#e69d8c" />
          </view>
          <text className="term-label">apply migration 0042</text>
          <text className="term-tail term-tail-accent">running…</text>
        </view>

        <view className="term-line">
          <view className="term-status-icon">
            <Spinner definition={data.bounce} size={13} color="#e69d8c" />
          </view>
          <text className="term-label">stream tests · 26 / 64</text>
          <text className="term-tail term-tail-accent">running…</text>
        </view>

        <view className="term-line">
          <view className="term-status-icon">
            <Spinner definition={data.simpleDotsScrolling} size={13} color="rgba(240,235,226,0.55)" />
          </view>
          <text className="term-label">waiting on CI</text>
          <text className="term-tail">queued</text>
        </view>

        <view className="term-line">
          <text style={{ color: 'rgba(240,235,226,0.35)', fontSize: '13px' }}>·</text>
          <text className="term-label" style={{ color: 'rgba(240,235,226,0.3)' }}>open PR · request review</text>
          <text className="term-tail" style={{ opacity: '0.5' }}>pending</text>
        </view>

        <view className="term-line">
          <text style={{ color: 'rgba(240,235,226,0.35)', fontSize: '13px' }}>·</text>
          <text className="term-label" style={{ color: 'rgba(240,235,226,0.3)' }}>post status to #releases</text>
          <text className="term-tail" style={{ opacity: '0.5' }}>pending</text>
        </view>
      </view>
    </view>
  );
}
