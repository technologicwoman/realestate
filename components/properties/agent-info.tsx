import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

interface AgentInfoProps {
  name: string;
  role: string;
  image: StaticImageData | string;
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
    </>
  );
}