import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignatureSectionProps {
  title?: string;
}

export const SignatureSection = ({
  title = 'VALIDATION DU RAPPORT',
}: SignatureSectionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);

    // Position de départ
    let x, y;
    if ('touches' in e) {
      // Pour les appareils tactiles
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Pour la souris
      const rect = canvas.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Position actuelle
    let x, y;
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      const rect = canvas.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="mt-12 pt-8">
      <Card className="border-t-2 border-gray-300">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="mx-auto w-1/2">
          {/* Bloc Technicien */}
          <Card>
            <CardHeader>
              <h4 className="text-base font-semibold">Technicien</h4>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="technician-name"
                  className="text-sm text-gray-600"
                >
                  Nom et prénom :
                </Label>
                <Input id="technician-name" placeholder="Nom Prénom" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Signature :</Label>
                <div className="relative h-52 w-full rounded border border-gray-300 bg-white">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={200}
                    className="absolute inset-0 h-full w-full"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearSignature}>
                    Effacer
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="technician-date"
                  className="text-sm text-gray-600"
                >
                  Date :
                </Label>
                <Input id="technician-date" type="date" />
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
