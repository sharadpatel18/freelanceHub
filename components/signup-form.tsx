import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createUser } from "@/services/auth-services";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function SignupForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    const validateName = (name: string) => {
        if (!name.trim()) {
            return "Full name is required";
        }
        if (name.trim().length < 2) {
            return "Name must be at least 2 characters long";
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return "Name can only contain letters and spaces";
        }
        return "";
    };

    const validateEmail = (email: string) => {
        if (!email.trim()) {
            return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password) {
            return "Password is required";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/(?=.*\d)/.test(password)) {
            return "Password must contain at least one number";
        }
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const key = id as keyof typeof touched;
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (touched[key]) {
            let error = "";
            if (key === "name") error = validateName(value);
            else if (key === "email") error = validateEmail(value);
            else if (key === "password") error = validatePassword(value);
            setErrors((prev) => ({ ...prev, [key]: error }));
        }
    };


    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setTouched((prev) => ({ ...prev, [id]: true }));

        let error = "";
        if (id === "name") error = validateName(value);
        else if (id === "email") error = validateEmail(value);
        else if (id === "password") error = validatePassword(value);

        setErrors((prev) => ({ ...prev, [id]: error }));
    };

    const handleSubmit = async () => {
        setTouched({ name: true, email: true, password: true });

        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError,
        });

        if (nameError || emailError || passwordError) {
            return;
        }

        setIsSubmitting(true);
        const res = await createUser(formData);

        if (res.status === 201) {
            toast.success("Account created successfully!");
            redirect("/login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? "border-red-500" : ""}
                                />
                                {errors.name && touched.name && (
                                    <FieldDescription className="text-red-500">
                                        {errors.name}
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.email && touched.email ? "border-red-500" : ""}
                                />
                                {errors.email && touched.email && (
                                    <FieldDescription className="text-red-500">
                                        {errors.email}
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password ? "border-red-500" : ""}
                                />
                                {errors.password && touched.password ? (
                                    <FieldDescription className="text-red-500">
                                        {errors.password}
                                    </FieldDescription>
                                ) : (
                                    <FieldDescription>
                                        Must be at least 8 characters with uppercase, lowercase, and number.
                                    </FieldDescription>
                                )}
                            </Field>
                            <FieldGroup>
                                <Field>
                                    <Button type="submit" disabled={isSubmitting} onClick={handleSubmit} className="w-full">
                                        {isSubmitting ? "Creating Account..." : "Create Account"}
                                    </Button>
                                    <Button variant="outline" type="button" className="w-full">
                                        Sign up with Google
                                    </Button>
                                    <FieldDescription className="px-6 text-center">
                                        Already have an account?{" "}
                                        <Link href="/login" className="text-blue-600 hover:underline">
                                            Login
                                        </Link>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}