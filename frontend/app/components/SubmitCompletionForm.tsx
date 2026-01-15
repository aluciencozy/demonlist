'use client';

import { Demon } from '@/types/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Field, FieldLabel, FieldContent, FieldError } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z
  .object({
    demon_id: z.string().min(1, 'Please select a demon'),
    proof_link: z.string().optional(),
    proof_file: z.any().optional(),
  })
  .refine(
    (data) => {
      const hasLink = !!data.proof_link && data.proof_link.length > 0;
      const hasFile =
        typeof FileList !== 'undefined' &&
        data.proof_file instanceof FileList &&
        data.proof_file.length > 0;
      return hasLink || hasFile;
    },
    {
      message: 'Please provide either a video URL or upload a file.',
      path: ['proof_link'],
    }
  );

type FormFields = z.infer<typeof formSchema>;

const SubmitCompletionForm = ({ demonlist, token }: { demonlist: Demon[]; token: string }) => {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      demon_id: '',
      proof_link: '',
      proof_file: undefined,
    },
  });

  const proofLink = form.watch('proof_link');
  const proofFile = form.watch('proof_file');
  const hasFile =
    typeof FileList !== 'undefined' && proofFile instanceof FileList && proofFile.length > 0;
  const hasLink = !!proofLink && proofLink.length > 0;

  const onSubmit = async (data: FormFields) => {
    try {
      if (data.proof_link) {
        const res = await fetch('http://127.0.0.1:8000/api/v1/completions/', {
          method: 'POST',
          body: JSON.stringify({
            demon_id: data.demon_id,
            proof_link: data.proof_link,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          let errorMessage = 'Something went wrong';
          if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
          else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;
          return new Error(errorMessage);
        }
        toast.success('Completion submitted successfully!');
      } else if (data.proof_file?.[0]) {
        const formData = new FormData();
        formData.append('file', data.proof_file[0]);

        const res = await fetch(
          `http://127.0.0.1:8000/api/v1/completions/upload?demon_id=${data.demon_id}`,
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          let errorMessage = 'Something went wrong';
          if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
          else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;
          throw new Error(errorMessage);
        }

        toast.success('Video uploaded and completion submitted!');
      }

      form.reset();
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : 'Submission failed.');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit a Completion</CardTitle>
        <CardDescription>Have you completed a demon? Submit your record here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="completion-form" className="space-y-4">
          <Controller
            name="demon_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel>Demon</FieldLabel>
                </FieldContent>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={form.formState.isSubmitting}
                >
                  <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select a demon..." />
                  </SelectTrigger>
                  <SelectContent>
                    {demonlist.map((demon) => (
                      <SelectItem key={demon.id} value={demon.id.toString()}>
                        {demon.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Controller
              name="proof_link"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="w-full" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel>YouTube URL</FieldLabel>
                  </FieldContent>
                  <Input
                    {...field}
                    placeholder="https://youtu.be/..."
                    disabled={hasFile || form.formState.isSubmitting}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="hidden sm:block pt-6 text-sm font-bold text-muted-foreground">OR</div>

            <Controller
              name="proof_file"
              control={form.control}
              render={({ field: { onChange, value, ...rest }, fieldState }) => (
                <Field className="w-full" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel>Upload Video</FieldLabel>
                  </FieldContent>
                  <Input
                    {...rest}
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    disabled={hasLink || form.formState.isSubmitting}
                    onChange={(e) => {
                      onChange(e.target.files);
                    }}
                    className="cursor-pointer"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="completion-form"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubmitCompletionForm;
