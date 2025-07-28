export default function FooterExtended() {
  return (
    <div className="flex w-full flex-row items-center">
      <div className="flex flex-1">
      </div>
      <div className="flex flex-1 justify-center">
        <p className="drop-shadow-lg">2025 - Copyright CafeBuy&#169;</p>
      </div>
      <div className="flex flex-1 justify-end">
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge.svg"
            alt="Made with Fresh"
          />
        </a>
      </div>
    </div>
  );
}
