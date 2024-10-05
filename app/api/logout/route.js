// app/api/logout/route.js
export async function POST(req) {
    // Clear the session by setting a cookie with an expired date
    const res = new Response(JSON.stringify({ message: 'Logged out successfully' }), {
      status: 200,
    });
  
    // Set the cookie to expire
    res.headers.append('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;');
  
    return res;
  }
  