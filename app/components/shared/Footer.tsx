import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-white/8 bg-[#0C0D10] py-6 text-slate-300">
      <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="FITLOG Logo"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="text-sm font-bold uppercase tracking-[0.14em] text-white">
            FITLOG
          </span>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log
          honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
