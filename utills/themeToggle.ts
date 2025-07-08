export const toggleTheme = () => {
  if (typeof window === 'undefined') return;

  const root = window.document.documentElement;
  const isDark = root.classList.contains('dark');

  if (isDark) {
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

export const loadTheme = () => {
  if (typeof window === 'undefined') return;

  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
