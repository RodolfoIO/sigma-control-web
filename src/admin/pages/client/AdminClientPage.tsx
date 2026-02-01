import { Controller, useForm } from "react-hook-form";
import { LocationCombobox } from "@/admin/components/LocationCombobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams } from "react-router";
import { locationData } from "../../../data/country_state_city_data";
import type { Client } from "@/interfaces/client.interface";
import { XIcon } from "lucide-react";

const guatemalaLocation = locationData.filter((l) => l.country_id === 90);

export const AdminClientPage = () => {
  const { id } = useParams();
  const { register, handleSubmit, control, watch, setValue } = useForm<Client>({
    defaultValues: {
      sexo: "",
      estado_civil: "",
      fecha_nacimiento: undefined,
      nacimiento_codigo: undefined,
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const watchedNacimiento = watch("nacimiento_codigo");
  const findedNacimiento = guatemalaLocation.find(
    (c) => c.city_id === +watchedNacimiento,
  );
  const watchedEmisionPasaporte = watch("pasaporte_lugar_emision");
  const findedEmisionPasaporte = guatemalaLocation.find(
    (c) => c.city_id === +watchedEmisionPasaporte,
  );
  return (
    <>
      <h1>AdminClientPage</h1>
      {id}
      <br />
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informacion personal</CardTitle>
            <CardDescription>
              Ingrese la informacion personal del cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Field>
              <FieldLabel htmlFor="nombres">Nombres</FieldLabel>
              <Input
                type="text"
                id="nombres"
                placeholder="Ingrese los nombres"
                {...register("nombres")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="apellidos">Apellidos</FieldLabel>
              <Input
                type="text"
                id="apellidos"
                placeholder="Ingrese los apellidos"
                {...register("apellidos")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="sexo">Sexo</FieldLabel>
              <Controller
                name="sexo"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="sexo">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="estado_civil">Estado civil</FieldLabel>
              <Controller
                name="estado_civil"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="estado_civil">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soltero">Soltero/a</SelectItem>
                      <SelectItem value="casado">Casado/a</SelectItem>
                      <SelectItem value="unido">Unido/a</SelectItem>
                      <SelectItem value="divorciado">Divorciado/a</SelectItem>
                      <SelectItem value="separado">Separado/a</SelectItem>
                      <SelectItem value="viudo">Viudo/a</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fecha_nacimiento">
                Fecha de nacimiento
              </FieldLabel>
              <Input
                type="date"
                id="fecha_nacimiento"
                {...register("fecha_nacimiento")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lugar_nacimiento">
                Lugar de nacimiento
              </FieldLabel>
              
              {watchedNacimiento ? (
                <div>
                  {
                    <div className="flex items-center gap-2 w-full">
                    <Input
                      type="text"
                      disabled
                      className="flex-1"
                      value={`${findedNacimiento?.city_name}, ${findedNacimiento?.state_name}`}
                    />
                  
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-10 shrink-0"
                      onClick={() => setValue("nacimiento_codigo", "")}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>                  
                  }
                </div>
              ) : (
                <Controller
                  name="nacimiento_codigo"
                  control={control}
                  render={({ field }) => {
                    const selectedCity =
                      guatemalaLocation.find(
                        (c) => c.city_id === +field.value,
                      ) ?? null;
                    return (
                      <LocationCombobox
                        data={guatemalaLocation}
                        value={selectedCity}
                        onChange={(city) =>
                          field.onChange(city?.city_id ?? null)
                        }
                      />
                    );
                  }}
                />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="pasaporte_numero">Numero de pasaporte</FieldLabel>
              <Input
                type="number"
                id="pasaporte_numero"
                placeholder="Ingrese numero de pasaporte"
                {...register("pasaporte_numero")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pasaporte_libreta">Numero de libreta</FieldLabel>
              <Input
                type="text"
                id="pasaporte_libreta"
                placeholder="Ingrese numero de libreta"
                {...register("pasaporte_libreta")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pasaporte_fecha_emision">Fecha de emision</FieldLabel>
              <Input
                type="date"
                id="pasaporte_fecha_emision"
                {...register("pasaporte_fecha_emision")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pasaporte_fecha_expiracion">Fecha de expiracion</FieldLabel>
              <Input
                type="date"
                id="pasaporte_fecha_expiracion"
                {...register("pasaporte_fecha_expiracion")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pasaporte_lugar_emision">
                Lugar de emision de pasaporte
              </FieldLabel>
              
              {findedEmisionPasaporte ? (
                <div>
                  {
                    <div className="flex items-center gap-2 w-full">
                    <Input
                      type="text"
                      disabled
                      className="flex-1"
                      value={`${findedEmisionPasaporte?.city_name}, ${findedEmisionPasaporte?.state_name}`}
                    />
                  
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-10 shrink-0"
                      onClick={() => setValue("pasaporte_lugar_emision", "")}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>                  
                  }
                </div>
              ) : (
                <Controller
                  name="pasaporte_lugar_emision"
                  control={control}
                  render={({ field }) => {
                    const selectedCity =
                      guatemalaLocation.find(
                        (c) => c.city_id === +field.value,
                      ) ?? null;
                    return (
                      <LocationCombobox
                        data={guatemalaLocation}
                        value={selectedCity}
                        onChange={(city) =>
                          field.onChange(city?.city_id ?? null)
                        }
                      />
                    );
                  }}
                />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="pasaporte_extraviado">¿Pasaporte extraviado?</FieldLabel>
              <Input
                type="text"
                id="pasaporte_extraviado"
                placeholder="Ingrese explicacion (si aplica)"
                {...register("pasaporte_extraviado")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="correo_electronico">Correo electronico</FieldLabel>
              <Input
                type="text"
                id="correo_electronico"
                placeholder="ejemplo@gmail.com"
                {...register("correo_electronico")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="telefonos">Telefono principal</FieldLabel>
              <Input
                type="number"
                id="telefonos"
                placeholder="Ingrese telefono principal"
                {...register("telefonos.0")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="telefonos">Telefono secundario</FieldLabel>
              <Input
                type="number"
                id="telefonos"
                placeholder="Ingrese telefono secundario"
                {...register("telefonos.1")}
              />
            </Field>
          </CardContent>
          <CardFooter className="justify-between">
            <Link to="/clientes">
              <Button className="p-4" variant={"outline"} type="button">
                Cancelar
              </Button>
            </Link>
            <Button className="p-4" type="submit">
              Guardar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
