import { createContext, ReactNode } from 'react';

export type ContextTypes = {
  breakPoint: number,
};

// Contextオブジェクトを生成する（初期値）
export const CommonContext = createContext<ContextTypes>({
  breakPoint: 768,
});

// 生成したContextオブジェクトのProviderを定義する
export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const contextValue = {
    breakPoint: 0,
  };

  return (
    <CommonContext.Provider value={contextValue}>
      {children}
    </CommonContext.Provider>
  );
}
