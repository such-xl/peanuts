"use client"

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client"
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
};

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }
        return 'Active';
    }, [conversation]);
    return (
        <div className="bg-white w-full flex items-center justify-between px-4 py-3 sm:px-4 border-b-[1px] shadow-sm lg:px-6">
            <div className="flex items-center gap-3">
                <Link className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
                    href={`/conversations`}>
                        <HiChevronLeft/>
                </Link>
                <Avatar user={otherUser}/>
                <div className="flex flex-col">
                    <div>
                        {conversation.name||otherUser.name}
                    </div>
                    <div className="text-xs text-gray-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal size={32}
                onClick={() => console.log('clicked')}
                className="text-gray-500 cursor-pointer hover:text-sky-600 transition" />
        </div>
    )
};
export default Header;