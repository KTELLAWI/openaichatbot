import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limiters";


// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
//   const ip = req.ip ?? '127.0.0.1'

//   try {
//    const { success } = await rateLimiter.limit(ip)
//  // const success=true;

//     if (!success) return new NextResponse('لقد تجازوت الحد المسموح به للأسئلة ')
//     return NextResponse.next()
//   } catch (error) {
//     return new NextResponse(
//       'حدث خطا ما '
//     )
//   }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/api/message/:path*',
// }