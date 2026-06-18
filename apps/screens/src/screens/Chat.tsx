import type * as data from '../../../../src/data';

interface Props {
  accent: string;
  Spinner: any;
  data: typeof data;
}

export function ChatScreen({ accent, Spinner, data }: Props) {
  return (
    <view className="root" style={{ '--accent': accent } as Record<string, string>}>
      <view className="chrome">
        <view className="chrome-dot" style={{ backgroundColor: accent, opacity: '0.65' }} />
        <text className="chrome-title">claude · drafting reply</text>
      </view>

      <view className="body" style={{ display: 'flex', flexDirection: 'column' }}>
        <text className="chat-meta">11:42 · YOU</text>

        <view className="chat-bubble-user">
          <text className="chat-bubble-text">
            What changed in the auth middleware last week? Summarize for the changelog.
          </text>
        </view>

        <view className="chat-status">
          <view className="chat-status-spinner">
            <Spinner definition={data.dots} size={18} color={accent} />
          </view>
          <text className="chat-status-text">Thinking…</text>
        </view>

        <view className="chat-thoughts">
          <text className="chat-thought-label">REASONING</text>
          <view style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <view style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
              <view style={{ width: '14px', height: '14px', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner definition={data.arc} size={11} color="rgba(26,22,20,0.55)" />
              </view>
              <text className="chat-thought-line">Reading 4 files in src/auth/</text>
            </view>
            <view style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
              <view style={{ width: '14px', height: '14px', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner definition={data.breathe} size={11} color="rgba(26,22,20,0.55)" />
              </view>
              <text className="chat-thought-line">Comparing main…HEAD~6</text>
            </view>
          </view>
        </view>

        <view className="chat-input">
          <text className="chat-input-placeholder">Reply, or ask a follow-up…</text>
          <text className="chat-input-send">↵ SEND</text>
        </view>
      </view>
    </view>
  );
}
