import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="container-ms py-[clamp(2rem,5vw,4rem)]">
      <div className="pb-10 text-center">
        <p className="label-caps pb-3 text-gold">We're Here To Help</p>
        <h1 className="heading-section">Contact Us</h1>
        <p className="mx-auto max-w-md pt-3 text-neutral-600">
          Questions about sizing, delivery or your order? The Master Store team answers every day from 9:00 to 22:00.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[320px_1fr]">
        <div className="flex flex-col gap-4">
          {[
            { icon: Phone, label: 'Phone / WhatsApp', value: '+213 758 99 65 22' },
            { icon: Mail, label: 'Email', value: 'contact@masterstore.dz' },
            { icon: MapPin, label: 'Location', value: 'Algiers, Algeria' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 border p-5">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-gold/10 text-gold">
                <Icon size={18} />
              </span>
              <div>
                <p className="label-caps">{label}</p>
                <p className="pt-1 text-sm font-semibold">{value}</p>
              </div>
            </div>
          ))}
          <div className="border bg-neutral-950 p-5 text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.25em] text-gold">Cash on Delivery</p>
            <p className="pt-1 text-sm text-neutral-300">Available across all 58 wilayas</p>
          </div>
        </div>

        <div className="border p-[clamp(1.25rem,3vw,2rem)]">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold"><Send size={22} /></span>
              <p className="font-display text-2xl font-bold">Message Sent</p>
              <p className="max-w-xs text-sm text-neutral-600">Thank you {name.split(' ')[0]} — our team will get back to you within a few hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
              <div>
                <span className="label-caps">Full Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="input-ms mt-2" placeholder="Your name" />
              </div>
              <div>
                <span className="label-caps">Phone Number</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" className="input-ms mt-2" placeholder="Your phone number" />
              </div>
              <div>
                <span className="label-caps">Message</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="input-ms mt-2 resize-none" placeholder="How can we help you?" />
              </div>
              <button type="submit" className="btn-gold w-full">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
