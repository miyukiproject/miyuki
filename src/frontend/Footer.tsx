const currentYear = new Date().getFullYear();
const brandBlueClass = "text-[#3998d8]";
const brandLinkClass =
  "inline-flex items-center gap-1.5 underline-offset-2 hover:underline text-[#3998d8] hover:text-[#3998d8]";

const socialButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d0e6f6] text-[#d0e6f6] transition-colors hover:border-[#3998d8] hover:bg-transparent hover:text-[#3998d8]";

export default function Footer() {
  return (
    <footer className="mt-14">
      <div className="mx-auto max-w-5xl border-t border-gray-300 pt-6">
        <div className="flex flex-col gap-5 text-sm text-gray-600 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span>&copy; 2023-{currentYear}</span>
              <a
                href="https://raw.githubusercontent.com/flbulgarelli/miyuki/refs/heads/main/AUTHORS"
                target="_blank"
                rel="noopener noreferrer"
                className={brandLinkClass}
              >
                <i
                  className={`fa-solid fa-snowflake inline-flex h-4 w-4 items-center justify-center text-[14px] leading-none ${brandBlueClass}`}
                  aria-hidden="true"
                ></i>
                Miyuki
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>&copy; 2015-{currentYear}</span>
              <a
                href="https://mumuki.io/home/"
                target="_blank"
                rel="noopener noreferrer"
                className={brandLinkClass}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-4 w-4 items-center justify-center bg-current"
                  style={{
                    WebkitMaskImage: "url(https://raw.githubusercontent.com/mumuki/dev-awesome/master/svg/black/mumuki.svg)",
                    maskImage: "url(https://raw.githubusercontent.com/mumuki/dev-awesome/master/svg/black/mumuki.svg)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "14px 14px",
                    maskSize: "14px 14px",
                  }}
                />
                Mumuki
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/miyukiproject"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Miyuki GitHub"
              className={socialButtonClass}
            >
              <i className="fa-brands fa-github text-xl" aria-hidden="true"></i>
            </a>
            <a
              href="https://discord.com/invite/Ak4ee7fcSM"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Miyuki Discord"
              className={socialButtonClass}
            >
              <i className="fa-brands fa-discord text-xl" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
