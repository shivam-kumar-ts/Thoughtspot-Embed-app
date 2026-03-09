import { NextResponse } from 'next/server';

const TS_HOST = process.env.NEXT_PUBLIC_TS_HOST || '';
const TS_USERNAME = process.env.NEXT_PUBLIC_TS_USERNAME || '';
const TS_PASSWORD = process.env.TS_PASSWORD || '';
const VALIDITY_TIME_IN_SEC = 3600;

export async function POST() {
    try {
        const response = await fetch(
            `${TS_HOST}/api/rest/2.0/auth/token/full`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: TS_USERNAME,
                    validity_time_in_sec: VALIDITY_TIME_IN_SEC,
                    auto_create: false,
                    password: TS_PASSWORD,
                }),
            },
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch auth token: ${response.statusText}` },
                { status: response.status },
            );
        }

        const data = await response.json();
        if (!data?.token) {
            return NextResponse.json(
                { error: 'No token received in response' },
                { status: 500 },
            );
        }

        return NextResponse.json({ token: data.token });
    } catch (error) {
        console.error('Auth token fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
