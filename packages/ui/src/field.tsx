import { checkbox, field, input, select, textarea, type InputVariants } from "@collie/recipes-tw";
import { useId } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldChrome = {
  label: string;
  hideLabel?: boolean;
  description?: ReactNode;
  error?: ReactNode;
};

function Chrome({
  label,
  hideLabel,
  description,
  error,
  id,
  children,
}: FieldChrome & { id: string; children: ReactNode }) {
  const slots = field({ hideLabel });
  return (
    <div className={slots.root()}>
      <label className={slots.label()} htmlFor={id}>
        {label}
      </label>
      {children}
      {description && !error ? <span className={slots.description()}>{description}</span> : null}
      {error ? <span className={slots.error()}>{error}</span> : null}
    </div>
  );
}

export type TextFieldProps = FieldChrome &
  Omit<InputHTMLAttributes<HTMLInputElement>, "color" | "size">;

export function TextField({ label, hideLabel, description, error, id, ...props }: TextFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const tone: InputVariants["tone"] = error ? "critical" : "default";
  return (
    <Chrome
      label={label}
      hideLabel={hideLabel}
      description={description}
      error={error}
      id={fieldId}
    >
      <input {...props} id={fieldId} className={input({ tone })} />
    </Chrome>
  );
}

export type TextAreaFieldProps = FieldChrome &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "color">;

export function TextAreaField({
  label,
  hideLabel,
  description,
  error,
  id,
  ...props
}: TextAreaFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const tone: InputVariants["tone"] = error ? "critical" : "default";
  return (
    <Chrome
      label={label}
      hideLabel={hideLabel}
      description={description}
      error={error}
      id={fieldId}
    >
      <textarea {...props} id={fieldId} className={textarea({ tone })} />
    </Chrome>
  );
}

export type SelectFieldProps = FieldChrome &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "color"> & {
    options: { value: string; label: string }[];
  };

export function SelectField({
  label,
  hideLabel,
  description,
  error,
  id,
  options,
  ...props
}: SelectFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const tone: InputVariants["tone"] = error ? "critical" : "default";
  return (
    <Chrome
      label={label}
      hideLabel={hideLabel}
      description={description}
      error={error}
      id={fieldId}
    >
      <select {...props} id={fieldId} className={select({ tone })}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Chrome>
  );
}

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "color" | "type"> & {
  "aria-label": string;
};

export function Checkbox(props: CheckboxProps) {
  return <input {...props} type="checkbox" className={checkbox().control()} />;
}

export type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "color" | "type"> & {
  label: string;
  description?: ReactNode;
};

export function CheckboxField({ label, description, id, ...props }: CheckboxFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const slots = field();
  const box = checkbox();
  return (
    <div className={box.root()}>
      <input {...props} type="checkbox" id={fieldId} className={box.control()} />
      <div className={box.text()}>
        <label className={slots.label()} htmlFor={fieldId}>
          {label}
        </label>
        {description ? <span className={slots.description()}>{description}</span> : null}
      </div>
    </div>
  );
}
