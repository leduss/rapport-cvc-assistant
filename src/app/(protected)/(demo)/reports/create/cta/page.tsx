'use client';

import React from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects } from '@/lib/data/projects';

import { CTAConditionsForm } from './_components/CTAConditionsForm';
import { CTAGeneralInfoForm } from './_components/CTAGeneralInfoForm';
import { CTAHeader } from './_components/ctaHeader';
import { CTAInfoForm } from './_components/CTAInfoForm';
import { CTAReportPreview } from './_components/CTAReportPreview';
import { CTATestCard } from './_components/CTATestCard';
import { MissingCTAInfoCard, NoTestsCard } from './_components/EmptyStateCards';
import { useCTAReport } from './_components/hooks/useCTAReports';
import { usePrintReport } from './_components/hooks/usePrintReport';

// Imports des composants

// Données mockées

export default function CTAReportPage() {
  const {
    formData,
    ctaTests,
    updateFormData,
    updateCTATest,
    deleteCTATest,
    setCTATests,
    createNewTest,
    handleSave,
    exportToJSON,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addAttachment,
    updateAttachmentDescription,
    deleteAttachment,
  } = useCTAReport();

  const { printRef, handlePrint } = usePrintReport(formData.reportNumber);

  const canStartTests = !!(
    formData.ctaName &&
    formData.location &&
    formData.brand
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <CTAHeader onSave={handleSave} />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 ">
          <TabsTrigger className="cursor-pointer" value="general">
            Informations générales
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="cta-tests">
            Tests CTA
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="preview">
            Aperçu rapport
          </TabsTrigger>
        </TabsList>

        {/* Onglet Informations générales */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6">
            <CTAGeneralInfoForm
              formData={formData}
              projects={projects}
              onUpdate={updateFormData}
            />
            <CTAInfoForm formData={formData} onUpdate={updateFormData} />
            <CTAConditionsForm formData={formData} onUpdate={updateFormData} />
          </div>
        </TabsContent>

        {/* Onglet Tests CTA */}
        <TabsContent value="cta-tests" className="space-y-6">
          {!canStartTests ? (
            <MissingCTAInfoCard />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Tests de la CTA : {formData.ctaName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.brand} {formData.model} - {formData.location}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    const newTest = createNewTest();
                    setCTATests([newTest]);
                  }}
                  disabled={ctaTests.length > 0}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {ctaTests.length > 0
                    ? 'Test en cours'
                    : 'Commencer les tests'}
                </Button>
              </div>

              <div className="space-y-6">
                {ctaTests.length === 0 ? (
                  <NoTestsCard />
                ) : (
                  ctaTests.map((test) => (
                    <CTATestCard
                      key={test.id}
                      test={test}
                      onUpdate={updateCTATest}
                      onDelete={deleteCTATest}
                      onAddEquipment={addEquipment}
                      onUpdateEquipment={updateEquipment}
                      onDeleteEquipment={deleteEquipment}
                      onAddAttachment={addAttachment}
                      onUpdateAttachmentDescription={
                        updateAttachmentDescription
                      }
                      onDeleteAttachment={deleteAttachment}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </TabsContent>

        {/* Onglet Aperçu */}
        <TabsContent value="preview" className="space-y-6">
          <CTAReportPreview
            ref={printRef}
            formData={formData}
            ctaTests={ctaTests}
            projects={projects}
            onPrint={handlePrint}
            onExport={exportToJSON}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
