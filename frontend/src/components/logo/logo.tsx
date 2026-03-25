import { cn } from "@/lib/utils";
import LogoSvg from "@/assets/logo.svg";

export default function Logo({
  classNameFull,
  classNameMobile,
}: {
  classNameFull?: string;
  classNameMobile?: string;
}) {
  return (
    <>

      <div className={cn("flex items-center gap-2", classNameFull)}>
        <img
          src={LogoSvg}
          width={40}
          height={27}
          alt="Logo"
        />
        <span className="text-xl font-semibold text-text-primary">
          Pet Matchmaker
        </span>
      </div>


      <div className={cn("flex items-center gap-2", classNameMobile)}>
        <img
          src={LogoSvg}
          width={10}
          height={15}
          alt="Logo"
        />
        <span className="text-base font-semibold text-text-primary">
          Pet Matchmaker
        </span>
      </div>
    </>
  );
}