import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [headerConfig, setHeaderConfig] = useState({
    title: "GreenMind",
    subtitle: "Blog",
    links: [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' }
    ],
    showSearch: true
  });

  const updateHeader = (config) => {
    setHeaderConfig(prev => ({ ...prev, ...config }));
  };

  return (
    <AppContext.Provider value={{ headerConfig, updateHeader }}>
      {children}
    </AppContext.Provider>
  );
};