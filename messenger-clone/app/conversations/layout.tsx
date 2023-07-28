import getConversations from "../actions/getConverSations"
import Sidebar from "../components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function conversationLayout({
    children
}:{
    children:React.ReactNode
}) {
    const conversations = await getConversations();
    return(
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations}/>
                {children}
            </div>
        </Sidebar>
    )
}