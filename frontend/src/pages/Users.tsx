import Layout from "@/components/account-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormModal from "@/components/form-modal"; // your dialog wrapper
import { Button } from "@/components/ui/button";
import { Plus, Pen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import type { UserDocument } from "../../../backend/src/user/user.schema";
import type { UserFormValues } from "@/lib/schemas/user-schema";
import { AlertDialogDemo } from "@/components/alert-dialog";
import UserEditForm from "@/components/update-user-form";
import { UserUpdateFormValues } from "@/lib/schemas/user-update-schema";
import UserAddForm from "@/components/add-user-form";

export default function Users() {
  const [users, setUsers] = useState<UserDocument[]>([]);

  const load = async () => {
    const resp = await fetch("http://localhost:3000/user");
    setUsers(await resp.json());
  };

  useEffect(() => {
    load();
  }, []);

  const addUser = async (data: UserFormValues) => {
    try {
      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      load();
    } catch (e) {
      console.log("WHPPS", e);
    }
  };

  const updateUser = async (id: any, data: UserUpdateFormValues) => {
    await fetch(`http://localhost:3000/user/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    load();
  };

  const deleteUser = async (id: any) => {
    await fetch(`http://localhost:3000/user/delete/${id}`, {
      method: "DELETE",
    });
    load();
  };

  return (
    <Layout title="Users">
      <div className="flex justify-end mb-4">
        <FormModal
          title="Add User"
          trigger={
            <Button variant="outline">
              <Plus />
            </Button>
          }
          form={"add-user-form"}
        >
          <UserAddForm onSave={async (data) => await addUser(data)} />
        </FormModal>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.badgeNumber}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <FormModal
                  title="Edit User"
                  trigger={
                    <Button variant="outline">
                      <Pen />
                    </Button>
                  }
                  form={"edit-user-form"}
                >
                  <UserEditForm
                    user={user}
                    onSave={async (data: any) =>
                      await updateUser(user._id, data)
                    }
                  />
                </FormModal>
                <AlertDialogDemo
                  button={
                    <Button variant="destructive">
                      <Trash />
                    </Button>
                  }
                  onClick={() => deleteUser(user._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
