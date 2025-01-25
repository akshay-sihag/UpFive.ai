import { Sparkles } from "lucide-react"

export function AiButton({
  children,
  loading,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-white rounded-lg disabled:opacity-50 ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Generating response...</span>
        </>
      ) : (
        <span className="inline-flex items-center gap-2">{children}</span>
      )}
    </button>
  )
}

