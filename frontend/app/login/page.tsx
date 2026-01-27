'use client'

import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from 'sonner';
import { CardContent, CardHeader, Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, FieldLabel, Field, FieldError } from "@/components/ui/field";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MotionWrapper from "@/components/MotionWrapper";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

type FormFields = z.infer<typeof formSchema>;

const Login = () => {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(data: FormFields) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email: data.email, password: data.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = 'Login failed';

        if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
        else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      console.log('Login successful', responseData);

      router.push('/');
      router.refresh();
      toast.success('Logged in successfully!');
    } catch (e) {
      console.error('Login failed', e);
      toast.error(e instanceof Error ? e.message : 'Login failed, please try again.');
      form.setError('root', { message: e instanceof Error ? e.message : 'Login failed' });
    }
  }

  return (
    <main className="h-screen flex-center flex-col bg-background font-figtree px-4">
      <MotionWrapper>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} id="login-form">
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="login-email"
                        type="email"
                        placeholder="hello@world.com"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-password">Password</FieldLabel>
                      <Input
                        {...field}
                        id="login-password"
                        type="password"
                        placeholder="Your password"
                        autoComplete="current-password"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex-col mt-1">
            <Field orientation="responsive">
              <Button type="submit" form="login-form" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
              <p className="text-center">
                {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}
              </p>
            </Field>
            <div className="text-center mt-2">
              <span>Don't have an account?</span>
              <Button variant="link" asChild className="text-base text-red">
                <Link href="/register">
                  Register
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </MotionWrapper>
    </main>
  );
}

export default Login