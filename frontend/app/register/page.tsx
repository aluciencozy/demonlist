'use client';

import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from 'sonner';
import { CardContent, CardHeader, Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldDescription, FieldGroup, FieldLabel, Field, FieldError, FieldContent } from "@/components/ui/field";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MotionWrapper from "@/components/MotionWrapper";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

type FormFields = z.infer<typeof formSchema>;

const Register = () => {
  const router = useRouter();

  const form = useForm<FormFields>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
        email: '',
        password: '',
      }
    })

  async function onSubmit(data: FormFields) {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ username: data.username, email: data.email, password: data.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = 'Registration failed';

        if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
        else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      console.log('Register successful', responseData);
      
      router.push('/');
      router.refresh();
      toast.success('Registered successfully!');
    } catch (e) {
      console.error('Register failed', e);
      toast.error(e instanceof Error ? e.message : 'Registration failed, please try again.');
      form.setError('root', { message: e instanceof Error ? e.message : 'Registration failed' });
    }
  }

  return (
    <main className="h-screen flex-center flex-col bg-background font-figtree px-4">
      <MotionWrapper>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your username and email below to register a new account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} id="register-form">
              <FieldGroup>
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel htmlFor="register-username">Username</FieldLabel>
                        <FieldDescription>
                          This is your public display name. Must be between 3 and 20 characters.
                        </FieldDescription>
                      </FieldContent>
                      <Input
                        {...field}
                        id="register-username"
                        type="text"
                        placeholder="Your username"
                        autoComplete="username"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel htmlFor="register-email">Email</FieldLabel>
                      </FieldContent>
                      <Input
                        {...field}
                        id="register-email"
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
                      <FieldContent>
                        <FieldLabel htmlFor="register-password">Password</FieldLabel>
                        <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                      </FieldContent>
                      <Input
                        {...field}
                        id="register-password"
                        type="password"
                        placeholder="Your password"
                        autoComplete="new-password"
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
              <Button type="submit" form="register-form" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Registering...' : 'Register'}
              </Button>
              <div className="text-center">
                {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}
              </div>
            </Field>
            <div className="text-center mt-2">
              <span>Already have an account?</span>
              <Button variant="link" asChild className="text-base text-red">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </MotionWrapper>
    </main>
  );
};

export default Register;
