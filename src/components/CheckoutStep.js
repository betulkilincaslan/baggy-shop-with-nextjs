import { Step, StepLabel, Stepper } from "@mui/material";

export default function CheckoutStep({ activeStep = 0 }) {
  return (
    <Stepper
      sx={{ backgroundColor: "transparent", mb: "45px" }}
      activeStep={activeStep}
      alternativeLabel
    >
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}
