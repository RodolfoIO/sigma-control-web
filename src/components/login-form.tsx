import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { useNavigate } from "react-router"
import { supabase } from "@/lib/supabase/client"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate();

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    supabase.auth.signInWithPassword({
      email: email.current?.value || "",
      password: password.current?.value || "",
    }).then(({ data, error }) => {
      if (error) {
        console.error("Error signing in:", error);
      } else {
        console.log("Signed in user:", data.user);
        navigate("/");
      }
    });
  }

  const handleGoogleSignIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    }).then(({ data, error }) => {
      if (error) {
        console.error("Error signing in with Google:", error);
      } else {
        console.log("Signed in with Google:", data);
        navigate("/");
      }
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Iniciar sesion en tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tu email y contraseña para iniciar sesion en tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  ref={email}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" required ref={password} />
              </Field>
              <Field>
                <Button type="submit">Iniciar sesion</Button>
                <Button variant="outline" type="button" onClick={handleGoogleSignIn}>
                  Iniciar sesion con Google
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
