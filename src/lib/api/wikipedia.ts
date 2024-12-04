import type { Document, Section } from 'wtf_wikipedia';
import wtf from 'wtf_wikipedia';
import type { RaceBackground } from './types/Races';

function ensureArray(value: Section | Section[]) {
  return Array.isArray(value) ? value : [value];
}

export async function fetchBackground(
  name: string,
): Promise<{ hasBackground: boolean; background: RaceBackground }> {
  const document: Document = await wtf.fetch(name);
  const section: Section | null = document.section('Background');
  let hasBackground = false;
  const info: RaceBackground = { text: '', children: [], url: document.url() };

  if (section !== null) {
    hasBackground = true;
    info.text = section.text({});
    if (section.children() !== null) {
      const children: Section[] = ensureArray(section.children()!);
      info.children = children.map((child) => {
        return { title: child.title(), text: child.text({}) };
      });
    }
  } else {
    let text = document.section(0)?.text({});
    if (text === undefined) {
      text = '';
    }
    info.text = text;
  }

  return {
    hasBackground: hasBackground,
    background: info,
  };
}
