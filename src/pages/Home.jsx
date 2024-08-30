import { NavLink } from "react-router-dom";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="min-h-[80vh] bg-base-200 py-16">
        <div className="max-w-3xl text-center m-auto">
          <h1 className="text-4xl font-bold text-primary mb-10">
            Be Healthify
          </h1>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Odio ridiculus
            elementum justo sit tempor quisque in suscipit ligula. Phasellus
            mauris dictum; egestas tempus adipiscing tempus.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 container m-auto justify-items-center mt-20">
          <div className="">
            <img
              src="https://picsum.photos/seed/picum/300/300"
              alt=""
              className="mb-3 w-36 h-36 rounded-full shadow-lg"
            />
            <h2 className="font-bold text-lg text-accent">Icon text sample</h2>
          </div>
          <div className="">
            <img
              src="https://picsum.photos/id/72/300/300"
              alt=""
              className="mb-3 w-36 h-36 rounded-full shadow-lg"
            />
            <h2 className="font-bold text-lg text-accent">Icon text sample</h2>
          </div>
          <div className="">
            <img
              src="https://picsum.photos/id/123/300/300"
              alt=""
              className="mb-3 w-36 h-36 rounded-full shadow-lg"
            />
            <h2 className="font-bold text-lg text-accent">Icon text sample</h2>
          </div>
          <div className="">
            <img
              src="https://picsum.photos/id/234/300/300"
              alt=""
              className="mb-3 w-36 h-36 rounded-full shadow-lg"
            />
            <h2 className="font-bold text-lg text-accent">Icon text sample</h2>
          </div>
        </div>
      </div>
      {/* Full width cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="hero min-h-[80vh]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1497888329096-51c27beff665?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="text-neutral-content p-16">
            <h2 className="mb-5 text-3xl font-bold">Explore Recipes</h2>
            <p className="mb-5 text-lg">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <NavLink to="/recipes/explore">
              <button className="btn btn-primary mt-16">See more</button>
            </NavLink>
          </div>
        </div>
        {/* full card 2 */}
        <div
          className="hero min-h-[80vh]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="text-neutral-content text-right p-16">
            <h2 className="mb-5 text-3xl font-bold">Explore Workouts</h2>
            <p className="mb-5 text-lg">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <NavLink to="/recipes/explore">
              <button className="btn btn-primary mt-16">See more</button>
            </NavLink>
          </div>
        </div>
      </div>
      {/* numbers */}
      <div className="min-h-[80vh] bg-gray-100 py-16">
        <h1 className="text-4xl font-bold text-primary mb-10 text-center">
          This and more you can find
        </h1>
        {/* <div className="max-w-3xl  m-auto"></div> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 container m-auto justify-items-center mt-20 text-center mb-16">
          <div className="">
            <p className="font-bold text-6xl text-secondary">5,000+</p>
            <h2 className="font-bold text-lg text-accent">Delicious Recipes</h2>
          </div>
          <div className="">
            <p className="font-bold text-6xl text-secondary">8,400+</p>
            <h2 className="font-bold text-lg text-accent">Easy Workouts</h2>
          </div>
          <div className="">
            <p className="font-bold text-6xl text-secondary">12,000+</p>
            <h2 className="font-bold text-lg text-accent">Happy members</h2>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-10 text-center">
          What our members say
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 container m-auto justify-items-center mt-20 mb-16 gap-12">
          <div className="border rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://picsum.photos/id/777/300/300"
                className="mr-3 w-24 h-24 rounded-full shadow-lg"
              />
              <div>
                <p className="text-neutral text-sm">
                  "Est auctor suspendisse risus at duis. Ridiculus vehicula
                  iaculis lobortis, tincidunt mattis vestibulum. "
                </p>
                <p className="font-bold text-sm">Karla Danver</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://picsum.photos/id/64/300/300"
                className="mr-3 w-24 h-24 rounded-full shadow-lg"
              />
              <div>
                <p className="text-neutral text-sm">
                  "Ullamcorper pellentesque nullam condimentum nunc viverra
                  fermentum ridiculus aliquet lorem. Tristique velit maecenas
                  penatibus et risus hac."
                </p>
                <p className="font-bold text-sm">Stephanie Müller</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://picsum.photos/id/669/300/300"
                className="mr-3 w-24 h-24 rounded-full shadow-lg"
              />
              <div>
                <p className="text-neutral text-sm">
                  "Auctor ac taciti leo ante lobortis ridiculus. Netus tincidunt
                  molestie ligula nostra leo tempus"
                </p>
                <p className="font-bold text-sm">Alex Smith</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
