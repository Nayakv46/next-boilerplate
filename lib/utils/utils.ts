export const getFunctionRowColor = (func: string) => {
  return (
    {
      sales: "bg-[var(--table-group-1)]",
      marketing: "bg-[var(--table-group-2)]",
      product: "bg-[var(--table-group-3)]",
      foundation: "bg-[var(--table-group-4)]",
      ai_projects: "bg-[var(--table-group-5)]",
    }[func] ?? "bg-[var(--table-group-default)]"
  );
};

export const getFunctionGaugeGradientColors = (func: string) => {
  return (
    {
      sales: {
        primary: "var(--gauge-primary-1)",
        secondary: "var(--gauge-secondary-1)",
      },
      marketing: {
        primary: "var(--gauge-primary-2)",
        secondary: "var(--gauge-secondary-2)",
      },
      product: {
        primary: "var(--gauge-primary-3)",
        secondary: "var(--gauge-secondary-3)",
      },
      foundation: {
        primary: "var(--gauge-primary-4)",
        secondary: "var(--gauge-secondary-4)",
      },
      ai_projects: {
        primary: "var(--gauge-primary-5)",
        secondary: "var(--gauge-secondary-5)",
      },
    }[func] ?? {
      primary: "var(--gauge-primary-default)",
      secondary: "var(--gauge-secondary-default)",
    }
  );
};
