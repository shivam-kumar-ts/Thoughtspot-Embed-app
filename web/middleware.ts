import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (!request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host && !origin.includes(host)) {
        return NextResponse.json(
            { error: 'Forbidden' },
            { status: 403 },
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
