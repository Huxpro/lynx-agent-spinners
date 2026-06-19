import type * as data from '../../../../src/data';

interface Props {
  theme: 'light' | 'dark';
  lang: 'en' | 'zh';
  accent: string;
  Spinner: any;
  data: typeof data;
}

const T = {
  en: {
    chromeTitle: '~/projects/orbit · agent run',
    cmd:         'agent run --plan ship-auth.md',
    step1:       'parse plan (12 steps)',
    step2:       'checkout feature/auth-rework',
    step3:       'apply migration 0042',
    step4:       'stream tests · 26 / 64',
    step5:       'waiting on CI',
    step6:       'open PR · request review',
    step7:       'post status to #releases',
    running:     'running…',
    queued:      'queued',
    pending:     'pending',
  },
  zh: {
    chromeTitle: '~/projects/orbit · agent 运行中',
    cmd:         'agent run --plan ship-auth.md',
    step1:       '解析计划 (12 步)',
    step2:       'checkout feature/auth-rework',
    step3:       '执行 migration 0042',
    step4:       '跑测试 · 26 / 64',
    step5:       '等 CI',
    step6:       '开 PR · 请求 Review',
    step7:       '在 #releases 同步状态',
    running:     '进行中…',
    queued:      '排队中',
    pending:     '待执行',
  },
};

export function TasksScreen({ lang, Spinner, data }: Props) {
  const t = T[lang];
  // Terminal screen is intentionally always dark. It represents a
  // developer's terminal, which is dark regardless of host theme.
  return (
    <view className="term-root">
      <view className="term-chrome">
        <view className="term-chrome-dot" style={{ backgroundColor: '#ff5f57' }} />
        <view className="term-chrome-dot" style={{ backgroundColor: '#febc2e' }} />
        <view className="term-chrome-dot" style={{ backgroundColor: '#28c840' }} />
        <text className="term-chrome-title">{t.chromeTitle}</text>
      </view>

      <view className="term-body">
        <text className="term-prompt">
          <text>$ </text>
          <text className="term-prompt-cmd">{t.cmd}</text>
        </text>

        <view className="term-line">
          <text style={{ color: '#7ed4a6', fontSize: '13px' }}>✓</text>
          <text className="term-label term-label-done">{t.step1}</text>
          <text className="term-tail">2.1s</text>
        </view>

        <view className="term-line">
          <text style={{ color: '#7ed4a6', fontSize: '13px' }}>✓</text>
          <text className="term-label term-label-done">{t.step2}</text>
          <text className="term-tail">0.3s</text>
        </view>

        <view className="term-line">
          <view className="term-status-icon">
            <Spinner definition={data.dots11} size={13} color="#e69d8c" />
          </view>
          <text className="term-label">{t.step3}</text>
          <text className="term-tail term-tail-accent">{t.running}</text>
        </view>

        <view className="term-line">
          <view className="term-status-icon">
            <Spinner definition={data.bounce} size={13} color="#e69d8c" />
          </view>
          <text className="term-label">{t.step4}</text>
          <text className="term-tail term-tail-accent">{t.running}</text>
        </view>

        <view className="term-line">
          <view className="term-status-icon">
            <Spinner definition={data.simpleDotsScrolling} size={13} color="rgba(240,235,226,0.55)" />
          </view>
          <text className="term-label">{t.step5}</text>
          <text className="term-tail">{t.queued}</text>
        </view>

        <view className="term-line">
          <text style={{ color: 'rgba(240,235,226,0.35)', fontSize: '13px' }}>·</text>
          <text className="term-label" style={{ color: 'rgba(240,235,226,0.3)' }}>{t.step6}</text>
          <text className="term-tail" style={{ opacity: '0.5' }}>{t.pending}</text>
        </view>

        <view className="term-line">
          <text style={{ color: 'rgba(240,235,226,0.35)', fontSize: '13px' }}>·</text>
          <text className="term-label" style={{ color: 'rgba(240,235,226,0.3)' }}>{t.step7}</text>
          <text className="term-tail" style={{ opacity: '0.5' }}>{t.pending}</text>
        </view>
      </view>
    </view>
  );
}
