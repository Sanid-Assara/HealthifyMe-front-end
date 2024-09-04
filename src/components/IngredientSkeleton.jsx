import { NutritionalInfoSkeleton, TextSkeleton } from "./CustomSkeleton";

export default function IngredientSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 animate-pulse px-4">
      <div className="container mx-auto px-10 lg:px-0">
        <div className="pt-16 flex items-center justify-center">
          <TextSkeleton width="w-9/12" height="h-12" />
        </div>
        <div className="flex flex-col flex-1 gap-4 px-8 pt-8 pb-4 py-12">
          {/*Nutritional */}
          <div className="flex justify-between items-center bg-white px-8 pt-6 pb-4 shadow rounded-md mb-4 ">
            <div className="flex flex-col justify-center items-center flex-1">
              <TextSkeleton width={"w-48"} height={"h-12"} space={"m-4"} />
              <NutritionalInfoSkeleton />
            </div>
            <div className="flex flex-col justify-center items-center flex-1">
              <TextSkeleton width={"w-48"} height={"h-12"} space={"m-4"} />
              <NutritionalInfoSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
