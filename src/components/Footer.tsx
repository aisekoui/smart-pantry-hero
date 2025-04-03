
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
    <footer className="w-full border-t bg-muted/50 py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-sm text-muted-foreground">
              © {currentYear} Smart Pantry. All rights reserved.
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 md:mb-0">
            {teamMembers.map((member) => (
              <HoverCard key={member.name}>
                <HoverCardTrigger asChild>
                  <div className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
                    {member.name}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{member.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>by Smart Pantry Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
