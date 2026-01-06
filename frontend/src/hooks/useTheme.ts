// src/hooks/useTheme.ts

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    // Verificar la preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Aplicar el tema usando el atributo data-bs-theme de Bootstrap para modo oscuro nativo
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.body.className = 'bg-dark text-light';
    } else {
      document.documentElement.removeAttribute('data-bs-theme');
      document.body.className = 'bg-light text-dark';
    }

    // Guardar en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};