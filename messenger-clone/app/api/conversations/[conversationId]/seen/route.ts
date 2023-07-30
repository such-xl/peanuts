import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";
interface IParams {
    conversationId?: string;
};

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();
        const {
            conversationId
        } = params;
        if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    }
                },
                users: true,
            }
        });
        if (!conversation) return new NextResponse("Not Found", { status: 404 });

        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) return NextResponse.json(conversation);

        const updateMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include:{
                sender:true,
                seen:true
            },
            data: {
                seen:{
                    connect:{
                        id:currentUser.id
                    }
                } 
            }
        });
        return NextResponse.json(updateMessage);
    }
    catch (error: any) {
        console.log(error, 'Error_MESSAGES_SEEN');
        return new NextResponse("Internal Error", { status: 500 });
    }
}