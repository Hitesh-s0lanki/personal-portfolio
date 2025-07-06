import BlankScreen from "./blank-screen";
// import ChatMessage from "./chat-message";
import { ChatPrompt } from "./chat-prompt";

const ChatScreen = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center relative flex-col py-5 md:py-10 lg:py-10 gap-5">
      {/* <NavbarDemo /> */}
      <div className=" absolute h-full w-full blur-lg bg-[url('/bg-design.svg')] -z-10" />

      <BlankScreen />
      {/* <ChatMessage /> */}
      <ChatPrompt />
    </div>
  );
};

export default ChatScreen;
