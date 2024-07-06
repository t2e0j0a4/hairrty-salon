import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/profile')) {
        const authToken = request.cookies.get('_salon__auth__token_')?.value;

        if (authToken === undefined || !authToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: '/profile/:path*'
}