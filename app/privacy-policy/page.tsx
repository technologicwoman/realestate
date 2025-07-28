import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import HeroBg from "@/app/assets/images/HeroBg.jpg";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <Image
          src={HeroBg}
          alt="Privacy Policy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Política de Privacidad
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Cómo protegemos y manejamos sus datos personales
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8 pb-4 border-b">
                <p className="text-lg leading-relaxed">
                  En <strong>B&B Real Estate Panamá, S.A.</strong> (en adelante, &ldquo;la Empresa&rdquo;, &ldquo;nosotros&rdquo; o
                  &ldquo;nuestro&rdquo;), valoramos su privacidad y nos comprometemos a proteger los datos
                  personales que usted nos proporciona. Esta Política de Privacidad describe cómo
                  recopilamos, utilizamos, almacenamos y compartimos su información cuando visita
                  nuestro sitio web www.bbrealestatepanama.com, o cuando interactúa con nosotros
                  por otros medios digitales o presenciales.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Responsable del Tratamiento</h2>
                <p className="mb-4">
                  B&B Real Estate Panamá, S.A., registrada ante la Dirección General de Ingresos bajo
                  el RUC. 155662824-2-2018 DV 77, con domicilio en Oceanía Business Plaza, Torre
                  1000, Piso 25, Oficina E, Punta Pacífica, Ciudad de Panamá, es responsable del
                  tratamiento de sus datos personales.
                </p>
                <p>
                  Para consultas sobre esta política, puede contactarnos al correo:
                  <a href="mailto:gerencia@bbrealestate.com.pa" className="text-primary font-medium"> 
                    gerencia@bbrealestate.com.pa
                  </a>
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Datos que Recopilamos</h2>
                <p className="font-medium mb-2">a) Datos personales que usted nos proporciona directamente:</p>
                <ul className="list-disc pl-5 mb-6 space-y-1">
                  <li>Nombre completo</li>
                  <li>Teléfono</li>
                  <li>Correo electrónico</li>
                  <li>Dirección</li>
                  <li>Ciudad o país de residencia</li>
                  <li>Información sobre propiedades de su interés</li>
                </ul>
                <p className="font-medium mb-2">b) Datos técnicos recopilados automáticamente:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas</li>
                  <li>Duración de la visita</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </div>

              <Separator className="my-8" />
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Uso de los Datos</h2>
                <p className="mb-2">Utilizamos sus datos para:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Responder consultas y solicitudes</li>
                  <li>Enviar información sobre propiedades, promociones o eventos</li>
                  <li>Brindar asesoría personalizada</li>
                  <li>Mejorar nuestros servicios y análisis internos</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Base Legal para el Tratamiento</h2>
                <p className="mb-2">Procesamos sus datos personales con base en:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Su consentimiento</li>
                  <li>La ejecución de un contrato o gestiones precontractuales</li>
                  <li>Nuestro interés legítimo</li>
                  <li>El cumplimiento de obligaciones legales</li>
                </ul>
              </div>

              <div id="cookies" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Uso de Cookies</h2>
                <p>
                  Utilizamos cookies para mejorar su experiencia de navegación, analizar estadísticas y
                  personalizar contenidos. Usted puede configurar su navegador para rechazar las
                  cookies, aunque esto podría afectar el funcionamiento del sitio.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Transferencia y Divulgación de Datos</h2>
                <p className="mb-2">Podemos compartir su información con:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Proveedores de servicios bajo acuerdos de confidencialidad</li>
                  <li>Autoridades gubernamentales cuando sea requerido por ley</li>
                  <li>Terceros en caso de fusión, adquisición o venta de activos</li>
                </ul>
              </div>

              <Separator className="my-8" />

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Conservación de Datos</h2>
                <p>
                  Conservamos sus datos solo durante el tiempo necesario para cumplir los fines
                  descritos o los exigidos por ley. Luego, serán eliminados o anonimizados.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Seguridad de la Información</h2>
                <p>
                  Adoptamos medidas técnicas y organizativas razonables para proteger sus datos
                  personales frente a accesos no autorizados, pérdida, alteración o divulgación
                  indebida.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Derechos del Usuario</h2>
                <p className="mb-2">Usted tiene derecho a:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Acceder a sus datos personales</li>
                  <li>Solicitar su rectificación o actualización</li>
                  <li>Solicitar su eliminación</li>
                  <li>Oponerse o limitar su tratamiento</li>
                  <li>Solicitar la portabilidad de sus datos (cuando aplique)</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                </ul>
                <p>
                  Puede ejercer estos derechos escribiéndonos a <a href="mailto:legal@bbrealestatepanama.com" className="text-primary font-medium">legal@bbrealestatepanama.com</a>.
                  Podríamos solicitarle verificación de identidad para procesar su solicitud.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Privacidad de Menores</h2>
                <p>
                  Este sitio no está dirigido a menores de 18 años. No recopilamos datos personales de
                  menores intencionalmente. Si usted es padre, madre o tutor y cree que un menor nos
                  ha proporcionado información, contáctenos para eliminarla.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Enlaces a Terceros</h2>
                <p>
                  Nuestro sitio puede contener enlaces a sitios web de terceros. No nos hacemos
                  responsables por sus políticas de privacidad ni por su contenido.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Cambios a esta Política</h2>
                <p>
                  Nos reservamos el derecho de modificar esta Política de Privacidad. Las
                  actualizaciones serán publicadas en esta misma página con la fecha
                  correspondiente.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Contacto</h2>
                <p className="mb-2">
                  Si tiene preguntas, inquietudes o desea ejercer sus derechos de protección de datos,
                  puede contactarnos a:
                </p>
                <ul className="not-prose bg-gray-50 p-4 rounded-md border border-gray-100">
                  <li className="mb-2"><span className="font-semibold">Correo:</span> <a href="mailto:gerencia@bbrealestate.com.pa" className="text-primary">gerencia@bbrealestate.com.pa</a></li>
                  <li className="mb-2"><span className="font-semibold">Dirección:</span> Oceanía Business Plaza, Torre 1000, Piso 25, Oficina E, Punta
                  Pacífica, Ciudad de Panamá</li>
                  <li><span className="font-semibold">Teléfono:</span> <a href="tel:+5076109-9881" className="text-primary">+507 6109-9881</a></li>
                </ul>
              </div>
            </div>
            <p className="text-right text-sm text-muted-foreground">
                Última actualización: 7 de julio de 2025
            </p>

            <div className="mt-12 text-center">
              <div className="mt-6">
                <Link href="/" className="text-primary hover:underline font-medium">
                  Volver a la página principal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}