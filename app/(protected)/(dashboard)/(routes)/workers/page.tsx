"use client";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Arab, Country, User as user, Worker } from "@prisma/client";
import useAsyncEffect from "use-async-effect";
import { useState } from "react";
import { getCountries, getWorkers } from "../../../../../lib/getWorkers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Loader2, User, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type workerWithUser = Worker & {
  user: user;
};

type countryWithArabs = Country & {
  Arab: arabWithWorkers[];
};

type arabWithWorkers = Arab & {
  Workers: workerWithUser[];
};

const WorkersPage = () => {
  const [workers, setWorkers] = useState<workerWithUser[]>();
  const [countries, setCountries] = useState<countryWithArabs[]>();
  const [country, setCountry] = useState<Country | null>(null);
  const [arabs, setArabs] = useState<arabWithWorkers[]>();
  const [arab, setArab] = useState<arabWithWorkers | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const handleLoadWorkers = async () => {
    if (arab) {
      try {
        setLoading(true);
        const filteredWorkers = arab?.Workers;
        console.log("filtered: ", filteredWorkers)
        setWorkers(filteredWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  useAsyncEffect(async () => {
    setLoading(true);
    try {
      const res = await getCountries();
      setCountries(res);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>

      {loading ?
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        :
        <div>
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Worker Filter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Country Select */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Select Country
                      </label>
                      <Select
                        onValueChange={(value) => {
                          const selectedCountry = countries?.find((c) => c.id === value);
                          setCountry(selectedCountry!);
                          setArabs(selectedCountry!.Arab);
                          setArab(null);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries?.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Arab Select */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Select Arab
                      </label>
                      <Select
                        onValueChange={(value) => {
                          const selectedArab = arabs?.find((a) => a.id === value);
                          setArab(selectedArab!);
                        }}
                        disabled={!country}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose an Arab" />
                        </SelectTrigger>
                        <SelectContent>
                          {arabs?.map((arab) => (
                            <SelectItem key={arab.id} value={arab.id}>
                              {arab.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Load Workers Button */}
                    <div className="flex items-end">
                      <Button onClick={handleLoadWorkers} disabled={!arab || loading} className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        {loading ? "Loading..." : "Load Workers"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          {workers && (
            // @ts-ignore
            <DataTable columns={columns} data={workers} />
          )}
        </div>
      }

    </>
  );
};

export default WorkersPage;
