import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2 } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email')
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterSignup() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema)
  });

  const onSubmit = async (data: NewsletterValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Subscribed:', data.email);
    setIsSubscribed(true);
  };

  if (isSubscribed) {
    return (
      <div className="bg-sea-black p-4 rounded-sm border border-steel/20">
        <div className="flex items-center gap-3 text-green-500 mb-2">
          <CheckCircle2 className="w-5 h-5" />
          <h4 className="text-sm font-medium">Subscribed Successfully</h4>
        </div>
        <p className="text-xs text-plimsoll/70">
          You will now receive our regulatory updates and operational circulars.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-sea-black p-4 rounded-sm border border-steel/20">
      <h4 className="text-sm font-medium text-white mb-2">Maritime Briefing</h4>
      <p className="text-xs text-plimsoll/70 mb-3">Regulatory updates and operational circulars.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Email address" 
            {...register('email')}
            className={`bg-hull border ${errors.email ? 'border-red-500' : 'border-steel/40'} text-sm px-3 py-1.5 rounded-sm w-full focus:outline-none focus:border-accent text-white`}
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-white px-3 py-1.5 text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors disabled:opacity-70 whitespace-nowrap"
          >
            {isSubmitting ? '...' : 'Subscribe'}
          </button>
        </div>
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </form>
    </div>
  );
}
