import React from 'react';

import { Camera, FileText, Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Attachment {
  id: string;
  type: 'PHOTO' | 'DOCUMENT';
  name: string;
  description: string;
  url?: string;
  file?: File;
}

interface AttachmentsCardProps {
  attachments: Attachment[];
  onAdd: (file: File, type: 'PHOTO' | 'DOCUMENT', description: string) => void;
  onDelete: (id: string) => void;
  onUpdateDescription: (id: string, description: string) => void;
}

export const AttachmentsCard: React.FC<AttachmentsCardProps> = ({
  attachments,
  onAdd,
  onDelete,
  onUpdateDescription,
}) => {
  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'PHOTO' | 'DOCUMENT'
  ) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        onAdd(file, type, '');
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center">
            <Camera className="mr-2 h-4 w-4" />
            Photos et documents
          </span>
          <div className="flex gap-2">
            <Label htmlFor="photo-upload">
              <Button size="sm" variant="outline" asChild>
                <span>
                  <Camera className="mr-1 h-3 w-3" />
                  Photo
                </span>
              </Button>
            </Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'PHOTO')}
            />

            <Label htmlFor="doc-upload">
              <Button size="sm" variant="outline" asChild>
                <span>
                  <FileText className="mr-1 h-3 w-3" />
                  Document
                </span>
              </Button>
            </Label>
            <Input
              id="doc-upload"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'DOCUMENT')}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center gap-3 p-3 border rounded-lg"
            >
              {attachment.type === 'PHOTO' ? (
                <Camera className="h-5 w-5 text-blue-600 flex-shrink-0" />
              ) : (
                <FileText className="h-5 w-5 text-orange-600 flex-shrink-0" />
              )}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{attachment.name}</p>
                <Input
                  value={attachment.description}
                  onChange={(e) =>
                    onUpdateDescription(attachment.id, e.target.value)
                  }
                  placeholder="Description..."
                  className="h-7 text-xs"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(attachment.id)}
                className="h-7 w-7 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {attachments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Upload className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">Aucun fichier ajouté</p>
              <p className="text-xs">Photos et documents techniques</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
