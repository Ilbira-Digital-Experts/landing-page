import { LANGS } from './ui';

export function langStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}
