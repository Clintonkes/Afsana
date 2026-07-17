import { useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-obsidian grid-bg">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-7xl font-medium text-silica/20">404</h1>
          <div className="h-px w-16 bg-amber/40 mx-auto" />
        </div>

        <div className="space-y-3">
          <h2 className="font-heading text-2xl font-medium text-silica">Page Not Found</h2>
          <p className="text-alabaster/50 leading-relaxed">
            The page <span className="text-alabaster/80">"{pageName}"</span> could not be found.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-obsidian bg-amber rounded-full hover:bg-silica transition-colors duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
