interface PresetSelectorProps {
  examples: Record<string, string>;
  setInput: (value: string) => void;
}

export const PresetSelector = ({ examples, setInput }: PresetSelectorProps) => (
  <div className="flex gap-2 items-center">
    <label htmlFor="preset-select" className="text-sm font-medium">
      Preset:
    </label>
    <select
      id="preset-select"
      className="px-2 py-1 border rounded text-sm"
      onChange={(e) => setInput(examples[e.target.value])}
    >
      {Object.keys(examples).map((label) => (
        <option key={label} value={label}>
          {label}
        </option>
      ))}
    </select>
  </div>
);
