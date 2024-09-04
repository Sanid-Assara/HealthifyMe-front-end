import {
  ImageSkeleton,
  ListSkeleton,
  NutritionalInfoSkeleton,
  TextSkeleton,
} from "./CustomSkeleton";
export default function RecipeSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 animate-pulse">
      <div className="container mx-auto px-10 lg:px-0">
        <div className="pt-16 flex items-center justify-center">
          <TextSkeleton width="w-9/12" height="h-12" />
        </div>
        <div className="flex flex-col flex-1 gap-4 px-8 pt-8 pb-4 py-12">
          {/* Image and Info */}
          <div className="flex  flex-1 gap-10 bg-white px-8 pt-8 pb-8 mb-4 shadow appearance-none border rounded leading-tight py-12">
            <ImageSkeleton />
            <div className="flex flex-col justify-between gap-10 w-full min-h-full flex-1">
              <TextSkeleton width="w-full" height="h-28" />
              <div className="flex justify-between gap-4">
                <TextSkeleton width="w-32" height="h-12" />
                <TextSkeleton width="w-32" height="h-12" />
              </div>
            </div>
          </div>
          {/* Ingredients and Steps*/}
          <div className="flex gap-8 mb-4">
            <div className="flex flex-col flex-1 bg-white p-8 shadow rounded-md">
              <TextSkeleton
                width={"w-48"}
                height={"h-12 mx-auto"}
                space={"m-4"}
              />
              <ListSkeleton count={4} gridCols="grid-cols-2" />
            </div>
            <div className="flex flex-col flex-1 bg-white p-8 shadow rounded-md">
              <TextSkeleton
                width={"w-48"}
                height={"h-12 mx-auto"}
                space={"m-4"}
              />
              <ListSkeleton count={4} />
            </div>
          </div>
          {/*Nutritional */}
          <div className="flex justify-between items-center bg-white px-8 pt-6 pb-4 shadow rounded-md mb-4 ">
            <div className="flex flex-col justify-center items-center flex-1">
              <TextSkeleton width={"w-48"} height={"h-12"} space={"m-4"} />
              <NutritionalInfoSkeleton />
            </div>
            <div className="flex gap-4 justify-end items-end flex-1 mb-2">
              <TextSkeleton width={"w-36"} height={"h-12"} />
              <TextSkeleton width={"w-36"} height={"h-12"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
