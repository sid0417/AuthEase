/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

connect()

export async function POST(request: NextRequest){

  try {
    const reqBody = await request.json();
    const{email, password} = reqBody;

    console.log(reqBody)

  //check if user exist
  const user = await User.findOne({email})
  if(!user){
    return NextResponse.json({error:"User does not exist"},
      {status:400})
  }

  //check password is correct 
  const validPassword = await bcrypt.compare(password, user.password)
  if(!validPassword){
    return NextResponse.json({error:"Invalid password"},
      {status:400})
    }

    //create token data 
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }
    //create token 
    const token = await JWT.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d"
    })

    const response = NextResponse.json({
      message:"Login success",  
      success:true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    })

    return response;

  } catch (error: any) {
    return NextResponse.json({error:error.message},
      {status:500})
    
  }
}