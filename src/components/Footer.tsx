
import { Github, Heart, Mail, Phone } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const teamMembers = [
    {
      name: "Kris Daniel Bendicio",
      email: "krisdanielbendicio12@gmail.com",
      phone: "09683125168"
    },
    {
      name: "Luis Kayne Dela Cruz",
      email: "luiskayne.delacruz2@gmail.com",
      phone: "09560852236"
    },
    {
      name: "Raymund Macaraeg",
      email: "raymund.macaraeg.320401@gmail.com",
      phone: "09683125094"
    }
  ];
  
  return (
    <footer className="w-full border-t bg-muted/50 py-4 md:py-6">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <span className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Smart Pantry. All rights reserved.
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 w-full md:w-auto">
            {teamMembers.map((member) => (
              <HoverCard key={member.name} openDelay={300} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="text-xs md:text-sm font-medium cursor-pointer hover:text-primary transition-colors text-center">
                    {member.name}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-72 p-4" align="center">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{member.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 md:h-5 md:w-5" />
            </a>
            
            <div className="flex items-center text-xs md:text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 md:h-4 md:w-4 mx-1 text-red-500" />
              <span>by Smart Pantry Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
