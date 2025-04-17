// components/shared/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full h-12 flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400 border-t bg-white dark:bg-zinc-900">
      © {new Date().getFullYear()} ImapctAcross. All rights reserved.
    </footer>
  );
}