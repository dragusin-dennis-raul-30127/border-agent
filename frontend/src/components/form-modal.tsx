import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  title: string;
  children: ReactNode;
  trigger: ReactNode;
  form: string;
};

export default function FormModal(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        {props.children}
        <DialogFooter>
          <DialogClose asChild>
            <div>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" form={props.form}>
                Save changes
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
