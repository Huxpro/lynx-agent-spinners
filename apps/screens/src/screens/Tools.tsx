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
    chrome:    'tool-use · 5 calls in flight',
    h:         'Working on your PR',
    sub:       '12 steps · 5 active · 4 done',
    searchState: 'querying "react server components 19"',
    testsState:  'jest src/auth · 38/64 passed',
    readState:   'streaming 4 files · 2.1 KB / 8.7 KB',
    dbState:     'SELECT users WHERE …  ⏱ 412ms',
    formatState: 'prettier applied · 14 files',
    done:        'DONE',
    note:        'Each step has its own spinner glyph, so the user can tell at a glance whether the agent is searching, reading, computing, or testing.',
  },
  zh: {
    chrome:    '工具调用 · 5 个并行任务',
    h:         '正在处理你的 PR',
    sub:       '12 步 · 5 进行中 · 4 完成',
    searchState: '正在搜索 "react server components 19"',
    testsState:  'jest src/auth · 38/64 通过',
    readState:   '流式读取 4 个文件 · 2.1 KB / 8.7 KB',
    dbState:     'SELECT users WHERE …  ⏱ 412ms',
    formatState: '已应用 prettier · 14 个文件',
    done:        '完成',
    note:        '每一步都有自己的转圈字符，用户一眼就能看出 Agent 是在搜索、读取、计算还是测试。',
  },
};

export function ToolsScreen({ theme, lang, accent, Spinner, data }: Props) {
  const t = T[lang];
  const inkColor = theme === 'dark' ? '#f0ebe2' : '#1a1614';
  const muted    = theme === 'dark' ? 'rgba(240,235,226,0.35)' : 'rgba(26,22,20,0.35)';
  return (
    <view className={`root theme-${theme}`} style={{ '--accent': accent } as Record<string, string>}>
      <view className="chrome">
        <view className="chrome-dot" style={{ backgroundColor: accent, opacity: '0.65' }} />
        <text className="chrome-title">{t.chrome}</text>
      </view>

      <view className="body">
        <text className="tools-h">{t.h}</text>
        <text className="tools-sub">{t.sub}</text>

        <view className="tools-row">
          <view className="tools-spinner-box"><Spinner definition={data.sparkle} size={20} color={accent} /></view>
          <view className="tools-row-text">
            <text className="tools-row-name">web.search</text>
            <text className="tools-row-state">{t.searchState}</text>
          </view>
        </view>

        <view className="tools-row">
          <view className="tools-spinner-box"><Spinner definition={data.helix} size={20} color={inkColor} /></view>
          <view className="tools-row-text">
            <text className="tools-row-name">code.run_tests</text>
            <text className="tools-row-state">{t.testsState}</text>
          </view>
        </view>

        <view className="tools-row">
          <view className="tools-spinner-box"><Spinner definition={data.fillsweep} size={20} color={inkColor} /></view>
          <view className="tools-row-text">
            <text className="tools-row-name">repo.read_files</text>
            <text className="tools-row-state">{t.readState}</text>
          </view>
        </view>

        <view className="tools-row">
          <view className="tools-spinner-box"><Spinner definition={data.scan} size={20} color={inkColor} /></view>
          <view className="tools-row-text">
            <text className="tools-row-name">db.query</text>
            <text className="tools-row-state">{t.dbState}</text>
          </view>
        </view>

        <view className="tools-row">
          <view className="tools-spinner-box">
            <text style={{ fontSize: '15px', color: muted }}>✓</text>
          </view>
          <view className="tools-row-text">
            <text className="tools-row-name">code.format</text>
            <text className="tools-row-state">{t.formatState}</text>
          </view>
          <text className="tools-row-done">{t.done}</text>
        </view>

        <text className="tools-footnote">{t.note}</text>
      </view>
    </view>
  );
}
