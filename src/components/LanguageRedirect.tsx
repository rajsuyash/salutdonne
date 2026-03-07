import { Navigate } from 'react-router-dom';
import { detectLanguage } from '../i18n';

export default function LanguageRedirect() {
  const lang = detectLanguage();
  return <Navigate to={`/${lang}/`} replace />;
}
