import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { REGIONS } from '@/lib/regions';
import { useServices, usePorts } from '@/hooks/useSupabaseData';

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

// IMO Checksum Validator
const isValidIMO = (imo: string) => {
  if (!/^\d{7}$/.test(imo)) return false;
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    sum += parseInt(imo[i]) * (7 - i);
  }
  return sum % 10 === parseInt(imo[6]);
};

const quoteSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  country: z.string().min(2, 'Country is required'),
  region: z.string().min(2, 'Region is required'),
  service: z.string().min(2, 'Service is required'),
  vesselName: z.string().optional(),
  imoNumber: z.string().optional().refine(val => !val || isValidIMO(val), {
    message: 'Invalid IMO number checksum'
  }),
  eta: z.string().optional(),
  portOfCall: z.string().optional(),
  cargoDescription: z.string().optional(),
  message: z.string().min(10, 'Please provide more details'),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to our data policy'
  })
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuotePage() {
  const { regionId } = useParams(); // Might be undefined if on global route
  const isRegional = !!regionId;
  const region = REGIONS.find(r => r.slug === regionId);
  const accent = region?.accent || '#E0A526';
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      country: '',
      region: regionId || '',
      service: '',
      vesselName: '',
      imoNumber: '',
      eta: '',
      portOfCall: '',
      cargoDescription: '',
      message: '',
      consent: false
    }
  });

  const watchRegion = form.watch('region');
  
  const { data: servicesData, isLoading: isLoadingServices } = useServices();
  const { data: portsData, isLoading: isLoadingPorts } = usePorts();

  // Available services based on selected region
  const availableServices = watchRegion && servicesData
    ? servicesData.filter(s => {
        const r = REGIONS.find(reg => reg.slug === watchRegion);
        return r?.serviceSlugs.includes(s.slug as any);
      })
    : [];

  const availablePorts = watchRegion && portsData
    ? portsData.filter(p => p.region === watchRegion)
    : [];

  const onSubmit = async (data: QuoteFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Submitted Quote:', data);
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
          <h2 className="text-3xl font-heading text-hull mb-4">Request Received</h2>
          <p className="text-deck-grey mb-8">
            Thank you for your enquiry. Our commercial team has received your request and will provide a preliminary estimate within one business day.
          </p>
          <Button asChild style={{ backgroundColor: accent }}>
            <Link to={isRegional ? `/${region?.slug || ''}` : '/'}>
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-plimsoll pb-20">
      <div className="bg-hull py-16 px-4 md:px-8 border-t-4" style={{ borderColor: accent }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">
            Request a Quote
          </h1>
          <p className="text-steel text-lg">
            {isRegional 
              ? `Get an estimate for services in ${region?.continent || 'this region'}.` 
              : 'Tell us your requirements and we will direct your enquiry to the relevant regional desk.'}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white border border-steel/20 p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-xl font-heading text-hull border-b border-steel/20 pb-2">Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl><Input placeholder="e.g. Acme Shipping Ltd" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name *</FormLabel>
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
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl><Input type="email" placeholder="you@company.com" {...field} /></FormControl>
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
                        <FormControl><Input placeholder="+1 234 567 8900" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Country *</FormLabel>
                        <FormControl><Input placeholder="Where are you based?" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-heading text-hull border-b border-steel/20 pb-2">Service Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operating Region *</FormLabel>
                        <Select 
                          onValueChange={(v) => { field.onChange(v); form.setValue('service', ''); form.setValue('portOfCall', ''); }} 
                          defaultValue={field.value} 
                          disabled={isRegional}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {REGIONS.map(r => (
                              <SelectItem key={r.slug} value={r.slug}>{r.entityName} ({r.continent})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Service *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!watchRegion || availableServices.length === 0}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={watchRegion ? "Select a service" : "Select region first"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoadingServices ? (
                              <SelectItem value="loading" disabled>Loading services...</SelectItem>
                            ) : (
                              availableServices.map(s => (
                                <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-heading text-hull border-b border-steel/20 pb-2">Vessel & Cargo Details (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="vesselName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vessel Name</FormLabel>
                        <FormControl><Input placeholder="MV Example" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imoNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IMO Number (7 digits)</FormLabel>
                        <FormControl><Input placeholder="9876543" maxLength={7} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eta"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Time of Arrival (ETA)</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="portOfCall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port of Call</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!watchRegion}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a port" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoadingPorts ? (
                              <SelectItem value="loading" disabled>Loading ports...</SelectItem>
                            ) : (
                              availablePorts.map(p => (
                                <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>
                              ))
                            )}
                            <SelectItem value="other">Other / Not Listed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="cargoDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo Description & Quantity</FormLabel>
                          <FormControl><Input placeholder="e.g. 50,000 MT Wheat" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-heading text-hull border-b border-steel/20 pb-2">Enquiry Details</h3>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements *</FormLabel>
                      <FormControl><Textarea placeholder="Please describe your specific operational requirements..." rows={5} {...field} /></FormControl>
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
                          I agree to Meridian Maritime Group's Privacy Policy. *
                        </FormLabel>
                        <p className="text-xs text-deck-grey">
                          Your data will only be used to process this enquiry. We do not share data with third parties.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full text-white text-lg py-6"
                style={{ backgroundColor: accent }}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Submitting...' : 'Request Quote'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
