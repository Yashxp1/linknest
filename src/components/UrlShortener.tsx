'use client';
import React, { useRef, useState } from 'react';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import { Manrope } from 'next/font/google';
import { shortener } from '@/store/shortener';
import { toast } from 'sonner';
import { Copy, ExternalLink } from 'lucide-react';

const manropefont = Manrope({
  subsets: ['latin'],
  weight: '400',
});

const UrlShortener = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortURL, setShortURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef?.current?.value.trim();

    if (!inputValue) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);
    try {
      const data = await shortener(inputValue);
      if (data?.shortURL) {
        setShortURL(data?.shortURL);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortURL);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy URL');
      console.log(error)
    }
  };

  const openURL = () => {
    if (shortURL) window.open(shortURL, '_blank');
  };

  return (
    <div className={`${manropefont.className}`}>
      <div className="flex justify-center items-center min-h-screen w-full p-4">
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">URL Shortener</h1>
            <p className="text-gray-600">
              Paste your long URL to get a shortened version
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="font-semibold">
                Paste your URL here
              </Label>
              <Input
                ref={inputRef}
                id="url"
                type="url"
                placeholder="https://www.example.com/"
                className="w-full"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              className="font-semibold"
              disabled={loading}
            >
              {loading ? 'Shortening...' : 'Shorten✨'}
            </Button>
          </form>

          {shortURL && (
            <div className="flex flex-col gap-3 p-4  rounded-lg border">
              <Label className="font-semibold text-sm">Shortened URL:</Label>
              <div className="flex items-center gap-2">
                <Input value={shortURL} readOnly className="flex-1 bg-white" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={openURL}
                  className="shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
