import { useSettings } from '@/app/contexts/SettingsContext';

export function useHighContrastStyles() {
  const { highContrast } = useSettings();

  const cardClass = highContrast 
    ? 'border-2 border-[var(--app-gray-900)]' 
    : 'border-2 border-[var(--app-gray-200)]';

  const buttonClass = highContrast
    ? 'border-2 border-blue-900 font-semibold shadow-md'
    : '';

  const chipClass = (baseColor: string) => {
    if (!highContrast) return '';
    
    const borderColors: Record<string, string> = {
      'blue': 'border-blue-900',
      'orange': 'border-orange-900',
      'green': 'border-green-900',
      'gray': 'border-gray-700',
    };
    
    return `border ${borderColors[baseColor] || 'border-gray-900'} font-semibold`;
  };

  const textClass = highContrast ? 'font-medium' : '';
  
  const headingClass = highContrast ? 'font-bold text-black' : '';

  return {
    highContrast,
    cardClass,
    buttonClass,
    chipClass,
    textClass,
    headingClass,
  };
}
