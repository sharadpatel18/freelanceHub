"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
    const [count, setCount] = useState(404);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Animate the number counting up
        let current = 0;
        const increment = 404 / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= 404) {
                setCount(404);
                clearInterval(timer);
                setIsAnimating(false);
            } else {
                setCount(Math.floor(current));
            }
        }, 20);

        setIsAnimating(true);
        return () => clearInterval(timer);
    }, []);


    const redirectFunction = (path: string) => {
        window.location.href = path;
    }

    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* Animated 404 */}
                <div className="mb-8">
                    <h1
                        className="text-[10rem] md:text-[14rem] leading-none select-none tracking-tighter"
                        style={{
                            animation: isAnimating ? 'none' : 'fadeIn 0.5s ease-out',
                        }}
                    >
                        {count}
                    </h1>
                </div>

                {/* Content card */}
                <Card className="shadow-sm mb-8">
                    <CardContent className="p-8 md:p-10">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Page Not Found
                            </h2>

                            <p className="text-lg leading-relaxed">
                                The page you're looking for doesn't exist or has been moved.
                                Please check the URL or return to the homepage.
                            </p>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto"
                                    onClick={() => redirectFunction('/')}
                                >
                                    <Home className="mr-2 h-5 w-5" />
                                    Go Home
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                    onClick={() => window.history.back()}
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Go Back
                                </Button>

                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer text */}
                <p className="text-sm text-slate-500">
                    Error Code: 404 | Need help? Contact support
                </p>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
}