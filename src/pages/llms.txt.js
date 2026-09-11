import { owner, metadata } from '../lib/config';

export async function GET() {
    const intro = owner.intro
        .map((paragraph) => paragraph.replace(/<[^>]*>/g, '')
            .trim());

    const content = [
        `# ${metadata.siteName}`,
        '',
        `> ${metadata.description}`,
        '',
        `- Site owner: ${owner.displayName}`,
        `- Kana: ${owner.kanaName}`,
        '',
        `## About ${owner.displayName}`,
        '',
        ...intro.flatMap((paragraph) => [paragraph, '']),
    ].join('\n');

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
