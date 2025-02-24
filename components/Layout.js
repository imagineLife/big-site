import React, { useEffect } from 'react';

export default function Layout({ children, fullHeight, prose }) {
  const setAppTheme = () => {
    const darkMode = localStorage.getItem('theme') === 'dark';
    const lightMode = localStorage.getItem('theme') === 'light';

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else if (lightMode) {
      document.documentElement.classList.remove('dark');
    }
    return;
  };

  const handleSystemThemeChange = () => {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.onchange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
  };

  useEffect(() => {
    setAppTheme();
  }, []);

  useEffect(() => {
    handleSystemThemeChange();
  }, []);
  // ${
  //   !leftAlign ? 'items-center' : 'flex-start'
  // }
  const divClass = `flex flex-col max-w-5xl w-full mx-auto`;
  return (
    <main
      className={`relative pb-24 overflow-hidden${
        fullHeight ? ' h-auto' : ''
      } ${prose && 'prose dark:prose-dark mx-auto'}`}
    >
      <div className={divClass}>{children}</div>
    </main>
  );
}
