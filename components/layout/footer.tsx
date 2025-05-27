import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

import Image from "next/image";
import LogoBlackYellow from "@/app/assets/images/LogoBlackYellow.png";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={LogoBlackYellow}
                alt="Logo BB Real Estate"
                style={{ objectFit: "contain" }}
                className="w-25 md:w-30"
              />
            </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Su socio de confianza para encontrar la propiedad perfecta en Panamá.
              Con más de 15 años de experiencia en el mercado local.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="text-icon hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="text-icon hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                className="text-icon hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Enlaces Rápidos</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link 
                  href="/properties/buy" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Propiedades en Venta
                </Link>
              </li>
              <li>
                <Link 
                  href="/properties/rent" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Propiedades en Alquiler
                </Link>
              </li>
              <li>
                <Link 
                  href="/agents" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Nuestros Agentes
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Contáctenos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Áreas Populares</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link 
                  href="/locations/panama-city" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Ciudad de Panamá
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
                  Punta Pacífica
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
            <h3 className="text-lg font-medium">Información de Contacto</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-icon shrink-0" />
                <span className="text-muted-foreground">
                  Calle 50, Edificio Plaza 50, Suite 302, Ciudad de Panamá, República de Panamá
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-icon shrink-0" />
                <span className="text-muted-foreground">+507 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-icon shrink-0" />
                <span className="text-muted-foreground">info@bbrealestate.com.pa</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} B&B Real Estate. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-end">
              <Link href="/privacy-policy" className="hover:text-primary">
                Política de Privacidad
              </Link>
              <Link href="/terms-of-service" className="hover:text-primary">
                Términos de Servicio
              </Link>
              <Link href="/cookie-policy" className="hover:text-primary">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}