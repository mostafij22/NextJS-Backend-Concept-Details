Backend (web application work in Request,Response Model)
=====================

Route (route.js hosse MVC er controller file)
=========
app directory vitor => api folder create korte hobe ja backend hisebe kaj korbe
api folder er vitor joto essa folder/directory neya jabe, and route.js file create korte hoy
ja convention of NextJS , route.js file hosse backend

akta route.js file Get(),POST(),PUT(),DELETE() aksate sob request manage korte pare

NextJS request,response manage korar jonno building 2ta Property deyese and 2ta parameter
deyese (req,res)
1. import { NextResponse } from "next/server";
2. import { NextRequest } from "next/server";

NextJS er response bydefault json niye kaj kore.

export async function GET(req, res){
    return NextResponse.json({msg: "I am GET"})

    route.js file er vitor
    ----------------------
    //Calculation kora hoi
    //Business Logic likha hoi
    // Model niye kaj hoi
    // Database operation hoi
    //Security niye kaj hoi
    // Heavy Execution niye kaj hoi
    Backend related sobkisu akhane hoi

}







Request Parameter (URL parameter)
================================
URL parameter, means url er sate je query string send kora hoi seta. url er vitor je nam
diye parameter send kora hoi, sei nam diyei receive korte hoi.
query string find korar jonno => {searchParams} use hoi ja NextJS er building property.   
request er url k catch korar jonno => new URL(req.url); syntax use hoi.

Single URL parameter:> http://localhost:3000/api/product?id=100

export async function GET(req, res){
    const {searchParams} = new URL(req.url);
    let id = searchParams.get('id')
    return NextResponse.json({msg: id})
}

Multiple URL parameter:> http://localhost:3000/api/product?id=100&name=Rabbil&city=Dhaka

export async function POST(req, res){

    const {searchParams} = new URL(req.url);
    let id = searchParams.get('id');
    let name = searchParams.get('name');
    let city = searchParams.get('city');

    return NextResponse.json({msg: id, name, city})
}


How to send Request in body
=============================
Request er body hote pare form-data, GraphQL,
Request er body jokhon GraphQL hoi, tokhon business logic er upor backend er
control r thake na,backend er control gulu Frontend er vitor chole ase.
Request send korbo amra JSON diye and form-data diye that is use massively.
syntax: req.json();
        req.formData();

postman Body/raw
----------------
{
    "name":"Jhon De",
    "city":"Dhaka",
    "age": 33
}
export async function POST(req, res){
    const reqBody = await req.json();
    let name = reqBody['name'];
    let city = reqBody['city'];
    let age = reqBody['age'];

    return NextResponse.json({name, city, age})
}

postman Body/form-dat
---------------------
form-data key,value akare hoi not a json data , so receive korbo .get() diye
key value
name Rabbil
city Dhaka
country Bangladesh

export async function POST(req, res){

    const reqBody = await req.formData();

    let name = reqBody.get('name');
    let city = reqBody.get('city');
    let country = reqBody.get('country');

    return NextResponse.json({name:name, city:city, country:country})
}




Request Headers
===============
import { headers } from "next/headers";
headers();

postman 
-------
key        value
Auth-Token 123-XYZ-ABC

export async function POST(req, res){

    let headList = headers();
    let Token = headList.get('Auth-Token');

    return NextResponse.json({msg: Token})
}




Request Cookies
===============
Request er cookies browser theke ase, browser er Storage system gulur modhe Cookies akta 
storage. Authentication token niye kaj kora somoy Cookies rekhe kaj kora hoi. that is best
practice ja web application jonno recommanded. we will store our Authentication token,
JWT Bearer/Token and any encryt type data we will cookies.

at first akta cookies set kore nite hoi, localhost/domain jonno . http://localhost:3000
Cookies set: csrf_token=ABC-XYZ-123; Path=/; Expires=Mon, 26 Aug 2024 09:11:17 GMT;

export async function POST(req, res){

    let csrf_token = req.cookies.get('csrf_token');
    return NextResponse.json({msg: csrf_token})
}

cookies data catch korar jonno: req.cookies.get('cookies nam') ;


jodi amra web application er vitor e data browser e store kori tahole cookies korbo ,
jodio React e Local storage , session strorage e data store kora hoi. but application e 
cookies vitor data store kora recomanded. security purpose data k encrypt korte hoi, jate
kew na bujhe , JWT diye a e data k encrypt kora hoi, JWT chharao onek encrypt korar system 
ase, 




Request Response code
=====================
Request response akta object hote pare, array hote pare.
array multiple object hold kore. json() array k return korte pare.
Response e status code niye kaj hoi. response er sate bivinno status code pass korte
pari. sob kisu thik thakle NextJS default 200 ok status code pathai. amra custom status
code set kore dite pari proyojon onnusare. 

NextResponse.json();

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

first parameter/property hosse json object/array ja data/body and 2nd parameter/property 
hosse json object ja status code  and header  set kora jai 


