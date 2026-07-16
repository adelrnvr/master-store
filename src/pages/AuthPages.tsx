import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const AuthShell: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="container-ms flex justify-center py-[clamp(2.5rem,7vw,5rem)]">
    <div className="w-full max-w-md border p-[clamp(1.5rem,4vw,2.5rem)]">
      <h1 className="pb-8 text-center font-display text-[clamp(1.7rem,4vw,2.2rem)] font-bold">{title}</h1>
      {children}
    </div>
  </div>
);

export const LoginPage: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(phone.trim(), password);
    if (res.ok) navigate('/account');
    else setError(res.error ?? 'Login failed');
  };

  return (
    <AuthShell title="Welcome Back">
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div>
          <span className="label-caps">Phone Number</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" className="input-ms mt-2" placeholder="Enter your phone number" />
        </div>
        <div>
          <span className="label-caps">Password</span>
          <div className="relative mt-2">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="input-ms pr-11" placeholder="Enter your password" />
            <button type="button" onClick={() => setShowPw(!showPw)} aria-label="Toggle password" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900">
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-navy w-full">Sign In</button>
        <Link to="/forgot-password" className="text-right text-sm text-neutral-500 underline-offset-4 hover:underline">
          Forgot password?
        </Link>
        <div className="border-t pt-5 text-center text-sm text-neutral-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-neutral-900 underline-offset-4 hover:underline">Create one</Link>
        </div>
        <Link to="/shop" className="btn-outline w-full">Continue as Guest</Link>
      </form>
    </AuthShell>
  );
};

export const RegisterPage: React.FC = () => {
  const { register } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3) { setError('Please enter your full name.'); return; }
    if (!/^[0-9+\s]{9,14}$/.test(phone.trim())) { setError('Please enter a valid phone number.'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    const res = register(name.trim(), phone.trim(), password);
    if (res.ok) navigate('/account');
    else setError(res.error ?? 'Registration failed');
  };

  return (
    <AuthShell title="Create Account">
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div>
          <span className="label-caps">Full Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="input-ms mt-2" placeholder="Your full name" />
        </div>
        <div>
          <span className="label-caps">Phone Number</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" className="input-ms mt-2" placeholder="Enter your phone number" />
        </div>
        <div>
          <span className="label-caps">Password</span>
          <div className="relative mt-2">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="input-ms pr-11" placeholder="Create a password" />
            <button type="button" onClick={() => setShowPw(!showPw)} aria-label="Toggle password" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900">
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-navy w-full">Create Account</button>
        <Link to="/forgot-password" className="text-right text-sm text-neutral-500 underline-offset-4 hover:underline">
          Forgot password?
        </Link>
        <div className="border-t pt-5 text-center text-sm text-neutral-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-neutral-900 underline-offset-4 hover:underline">Sign in</Link>
        </div>
        <Link to="/shop" className="btn-outline w-full">Continue as Guest</Link>
      </form>
    </AuthShell>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <AuthShell title="Reset Password">
      {sent ? (
        <div className="flex flex-col gap-5 text-center">
          <p className="text-sm leading-relaxed text-neutral-600">
            If an account exists for <span className="font-semibold text-neutral-900">{phone}</span>, you will receive an SMS with instructions to reset your password.
          </p>
          <Link to="/login" className="btn-navy w-full">Back to Sign In</Link>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (phone.trim()) setSent(true); }} className="flex flex-col gap-5">
          <p className="text-sm text-neutral-600">Enter the phone number linked to your account and we'll send you reset instructions.</p>
          <div>
            <span className="label-caps">Phone Number</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" className="input-ms mt-2" placeholder="Enter your phone number" />
          </div>
          <button type="submit" className="btn-navy w-full">Send Reset Link</button>
          <div className="text-center text-sm text-neutral-600">
            Remembered it?{' '}
            <Link to="/login" className="font-semibold text-neutral-900 underline-offset-4 hover:underline">Sign in</Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
};
