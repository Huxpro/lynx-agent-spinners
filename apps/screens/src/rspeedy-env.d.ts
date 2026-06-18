/// <reference types="@lynx-js/rspeedy/client" />

declare module '@lynx-js/types' {
  interface GlobalProps {}
  interface InitData {
    screen?: 'chat' | 'tools' | 'tasks';
    accent?: string;
  }
}

export {}
