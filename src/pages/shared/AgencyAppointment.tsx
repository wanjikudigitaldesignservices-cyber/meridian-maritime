import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { REGIONS } from '@/lib/regions';
import portsData from '@/data/seed/ports.json';

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
import { AlertCircle } from 'lucide-react';

const isValidIMO = (imo: string) => {
  if (!/^\d{7}$/.test(imo)) return false;
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    sum += parseInt(imo[i]) * (7 - i);
  }
  return sum % 10 === parseInt(imo[6]);
};

const agencySchema = z.object({
  vesselName: z.string().min(2, 'Vessel name is required'),
  imoNumber: z.string().refine(val => isValidIMO(val), {
    message: 'Invalid IMO number checksum'
  }),
  eta: z.string().min(1, 'ETA is required'),
  portOfCall: z.string().min(2, 'Port is required'),
  agencyType: z.string().min(2, 'Agency type is required'),
  message: z.string().min(10, 'Message is required'),
});

type AgencyFormValues = z.infer<typeof agencySchema>;

export function AgencyAppointment() {
  const { regionId } = useParams();
  const region = REGIONS.find(r => r.slug === regionId);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<AgencyFormValues>({
    resolver: zodResolver(agencySchema),
    defaultValues: {
      vesselName: '',
      imoNumber: '',
      eta: '',
      portOfCall: '',
      agencyType: '',
      message: ''
    }
  });

  if (!region) return null;

  const regionalPorts = portsData.filter(p => p.region === region.slug);

  const onSubmit = async (data: AgencyFormValues) => {
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Agency Appointment:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-plimsoll py-20 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-steel/20 p-12 text-center border-t-4" style={{ borderColor: region.accent }}>
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-heading text-hull mb-4">Appointment Received</h2>
          <p className="text-deck-grey mb-8">
            The {region.entityName} operations desk has received your appointment. Acknowledgment and initial DA will follow shortly.
          </p>
          <Button asChild style={{ backgroundColor: region.accent }}>
            <Link to={`/${region.slug}`}>
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-plimsoll pb-20">
      <div className="bg-hull py-16 px-4 md:px-8 border-t-4" style={{ borderColor: region.accent }}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">
            Agency Appointment
          </h1>
          <p className="text-steel text-lg">
            Direct appointment for {region.entityName}.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12">
        {/* SLA Banner */}
        <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 mb-8 flex items-start gap-3 rounded-sm">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">
            SLA Guarantee: Our regional desk will acknowledge receipt within 15 minutes.
          </div>
        </div>

        <div className="bg-white border border-steel/20 p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="vesselName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vessel Name *</FormLabel>
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
                    <FormLabel>IMO Number *</FormLabel>
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
                    <FormLabel>ETA *</FormLabel>
                    <FormControl><Input type="datetime-local" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="portOfCall"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Port of Call *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select port" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regionalPorts.map(p => (
                            <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>
                          ))}
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agencyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full">Full Agency</SelectItem>
                          <SelectItem value="protective">Protective Agency</SelectItem>
                          <SelectItem value="husbandry">Husbandry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions / Message *</FormLabel>
                    <FormControl><Textarea placeholder="Urgent requirements or initial instructions..." rows={4} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full text-white text-lg py-6"
                style={{ backgroundColor: region.accent }}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Sending...' : 'Submit Appointment'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
