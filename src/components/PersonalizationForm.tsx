"use client";

import type { PersonalizationFields } from "@/data/products";

export interface PersonalizationValues {
  babyName: string;
  ageMonth: string;
  occasion: string;
  date: string;
  theme: string;
}

export const emptyPersonalization: PersonalizationValues = {
  babyName: "",
  ageMonth: "",
  occasion: "",
  date: "",
  theme: "",
};

const occasions = [
  "Monthly milestone",
  "First birthday",
  "Naming ceremony",
  "First Diwali",
  "First Sankranti",
  "Photoshoot",
  "Just because it's cute",
];

const themes = ["Classic Cute", "Baby Scientist", "IT Baby", "Chef Baby", "Stars & Moon", "Balloons & Confetti"];

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-coral focus:ring-2 focus:ring-coral/20";

/**
 * Personalization fields, driven by the product's `personalization` config.
 * Set `showTheme` for Custom Name products that include theme selection.
 */
export default function PersonalizationForm({
  fields,
  values,
  onChange,
  showTheme = false,
}: {
  fields: PersonalizationFields;
  values: PersonalizationValues;
  onChange: (values: PersonalizationValues) => void;
  showTheme?: boolean;
}) {
  const set = (key: keyof PersonalizationValues) => (value: string) =>
    onChange({ ...values, [key]: value });

  return (
    <fieldset className="space-y-4">
      <legend className="font-bold">Personalize it 💌</legend>

      {fields.babyName && (
        <div>
          <label htmlFor="babyName" className="mb-1 block text-sm font-semibold">
            Baby&apos;s name <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id="babyName"
            type="text"
            maxLength={20}
            placeholder="e.g. Aarav"
            value={values.babyName}
            onChange={(e) => set("babyName")(e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      {fields.ageMonth && (
        <div>
          <label htmlFor="ageMonth" className="mb-1 block text-sm font-semibold">
            Age / month
          </label>
          <input
            id="ageMonth"
            type="text"
            maxLength={20}
            placeholder="e.g. 6 months / 1 year"
            value={values.ageMonth}
            onChange={(e) => set("ageMonth")(e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      {fields.occasion && (
        <div>
          <label htmlFor="occasion" className="mb-1 block text-sm font-semibold">
            Occasion
          </label>
          <select
            id="occasion"
            value={values.occasion}
            onChange={(e) => set("occasion")(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose an occasion…</option>
            {occasions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      )}

      {showTheme && (
        <div>
          <label htmlFor="theme" className="mb-1 block text-sm font-semibold">
            Theme
          </label>
          <select
            id="theme"
            value={values.theme}
            onChange={(e) => set("theme")(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose a theme…</option>
            {themes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )}

      {fields.date && (
        <div>
          <label htmlFor="specialDate" className="mb-1 block text-sm font-semibold">
            Special date <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id="specialDate"
            type="date"
            value={values.date}
            onChange={(e) => set("date")(e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      <p className="text-xs text-ink-soft">
        We print exactly what you enter — please double-check spelling before adding to cart.
      </p>
    </fieldset>
  );
}