Response vitor Cookies set 
============================
headers er vitor Set-Cookie likhe , cookie te kiki thakbe ta ullek kora hoi
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



Redirect
===========
if user not authenticate tokhon amra redirect use korbo, user k redirct kore 
akta jaiga theke R akta jaigai send korai redirect er kaj. redirect NextJS er
navigation e building akta property. user jokhon unauthenticate obostai thakbe , redirect 
kore home page pathai dibo. Frontend theke redirect korle manupulate korar possibility thake
but backend theke redirect korle manupulate korar kono possibility thake na.

import { redirect } from "next/navigation";
redirect();

export async function GET(req, res){

    redirect("/");
}






middleware
====================
Request er pore and  Response er age jodi kono code execute hoi, tahole seta k amra boli
middleware. middleware diye amra request and response k manage korte pari.

NextJS e midddleware, hosse source directory vitor akta file create korte hobe middleware
nam diye. source/root directory te aktai middleware nam e file thakbe, oi file er vitor
akta function thakbe jeta fixed. jar nam o hobe middleware . and jodi amra middleware er 
vitor specific routing path, configuration etc jodi bole na dei tahole middleware aka aka
execute hoi. proti request response e aka aka execute hobe. 
  
amra middleware e NextResponse and NextRequest, headers  niye kaj korte pari. aber request 
response parameter (req,res) niyeo kaj korte pari.

export function middleware(req,res){
    console.log("I am middleware")
}

midddleware theke amra application er security manage korte pari, onek gulu security 
parameter middleware theke manage kora jai, authentication, authorization theke suru kore
protita bisoy amra manage korte pari, user jodi authenticate na hoi tahole user k 
controller e jete deya hobe na middleware ta atkai dibe,

middleware k amra specific path bole dite pari, jemon kisu directory login er age kaj korbe,
kisu login er pore kaj korbe, sei direction ta bole dite pari 

export const config={
    matcher: ["/api/:path*", "/site"]
}
akhane bola holo all api theke and site directory theke request gele middleware kaj korbe.


amra conditional statement er maddhomeo path direction set korte pari.
ajonno request theke url ta dorte pari, kon url theke astese 

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



//Auth Login 
//Cookies 
//Session
//Rate Limiting
//Token Refresh
//JWT Token Encode-Decode
//Private Key Public key

actually amader joto application er business calculation theke suru kore , application er
joto execution ase -database execution,backend execution etc sob execution er main jaiga
hosse controller. prothome akta application er vitor akta request ase , sei request ta jai
routing end point e then routing end point theke material gulu enter kore Middleware er 
vitor then finally jai controller er vitor. request controller e jawer age ja kisu 
varification korar dorkar ta Middleware vitor kora hoi. otherwise user k controller 
porjonto enter korai jabe na. jekarone application er security jonno Middleware er gurutto
sobchaite besi. Middleware kintu akta special type of controller. MVC pattern e chinta 
korle route.js file hosse Controller. NextJS er je directory system ta aka akai routing
gulu kore dei , je karone routing configaration korar dorkar hoi na. jodi express.js hoto
tahole alada vabe routing configure korte hoto. 


Request, Response er 3ta part
1. Request header 2.body 3.url

middleware er kase header er part ta besi important, karon hosse jokhon amra kono token
amra pathai ba kono Cookies amra pathai, kono authentication,authorization , API key etc
jokhon pathai, a e sobkisu amra header diye pathai . security parameter gulu kokhono amra
body diye pass korai na. ba url parameter diye pass korai na. security related sob kisu 
amra pathai header diye. je karone middleware kase sob chaite important hosse request 
header. 

Middleware e Request and Response Header er use
==============================================
Middleware vitor header property kaj kore na: import { headers } from "next/headers";
NextJs e building headers nam akta class ase, sei class object create kore headers use hoi.
object k dhorar somoy: 2 vabe dhorte pari .dot diye and ['object']
//reqHeader.name; jodi oi object ta code er bahire thake ba bahire theke neya hoi
//reqHeader['name'] jodi oi object ta code er vitor thake 

middleware vitor header dhorar system hosse : new Headers(req.headers).
request er headers gulu key value pair akare thake. 

//token er value checking
export function middleware(req,res){
    if(req.nextUrl.pathname.startsWith("/api/product")){
        const reqHeaders = new Headers(req.headers);

        const token = reqHeaders.get('token');

        if(token==="123-XYZ"){
           return NextResponse.next();
        }
        else{
           return NextResponse.json({}, {status: 401})
           //redirect('/')
        }
    }
}

akhane , token jodi 123-XYZ hoi, tahole next() means porer dhape orthat controller e
access koro. R jodi 123-XYZ na hoi, tahole error message show koro ba redirect(), kore
home ba registration page e jaw. 


//Request Header manupulate (token er value checking)
//User Login system

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

//route.js (Controller)
export async function GET(req, res){

    const list = headers();
    const user_id = list.get('user_id')
    const user_email = list.get('user_email')

    return NextResponse.json({
        user_id:user_id,
        user_email:user_email
    })
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



