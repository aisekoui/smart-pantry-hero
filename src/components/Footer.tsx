
import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted py-6">
      <div className="container">
        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4" />
              <span className="text-sm">krisdanielbendicio12@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">09683125168</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4" />
              <span className="text-sm">luiskayne.delacruz2@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">09560852236</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4" />
              <span className="text-sm">raymund.macaraeg.320401@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">09683125094</span>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Smart Pantry. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
