"use client"

import { cn } from "@/lib/utils"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { data: session } = useSession();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            {/* OAuth Buttons */}
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={()=> signIn("github" , {callbackUrl: "/"})}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="currentColor"
                    d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387
                       .6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                       -.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729
                       1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997
                       .108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.931
                       0-1.31.465-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176
                       0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404
                       c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23
                       3.297-1.23.653 1.653.241 2.873.118 3.176.77.84
                       1.233 1.911 1.233 3.221 0 4.61-2.804 5.628-5.475
                       5.921.43.372.823 1.102.823 2.222 0 1.606-.014
                       2.896-.014 3.286 0 .321.218.694.825.576C20.565
                       22.092 24 17.592 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
                Login with Github
              </Button>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={()=> signIn("google" , {callbackUrl: "/"})}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="currentColor"
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  />
                </svg>
                Login with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative text-center text-sm my-4">
              <span className="bg-card px-2 text-muted-foreground relative z-10">
                Or continue with
              </span>
              <div className="absolute inset-0 top-1/2 border-t border-border z-0" />
            </div>

            {/* Email & Password */}
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>

            {/* Signup Link */}
            <div className="text-center text-sm mt-2">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
