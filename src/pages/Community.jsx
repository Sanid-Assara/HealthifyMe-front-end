const mockPeople = [
  {
    name: "Amarbayar Bold",
    role: "Front-End Developer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in. Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in.",
  }, // More people...
  {
    name: "Amarbayar Bold",
    role: "Front-End Developer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in. Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in.",
  },
  {
    name: "Amarbayar Bold",
    role: "Front-End Developer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in. Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in.",
  },
  {
    name: "Amarbayar Bold",
    role: "Front-End Developer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in.",
  },
];
const mockTimeline = [
  {
    name: "Founded company",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in.",
    date: "Aug 2024",
    dateTime: "2024-08",
  },
  {
    name: "Secured $80m in funding",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in.",
    date: "Oct 2024",
    dateTime: "2024-10",
  },
  {
    name: "Released beta",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in.",
    date: "Nov 2024",
    dateTime: "2024-11",
  },
  {
    name: "Global launch of product",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium quasi in.",
    date: "Dec 2024",
    dateTime: "2024-12",
  },
];
export default function Community() {
  return (
    <>
      {/* 
      Community
    */}
      <div
        className="hero min-h-[70vh] mb-12"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-3xl">
            <h1 className="mb-5 text-5xl font-bold">
              Community: We are family ...
            </h1>
            <p className="mb-5 text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In nam
              ullam corporis illum quis nostrum nisi voluptatem quisquam amet
              suscipit tempora, deleniti impedit. Commodi
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {mockTimeline.map((item) => {
            return (
              <div key={item.name}>
                <time
                  dateTime={item.dateTime}
                  className="flex items-center text-sm font-semibold leading-6 text-primary"
                >
                  <svg
                    viewBox="0 0 4 4"
                    aria-hidden="true"
                    className="mr-4 h-1 w-1 flex-none"
                  >
                    <circle r={2} cx={2} cy={2} fill="currentColor" />
                  </svg>
                  {item.date}
                  <div
                    aria-hidden="true"
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                  />
                </time>
                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-base leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* 
      Statement about the community
    */}
      <div className="mx-auto container text-center mt-20 mb-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Meet our team
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
            similique quisquam. Maiores, nulla quia? Harum illo quam nobis
            itaque facilis, quasi commodi dignissimos nostrum dolores
            repellendus atque nam totam temporibus?
          </p>
        </div>

        {/* Our team members, profiles with some inspiring comments about the community */}
        <ul
          className="mx-auto container mt-20 grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2  lg:gap-x-8 max-w-5xl"
          role="list"
        >
          {mockPeople.map((person) => {
            return (
              <li
                key={person.name}
                className="flex flex-col gap-6 xl:flex-row "
              >
                <img
                  alt=""
                  src={person.imageUrl}
                  className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                />
                <div className="flex-auto text-left">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-base leading-7 text-gray-600">
                    {person.role}
                  </p>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    {person.bio}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="m-auto container mt-20 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl text-center mb-4">
          Short statement about the company and its brief history explained
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, a rem
          porro ipsa perferendis nam placeat veniam eaque rerum atque, harum
          soluta accusantium, nesciunt iure fuga autem illo numquam ut quisquam
          iste nisi aperiam amet corrupti. Autem ab exercitationem saepe dolorum
          distinctio, ex voluptas alias numquam enim! Velit.
        </p>
      </div>
    </>
  );
}
