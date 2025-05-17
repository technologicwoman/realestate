import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

interface AgentInfoProps {
  name: string;
  role: string;
  image: string;
}

export function AgentInfo({ name, role, image }: AgentInfoProps) {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button className="w-full gap-2">
          <Phone className="h-5 w-5" />
          Call Agent
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <Mail className="h-5 w-5" />
          Email Agent
        </Button>
      </div>
    </>
  );
}