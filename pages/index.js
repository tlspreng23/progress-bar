import Head from "next/head";
import ProjectProgressApp from "../components/ProjectProgressApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Progress Bar – Visualize Your Progress</title>
        <meta
          name="description"
          content="Track your project's progress using a beautiful, dynamic progress bar. Simply input start and end dates."
        />
        <meta
          name="keywords"
          content="project progress bar, time tracker, visual progress bar, goal progress, progress tracker"
        />
        <meta name="author" content="Tristan Sprenger" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for social/ChatGPT previews */}
        <meta property="og:title" content="Project Progress Bar" />
        <meta
          property="og:description"
          content="Visualize your project's progress using start and end dates."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://progress-bar-three-topaz.vercel.app/" />
        <meta property="og:image" content="https://your-vercel-domain.vercel.app/progress-preview.png" />

        <link rel="canonical" href="https://your-vercel-domain.vercel.app/" />
      </Head>
      <main>
        <ProjectProgressApp />
      </main>
    </>
  );
}
