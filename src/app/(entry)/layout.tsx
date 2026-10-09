import '@fontsource-variable/host-grotesk/wght.css';
import '@fontsource-variable/noto-sans-tc/wght.css';
import '../globals.css';

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return <html data-scroll-behavior="smooth" lang="zh-Hant"><body>{children}</body></html>;
}
