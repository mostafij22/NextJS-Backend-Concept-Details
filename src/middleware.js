import { NextResponse } from "next/server";
import { NextRequest } from "next/server";




export function middleware(req,res){
    if(req.nextUrl.pathname.startsWith("/api/product")){
        console.log("I am api middleware")
    }
    else if(req.nextUrl.pathname.startsWith("/dashboard")){
        console.log("I am dashboard middleware")
    }
    else if(req.nextUrl.pathname.startsWith("/site")){
        console.log("I am site middleware")
    }
}


export const config={
    matcher: ["/api/:path*", "/site"]
}



//Request Header
//Response Header

//Request Header Manupulate (Login system/token er value checking)
export function middleware(req,res){
    if(req.nextUrl.pathname.startsWith("/api/product")){
        const reqHeaders = new Headers(req.headers);

        const token = reqHeaders.get('token');

        if(token==="123-XYZ"){
           reqHeaders.set('user_id', '001');
           reqHeaders.set('user_email', 'user@user.com') 
           return NextResponse.next({
             request: {headers:reqHeaders}
           });
        }
        else{
           return NextResponse.json({}, {status: 401})
        }
    }
}



//Response Header Manupulate (Cookies time set up)
export function middleware(req,res){

    const reqHeaders = new Headers(req.headers);
    const token = reqHeaders.get('token');

    if(token==="123-XYZ"){
        const response = NextResponse.next();
        response.headers.set('Set-Cookie', 'myCookie=myValue; Expires=Sun, 27 Aug 2023 22:20:00 GMT; Path=/; Secure; HttpOnly');
        return response;
    }
    else{
        return NextResponse.json({}, {status: 401})
    } 
       
}

