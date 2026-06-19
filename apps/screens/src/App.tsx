import { useGlobalProps, useInitData } from '@lynx-js/react';
import { Spinner } from '../../../src/lynx/Spinner';
import * as data from '../../../src/data';
import './App.css';

import { ChatScreen } from './screens/Chat';
import { ToolsScreen } from './screens/Tools';
import { TasksScreen } from './screens/Tasks';

interface Payload {
  screen?: string;
  accent?: string;
  theme?: 'light' | 'dark';
}

export function App() {
  // The host (presentation/index.html) sets *both* globalProps and initData.
  // useGlobalProps wins when present because it survives across reloads.
  const init = useInitData() as Payload | undefined;
  const global = useGlobalProps() as Payload | null;
  const cfg: Payload = { ...(init ?? {}), ...(global ?? {}) };

  const screen = (cfg.screen ?? 'chat') as 'chat' | 'tools' | 'tasks';
  const theme = cfg.theme === 'dark' ? 'dark' : 'light';
  const accent = cfg.accent ?? (theme === 'dark' ? '#e69d8c' : '#c14a3a');

  return (
    <page>
      <view className={`root theme-${theme}`} style={{ '--accent': accent } as Record<string, string>}>
        {screen === 'chat'  && <ChatScreen theme={theme} accent={accent} Spinner={Spinner} data={data} />}
        {screen === 'tools' && <ToolsScreen theme={theme} accent={accent} Spinner={Spinner} data={data} />}
        {screen === 'tasks' && <TasksScreen theme={theme} accent={accent} Spinner={Spinner} data={data} />}
      </view>
    </page>
  );
}
