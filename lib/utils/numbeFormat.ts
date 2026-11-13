export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + " B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + " M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + " K";
  } else {
    return num.toString();
  }
}

export function formatNumberNoSpace(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
}
export function formatNumberToDecimal(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1);
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1);
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1);
  } else {
    return num.toString();
  }
}

export function formatNumberLowerCase(value: number): string {
  const abs = Math.abs(value);

  const format = (num: number, suffix: string) =>
    `${(value / num).toFixed(1).replace(/\.0$/, "")}${suffix}`;

  if (abs >= 1_000_000_000) {
    return format(1_000_000_000, "b");
  }

  if (abs >= 1_000_000) {
    return format(1_000_000, "m");
  }

  if (abs >= 1_000) {
    return format(1_000, "k");
  }

  return value.toString();
}

export function getNumberSuffixLong(num: number): string {
  if (num >= 1_000_000_000) {
    return "billion";
  } else if (num >= 1_000_000) {
    return "million";
  } else if (num >= 1_000) {
    return "thousand";
  } else {
    return "";
  }
}
