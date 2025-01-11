import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import validator from "validator";
import { useDispatch } from "react-redux";
import { loginUserThunk, updateUserThunk } from "@/store/auth-slice";
import { Separator } from "../../ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

function UpdateProfileDialog({ user, dialogOpen, setDialogOpen }) {
  const dispatch = useDispatch();
  const profileBefore = {
    userName: user?.userName,
    email: user?.email,
  };
  const [profile, setProfile] = useState({
    userName: user?.userName,
    email: user?.email,
    password: "",
  });
  const [errorForm, setErrorForm] = useState({
    userName: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [canSubmit, setCanSubmit] = useState(false);
  const { toast } = useToast();
  // const navigate = useNavigate();

  useEffect(() => {
    setProfile({
      userName: user?.userName,
      email: user?.email,
      password: "",
    });
    setErrorMessage("");
  }, [dialogOpen]);

  useEffect(() => {
    let validName = validator.isLength(profile.userName, { min: 5 });

    if (validName) {
      setErrorForm({ ...errorForm, userName: "" });
    } else {
      setErrorForm({
        ...errorForm,
        userName: "Username must be at least 5 characters",
      });
    }

    let validEmail = validator.isEmail(profile.email);
    if (validEmail) {
      setErrorForm({ ...errorForm, email: "" });
    } else {
      setErrorForm({ ...errorForm, email: "Please insert the correct email" });
    }

    if (
      !Object.values(profile).some((value) => value === "") &&
      validName &&
      validEmail &&
      (profile.userName !== profileBefore.userName ||
        profile.email !== profileBefore.email)
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [profile]);

  const handleUpdateProfile = () => {
    setErrorMessage("");
    dispatch(updateUserThunk(profile)).then((result) => {
      if (result?.payload.success) {
        // create the cookie token again with login thunk
        dispatch(
          loginUserThunk({ email: profile.email, password: profile.password })
        ).then(() => {
          // clear password field state
          setProfile({
            ...profile,
            password: "",
          });
          // navigate("/shop/account");
        });
        setDialogOpen(!dialogOpen);
        toast({
          title: result?.payload?.message,
        });
      } else {
        setErrorMessage(result?.payload?.message);
        setProfile({
          ...profileBefore,
          password: "",
        });
      }
    });
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="grid py-4 space-y-4">
        <div className="space-y-2">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="userName" className="text-right">
              Username
            </Label>
            <Input
              id="userName"
              name="userName"
              value={profile?.userName}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  userName: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          {errorForm?.userName && (
            <div className="grid grid-cols-4 jsutify-end">
              <span className="col-span-1"></span>
              <span className="col-span-3 px-2 text-xs font-medium text-rose-600">
                {errorForm?.userName}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={profile?.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          {errorForm.email && (
            <div className="grid grid-cols-4 jsutify-end">
              <span className="col-span-1"></span>

              <span className="col-span-3 px-2 text-xs font-medium text-rose-600">
                {errorForm?.email}
              </span>
            </div>
          )}
        </div>
        <Separator />
        <p className="text-sm font-medium text-center text-foreground/60">
          Enter your account password for confirmation!
        </p>
        <div className="space-y-2">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={profile?.password}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  password: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          {errorForm.password && (
            <div className="grid grid-cols-4 jsutify-end">
              <span className="col-span-1"></span>

              <span className="col-span-3 px-2 text-xs font-medium text-rose-600">
                {errorForm?.password}
              </span>
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <AlertDialog>
          <AlertDialogTrigger
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            disabled={!canSubmit}
          >
            Update Profile
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Your Update</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update your profile? This action cannot
                be undone. Please make sure you have entered the correct
                information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpdateProfile}>
                Update
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogFooter>
    </DialogContent>
  );
}

export default UpdateProfileDialog;
