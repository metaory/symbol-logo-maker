import { useEffect, useRef } from "react";
import { IconTypography } from "@tabler/icons-react";
import { Panel } from "./Panel";
import { ControlRow } from "./ControlRow";
import { update, useStore } from "@/state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "iconify-picker";

const fonts = [
  "sans-serif",
  "serif",
  "monospace",
  "cursive",
  "Georgia",
  "Arial Black",
  "Impact",
  "Figtree Variable",
];

const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export function InputControls() {
  const input = useStore((s) => s.input);
  const set = (v: Partial<typeof input>) => update("input", v);
  const pickerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const picker = pickerRef.current;
    if (!picker) return;

    const handler = (e: CustomEvent) => {
      set({ icon: e.detail.iconName, iconSvg: e.detail.svg });
    };

    picker.addEventListener("icon-selected", handler as EventListener);
    return () =>
      picker.removeEventListener("icon-selected", handler as EventListener);
  }, []);

  return (
    <Panel title="Input" icon={<IconTypography className="size-4" />}>
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant={input.mode === "char" ? "default" : "outline"}
          onClick={() => set({ mode: "char" })}
        >
          Character
        </Button>
        <Button
          size="sm"
          variant={input.mode === "icon" ? "default" : "outline"}
          onClick={() => set({ mode: "icon" })}
        >
          Icon
        </Button>
      </div>

      {input.mode === "char" && (
        <>
          <label className="grid gap-1">
            <span className="text-xs text-muted-foreground">Character</span>
            <Input
              value={input.char}
              onChange={(e) => set({ char: e.target.value.slice(0, 4) })}
              maxLength={4}
              className="text-center text-lg"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-muted-foreground">Font</span>
            <select
              value={input.font}
              onChange={(e) => set({ font: e.target.value })}
              className="h-7 rounded-md border border-input bg-input/20 px-2 text-xs"
            >
              {fonts.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>

          <ControlRow
            label="Size"
            value={input.size}
            onChange={(v) => set({ size: v as number })}
            type="range"
            min={10}
            max={200}
          />

          <label className="grid gap-1">
            <span className="text-xs text-muted-foreground">Weight</span>
            <select
              value={input.weight}
              onChange={(e) => set({ weight: Number(e.target.value) })}
              className="h-7 rounded-md border border-input bg-input/20 px-2 text-xs"
            >
              {weights.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      {input.mode === "icon" && (
        <div className="grid gap-2 overflow-hidden">
          {/* @ts-expect-error web component */}
          <iconify-picker
            ref={pickerRef}
            theme="auto"
            collection="mdi"
            page-size="24"
          />
          {input.icon && (
            <div className="flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1 text-xs overflow-hidden">
              <span className="text-muted-foreground shrink-0">Selected:</span>
              <span className="font-mono truncate">{input.icon}</span>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
