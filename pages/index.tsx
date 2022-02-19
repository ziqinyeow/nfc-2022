import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import useAuth from "../context/auth";

const Home: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);

    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="">
      <Head>
        <title>Fintech</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="layout">
        <div className="grid w-full grid-cols-3 gap-5">
          <div className="relative col-span-2 group">
            <div className="absolute transition duration-1000 rounded-md -inset-1 bg-gradient-to-r from-purple-500 to-red-200 opacity-20 blur group-hover:opacity-100 group-hover:duration-200" />
            <div className="relative p-5 transition duration-200 bg-white border rounded-md bg-gradient-to-r group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-red-200 group-hover:text-white">
              <h2 className="mb-2">Total Transactions: </h2>
            </div>
          </div>
          {/* <div className="p-5 rounded-md bg-gradient-to-br from-purple-300 to-orange-300"></div> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
