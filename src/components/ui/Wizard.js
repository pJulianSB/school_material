import React, { useMemo, useState } from "react";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import styles from "./Wizard.module.css";

export function Wizard({
  children,
  onStepChange,
  onComplete,
  continueLabel = "Continuar",
  backLabel = "Anterior",
  completeLabel = "Completar Compra",
  className,
}) {
  const steps = useMemo(() => React.Children.toArray(children), [children]);
  const [currentStep, setCurrentStep] = useState(0);

  if (steps.length === 0) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const activeStep = steps[currentStep];

  const runStepValidation = () => {
    const validate = activeStep?.props?.validate;
    if (typeof validate !== "function") return true;
    return Boolean(validate());
  };

  const handleNext = () => {
    if (!runStepValidation()) return;
    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextStep);
    if (onStepChange) onStepChange(nextStep);
  };

  const handlePrev = () => {
    if (isFirstStep) return;
    const previousStep = Math.max(currentStep - 1, 0);
    setCurrentStep(previousStep);
    if (onStepChange) onStepChange(previousStep);
  };

  const handleComplete = () => {
    if (!runStepValidation()) return;
    if (onComplete) onComplete();
  };

  const wrapperClassNames = [styles.wizard, className].filter(Boolean).join(" ");

  return (
    <section className={wrapperClassNames}>
      <header className={styles.header}>
        {steps.map((step, index) => {
          const isDone = index <= currentStep;
          const title = step?.props?.title || `Paso ${index + 1}`;
          const icon = step?.props?.icon;

          return (
            <div key={`${title}-${index}`} className={styles.stepItem}>
              <span
                className={`${styles.stepIcon} ${isDone ? styles.stepIconActive : ""}`}
                aria-hidden="true"
              >
                {icon}
              </span>
              <span className={`${styles.stepTitle} ${isDone ? styles.stepTitleActive : ""}`}>
                {title}
              </span>
            </div>
          );
        })}
      </header>

      <div className={styles.body}>{activeStep}</div>

      <footer className={styles.footer}>
        <TertiaryButton type="button" onClick={handlePrev} disabled={isFirstStep}>
          {backLabel}
        </TertiaryButton>

        {!isLastStep ? (
          <PrimaryButton type="button" onClick={handleNext}>
            {continueLabel}
          </PrimaryButton>
        ) : (
          <div className={styles.lastStepActions}>
            <PrimaryButton type="button" onClick={handleComplete}>
              {completeLabel}
            </PrimaryButton>
          </div>
        )}
      </footer>
    </section>
  );
}

Wizard.displayName = "Wizard";
