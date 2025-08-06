import Head from "next/head";
import ProjectProgressApp from "../components/ProjectProgressApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Progress Tracker</title>
        <meta name="description" content="Track your project's progress using start and end dates." />
        <meta name="keywords" content="progress bar, timeline, tracker, project tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <ProjectProgressApp />
      </main>
    </>
  );
}
