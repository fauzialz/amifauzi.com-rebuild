import type { V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import WelcomeModal from "~/components/WelcomeModal";
import { indexLoader } from "~/controls";
import type { LoaderDataType } from "~/controls";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = indexLoader;

export default function Index() {
  const { ENV } = useLoaderData<LoaderDataType>();

  console.log("ENV", ENV);

  const [openWelcome, setOpenWelcome] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const onCloseWelcomeModal = () => {
    setOpenWelcome(false);
    document.body.style.overflow = "auto";
    window.scrollTo({ top: 0 });
  };

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className="bg-background-2"
    >
      <WelcomeModal isOpen={openWelcome} onClose={onCloseWelcomeModal} />
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
