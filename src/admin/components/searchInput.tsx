import { useRef, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Props = {
  onSearch: (value: string) => void;
};

export function SearchInput({ onSearch }: Props) {
  const searchInput = useRef<HTMLInputElement | null>(null);

  const search = () => {
    const value = searchInput.current?.value ?? "";
    onSearch(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    search();
  };

  return (
    <Field className="mb-4">
      <ButtonGroup>
        <Input
          placeholder="Buscar..."
          ref={searchInput}
          onKeyDown={handleKeyDown}
        />
        <Button variant="outline" onClick={search}>
          Buscar
        </Button>
      </ButtonGroup>
    </Field>
  );
}