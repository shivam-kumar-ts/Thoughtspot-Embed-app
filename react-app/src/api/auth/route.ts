import { NextResponse } from 'next/server';
import { HOST, USERNAME, API, ERROR_MESSAGES } from '@/app/utils/constants';

const TS_PASSWORD = process.env.TS_PASSWORD || '';

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));

        const host = (body?.host || HOST).trim();
        const username = (body?.username || USERNAME).trim();
        const password = body?.password || TS_PASSWORD;

        const response = await fetch(
            `${host}${API.TS_AUTH_PATH}`,
            {
                method: 'POST',
                headers: {
                    accept: API.CONTENT_TYPE,
                    'content-type': API.CONTENT_TYPE,
                },
                body: JSON.stringify({
                    username,
                    validity_time_in_sec: API.VALIDITY_TIME_IN_SEC,
                    auto_create: false,
                    password,
                }),
            },
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `${ERROR_MESSAGES.AUTH_TOKEN_FETCH}: ${response.statusText}` },
                { status: response.status },
            );
        }

        const data = await response.json();
        if (!data?.token) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.AUTH_TOKEN_MISSING },
                { status: 500 },
            );
        }

        return NextResponse.json({ token: data.token });
    } catch (error) {
        console.error('Auth token fetch error:', error);
        return NextResponse.json(
            { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
            { status: 500 },
        );
    }
}
