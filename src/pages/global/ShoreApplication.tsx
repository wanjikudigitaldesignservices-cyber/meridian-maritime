import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { REGIONS } from '@/lib/regions';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

const shoreSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  department: z.string().min(2, 'Department is required'),
  region: z.string().min(2, 'Location preference is required'),
  noticePeriod: z.string().min(1, 'Notice period is required'),
  message: z.string().optional(),
  cv: z.any().refine((fileList) => fileList?.length === 1, 'CV is required'),
  consent: z.boolean().refine(val => val === true, 'Consent is required')
});

type ShoreFormValues = z.infer<typeof shoreSchema>;

export function ShoreApplication() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ShoreFormValues>({
    resolver: zodResolver(shoreSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      department: '',
      region: '',
      noticePeriod: '',
      message: '',
      consent: false
    }
  });

  const onSubmit = async (data: ShoreFormValues) => {
    // Simulate Supabase Storage upload
    console.log('Uploading CV...', data.cv[0]?.name);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Shore Application:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-plimsoll py-20 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-steel/20 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-heading text-hull mb-4">Application Received</h2>
          <p className="text-deck-grey mb-8">
            Thank you for applying for a shore-based role. Our HR department will review your profile and contact you regarding next steps.
          </p>
          <Button asChild className="bg-hull text-white">
            <Link to="/">
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-plimsoll pb-20">
      <div className="bg-hull py-16 px-4 md:px-8 border-t-4 border-accent">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">
            Shore Careers
          </h1>
          <p className="text-steel text-lg">
            Join our global network of port agents, operators, and maritime specialists.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white border border-steel/20 p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl><Input type="email" placeholder="Email address" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl><Input placeholder="Include country code" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="noticePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notice Period *</FormLabel>
                      <FormControl><Input placeholder="e.g. 1 month, immediately" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-steel/20 pt-6 mt-6">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="agency">Port Agency / Husbandry</SelectItem>
                          <SelectItem value="technical">Technical Management</SelectItem>
                          <SelectItem value="commercial">Commercial & Chartering</SelectItem>
                          <SelectItem value="logistics">Logistics & Customs</SelectItem>
                          <SelectItem value="hsseq">HSSEQ / Compliance</SelectItem>
                          <SelectItem value="finance">Finance & Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Preference *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {REGIONS.map(r => (
                            <SelectItem key={r.slug} value={r.slug}>{r.entityName} ({r.continent})</SelectItem>
                          ))}
                          <SelectItem value="any">Open to Relocation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cv"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem className="border-t border-steel/20 pt-6 mt-6">
                    <FormLabel>Upload CV (PDF, DOCX) *</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={(e) => onChange(e.target.files)}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="Why do you want to join Meridian?" rows={3} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-steel/20 rounded-sm">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I consent to Meridian Maritime Group processing my application data. *
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full text-white text-lg py-6 bg-hull hover:bg-hull/90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
