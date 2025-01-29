import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import accessDenied from "@/assets/common/access-denied.svg";
import superThankYou from "@/assets/common/super-thank-you.svg";
import forRiview from "@/assets/common/for-riview.svg";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIsUserBroughtTheProduct,
  checkIsUserHasRiviewedTheProduct,
  createRiview,
  fetchRiviews,
} from "@/store/shop/RiviewSlice";
import { useToast } from "@/hooks/use-toast";

function RatingStarsInput({ rating, setRating }) {
  return (
    <div className="flex gap-x-2">
      {[1, 2, 3, 4, 5].map((star, index) => (
        <div
          key={index}
          onClick={() => setRating(star)}
          className="cursor-pointer"
        >
          <StarIcon
            className={`w-5 h-5 ${
              star <= rating ? "fill-primary" : "fill-none"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

const riviewSchema = z.object({
  comment: z.string().min(3, "Comment must be at least 3 characters"),
});

function RiviewProduct({ productId, wrapperClass }) {
  const { user } = useSelector((state) => state.auth);
  const [riviews, setRiviews] = useState([]);
  const [canRiview, setCanRiview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hasRiviewed, setHasRiviewed] = useState(false);
  const [userRiview, setUserRiview] = useState(null);
  const [currentlyEditRiview, setCurrentlyEditRiview] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(riviewSchema),
    defaultValues: {
      comment: comment || "",
    },
  });
  useEffect(() => {
    setRating(userRiview?.rating || 0);
  }, [userRiview]);

  function fetchRiviewsForProduct() {
    dispatch(fetchRiviews({ productId })).then((action) => {
      if (action?.payload?.success) {
        setRiviews(action?.payload?.riviews);
      }
    });
  }
  function checkUserRiview() {
    dispatch(
      checkIsUserHasRiviewedTheProduct({ productId, userId: user?.id })
    ).then((action) => {
      if (action?.payload?.success) {
        setHasRiviewed(action?.payload?.data?.isUserAlreadyRiviewed);
        setUserRiview(action?.payload?.data?.riview);
      }
    });
  }

  useEffect(() => {
    if (productId) {
      // fetch all riviews for this product
      fetchRiviewsForProduct();

      // check if user brought the product
      dispatch(
        checkIsUserBroughtTheProduct({ productId, userId: user?.id })
      ).then((action) => {
        if (action?.payload?.success) {
          setCanRiview(action?.payload?.data?.isUserBroughtTheProduct);
        }
      });
      // check if user already riviewed the product
      checkUserRiview();
    }
  }, [productId, dispatch]);

  function onSubmit(formData) {
    dispatch(
      createRiview({
        productId,
        rating,
        comment: formData.comment,
        userId: user?.id,
      })
    ).then((action) => {
      if (action?.payload?.success) {
        setHasRiviewed(true);
        setCanRiview(false);
        setCurrentlyEditRiview(false);
        fetchRiviewsForProduct();
        checkUserRiview();
        toast({
          title: action?.payload?.message,
        });
      }
    });
  }

  function handleEditRiview() {
    setHasRiviewed(false);
    setCanRiview(true);
    setCurrentlyEditRiview(true);
  }

  return (
    <div className={wrapperClass}>
      <div className="relative w-full h-full p-4 rounded-md bg-neutral-100">
        {/* <div className="absolute top-0 bottom-0 left-0 right-0 bg-red-100"></div> */}
        <Tabs defaultValue="riviews" className="flex flex-col w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="riviews">Riviews</TabsTrigger>
            <TabsTrigger value="give_riview">My Riview</TabsTrigger>
          </TabsList>
          <TabsContent value="riviews" className="w-full h-full p-0">
            <Card className="h-full px-4 py-6">
              {riviews.length > 0 ? (
                <ScrollArea className="h-full">
                  <div className="grid w-full h-full gap-6">
                    {riviews.map((riview) => (
                      <div className="flex gap-4" key={riview._id}>
                        <Avatar className="w-8 h-8 border">
                          <AvatarFallback className="text-sm font-medium bg-neutral-300">
                            {riview.user.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-normal">
                              {riview.user.email}
                            </h3>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star, index) => (
                              <StarIcon
                                key={index}
                                className={`w-3 h-3 ${
                                  star <= riview?.rating || 0
                                    ? "fill-primary"
                                    : "fill-none"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {riview.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <Card className="h-full">
                  <CardHeader className="flex flex-col items-center justify-center h-full">
                    <div className="h-32 mb-4">
                      <img
                        src={forRiview}
                        alt="riview "
                        className="object-contain h-full aspect-square"
                      />
                    </div>
                    <CardTitle className="text-base text-center">
                      Be the first to riview this product
                    </CardTitle>
                    <CardDescription className="text-center">
                      Share your experience with this product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-center"></CardContent>
                </Card>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="give_riview" className="h-full">
            {hasRiviewed ? (
              <Card className="h-full pt-2">
                <CardHeader className="flex flex-col items-center justify-center">
                  <div className="mb-4 h-28">
                    <img
                      src={superThankYou}
                      alt="access denied"
                      className="object-contain w-full h-full aspect-square"
                    />
                  </div>
                  <CardTitle className="text-base text-center">
                    Thanks for your riview
                  </CardTitle>
                  <CardDescription>
                    You have already riviewed this product
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-0 my-0">
                  {/* single riview */}
                  <div className="flex gap-3 p-4 rounded-md bg-neutral-100">
                    <div className="grid gap-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star, index) => (
                          <StarIcon
                            key={index}
                            className={`w-3 h-3 ${
                              star <= userRiview?.rating || 0
                                ? "fill-primary"
                                : "fill-none"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed line-clamp-2 text-neutral-700">
                        {userRiview?.comment}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="text-xs font-medium tracking-wide"
                    onClick={handleEditRiview}
                  >
                    Edit Riview
                  </Button>
                </CardFooter>
                <CardContent className="space-y-2 text-center"></CardContent>
              </Card>
            ) : canRiview ? (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">
                    {currentlyEditRiview
                      ? "Change your riview"
                      : "Riview this product"}
                  </CardTitle>
                  <CardDescription>
                    Share your experience with this product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-neutral-800" htmlFor="current">
                        Rating
                      </Label>
                      <RatingStarsInput rating={rating} setRating={setRating} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-neutral-800" htmlFor="current">
                        Comment
                      </Label>
                      <Textarea
                        {...register("comment")}
                        id="current"
                        placeholder="Write your comment here"
                        className="h-36"
                      />
                      {errors?.comment && (
                        <div className="text-sm text-red-500">
                          {errors.comment.message}
                        </div>
                      )}
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      className="text-xs font-medium tracking-wide"
                    >
                      {currentlyEditRiview ? "Update Riview" : "Submit Riview"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full">
                <CardHeader className="flex flex-col items-center justify-center h-full">
                  <div className="h-32 mb-4">
                    <img
                      src={accessDenied}
                      alt="access denied"
                      className="object-cover w-full h-full aspect-square"
                    />
                  </div>
                  <CardTitle className="text-base text-center">
                    You must purchase this product to riview it
                  </CardTitle>
                  <CardDescription>
                    Only a buyer can riview a product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-center"></CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default RiviewProduct;
