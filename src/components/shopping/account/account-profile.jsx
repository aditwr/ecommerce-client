import { Fragment, useState } from "react";
import fakeProfilePic from "@/assets/common/profile-pic.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateProfileDialog from "./update-profile-dialog";
import ResetPasswordDialog from "./reset-password-dialog";

function AccountProfile({ user }) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);

  return (
    <Fragment>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Account Profile</h1>
        <div className="">
          <div className="flex items-center justify-start gap-4">
            <div className="w-24 h-24 overflow-hidden border-4 border-white rounded-full">
              <img
                src={fakeProfilePic}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-semibold">{user?.userName}</h2>
              <h5 className="text-sm font-medium text-foreground/60">
                <Badge>{user?.email}</Badge>
              </h5>
              <div className="text-sm">
                Registered as a{" "}
                <Badge variant={"secondary"}>{user?.role}</Badge>
              </div>
            </div>
          </div>
        </div>
        {/* Action */}
        <div className="space-x-2">
          <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <UpdateProfileDialog
              user={user}
              dialogOpen={updateDialogOpen}
              setDialogOpen={setUpdateDialogOpen}
            />
          </Dialog>
          <Dialog
            open={resetPasswordDialogOpen}
            onOpenChange={setResetPasswordDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">Reset Password</Button>
            </DialogTrigger>
            <ResetPasswordDialog
              dialogOpen={resetPasswordDialogOpen}
              setDialogOpen={setResetPasswordDialogOpen}
            />
          </Dialog>
        </div>
      </div>
    </Fragment>
  );
}

export default AccountProfile;
