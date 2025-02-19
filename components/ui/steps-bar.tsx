import StepCard from "./step";

export default function StepBar({ steps, currentStep }: { steps: Array<{ step: number, title: string }>, currentStep: number }) {
    return (
      <div className="flex items-start justify-start gap-4 w-full py-4">
        {steps.map(({ step, title }) => (
          <StepCard key={step} step={step} title={title} complete={step <= currentStep} />
        ))}
      </div>
    );
  }
  