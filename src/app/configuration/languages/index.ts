export * from './Punjabi';
export { HindiConfig } from './Hindi';
import { PunjabiConfig } from './Punjabi';
import { HindiConfig } from './Hindi';
import { LanguageConfig } from './Punjabi';

export const AvailableLanguages: { value: string; label: string; config: LanguageConfig }[] = [
  { value: 'punjabi', label: 'Punjabi', config: PunjabiConfig },
  { value: 'hindi', label: 'Hindi', config: HindiConfig },
];

export const ActiveLanguage = PunjabiConfig;
