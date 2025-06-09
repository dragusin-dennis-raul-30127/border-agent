import Layout from "@/components/account-layout";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Borders() {
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const resp = await fetch("http://localhost:3000/border");
      const json = await resp.json();
      setBorders(json);
    };

    loadData();
  }, []);

  return (
    <Layout title="Borders">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[33%px]">Name</TableHead>
            <TableHead className="w-[33%px]">Lat long</TableHead>
            <TableHead className="w-[33%px] text-right">Management</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borders.map((border) => (
            <TableRow key={border.id}>
              <TableCell className="font-medium">{border.name}</TableCell>
              <TableCell>
                {border.latitude} {border.longitude}
              </TableCell>
              <TableCell className="flex gap-1 justify-end">
                <Button variant="outline">
                  <Pen />
                </Button>
                <Button variant="destructive">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
