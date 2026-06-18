import { useInitData } from '@lynx-js/react';
import { Spinner } from '../../../src/lynx/Spinner';
import * as data from '../../../src/data';
import './App.css';

import { ChatScreen } from './screens/Chat';
import { ToolsScreen } from './screens/Tools';
import { TasksScreen } from './screens/Tasks';

export function App() {
  const init = useInitData() as { screen?: string; accent?: string } | undefined;
  const screen = (init?.screen ?? 'chat') as 'chat' | 'tools' | 'tasks';
  const accent = init?.accent ?? '#c14a3a';

  return (
    <page>
      <view className="root" style={{ '--accent': accent } as Record<string, string>}>
        {screen === 'chat'  && <ChatScreen accent={accent} Spinner={Spinner} data={data} />}
        {screen === 'tools' && <ToolsScreen accent={accent} Spinner={Spinner} data={data} />}
        {screen === 'tasks' && <TasksScreen accent={accent} Spinner={Spinner} data={data} />}
      </view>
    </page>
  );
}
