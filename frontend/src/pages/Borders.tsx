import Layout from "@/components/account-layout";
import { AlertDialogDemo } from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import { borderSchema, BorderFormValues } from "@/lib/schemas/border-schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import type { BorderDocument } from "../../../backend/src/border/border.schema";
import BorderEditForm from "@/components/edit-border-form";
import FormModal from "@/components/form-modal";
import BorderAddForm from "@/components/add-border-form";

export default function Borders() {
  const [borders, setBorders] = useState<BorderDocument[]>([]);

  const loadData = async () => {
    try {
      const resp = await fetch("http://localhost:3000/border");
      const json = await resp.json();
      setBorders(json);
      console.log("border data:", json);
    } catch (e) {
      console.error("whoops", e);
    }
  };

  async function deleteBorder(id: any) {
    try {
      await fetch(`http://localhost:3000/border/delete/${id}`, {
        method: "DELETE",
      });
      loadData();
    } catch (e) {
      console.error("whoops", e);
    }
  }

  async function updateBorder(id: any, data: BorderFormValues) {
    try {
      await fetch(`http://localhost:3000/border/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      loadData();
    } catch (e) {
      console.error("whoops", e);
    }
  }

  async function addBorder(data: BorderFormValues) {
    try {
      await fetch(`http://localhost:3000/border`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      loadData();
    } catch (e) {
      console.error("whoops", e);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout title="Borders">
      <div className="flex justify-end items-center">
        <FormModal
          trigger={
            <Button variant="outline">
              <Plus />
            </Button>
          }
          title={"Add Border"}
          form={"add-border-form"}
        >
          <BorderAddForm
            onSave={async (data) => await addBorder(data)}
          ></BorderAddForm>
        </FormModal>
      </div>
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
                <FormModal
                  title={"EditBorder"}
                  trigger={
                    <Button variant={"outline"}>
                      <Pen />
                    </Button>
                  }
                  form={"edit-border-form"}
                >
                  <BorderEditForm
                    border={border}
                    onSave={async (data) =>
                      await updateBorder(border._id, data)
                    }
                  />
                </FormModal>
                <AlertDialogDemo
                  button={
                    <Button variant="destructive">
                      <Trash />
                    </Button>
                  }
                  onClick={() => deleteBorder(border._id)}
                ></AlertDialogDemo>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
