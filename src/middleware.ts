import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
    const urlPath = request.nextUrl.pathname;
    const authToken = request.cookies.get('_salon__auth__token_')?.value;
    if (urlPath.startsWith('/profile')) {

        if (authToken === undefined || !authToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

    }
    if (urlPath.startsWith('/login')) {
        if (authToken) {
            return NextResponse.redirect(new URL('/profile', request.url))
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/login']
}