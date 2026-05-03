import { Controller, useForm } from "react-hook-form";
import { LocationCombobox } from "@/admin/components/LocationCombobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import { getClientByIdAction } from "@/admin/actions/get-client-by-id.action";
import { useEffect, useState } from "react";
import { SkeletonTable } from "@/admin/components/SkeletonTable";

const guatemalaLocation = locationData.filter((l) => l.country_id === 90);

export type ClientForm = Omit<
  Client,
  | "fecha_nacimiento"
  | "pasaporte_fecha_emision"
  | "pasaporte_fecha_expiracion"
  | "padre_fecha_nacimiento"
  | "madre_fecha_nacimiento"
  | "conyuge_fecha_nacimiento"
  | "conyuge_fecha_separacion"
  | "conyuge_fecha_fallecimiento"
  | "trabajo_fecha"
  | "educacion_fecha_inicio"
  | "educacion_fecha_fin"
> & {
  fecha_nacimiento?: string;
  pasaporte_fecha_emision?: string;
  pasaporte_fecha_expiracion?: string;
  padre_fecha_nacimiento?: string;
  madre_fecha_nacimiento?: string;
  conyuge_fecha_nacimiento?: string;
  conyuge_fecha_separacion?: string;
  conyuge_fecha_fallecimiento?: string;
  trabajo_fecha?: string;
  educacion_fecha_inicio?: string;
  educacion_fecha_fin?: string;
};

