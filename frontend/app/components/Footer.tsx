"use client";

import { GitHub, X } from "@mui/icons-material";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 border-t border-gray-700 text-center">
      <p className="sm:text-sm text-xs opacity-75 mb-2">
        © {new Date().getFullYear()} Developer Directory — Built by{" "}
        <span className="font-semibold">Sidharth K S</span>
      </p>

      <div className="flex justify-center gap-5 mt-3">
        <Link
          href="https://github.com/Sidharth77777/Developer-Directory/blob/main/README.md"
          target="_blank"
          className="hover:text-blue-400 transition-all hover:-translate-y-1"
        >
          <GitHub fontSize="medium" />
        </Link>

        <Link
          href="https://x.com/cryptoSid1564"
          target="_blank"
          className="hover:text-blue-400 transition-all hover:-translate-y-1"
        >
          <X fontSize="medium" />
        </Link>
      </div>
    </footer>
  );
}
