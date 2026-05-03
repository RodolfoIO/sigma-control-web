import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import type { CountryStateCity } from "@/interfaces/countryStateCity.interface";

interface Props {
  data: CountryStateCity[];
  value: CountryStateCity | null;
  onChange: (value: CountryStateCity | null) => void;
}

export const LocationCombobox = ({ value, data, onChange }: Props) => {
  return (
    <Combobox<CountryStateCity>
      items={data}
      value={value}
      onValueChange={onChange}
      itemToStringValue={(city) => city.city_name}
    >
      <ComboboxInput
        placeholder="Selecciona una localidad"
        autoComplete="new-password"
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No existe el registro</ComboboxEmpty>
        <ComboboxList>
          {(city) => (
            <ComboboxItem key={city.city_id} value={city}>
              <Item size="sm" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {city.city_name}
                  </ItemTitle>
                  <ItemDescription>
                    {city.state_name} ({city.city_zip_code})
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
