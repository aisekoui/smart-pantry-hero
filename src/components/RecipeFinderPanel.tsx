
import { Sparkles } from "lucide-react";

export function RecipeFinderPanel() {
  return (
    <div className="panel-container h-full">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2>AI Recipe Finder</h2>
        </div>
      </div>
      <div className="panel-content">
        <iframe 
          src="https://www.chatbase.co/chatbot-iframe/DzmRJGLmigb73Ry0EsL_E"
          width="100%" 
          height="100%" 
          className="min-h-[500px]" 
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
