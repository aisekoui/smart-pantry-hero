
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { useIsMobile } from "@/hooks/use-mobile";

export function FloatingContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 rounded-full shadow-lg ${isMobile ? 'scale-90' : ''}`}
        size={isMobile ? "sm" : "default"}
        aria-label="Send us a message"
      >
        <MessageSquare className="h-4 w-4 mr-1 md:h-5 md:w-5 md:mr-2" />
        <span className="text-xs md:text-sm">Send Message</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>Send Us a Message</DialogTitle>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
