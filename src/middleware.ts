/* eslint-disable import/no-default-export */
import type { NextRequest } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { supportedLangs } from '@/lang/getDictionary';

function getLang(preferredLang: string): string {
    const requestedLang = new Negotiator({
        headers: { 'accept-language': preferredLang },
    }).languages();

    const defaultLang = 'es';

    return match(requestedLang, supportedLangs, defaultLang);
}

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLang = supportedLangs.some(
        (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
    );
    const isAsset = [
        '.png',
        '.jpg',
        '.svg',
        '.ico',
        '.mp3',
        '.mp4',
        '.webp',
        '.json',
        '.bin',
        '.task',
    ].some((ext) => pathname.endsWith(ext));

    if (pathnameHasLang || isAsset) return;

    const preferredLang = request.headers.get('accept-language')!;

    const lang = getLang(preferredLang);

    request.nextUrl.pathname = `/${lang}${pathname}`;

    return Response.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
