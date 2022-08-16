import React from "react";
import { Command } from "cmdk";
import "../../base.css";
import "./command.scss";
import { components } from "../../domain";

export type CommandProps = {};

export default () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = React.useState<
    typeof components[number]["name"] | string
  >("");

  const [component, setComponent] = React.useState<
    typeof components[number]["name"] | undefined
  >(undefined);

  const [open, setOpen] = React.useState(true);

  function bounce() {
    if (ref.current) {
      ref.current.style.transform = "scale(0.96)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = "";
        }
      }, 100);

      setInputValue("");
    }
  }

  // // Toggle the menu when ⌘K is pressed
  // React.useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "k" && e.metaKey) {
  //       setOpen((open) => !open);
  //     }
  //   };

  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);

  return (
    <div className="">
      <Command
        value={inputValue}
        onValueChange={(v) => {
          setInputValue(v as any);
        }}
        ref={ref}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            bounce();
          }

          if (!component || inputValue.length) {
            return;
          }

          if (e.key === "Backspace") {
            e.preventDefault();
            setComponent(undefined);
            bounce();
          }
        }}
      >
        <div cmdk-vercel-badges="">
          <div cmdk-vercel-badge="">Home</div>
          {component && <div cmdk-vercel-badge="">{component}</div>}
        </div>

        <div cmdk-framer-header="">
          <SearchIcon />
          <Command.Input
            autoFocus
            placeholder="Find components for popular AWS Services..."
            onValueChange={(value) => {
              setInputValue(value);
            }}
          />
        </div>

        <Command.List>
          <div cmdk-framer-items="">
            <div cmdk-framer-left="">
              <Command.Group heading="Components">
                {components
                  .filter((c) => c.icon)
                  .map((c) => (
                    <Item
                      value={c.name}
                      subtitle={c.subtitle}
                      icon={c.icon!}
                      key={c.name}
                      onSelect={(value) => setComponent(value as any)}
                    />
                  ))}
              </Command.Group>
            </div>
            {!component && <hr cmdk-framer-separator="" />}

            <ExampleFrame inputValue={inputValue} display={!component} />
          </div>
        </Command.List>
      </Command>
    </div>
  );
};

const ExampleFrame = ({
  inputValue,
  display,
}: {
  inputValue: string;
  display: boolean;
}) => {
  if (!display) return null;

  const someSelected = components.some(
    (c) => c.name.toLowerCase() === inputValue
  );

  if (!someSelected) {
    return <div cmdk-framer-right=""></div>;
  }
  return (
    <div cmdk-framer-right="">
      <div cmdk-framer-right-inner="">
        <h1 cmdk-group-heading="" cmdk-group-heading-right="">
          Example
        </h1>

        {components
          .filter((c) => c.name.toLowerCase() === inputValue)
          .map((c) => c.component(c.sampleData))}
      </div>
    </div>
  );
};

function Item({
  value,
  subtitle,
  icon,
  disabled,
  onSelect,
}: {
  value: string;
  subtitle: string;
  icon: string;
  disabled?: boolean;
  onSelect: (val: string) => void;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={() => {
        onSelect(value);
      }}
      disabled={!!disabled}
    >
      <div cmdk-framer-icon-wrapper="">
        {
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(icon)}`}
            style={{ height: 40, width: 40 }}
          />
        }
      </div>
      <div cmdk-framer-item-meta="">
        {value}
        <span cmdk-framer-item-subtitle="">{subtitle}</span>
      </div>
    </Command.Item>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
