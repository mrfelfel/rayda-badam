import { NextRequest, NextResponse } from 'next/server';

// Simple SHA-256 hash for password comparison
async function hash(p: string): Promise<string> {
  const { createHash } = await import('crypto');
  return createHash('sha256').update(p).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ status: false, message: 'نام کاربری و رمز عبور را وارد کنید' }, { status: 400 });
    }

    // Try external API first (production)
    // External API (if configured)
    const API_URL = process.env.LOGIN_API_URL;
    if (API_URL) {
      try {
        const res = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.status) {
          return NextResponse.json({ status: true, token: data.token });
        }
      } catch {
        // External API unavailable, fall through to local auth
      }
    }

    // Local dev auth (seed data)
    const DEV_USERS: Record<string, { password: string; token: string }> = {
      '4311370891': { password: await hash('admin123'), token: 'dev-admin-token-4311370891' },
      '1234567890': { password: await hash('student123'), token: 'dev-student-token-1234567890' },
    };

    const user = DEV_USERS[username];
    const inputHash = await hash(password);

    if (user && user.password === inputHash) {
      return NextResponse.json({ status: true, token: user.token });
    }

    return NextResponse.json({ status: false, message: 'نام کاربری یا کلمه عبور صحیح نیست' }, { status: 401 });
  } catch {
    return NextResponse.json({ status: false, message: 'خطای سرور' }, { status: 500 });
  }
}
