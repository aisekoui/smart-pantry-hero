
import { Sparkles } from "lucide-react";

export function RecipeFinderPanel() {
  return (
    <div className="h-full bg-primary/10 flex flex-col">
      <div className="bg-primary/20 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2>AI Recipe Finder</h2>
        </div>
      </div>
      <div className="flex-grow">
        <iframe 
          src="https://www.chatbase.co/chatbot-iframe/DzmRJGLmigb73Ry0EsL_E"
          width="100%" 
          height="100%" 
          className="min-h-[600px] h-full" 
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