export const AdminClientPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, control, watch, setValue, reset } =
    useForm<ClientForm>({
      defaultValues: {
        estado_civil: "",
        fecha_nacimiento: undefined,
        nacimiento_codigo: undefined,
      },
    });

  const toDateInput = (value?: Date | string): string | undefined => {
    if (!value) return undefined;

    const date = value instanceof Date ? value : new Date(value);

    if (isNaN(date.getTime())) return undefined;

    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  };

  useEffect(() => {
    const loadClients = async () => {
      const client = await getClientByIdAction(id!);

      reset({
        ...client,
        fecha_nacimiento: toDateInput(client.fecha_nacimiento),
        pasaporte_fecha_emision: toDateInput(client.pasaporte_fecha_emision),
        pasaporte_fecha_expiracion: toDateInput(
          client.pasaporte_fecha_expiracion,
        ),
        padre_fecha_nacimiento: toDateInput(client.padre_fecha_nacimiento),
        madre_fecha_nacimiento: toDateInput(client.madre_fecha_nacimiento),
        conyuge_fecha_nacimiento: toDateInput(client.conyuge_fecha_nacimiento),
        conyuge_fecha_separacion: toDateInput(client.conyuge_fecha_separacion),
        conyuge_fecha_fallecimiento: toDateInput(
          client.conyuge_fecha_fallecimiento,
        ),
        trabajo_fecha: toDateInput(client.trabajo_fecha),
        educacion_fecha_inicio: toDateInput(client.educacion_fecha_inicio),
        educacion_fecha_fin: toDateInput(client.educacion_fecha_fin),
      });

      setLoading(false);
    };

    loadClients();
  }, [id, reset]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const formWatched = watch();

  const findedNacimiento = guatemalaLocation.find(
    (c) => c.city_id === +formWatched.nacimiento_codigo,
  );
  const findedEmisionPasaporte = guatemalaLocation.find(
    (c) => c.city_id === +formWatched.pasaporte_lugar_emision,
  );
  const findedLugarResidencia = guatemalaLocation.find(
    (c) => c.city_id === +formWatched.residencia_codigo,
  );
  return (
    <>
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            {/* <CardTitle>Informacion personal</CardTitle>
            <CardDescription>
              Ingrese la informacion personal del cliente
            </CardDescription> */}
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <SkeletonTable />
            ) : (
              <>
              <h2 className="text-lg font-semibold col-span-full">Datos personales</h2>
              <hr className="col-span-full" />
                {/* nombres */}
                <Field>
                  <FieldLabel htmlFor="nombres">Nombres</FieldLabel>
                  <Input
                    type="text"
                    id="nombres"
                    placeholder="Ingrese los nombres"
                    {...register("nombres")}
                  />
                </Field>
                {/* apellidos */}
                <Field>
                  <FieldLabel htmlFor="apellidos">Apellidos</FieldLabel>
                  <Input
                    type="text"
                    id="apellidos"
                    placeholder="Ingrese los apellidos"
                    {...register("apellidos")}
                  />
                </Field>
                {/* sexo */}
                <Field>
                  <FieldLabel htmlFor="sexo">Sexo</FieldLabel>
                  <Controller
                    name="sexo"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="sexo">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Femenino</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                {/* estado_civil */}
                <Field>
                  <FieldLabel htmlFor="estado_civil">Estado civil</FieldLabel>
                  <Controller
                    name="estado_civil"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="estado_civil">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="soltero">Soltero/a</SelectItem>
                          <SelectItem value="casado">Casado/a</SelectItem>
                          <SelectItem value="unido">Unido/a</SelectItem>
                          <SelectItem value="divorciado">
                            Divorciado/a
                          </SelectItem>
                          <SelectItem value="separado">Separado/a</SelectItem>
                          <SelectItem value="viudo">Viudo/a</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                {/* fecha_nacimiento */}
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
                {/* lugar_nacimiento */}
                <Field>
                  <FieldLabel htmlFor="lugar_nacimiento">
                    Lugar de nacimiento
                  </FieldLabel>

                  {formWatched.nacimiento_codigo ? (
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
                <h2 className="text-lg font-semibold col-span-full">Datos de pasaporte</h2>
              <hr className="col-span-full" />
                {/* pasaporte_numero */}
                <Field>
                  <FieldLabel htmlFor="pasaporte_numero">
                    Numero de pasaporte
                  </FieldLabel>
                  <Input
                    type="number"
                    id="pasaporte_numero"
                    placeholder="Ingrese numero de pasaporte"
                    {...register("pasaporte_numero")}
                  />
                </Field>
                {/* pasaporte_libreta */}
                <Field>
                  <FieldLabel htmlFor="pasaporte_libreta">
                    Numero de libreta
                  </FieldLabel>
                  <Input
                    type="text"
                    id="pasaporte_libreta"
                    placeholder="Ingrese numero de libreta"
                    {...register("pasaporte_libreta")}
                  />
                </Field>
                {/* pasaporte_fecha_emision */}
                <Field>
                  <FieldLabel htmlFor="pasaporte_fecha_emision">
                    Fecha de emision
                  </FieldLabel>
                  <Input
                    type="date"
                    id="pasaporte_fecha_emision"
                    {...register("pasaporte_fecha_emision")}
                  />
                </Field>
                {/* pasaporte_fecha_expiracion */}
                <Field>
                  <FieldLabel htmlFor="pasaporte_fecha_expiracion">
                    Fecha de expiracion
                  </FieldLabel>
                  <Input
                    type="date"
                    id="pasaporte_fecha_expiracion"
                    {...register("pasaporte_fecha_expiracion")}
                  />
                </Field>
                {/* pasaporte_lugar_emision */}
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
                            onClick={() =>
                              setValue("pasaporte_lugar_emision", "")
                            }
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
                {/* pasaporte_extraviado */}
                <Field>
                  <FieldLabel htmlFor="pasaporte_extraviado">
                    ¿Pasaporte extraviado?
                  </FieldLabel>
                  <Input
                    type="text"
                    id="pasaporte_extraviado"
                    placeholder="Ingrese explicacion (si aplica)"
                    {...register("pasaporte_extraviado")}
                  />
                </Field>
                <h2 className="text-lg font-semibold col-span-full">Datos de contacto</h2>
              <hr className="col-span-full" />
                {/* correo_electronico */}
                <Field>
                  <FieldLabel htmlFor="correo_electronico">
                    Correo electronico
                  </FieldLabel>
                  <Input
                    type="text"
                    id="correo_electronico"
                    placeholder="ejemplo@gmail.com"
                    {...register("correo_electronico")}
                  />
                </Field>
                {/* telefonos principal */}
                <Field>
                  <FieldLabel htmlFor="telefonos">
                    Telefono principal
                  </FieldLabel>
                  <Input
                    type="number"
                    id="telefonos"
                    placeholder="Ingrese telefono principal"
                    {...register("telefonos.0")}
                  />
                </Field>
                {/* telefonos secundario */}
                <Field>
                  <FieldLabel htmlFor="telefonos">
                    Telefono secundario
                  </FieldLabel>
                  <Input
                    type="number"
                    id="telefonos"
                    placeholder="Ingrese telefono secundario"
                    {...register("telefonos.1")}
                  />
                </Field>
                {/* residencia_direccion */}
                <Field>
                  <FieldLabel htmlFor="residencia_direccion">
                    Direccion de residencia
                  </FieldLabel>
                  <Input
                    type="text"
                    id="residencia_direccion"
                    placeholder="Ingrese la direccion"
                    {...register("residencia_direccion")}
                  />
                </Field>
                {/* residencia_codigo */}
                <Field>
                  <FieldLabel htmlFor="residencia_codigo">
                    Lugar de residencia
                  </FieldLabel>

                  {findedLugarResidencia ? (
                    <div>
                      {
                        <div className="flex items-center gap-2 w-full">
                          <Input
                            type="text"
                            disabled
                            className="flex-1"
                            value={`${findedLugarResidencia?.city_name}, ${findedLugarResidencia?.state_name}`}
                          />

                          <Button
                            type="button"
                            variant="ghost"
                            className="h-10 w-10 shrink-0"
                            onClick={() => setValue("residencia_codigo", "")}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      }
                    </div>
                  ) : (
                    <Controller
                      name="residencia_codigo"
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
              </>
            )}
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
