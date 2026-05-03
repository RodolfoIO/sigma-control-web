import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

interface LoaderModalProps {
  open: boolean
  message?: string
}

export function LoaderModal({ open, message = "Cargando..." }: LoaderModalProps) {
  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-background/60 backdrop-blur-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "duration-300"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "duration-300"
          )}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogPrimitive.Title className="sr-only">
            Loading
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Please wait while content is loading
          </DialogPrimitive.Description>
          <div className="flex flex-col items-center gap-6">
            {/* Spinner */}
            <div className="relative">
              {/* Outer ring */}
              <div className="h-16 w-16 rounded-full border-4 border-muted" />
              {/* Animated arc */}
              <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
              {/* Inner pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
              </div>
            </div>
            {/* Message */}
            {message && (
              <p className="animate-pulse text-sm font-medium tracking-wide text-foreground/80">
                {message}
              </p>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
