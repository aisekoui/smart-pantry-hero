
import { Sparkles } from "lucide-react";

export function RecipeFinderPanel() {
  return (
    <div className="h-full bg-primary/5 flex flex-col border-r border-primary/10">
      <div className="bg-primary/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">AI Recipe Finder</h2>
        </div>
        <div className="text-xs bg-primary/20 px-3 py-1 rounded-full text-primary-foreground font-medium">
          Powered by AI
        </div>
      </div>
      <div className="flex-grow">
        <iframe 
          src="https://www.chatbase.co/chatbot-iframe/DzmRJGLmigb73Ry0EsL_E"
          width="100%" 
          height="100%" 
          className="min-h-[600px] h-full" 
          frameBorder="0"
          title="AI Recipe Finder"
          aria-label="AI Recipe Finder Chatbot"
        ></iframe>
      </div>
    </div>
  );
}
