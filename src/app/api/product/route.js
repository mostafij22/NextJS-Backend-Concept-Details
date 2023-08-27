import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


//GET()
export async function GET(req, res){

    redirect("/");
}


//GET()
export async function GET(req, res){

    const {searchParams} = new URL(req.url);
    let id = searchParams.get('id')
    return NextResponse.json({msg: id})
}



// //POST()
export async function POST(req, res){

    const {searchParams} = new URL(req.url);
    let id = searchParams.get('id');
    let name = searchParams.get('name');
    let city = searchParams.get('city');

    return NextResponse.json({msg: id, name, city})
}


// //Cookies Request
export async function POST(req, res){

    let csrf_token = req.cookies.get('csrf_token');
    return NextResponse.json({msg: csrf_token})
}


// Request Response
export async function POST(req, res){

    return NextResponse.json([
        {name:"Rabbil", city:"Dhaka", age:33},
        {name:"Rabbil", city:"Dhaka", age:33},
        {name:"Rabbil", city:"Dhaka", age:33},
        {name:"Rabbil", city:"Dhaka", age:33}
    ], {
        status:201,
        headers:{'token': 'XYZ-ABC-123'}
    })
}


//Request Response Cookies set
export async function POST(req, res){

    return NextResponse.json([
        {name:"Rabbil", city:"Dhaka", age:33},
        {name:"Rabbil", city:"Dhaka", age:33},
        {name:"Rabbil", city:"Dhaka", age:33},
        {name:"Rabbil", city:"Dhaka", age:33}
    ], {
        status:201,
        headers:{'Set-Cookie': 'token=123; path=/'}
    })
}

// //PUT
export async function PUT(req, res){
    return NextResponse.json({msg: "I am PUT"})
}

//Delete
export async function DELETE(req, res){
    return NextResponse.json({msg: "I am DELETE"})
}




//Login sytem from Middleware

export async function GET(req, res){

    const list = headers();
    const user_id = list.get('user_id')
    const user_email = list.get('user_email')

    return NextResponse.json({
        user_id:user_id,
        user_email:user_email
    })
}

