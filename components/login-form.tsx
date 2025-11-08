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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useAuthStore } from "@/store/user-store"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data: session } = useSession();
  const { setUser } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false
    })

    if (res?.ok) {
      toast.success("Login successful!")
    } else {
      toast.error("Login failed!")
    }
  }

  const handleGoogleSubmit = async () => {
    await signIn("google", {
      redirect: true,
    })
  }

  useEffect(() => {
    console.log(session?.user);

    if (session && session.user.isVerified === true) {
      setUser({
        success: true,
        message: "Login successful!",
        data: session.user
      });
      redirect("/home");
    }

    if (session && session.user.isVerified === false) {
      redirect("/profile/form");
    }
  }, [session, setUser])

  if (!isMounted) {
    return null;
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button" onClick={handleGoogleSubmit}>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
