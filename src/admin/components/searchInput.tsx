import { useRef, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SearchInput() {
  const searchInput = useRef<HTMLInputElement | null>(null);

  const search = () => {
    const value = searchInput.current?.value;
    console.log("Buscando:", value);
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

