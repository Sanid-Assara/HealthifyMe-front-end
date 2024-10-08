import React, { useState, useEffect } from "react";

export default function Themes() {
  const themeKey = "theme";
  const [theme, setTheme] = useState(
    localStorage.getItem(themeKey) || "healthifyMe"
  );

  const changeTheme = (e) => {
    e.preventDefault();
    setTheme(e.target.value);
    window.location.reload();
    console.log(theme);
  };
  useEffect(() => {
    if (changeTheme) {
      localStorage.setItem(themeKey, theme);
    }
  }, [theme]);

  return (
    <>
      <div className="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-10">
        <label htmlFor="healthifyMe">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="healthifyMe"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="HealthifyMe"
              value="healthifyMe"
              data-set-theme="healthifyMe"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary rounded-badge w-6 h-10 pt-2">
                A
              </span>{" "}
              <span className="bg-accent rounded-badge w-6 h-10 pt-2"> A</span>{" "}
              <span className="bg-neutral text-base-100 rounded-badge w-6 h-10 pt-2">
                {" "}
                A
              </span>
            </div>
          </div>
        </label>
        {/* Light */}
        <label htmlFor="light" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="light"
            // data-set-theme="light"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Light"
              value="light"
              data-set-theme="light"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-base-100 rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent rounded-badge w-6 h-10 pt-2"> A</span>{" "}
              <span className="bg-neutral text-base-100 rounded-badge w-6 h-10 pt-2">
                {" "}
                A
              </span>
            </div>
          </div>
        </label>

        {/* Dark */}
        <label htmlFor="dark" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="dark"
            // data-set-theme="dark"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Dark"
              value="dark"
              data-set-theme="dark"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* Bumblebee */}
        <label htmlFor="bumblebee" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="bumblebee"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Bumblebee"
              value="bumblebee"
              data-set-theme="bumblebee"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* Emerald */}
        <label htmlFor="emerald" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="emerald"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Emerald"
              value="emerald"
              data-set-theme="emerald"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* Retro */}
        <label htmlFor="retro" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="retro"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Retro"
              value="retro"
              data-set-theme="retro"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-base-100 rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary rounded-badge w-6 h-10 pt-2">
                A
              </span>{" "}
              <span className="bg-accent rounded-badge w-6 h-10 pt-2"> A</span>{" "}
              <span className="bg-neutral text-base-100 rounded-badge w-6 h-10 pt-2">
                {" "}
                A
              </span>
            </div>
          </div>
        </label>

        {/* Corporate */}
        <label htmlFor="corporate" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="corporate"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Corporate"
              value="corporate"
              data-set-theme="corporate"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* Valentine */}
        <label htmlFor="valentine" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="valentine"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Valentine"
              value="valentine"
              data-set-theme="valentine"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* garden */}
        <label htmlFor="garden" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="garden"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Garden"
              value="garden"
              data-set-theme="garden"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* Pastel */}
        <label htmlFor="pastel" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="pastel"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Pastel"
              value="pastel"
              data-set-theme="pastel"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* Dracula */}
        <label htmlFor="dracula" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="dracula"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Dracula"
              value="dracula"
              data-set-theme="dracula"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* lemonade */}
        <label htmlFor="lemonade" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="lemonade"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Lemonade"
              value="lemonade"
              data-set-theme="lemonade"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* Night */}
        <label htmlFor="lemonade" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="night"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Night"
              value="night"
              data-set-theme="night"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* lemonade */}
        <label htmlFor="nord" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="nord"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Nord"
              value="nord"
              data-set-theme="nord"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>

        {/* Sunset */}
        <label htmlFor="lemonade" className="">
          <div
            className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent p-2"
            data-theme="sunset"
          >
            <input
              type="radio"
              name="theme-buttons"
              className="btn btn-block justify-start font-bold text-center rounded-md mb-2 theme-controller"
              aria-label="Sunset"
              value="sunset"
              data-set-theme="sunset"
              onClick={changeTheme}
            />
            <div className="flex justify-evenly text-center font-bold">
              <span className="bg-primary text-primary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-secondary text-secondary-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-accent text-accent-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
              <span className="bg-neutral text-neutral-content rounded-badge w-6 h-10 pt-2">
                A
              </span>
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
