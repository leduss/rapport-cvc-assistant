import React from 'react';

import { Download, Image, Paperclip } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Attachment } from '@/types';

interface PreviewReportAttachmentsProps {
  attachments: Attachment[];
}

const PreviewReportAttachments = ({
  attachments,
}: PreviewReportAttachmentsProps) => {
  if (attachments.length === 0) {
    return null;
  }

  const handleDownload = (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="mb-6 p-4">
      <CardTitle className="flex items-center gap-3 pl-8 text-lg underline">
        <Paperclip className="h-5 w-5" />
        Documents et photos joints
      </CardTitle>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  attachment.type === 'PHOTO'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-orange-100 text-orange-600'
                }`}
              >
                {attachment.type === 'PHOTO' ? (
                  <Image className="h-5 w-5" />
                ) : (
                  <Paperclip className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {attachment.name}
                </p>
                {attachment.description && (
                  <p className="mt-1 text-xs text-gray-600">
                    {attachment.description}
                  </p>
                )}
              </div>
              <Button
                onClick={() =>
                  attachment.file &&
                  handleDownload(
                    URL.createObjectURL(attachment.file),
                    attachment.name
                  )
                }
                className=""
                title="Télécharger"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewReportAttachments;
