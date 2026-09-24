import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 border-b border-white/8 bg-[#0C0D10]/90 backdrop-blur-sm">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box border border-white/8 bg-[#11161d] p-2 shadow-xl"
          >
            <li>
              <Link href="/">Workouts</Link>
            </li>
            <li>
              <Link href="/">My Plan</Link>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="btn btn-ghost gap-2 px-2 text-xl text-white hover:bg-white/4"
        >
          <Image
            src="/logo.png"
            alt="FITLOG Logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="font-black tracking-[0.12em]">FITLOG</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 text-sm text-slate-200">
          <li>
            <Link href="/" className="rounded-full hover:bg-white/5">
              Workouts
            </Link>
          </li>
          <li>
            <Link href="/" className="rounded-full hover:bg-white/5">
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <button className="rounded-full border border-lime-300/50 bg-lime-300 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#0b0d10] hover:bg-lime-200">
          Start now
        </button>
      </div>
    </div>
  );
};

export default Navbar;
