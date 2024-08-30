import Themes from "../components/Themes";
export default function Settings() {
  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="container m-auto px-10 lg:px-0 py-12">
          <h1 className="text-4xl font-bold text-primary text-center">
            Settings
          </h1>
          <Themes />
        </div>
      </div>
    </>
  );
}
