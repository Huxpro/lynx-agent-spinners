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
    chrome:    'claude · drafting reply',
    meta:      '11:42 · YOU',
    bubble:    'What changed in the auth middleware last week? Summarize for the changelog.',
    thinking:  'Thinking…',
    reasoning: 'REASONING',
    step1:     'Reading 4 files in src/auth/',
    step2:     'Comparing main…HEAD~6',
    placeholder: 'Reply, or ask a follow-up…',
    send:      '↵ SEND',
  },
  zh: {
    chrome:    'claude · 草拟回复中',
    meta:      '11:42 · 你',
    bubble:    '上周认证中间件改了什么？给 changelog 写个摘要。',
    thinking:  '思考中…',
    reasoning: '推理',
    step1:     '正在读取 src/auth/ 中的 4 个文件',
    step2:     '对比 main…HEAD~6',
    placeholder: '回复，或追问…',
    send:      '↵ 发送',
  },
};

export function ChatScreen({ theme, lang, accent, Spinner, data }: Props) {
  const t = T[lang];
  const subColor = theme === 'dark' ? 'rgba(240,235,226,0.55)' : 'rgba(26,22,20,0.55)';
  const spinnerColor = theme === 'dark' ? '#f0ebe2' : '#1a1614';
  return (
    <view className={`root theme-${theme}`} style={{ '--accent': accent } as Record<string, string>}>
      <view className="chrome">
        <view className="chrome-dot" style={{ backgroundColor: accent, opacity: '0.65' }} />
        <text className="chrome-title">{t.chrome}</text>
      </view>

      <view className="body" style={{ display: 'flex', flexDirection: 'column' }}>
        <text className="chat-meta">{t.meta}</text>

        <view className="chat-bubble-user">
          <text className="chat-bubble-text">{t.bubble}</text>
        </view>

        <view className="chat-status">
          <view className="chat-status-spinner">
            <Spinner definition={data.dots} size={18} color={accent} />
          </view>
          <text className="chat-status-text">{t.thinking}</text>
        </view>

        <view className="chat-thoughts">
          <text className="chat-thought-label">{t.reasoning}</text>
          <view style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <view style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
              <view style={{ width: '14px', height: '14px', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner definition={data.arc} size={11} color={subColor} />
              </view>
              <text className="chat-thought-line">{t.step1}</text>
            </view>
            <view style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
              <view style={{ width: '14px', height: '14px', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner definition={data.breathe} size={11} color={subColor} />
              </view>
              <text className="chat-thought-line">{t.step2}</text>
            </view>
          </view>
        </view>

        <view className="chat-input">
          <text className="chat-input-placeholder">{t.placeholder}</text>
          <text className="chat-input-send">{t.send}</text>
        </view>
      </view>
      {/* keep this for tree-shaker / unused-warning silencing */}
      <view style={{ display: 'none' }}><text>{spinnerColor}</text></view>
    </view>
  );
}
