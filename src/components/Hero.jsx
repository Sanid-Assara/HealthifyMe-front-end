import bgHero from "../assets/healthy-food.jpg";
import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div
        className="hero min-h-[70vh]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-3xl">
            <h1 className="mb-5 text-5xl font-bold">
              Become the best version of you
            </h1>
            <p className="mb-5 text-lg">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <NavLink to="/workout/explore">
              <button className="btn btn-primary">Explore Recipes</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
