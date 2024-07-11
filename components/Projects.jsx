import React from "react";
import { GlobeAltIcon, CodeBracketIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const people = [
  {
    id: 1,
    name: "PublicTrades",
    title: "ReactJs, Next Auth, MongoDB, Prisma",
    desc: "ReactJs, Next Auth, PostgreSQL, Prisma",
    role: "AI-Powered: No",
    site: "https://publictrades.com",
    imageUrl: "/images/publictrades.jpeg",
    git: "https://github.com/PtradeLLC/publictrades",
  },
  {
    id: 2,
    name: "ReBlug",
    title: "ReactJs, Next Auth, PostgreSQL, Prisma",
    desc: "ReactJs, Next Auth, PostgreSQL, Prisma",
    role: "AI-Powered: Yes",
    site: "https://www.reblug.com",
    imageUrl: "/images/reblug.png",
    git: "https://github.com/PtradeLLC/reBlugApp.git ",
  },
  {
    id: 3,
    name: "Portfolio",
    title: "ReactJs, Next Auth, PostgreSQL, Prisma",
    desc: "ReactJs, Next Auth, PostgreSQL, Prisma",
    role: "AI-Powered: Yes",
    site: "https://www.reblug.com",
    imageUrl: "/images/port.jpeg",
    git: "https://github.com/PtradeLLC/chrisb",
  },
];

const SideProjects = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
    >
      {people.map((person) => (
        <li
          key={person.id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img
              alt="project image"
              src={person.imageUrl}
              className="mx-auto w-80 h-64 object-cover object-top flex-shrink-0"
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {person.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{person.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {person.role}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <Link
                  href={`${person.site}`}
                  target="_blank"
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <GlobeAltIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                  Visit Site
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  href={`${person.git}`}
                  target="_blank"
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <CodeBracketIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SideProjects;
