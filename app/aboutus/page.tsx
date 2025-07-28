import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import HeroBg from "@/app/assets/images/HeroBg.jpg";

export default function AboutUsPage() {
  const whatsappNumber = '50761099881';

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <Image
          src={HeroBg}
          alt="AboutUs - B&B Real Estate Panama"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Agencia Inmobiliaria en Panamá – Profesionalismo, Ética y Resultados
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg leading-relaxed mb-8">
              En B&B Real Estate somos líderes en bienes raíces en Panamá. Con años de experiencia, 
              gestionamos compraventas, alquileres y administración de propiedades residenciales y comerciales. 
              Nuestro compromiso es ofrecer soluciones personalizadas y efectivas que maximicen el valor 
              para nuestros clientes.
            </p>
            <p className="text-xl font-semibold text-primary">
              Especialistas en propiedades de lujo y de inversión.
            </p>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Seller Services */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Servicio al Propietario | Vende o Alquila tu Propiedad en Panamá
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Vende o alquila tu propiedad con expertos</h3>
                <p className="mb-6">
                  Ofrecemos marketing inmobiliario de alto impacto, acceso al sistema MLS Panamá, 
                  análisis comparativo de mercado y estrategias de promoción que garantizan mayor 
                  visibilidad y cierres más rápidos.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary">71%</div>
                    <div className="text-sm">cierre efectivo bajo modelo MLS</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary">56</div>
                    <div className="text-sm">días promedio para ventas</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary">65</div>
                    <div className="text-sm">días promedio para alquileres</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-center">Vende tu propiedad ahora</h3>
                {/* Add contact form component here */}
                <Link href="https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent('Hola, quiero vender mi propiedad')}&type=phone_number&app_absent=0" 
                  target="_blank">
                  <Button className="w-full cursor-pointer">
                    Contactar ahora
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Buyer Services */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Servicio al Comprador | Encuentra tu Propiedad Ideal en Panamá
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Asesoría integral y acompañamiento total</h3>
                <p className="mb-6">
                  Brindamos asesoría completa en la búsqueda de tu hogar o inversión. Te guiamos desde 
                  la selección hasta la aprobación bancaria y el cierre legal.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Búsqueda personalizada según presupuesto y estilo de vida
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Asistencia en aprobación bancaria
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Comparación de opciones de financiamiento
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-center">Empieza tu búsqueda con nosotros</h3>
                {/* Add contact form component here */}
                <Link href="/properties?transactionType=buy">
                  <Button className="w-full cursor-pointer">
                    Iniciar búsqueda
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Property Management Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Administración de Propiedades | Gestión Profesional en Panamá
            </h2>
            <div className="grid gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Administración inmobiliaria segura y estratégica</h3>
                <p className="mb-6">
                  Gestionamos propiedades residenciales y comerciales con enfoque en seguridad, control y rentabilidad. 
                  Seleccionamos inquilinos calificados, gestionamos cobros y brindamos reportes financieros detallados.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Evaluación constante del inventario
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Marketing estratégico basado en tendencias del mercado
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Sistema digital de seguimiento y rendición de cuentas
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Services Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Servicios Legales | Soluciones para Inversionistas y Propietarios
            </h2>
            <div className="grid gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Soluciones legales integrales en bienes raíces y migración</h3>
                <p className="mb-6">
                  Nuestro equipo de abogados brinda servicios especializados en derecho inmobiliario, migratorio y corporativo:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Contratos de compra-venta y alquiler
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Constitución de sociedades y fundaciones
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Residencia para inversionistas y jubilados
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Impuestos, legalizaciones y reubicación
                  </li>
                </ul>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Programa de Inversionistas Calificados</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Inversión mínima: $300,000 en bienes raíces o plazo fijo
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Residencia permanente en 30 días
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Aplicación remota con poder especial
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4">Visa de Jubilado o Pensionado</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Requiere pensión vitalicia mínima de $1,000 mensuales
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Derecho a residencia permanente en Panamá
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Nuestro Equipo | Profesionales Inmobiliarios en Panamá
            </h2>
            <p className="text-center mb-12">
              Conoce a quienes hacen posible tu inversión. En B&B Real Estate contamos con un equipo 
              multidisciplinario enfocado en ofrecer atención profesional, ética y efectiva.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Diana Betancourt",
                  role: "Directora Comercial (Fundadora)",
                  email: "dbetancourt@bbrealestate.com.pa",
                  phone: "+507 6091-1735"
                },
                {
                  name: "Felipe Batista",
                  role: "Director Ejecutivo (Cofundador)",
                  email: "gerencia@bbrealestatepty.com",
                  phone: "+507 6109-9881"
                },
                {
                  name: "Yarissel Ortiz",
                  role: "Asistente de Gerencia",
                  email: "gerencia@bbrealestatepty.com",
                  phone: "+507 6109-9881"
                },
                {
                  name: "Anabel Batista",
                  role: "Asistente Administrativa",
                  email: "abatista@bbrealestate.com.pa",
                  phone: "+507 6778-3659"
                },
                {
                  name: "Claudia Portillo",
                  role: "Asistente de Marketing",
                  email: "pbbrealestate@gmail.com",
                  phone: "+507 6209-3694"
                }
              ].map((member) => (
                <Card key={member.name} className="p-6">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground mb-2">{member.role}</p>
                  <a href={`mailto:${member.email}`} className="text-primary block hover:underline">
                    {member.email}
                  </a>
                  <a href={`tel:${member.phone}`} className="text-primary hover:underline">
                    {member.phone}
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
   </>
  );
}