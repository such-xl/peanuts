import bcrypt from 'bcryptjs'
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, password } = body;
        if (!email || !name || !password) {
            return new NextResponse('Missing info',{ status: 400 });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt);

        const user = await prisma.user.create({
            data: { email, name, hashedPassword }
        });
        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error,'REGISTRATION ERROR');
        return new NextResponse('Internal Error',{status:500});
    };
}