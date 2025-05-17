import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6" />
              <span className="font-bold text-xl">BB Real Estate</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Your trusted partner in finding the perfect property in Panama. 
              With over 15 years of experience in the local market.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link 
                  href="/properties/buy" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link 
                  href="/properties/rent" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link 
                  href="/agents" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Our Agents
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Popular Areas</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link 
                  href="/locations/panama-city" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Panama City
                </Link>
              </li>
              <li>
                <Link 
                  href="/locations/costa-del-este" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Costa del Este
                </Link>
              </li>
              <li>
                <Link 
                  href="/locations/punta-pacifica" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Punta Pacifica
                </Link>
              </li>
              <li>
                <Link 
                  href="/locations/casco-viejo" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Casco Viejo
                </Link>
              </li>
              <li>
                <Link 
                  href="/locations/coronado" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Coronado
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Contact Information</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  Calle 50, Edificio Plaza 50, Suite 302, Panama City, Republic of Panama
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+507 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">info@bbrealestate.com.pa</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} BB Real Estate. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-end">
              <Link href="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}